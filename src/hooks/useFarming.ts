import { useMemo } from 'react'
import { rpc, useWalletAddress } from '@sentre/senhub'
import { getAnchorProvider } from '@sen-use/web3'
import SenFarming from '@sentre/farming'

import configs from 'configs'

export const useFarming = () => {
  const address = useWalletAddress()

  return useMemo(() => {
    const provider = getAnchorProvider(rpc, address, window.sentre.wallet)
    const farming = new SenFarming(provider, configs.sol.senFarmingProgram)
    return { provider, farming }
  }, [address])
}
