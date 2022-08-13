import { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { web3 } from '@project-serum/anchor'

import { initFarms, upsetFarm } from 'model/farms.controller'
import Watcher from './watcher'

// TODO: Config
const NAME = 'farm'
const FILTER: web3.GetProgramAccountsFilter[] = []

const FarmsWatcher = () => {
  const dispatch = useDispatch()

  // TODO: init all account data
  const init = useCallback((data) => dispatch(initFarms(data)), [dispatch])
  // TODO: upset account data
  const upset = useCallback(
    (key: string, value: any) =>
      dispatch(upsetFarm({ address: key, data: value })),
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
export default FarmsWatcher
