import { useCallback, useState } from 'react'
import BN from 'bn.js'
import { useSelector } from 'react-redux'
import { useWalletAddress } from '@sentre/senhub'
import { web3 } from '@project-serum/anchor'

import { getMetaData, notifyError, notifySuccess } from 'helper'
import { AppState } from 'model'
import { useFarming } from 'hooks/useFarming'

type StakeProps = {
  farm: string
  inAmount: number
  nfts: string[]
}

export const useStake = () => {
  const debtData = useSelector((state: AppState) => state.debts)
  const [loading, setLoading] = useState(false)
  const walletAddress = useWalletAddress()
  const { provider } = useFarming()

  const stake = useCallback(
    async ({ farm, inAmount, nfts }: StakeProps) => {
      try {
        setLoading(true)
        let usedNFT = nfts
        const debtInfo = Object.values(debtData).find(
          (debt) =>
            debt.farm.toBase58() === farm &&
            debt.authority.toBase58() === walletAddress,
        )

        const transaction = new web3.Transaction()
        if (debtInfo && !debtInfo.debtAmount.eq(new BN(0))) {
          const { tx: txUnstake } = await window.senFarming.unstake({
            farm,
          })
          transaction.add(txUnstake)
          const { tx: txWithdraw } = await window.senFarming.withdraw({
            farm,
            outAmount: debtInfo.debtAmount,
            sendAndConfirm: false,
          })
          transaction.add(txWithdraw)

          const info = await window.senFarming.deriveAllPDAs({ farm })
          // To-do: Temp to process later
          const lockedNFTs = await provider.connection.getProgramAccounts(
            info.debtTreasurer,
          )

          await Promise.all(
            lockedNFTs.map(async (nft) => {
              const metadata = await getMetaData(nft.pubkey.toBase58())
              const { tx: txUnlock } = await window.senFarming.unlock({
                farm,
                nft: nft.pubkey.toBase58(),
                metadata: `${metadata?.pubkey.toBase58()}`,
                collection: `${metadata?.data.collection?.key}`,
              })
              transaction.add(txUnlock)
              usedNFT.push(nft.pubkey.toBase58())
            }),
          )
        }

        await Promise.all(
          usedNFT.map(async (nft) => {
            const metadata = await getMetaData(nft)
            const { tx } = await window.senFarming.lock({
              farm,
              nft,
              metadata: `${metadata?.pubkey.toBase58()}`,
              collection: `${metadata?.data.collection?.key}`,
              sendAndConfirm: false,
            })
            transaction.add(tx)
          }),
        )
        const { tx: txDeposit } = await window.senFarming.deposit({
          farm,
          inAmount: new BN(inAmount),
          sendAndConfirm: false,
        })

        transaction.add(txDeposit)

        const { tx: txStake } = await window.senFarming.stake({
          farm,
          sendAndConfirm: false,
        })
        transaction.add(txStake)

        const txId = await provider.sendAndConfirm(transaction)
        notifySuccess('Stake', txId)
      } catch (error: any) {
        notifyError(error)
      } finally {
        setLoading(false)
      }
    },
    [debtData, provider, walletAddress],
  )

  return { stake, loading }
}
