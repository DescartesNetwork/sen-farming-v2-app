import { useCallback } from 'react'
import { BN } from '@project-serum/anchor'

import { RewardState } from 'model/rewards.controller'
import { FarmState } from 'model/farms.controller'
import { useGetAllFarmLiquidity } from './useGetAllFarmLiquidity'
import { useGetTotalValue } from '@sen-use/app'

export const useGetAllFarmApr = () => {
  const getAllFarmLiquidity = useGetAllFarmLiquidity()
  const getTotalValue = useGetTotalValue()

  const getAllFarmApr = useCallback(
    async (farms: FarmState, rewards: RewardState) => {
      const newRoiList: Record<string, number> = {}
      const farmLiquidities = await getAllFarmLiquidity(farms)
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

      return newRoiList
    },
    [getAllFarmLiquidity, getTotalValue],
  )

  return getAllFarmApr
}
