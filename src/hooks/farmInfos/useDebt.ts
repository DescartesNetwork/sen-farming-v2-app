import { useCallback, useEffect, useState } from 'react'
import { DebtData } from '@senswap/sen-js'

// To-do: Wait for config
// const {
//   sol: { farming },
// } = configs

export const useDebt = (
  farmAddress: string,
): { address: string; data: DebtData } => {
  // To-do: Get data from redux
  // const {
  //   debts: { [debtAddress]: debtData },
  // } = useSelector((state: AppState) => state)
  const [debtAddress, setDebtAddress] = useState('')

  const fetchDebtAddress = useCallback(async () => {
    // To-do: Process data and fetching
    // if (!account.isAddress(farmAddress)) return setDebtAddress('')
    // const debtAddr = await farming.deriveDebtAddress(walletAddress, farmAddress)
    return setDebtAddress('')
  }, [])

  useEffect(() => {
    fetchDebtAddress()
  }, [fetchDebtAddress])

  return {
    address: debtAddress,
    data: {} as any, // To-do: Alter this data
  }
}
