import { useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { util } from '@sentre/senhub'

import { AppState } from 'model'

export const useDebtAddress = (farmAddress: string) => {
  const [debtAddress, setDebtAddress] = useState('')

  const fetchDebtAddress = useCallback(async () => {
    if (!util.isAddress(farmAddress)) return setDebtAddress('')
    const PDAs = await window.senFarming.deriveAllPDAs({ farm: farmAddress })
    return setDebtAddress(PDAs.debt.toBase58())
  }, [farmAddress])

  useEffect(() => {
    fetchDebtAddress()
  }, [fetchDebtAddress])

  return debtAddress
}

export const useDebtData = (farmAddress: string) => {
  const debtAddress = useDebtAddress(farmAddress)
  const {
    debts: { [debtAddress]: debtData },
  } = useSelector((state: AppState) => state)

  return debtData
}
