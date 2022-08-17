import { useCallback } from 'react'

import { useGetTotalValue } from 'hooks/useGetPrice'
import { FarmState } from 'model/farms.controller'

export const useGetAllFarmLiquidity = () => {
  const getTotalValue = useGetTotalValue()

  const getAllFarmLiquidity = useCallback(
    async (farms: FarmState) => {
      const newLiquidities: Record<string, number> = {}
      await Promise.all(
        Object.keys(farms).map(async (farmAddress) => {
          const { inputMint, totalShares } = farms[farmAddress]
          const liquidity = await getTotalValue(
            inputMint.toString(),
            totalShares,
          )
          newLiquidities[farmAddress] = liquidity
        }),
      )
      return newLiquidities
    },
    [getTotalValue],
  )

  return getAllFarmLiquidity
}
