import { useMemo } from 'react'
import { useSelector } from 'react-redux'

import { AppState } from 'model'

export const useFarmRewards = (farmAddress: string) => {
  const rewards = useSelector((state: AppState) => state.rewards)

  const farmRewards = useMemo(
    () =>
      Object.values(rewards).filter(
        (reward) => reward.farm.toBase58() === farmAddress,
      ),
    [farmAddress, rewards],
  )

  return farmRewards
}
