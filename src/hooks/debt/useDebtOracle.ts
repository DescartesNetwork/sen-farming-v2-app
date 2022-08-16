import { BN } from '@project-serum/anchor'
import { useCallback, useMemo } from 'react'

import { useDebtData } from './useDebtData'
import { PRECISION } from 'constant'

export const useDebtOracle = (farmAddress: string) => {
  const self = useDebtData(farmAddress)

  const deposit = useCallback(
    (input_mint_amount: BN) => {
      if (!self?.leverage) return new BN(0)
      let mi_mint_out = input_mint_amount.mul(self.leverage).div(PRECISION)
      return mi_mint_out
    },
    [self?.leverage],
  )

  const withdraw = useCallback(
    (mi_mint_amount: BN) => {
      let input_mint_out = mi_mint_amount.mul(PRECISION).div(self.leverage)
      return input_mint_out
    },
    [self?.leverage],
  )

  const next_debt_amount = useCallback(
    (
      time_passed: BN,
      next_shares: BN,
      next_emission_rate: BN,
      next_compensation: BN,
    ) => {
      let bi_time_passed = new BN(time_passed)
      let bi_next_emission_rate = new BN(next_emission_rate)
      let bi_next_compensation = new BN(next_compensation)
      let bi_next_shares = new BN(next_shares)
      let bi_precision = new BN(PRECISION)

      let bi_debt_amount = bi_time_passed
        .mul(bi_next_emission_rate)
        .add(bi_next_compensation)
        .mul(bi_next_shares)
        .div(bi_precision)

      return bi_debt_amount
    },
    [],
  )

  const get_rewards = useCallback(
    (
      time_passed: BN,
      current_shares: BN,
      current_emission_rate: BN,
      current_compensation: BN,
    ) => {
      let bi_passed_time = new BN(time_passed)
      let bi_current_emission_rate = new BN(current_emission_rate)
      let bi_current_compensation = new BN(current_compensation)
      let bi_current_shares = new BN(current_shares)
      let bi_precision = new BN(PRECISION)
      let bi_debt_amount = new BN(self.debtAmount)

      let bi_rewards = bi_passed_time
        .mul(bi_current_emission_rate)
        .add(bi_current_compensation)
        .mul(bi_current_shares)
        .div(bi_precision)
        .sub(bi_debt_amount)
      return bi_rewards
    },
    [self?.debtAmount],
  )

  return useMemo(() => {
    return {
      deposit,
      withdraw,
      next_debt_amount,
      get_rewards,
    }
  }, [deposit, get_rewards, next_debt_amount, withdraw])
}
