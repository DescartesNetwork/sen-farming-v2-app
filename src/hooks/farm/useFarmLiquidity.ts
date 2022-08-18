import { useGetTotalValue } from 'hooks/useGetPrice'

import { useCallback, useEffect, useState } from 'react'
import { useFarmData } from './useFarmData'

export const useFarmLiquidity = (farmAddress: string) => {
  const [liquidity, setLiquidity] = useState(0)
  const { inputMint, totalShares } = useFarmData(farmAddress)
  const getTotalValue = useGetTotalValue()

  const updateLiquidity = useCallback(async () => {
    const liquidity = await getTotalValue(inputMint.toString(), totalShares)
    return setLiquidity(liquidity)
  }, [getTotalValue, inputMint, totalShares])

  useEffect(() => {
    updateLiquidity()
  }, [updateLiquidity])

  return liquidity
}
