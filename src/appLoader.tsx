import { useEffect, useState } from 'react'
import { rpc, useWalletAddress } from '@sentre/senhub'
import { getAnchorProvider } from '@sen-use/web3'
import SenFarmingProgram from '@sentre/farming'

import { AppWatcher } from 'watcher'

import configs from 'configs'

const {
  sol: { senFarmingProgram },
} = configs

export const AppLoader: React.FC = ({ children }) => {
  const address = useWalletAddress()
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    if (loaded) return
    const provider = getAnchorProvider(rpc, address, window.sentre.wallet)
    const senFarming = new SenFarmingProgram(provider, senFarmingProgram)
    window.senFarming = senFarming
    setLoaded(true)
  }, [address, loaded])

  if (!loaded) return null
  return <AppWatcher>{children}</AppWatcher>
}
