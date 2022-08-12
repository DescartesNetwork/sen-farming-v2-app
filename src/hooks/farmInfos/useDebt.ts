import { useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { util } from '@sentre/senhub'
import { DebtData } from '@sentre/farming'

import { AppState } from 'model'

// To-do: Wait for config
// const {
//   sol: { farming },
// } = configs

export const useDebt = (
  farmAddress: string,
): { address: string; data: DebtData } => {
  const [debtAddress, setDebtAddress] = useState('')
  const {
    debts: { [debtAddress]: debtData },
  } = useSelector((state: AppState) => state)

  const fetchDebtAddress = useCallback(async () => {
    // To-do: Process data and fetching
    if (!util.isAddress(farmAddress)) return setDebtAddress('')
    // const debtAddr = await farming.deriveDebtAddress(walletAddress, farmAddress)
    return setDebtAddress('')
  }, [farmAddress])

  useEffect(() => {
    fetchDebtAddress()
  }, [fetchDebtAddress])

  return {
    address: debtAddress,
    data: debtData,
  }
}
