import { useCallback } from 'react'
import { BN } from '@project-serum/anchor'

import { useDebtData } from 'hooks/debt/useDebtData'
import { useDebtOracle } from './useDebtOracle'
import { useFarmOracle } from 'hooks/farm/useFarmOracle'
import { useFarmData } from 'hooks/farm/useFarmData'

export const useGetDebtReward = (farmAddress: string) => {
  const debData = useDebtData(farmAddress)
  const farmData = useFarmData(farmAddress)
  const debOracle = useDebtOracle(farmAddress)
  const farmOracle = useFarmOracle(farmAddress)

  const getDebtReward = useCallback(async () => {
    if (!debData) return new BN(0)
    let current_shares = debData.shares

    let time_passed = await farmOracle.get_time_passed()
    console.log('time_passed', time_passed.toNumber())
    let current_emission_rate = farmOracle.get_emission_rate(
      farmData.totalShares,
    )
    let rewards = debOracle.get_rewards(
      time_passed,
      current_shares,
      current_emission_rate,
      farmData.compensation,
    )
    let next_pending_rewards = debData.pendingRewards.add(rewards)
    return next_pending_rewards
  }, [
    debData,
    debOracle,
    farmData.compensation,
    farmData.totalShares,
    farmOracle,
  ])

  return getDebtReward
}
