import { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { web3 } from '@project-serum/anchor'

import { initBoosting, upsetBoosting } from 'model/boosting.controller'
import Watcher from './watcher'

// TODO: Config
const NAME = 'farmBoostingCollection'
const FILTER: web3.GetProgramAccountsFilter[] = []

const BoostingsWatcher = () => {
  const dispatch = useDispatch()

  // TODO: init all account data
  const init = useCallback((data) => dispatch(initBoosting(data)), [dispatch])
  // TODO: upset account data
  const upset = useCallback(
    (key: string, value: any) =>
      dispatch(upsetBoosting({ address: key, data: value })),
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
export default BoostingsWatcher
