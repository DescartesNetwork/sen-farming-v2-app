import { useCallback, useEffect, useState } from 'react'

import { useLiquidity } from './useLiquidity'
import { useMintUsd } from '../useMintUsd'

export const useAPR = (farmAddress: string) => {
  // To-do: Get data from redux
  // const farmData = useSelector((state: AppState) => state.farms[farmAddress])
  const liquidity = useLiquidity(farmAddress)
  const { getTotalValue } = useMintUsd()
  const [apr, setAPR] = useState(0)

  const calcAPR = useCallback(async () => {
    if (!liquidity) return setAPR(0)
    // To-do: Process data
    // const { mint_reward , reward , period  } = farmData
    let mint_reward = ''
    let reward = BigInt(0)
    let period = BigInt(0)
    const rewardPerDay = (reward * BigInt(86400)) / period
    const totalReward = await getTotalValue({
      mintAddress: mint_reward,
      amount: rewardPerDay,
    })
    const newAPR = (totalReward / liquidity) * 365
    return setAPR(newAPR)
  }, [getTotalValue, liquidity])

  useEffect(() => {
    calcAPR()
  }, [calcAPR])

  return apr
}
