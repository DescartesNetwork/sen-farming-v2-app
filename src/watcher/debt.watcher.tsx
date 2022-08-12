import { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { web3 } from '@project-serum/anchor'

import { initDebt, upsetDebt } from 'model/debt.controller'
import Watcher from './watcher'

// TODO: Config
const NAME = 'debt'
const FILTER: web3.GetProgramAccountsFilter[] = []

const VouchersWatcher = () => {
  const dispatch = useDispatch()

  // TODO: init all account data
  const init = useCallback((data) => dispatch(initDebt(data)), [dispatch])
  // TODO: upset account data
  const upset = useCallback(
    (key: string, value: any) =>
      dispatch(upsetDebt({ address: key, data: value })),
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
export default VouchersWatcher
