import { useCallback, useState } from 'react'
import { useMintDecimals } from '@sentre/senhub'
import { web3, BN } from '@project-serum/anchor'

import { notifyError, notifySuccess } from 'helper'
import { useDebtData } from 'hooks/debt/useDebtData'
import { useFarmData } from 'hooks/farm/useFarmData'
import { useDebtOracle } from 'hooks/debt/useDebtOracle'

import configs from 'configs'

export const useUnlock = (farmAddress: string) => {
  const [loading, setLoading] = useState(false)
  const debtData = useDebtData(farmAddress)
  const farmData = useFarmData(farmAddress)
  const debOracle = useDebtOracle(farmAddress)
  const decimals = useMintDecimals({
    mintAddress: farmData?.inputMint.toBase58(),
  })

  const unlock = useCallback(
    async (nft: string) => {
      try {
        setLoading(true)
        const metadata = await configs.sol.metaplexNFT.getNftMetadata(nft)
        const shareAmount = debtData?.shares || new BN(0)
        const depositAmount = debOracle.withdraw(shareAmount)
        // Validate
        if (!decimals) throw new Error('Not find mint decimals')
        const transaction = new web3.Transaction()
        // Initialize debt if needed
        if (!debtData) {
          const { tx } = await window.senFarming.initializeDebt({
            farm: farmAddress,
            sendAndConfirm: false,
          })
          transaction.add(tx)
        }
        // Unstake
        if (!shareAmount.isZero()) {
          const { tx } = await window.senFarming.unstake({
            farm: farmAddress,
            sendAndConfirm: false,
          })
          transaction.add(tx)
        }
        // Withdraw
        if (!shareAmount.isZero()) {
          const { tx } = await window.senFarming.withdraw({
            farm: farmAddress,
            shares: shareAmount,
            sendAndConfirm: false,
          })
          transaction.add(tx)
        }
        // Unlock
        const { tx: txUnlock } = await window.senFarming.unlock({
          farm: farmAddress,
          nft,
          metadata: metadata.pubkey.toBase58(),
          collection: metadata.data.collection?.key || '',
          sendAndConfirm: false,
        })
        transaction.add(txUnlock)
        // Deposit
        if (!depositAmount.isZero()) {
          const { tx } = await window.senFarming.deposit({
            farm: farmAddress,
            inAmount: depositAmount,
            sendAndConfirm: false,
          })
          transaction.add(tx)
        }
        // Stake
        const { tx: txStake } = await window.senFarming.stake({
          farm: farmAddress,
          sendAndConfirm: false,
        })
        transaction.add(txStake)

        const provider = window.senFarming.provider
        const txId = await provider.sendAndConfirm(transaction)
        notifySuccess('Boosted', txId)
      } catch (error: any) {
        notifyError(error)
      } finally {
        setLoading(false)
      }
    },
    [debOracle, debtData, decimals, farmAddress],
  )

  return { unlock, loading }
}
