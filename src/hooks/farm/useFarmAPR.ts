import { useCallback, useEffect, useState } from 'react'
import { BN } from '@project-serum/anchor'

import { useGetTotalValue } from '@sen-use/app'
import { useFarmLiquidity } from './useFarmLiquidity'
import { useFarmRewards } from './useFarmRewards'
import { useFarmOracle } from './useFarmOracle'

export const useFarmAPR = (farmAddress: string) => {
  const [roi, setRoi] = useState(0)
  const liquidity = useFarmLiquidity(farmAddress) || 10 // Default 10$
  const getTotalValue = useGetTotalValue()
  const rewards = useFarmRewards(farmAddress)
  const farmOracle = useFarmOracle(farmAddress)

  const calcAPR = useCallback(async () => {
    if (!liquidity) return setRoi(0)

    let totalReward = 0
    for (const reward of rewards) {
      const { rewardMint, totalRewards } = reward
      const rewardPerDay = totalRewards
        .mul(new BN(86400))
        .div(farmOracle.get_lifetime())
      const rewardAmount = await getTotalValue(rewardMint, rewardPerDay)
      totalReward += rewardAmount
    }
    const roi = totalReward / liquidity
    return setRoi(roi)
  }, [farmOracle, getTotalValue, liquidity, rewards])

  useEffect(() => {
    calcAPR()
  }, [calcAPR])

  return roi * 356 //APY
}
