import { useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import { useGetTotalValue } from 'hooks/useGetPrice'
import { AppState } from 'model'

export const useAllFarmLiquidity = () => {
  const farms = useSelector((state: AppState) => state.farms)
  const [liquidities, setLiquidities] = useState<Record<string, number>>({})
  const getTotalValue = useGetTotalValue()

  const updateLiquidities = useCallback(async () => {
    const newLiquidities: Record<string, number> = {}
    await Promise.all(
      Object.keys(farms).map(async (farmAddress) => {
        const { inputMint, totalShares } = farms[farmAddress]
        const liquidity = await getTotalValue(inputMint.toString(), totalShares)
        newLiquidities[farmAddress] = liquidity
      }),
    )
    return setLiquidities(newLiquidities)
  }, [farms, getTotalValue])

  useEffect(() => {
    updateLiquidities()
  }, [updateLiquidities])

  return liquidities
}
