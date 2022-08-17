import { useCallback, useMemo } from 'react'
import { useDispatch } from 'react-redux'
import { useWalletAddress } from '@sentre/senhub'
import { web3 } from '@project-serum/anchor'
import { encodeIxData } from '@sen-use/web3'

import { initDebt, upsetDebt } from 'model/debts.controller'
import Watcher from './watcher'

// TODO: Config
const NAME = 'debt'

const DebtsWatcher = () => {
  const dispatch = useDispatch()
  const walletAddress = useWalletAddress()
  // TODO: init all account data
  const init = useCallback((data) => dispatch(initDebt(data)), [dispatch])
  // TODO: upset account data
  const upset = useCallback(
    (key: string, value: any) =>
      dispatch(upsetDebt({ address: key, data: value })),
    [dispatch],
  )

  const FILTER = useMemo((): web3.GetProgramAccountsFilter[] => {
    return [
      {
        memcmp: {
          bytes: encodeIxData(new web3.PublicKey(walletAddress).toBuffer()),
          offset: 40,
        },
      },
    ]
  }, [walletAddress])

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
export default DebtsWatcher
