import { useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { util } from '@sentre/senhub'

import { AppState } from 'model'

export const useDebtAddress = (farmAddress: string) => {
  const [debtAddress, setDebtAddress] = useState('')

  const fetchDebtAddress = useCallback(async () => {
    // To-do: Process data and fetching
    if (!util.isAddress(farmAddress)) return setDebtAddress('')
    // const debtAddr = await farming.deriveDebtAddress(walletAddress, farmAddress)
    return setDebtAddress('')
  }, [farmAddress])

  useEffect(() => {
    fetchDebtAddress()
  }, [fetchDebtAddress])

  return debtAddress
}

export const useDebt = (farmAddress: string) => {
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

  return debtData
}
