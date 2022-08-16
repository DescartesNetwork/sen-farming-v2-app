import { useCallback, useEffect, useState } from 'react'
import BN from 'bn.js'

import { useGetTotalValue } from 'hooks/useGetPrice'
import { useFarmLiquidity } from './useFarmLiquidity'
import { useFarmRewards } from './useFarmRewards'
import { useFarmOracle } from './useFarmOracle'

export const useFarmAPR = (farmAddress: string) => {
  const [roi, setRoi] = useState(0)
  const liquidity = useFarmLiquidity(farmAddress)
  const getTotalValue = useGetTotalValue()
  const rewards = useFarmRewards(farmAddress)
  const farmOracle = useFarmOracle(farmAddress)

  const calcAPR = useCallback(async () => {
    if (!liquidity) return setRoi(0)
    const filteredRewards = Object.values(rewards).filter(
      (val) => val.farm.toBase58() === farmAddress,
    )

    let totalReward = 0
    for (const reward of filteredRewards) {
      const { rewardMint, totalRewards } = reward
      const rewardPerDay = totalRewards
        .mul(new BN(86400))
        .div(farmOracle.get_lifetime())
      const rewardAmount = await getTotalValue(rewardMint, rewardPerDay)
      totalReward += rewardAmount
    }
    const roi = totalReward / liquidity
    return setRoi(roi)
  }, [farmAddress, farmOracle, getTotalValue, liquidity, rewards])

  useEffect(() => {
    calcAPR()
  }, [calcAPR])

  return { roi }
}
