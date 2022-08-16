import { useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import BN from 'bn.js'

import { useAllFarmLiquidity } from './useAllFarmLiquidity'
import { useGetTotalValue } from 'hooks/useGetPrice'

import { AppState } from 'model'

export const useAllFarmAPR = () => {
  const farms = useSelector((state: AppState) => state.farms)
  const rewards = useSelector((state: AppState) => state.rewards)
  const [roiList, setRoiList] = useState<Record<string, number>>({})
  const farmLiquidities = useAllFarmLiquidity()
  const getTotalValue = useGetTotalValue()

  const calcAPRs = useCallback(async () => {
    const newRoiList: Record<string, number> = {}

    for (const farmAddress in farms) {
      const { startDate, endDate } = farms[farmAddress]

      const filteredRewards = Object.values(rewards).filter(
        (val) => val.farm.toBase58() === farmAddress,
      )
      let totalReward = 0
      const period = endDate.sub(startDate)
      for (const reward of filteredRewards) {
        const { rewardMint, totalRewards } = reward
        const rewardPerDay = totalRewards.mul(new BN(86400)).div(period)
        const rewardAmount = await getTotalValue(rewardMint, rewardPerDay)
        totalReward += rewardAmount
      }
      newRoiList[farmAddress] =
        (totalReward / (farmLiquidities[farmAddress] || 10)) * 365
    }

    return setRoiList(newRoiList)
  }, [farmLiquidities, farms, getTotalValue, rewards])

  useEffect(() => {
    calcAPRs()
  }, [calcAPRs])

  return roiList
}
