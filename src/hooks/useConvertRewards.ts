import { useCallback, useEffect, useMemo, useState } from 'react'
import { BN } from '@project-serum/anchor'

import { useFarmData } from 'hooks/farm/useFarmData'
import { useDebtData } from 'hooks/debt/useDebtData'
import { useFarmRewards } from 'hooks/farm/useFarmRewards'
import { useGetDebtReward } from './debt/useGetDebtReward'
import { PRECISION } from 'constant'

export type PendingRewardData = {
  mint: string
  amount: BN
}
export const useConvertRewards = (
  farmAddress: string,
  intervalTime = 1000,
): PendingRewardData[] => {
  const [totalReward, setTotalReward] = useState(new BN(0))
  const getDebtReward = useGetDebtReward(farmAddress)
  const rewards = useFarmRewards(farmAddress)
  const farmData = useFarmData(farmAddress)
  const debData = useDebtData(farmAddress)

  const updateReward = useCallback(async () => {
    const totalReward = await getDebtReward()
    setTotalReward(totalReward.div(new BN(10 ** 9)))
  }, [getDebtReward])

  useEffect(() => {
    if (intervalTime && debData?.shares.gt(new BN(0))) {
      const interval = setInterval(() => updateReward(), intervalTime)
      return () => clearInterval(interval)
    } else {
      updateReward()
    }
  }, [debData?.shares, intervalTime, updateReward])

  const pendingConvertRewards = useMemo(() => {
    return rewards.map((reward) => {
      return {
        mint: reward.rewardMint.toBase58(),
        amount: totalReward
          .mul(reward.totalRewards)
          .mul(PRECISION)
          .div(farmData.totalRewards),
      }
    })
  }, [farmData.totalRewards, rewards, totalReward])

  return pendingConvertRewards
}
