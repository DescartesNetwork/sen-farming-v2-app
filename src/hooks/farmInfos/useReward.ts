import { useState, useEffect, useCallback } from 'react'

import { useDebt } from 'hooks/farmInfos/useDebt'
// import calculateReward from 'helper/calculateReward'

export const useReward = (farmAddress: string): number => {
  // To-do: Get data from redux
  // const farmData = useSelector((state: AppState) => state.farms[farmAddress])
  const { data } = useDebt(farmAddress)
  const [reward, setReward] = useState(0)

  const calcReward = useCallback(() => {
    if (!data) return setReward(0)
    // To-do: Calc data
    // const pendingReward = calculateReward(data, farmData) || 0
    const pendingReward = 0
    return setReward(pendingReward)
  }, [data])

  useEffect(() => {
    calcReward()
  }, [calcReward])

  return reward
}
