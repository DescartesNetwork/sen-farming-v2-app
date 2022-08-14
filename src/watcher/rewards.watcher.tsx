import { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { web3 } from '@project-serum/anchor'

import { initReward, upsetReward } from 'model/reward.controller'
import Watcher from './watcher'

// TODO: Config
const NAME = 'farmRewardMint'
const FILTER: web3.GetProgramAccountsFilter[] = []

const RewardsWatcher = () => {
  const dispatch = useDispatch()

  // TODO: init all account data
  const init = useCallback((data) => dispatch(initReward(data)), [dispatch])
  // TODO: upset account data
  const upset = useCallback(
    (key: string, value: any) =>
      dispatch(upsetReward({ address: key, data: value })),
    [dispatch],
  )

  return (
    <Watcher
      program={window.senFarming.program}
      name={NAME}
      filter={FILTER}
      init={init}
      upset={upset}
    />
  )
}
export default RewardsWatcher
