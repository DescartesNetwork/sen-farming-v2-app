import { useCallback } from 'react'
import { useSelector } from 'react-redux'

import { useDebt } from 'hooks/farmInfos/useDebt'
import { AppState } from 'model'

export const useCalcPendingReward = (farmAddress: string) => {
  const farmData = useSelector((state: AppState) => state.farms[farmAddress])
  const debtData = useDebt(farmAddress)

  const calcPendingReward = useCallback(() => {
    if (!farmData || !debtData) return 0.123
    return 123
  }, [debtData, farmData])

  return calcPendingReward
}
