import { PRECISION } from 'constant'
import { BN } from '@project-serum/anchor'
import { current_timestamp } from 'helper'
import { useCallback, useMemo } from 'react'
import { useFarmData } from './useFarmData'

export const useFarmOracle = (farmAddress: string) => {
  const self = useFarmData(farmAddress)

  const get_lifetime = useCallback(() => {
    let lifetime = self.endDate.sub(self.startDate)
    return lifetime
  }, [self.endDate, self.startDate])

  const get_time_passed = useCallback(async () => {
    let current_date = await current_timestamp()
    let lifetime = get_lifetime()
    if (current_date.lte(self.startDate)) {
      return new BN(0)
    }
    if (current_date.gte(self.endDate)) {
      return lifetime
    }
    let time_passed = current_date.sub(self.startDate)
    return time_passed
  }, [get_lifetime, self.endDate, self.startDate])

  const get_velocity = useCallback(() => {
    let lifetime = get_lifetime()
    let velocity = self.totalRewards.div(lifetime)
    return velocity
  }, [get_lifetime, self.totalRewards])

  const get_emission_rate = useCallback(
    (total_shares: BN) => {
      let velocity = get_velocity()
      if (total_shares.isZero()) {
        let max_emission_rate = velocity.mul(PRECISION)
        return max_emission_rate
      } else {
        let emission_rate = velocity.mul(PRECISION).div(total_shares)
        return emission_rate
      }
    },
    [get_velocity],
  )

  const get_max_compenstation = useCallback(() => {
    let max_time_passed = get_lifetime()
    let max_emission_rate = get_emission_rate(new BN(0))
    let max_compensation = max_time_passed.mul(max_emission_rate)
    return max_compensation
  }, [get_emission_rate, get_lifetime])

  const next_compenstation = useCallback(
    (time_passed: BN, current_emission_rate: BN, next_emission_rate: BN) => {
      let next_compensation = new BN(0)
      if (current_emission_rate.gte(next_emission_rate)) {
        let difference = current_emission_rate
          .sub(next_emission_rate)
          .mul(time_passed)
        next_compensation = self.compensation.add(difference)
      } else {
        let difference = next_emission_rate
          .sub(current_emission_rate)
          .mul(time_passed)
        next_compensation = self.compensation.sub(difference)
      }
      return next_compensation
    },
    [self.compensation],
  )

  return useMemo(() => {
    return {
      get_lifetime,
      get_time_passed,
      get_velocity,
      get_emission_rate,
      get_max_compenstation,
      next_compenstation,
    }
  }, [
    get_emission_rate,
    get_lifetime,
    get_max_compenstation,
    get_time_passed,
    get_velocity,
    next_compenstation,
  ])
}
