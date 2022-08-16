import { useCallback, useState } from 'react'
import { useMintDecimals } from '@sentre/senhub'
import { web3 } from '@project-serum/anchor'

import { notifyError, notifySuccess } from 'helper'
import { useDebtData } from 'hooks/debt/useDebtData'
import { useFarmData } from 'hooks/farm/useFarmData'

import configs from 'configs'

export const useLock = (farmAddress: string) => {
  const [loading, setLoading] = useState(false)
  const debtData = useDebtData(farmAddress)
  const farmData = useFarmData(farmAddress)
  const decimals = useMintDecimals({
    mintAddress: farmData?.inputMint.toBase58(),
  })

  const lock = useCallback(
    async (nft) => {
      try {
        setLoading(true)
        const metadata = await configs.sol.metaplexNFT.getNftMetadata(nft)
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
        if (!debtData?.shares.isZero()) {
          const { tx } = await window.senFarming.unstake({
            farm: farmAddress,
            sendAndConfirm: false,
          })
          transaction.add(tx)
        }
        // Lock
        const { tx: txLock } = await window.senFarming.lock({
          farm: farmAddress,
          nft,
          metadata: metadata.pubkey.toBase58(),
          collection: metadata.data.collection?.key || '',
          sendAndConfirm: false,
        })
        transaction.add(txLock)
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
    [debtData, decimals, farmAddress],
  )

  return { lock, loading }
}
