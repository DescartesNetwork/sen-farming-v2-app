import { useMemo } from 'react'
import { useFarmRewards } from 'hooks/farm/useFarmRewards'

import { BN } from '@project-serum/anchor'

export type PendingRewardData = {
  mint: string
  amount: BN
}
export const usePendingRewards = (farmAddress: string): PendingRewardData[] => {
  const rewards = useFarmRewards(farmAddress)

  const pendingRewards = useMemo(() => {
    return rewards.map((reward) => {
      return {
        mint: reward.rewardMint.toBase58(),
        amount: new BN(new Date().getTime()),
      }
    })
  }, [rewards])

  return pendingRewards
}
