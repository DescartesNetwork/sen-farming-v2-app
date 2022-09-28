import { useCallback } from 'react'
import { useMintDecimals } from '@sentre/senhub'
import { web3 } from '@project-serum/anchor'

import { useFarmData } from 'hooks/farm/useFarmData'

import configs from 'configs'

export const useLock = (farmAddress: string) => {
  const farmData = useFarmData(farmAddress)
  const decimals = useMintDecimals({
    mintAddress: farmData?.inputMint.toBase58(),
  })

  const onLockNFT = useCallback(
    async (nft: string) => {
      const metadata = await configs.sol.metaplexNFT.getNftMetadata(nft)

      // Validate
      if (!decimals) throw new Error('Not find mint decimals')
      const transaction = new web3.Transaction()
      // Initialize debt if needed
      // Unstake + Withdraw
      // Lock
      const { tx: txLock } = await window.senFarming.lock({
        farm: farmAddress,
        nft,
        metadata: metadata.pubkey.toBase58(),
        collection: metadata.data.collection?.key || '',
        sendAndConfirm: false,
      })
      transaction.add(txLock)
      // Deposit
      // Stake
      return transaction
    },
    [decimals, farmAddress],
  )

  return onLockNFT
}
