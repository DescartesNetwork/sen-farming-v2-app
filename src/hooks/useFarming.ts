import { rpc, useWalletAddress } from '@sentre/senhub'
import { getAnchorProvider } from '@sen-use/web3'

import { useMemo } from 'react'

export const useFarming = () => {
  const address = useWalletAddress()

  return useMemo(() => {
    const provider = getAnchorProvider(rpc, address, window.sentre.wallet)
    const farming = {}
    return { provider, farming }
  }, [address])
}
