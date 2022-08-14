import { useCallback, useEffect, useState } from 'react'

export const useFarmLiquidity = (farmAddress: string) => {
  const [liquidity, setLiquidity] = useState(0)

  const calcLiquidity = useCallback(async () => {
    if (!farmAddress) return setLiquidity(0)
    return setLiquidity(Math.random() * 1000)
  }, [farmAddress])

  useEffect(() => {
    calcLiquidity()
  }, [calcLiquidity])

  return liquidity
}
