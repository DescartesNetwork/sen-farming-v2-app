import { useDebounce } from 'react-use'
import { useCallback, useState } from 'react'

import { useGetTotalValue } from '@sen-use/app'
import { useSelector } from 'react-redux'
import { AppState } from 'model'

export const useAllFarmTotalValue = () => {
  const farms = useSelector((state: AppState) => state.farms)
  const [tvl, setTvl] = useState(0)
  const getTotalValue = useGetTotalValue()

  const updateLiquidity = useCallback(async () => {
    let tvl = 0
    await Promise.all(
      Object.values(farms).map(async ({ totalShares, inputMint }) => {
        if (totalShares.isZero()) return
        const liquidity = await getTotalValue(inputMint.toString(), totalShares)
        tvl += liquidity
      }),
    )
    return setTvl(tvl)
  }, [farms, getTotalValue])
  useDebounce(updateLiquidity, 500, [updateLiquidity])

  return tvl
}
