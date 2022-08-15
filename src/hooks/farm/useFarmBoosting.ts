import { useCallback, useEffect, useState } from 'react'

import { useSelector } from 'react-redux'
import { AppState } from 'model'
import { BoostingData } from '@sentre/farming'

export const useFarmBoosting = (farmAddress: string) => {
  const [farmBoostingData, setFarmBoostingData] = useState<BoostingData>()
  const farmBoosting = useSelector((state: AppState) => state.boosting)

  const getFarmBoostingData = useCallback(() => {
    const boostingData = Object.keys(farmBoosting).filter(
      (farmBoostingAddress) =>
        farmBoosting[farmBoostingAddress].farm.toBase58() === farmAddress,
    )
    setFarmBoostingData(farmBoosting[boostingData[0]])
  }, [farmAddress, farmBoosting])

  useEffect(() => {
    getFarmBoostingData()
  }, [getFarmBoostingData])

  return farmBoostingData
}
