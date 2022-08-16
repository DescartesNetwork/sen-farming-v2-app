import { useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import { useAllFarmLiquidity } from './useAllFarmLiquidity'
import { useAllFarmAPR } from './useAllFarmAPR'
import { AppState } from 'model'

export const useSortFarms = (sourceFarms: string[]) => {
  const sort = useSelector((state: AppState) => state.main.sort)
  const [sortedFarms, setSortedFarms] = useState<string[]>([])
  const farmLiquidities = useAllFarmLiquidity()
  const { roiList } = useAllFarmAPR()

  const sortFarm = useCallback(async () => {
    if (!Object.keys(sort).length) return setSortedFarms(sourceFarms)
    if (!!sort['liquidity'])
      sourceFarms.sort((a, b) =>
        sort['liquidity'] === 'ADS'
          ? farmLiquidities[a] - farmLiquidities[b]
          : farmLiquidities[b] - farmLiquidities[a],
      )

    if (!!sort['apr'])
      sourceFarms.sort((a, b) =>
        sort['apr'] === 'ADS'
          ? roiList[a] - roiList[b]
          : roiList[b] - roiList[a],
      )

    return setSortedFarms(sourceFarms)
  }, [farmLiquidities, roiList, sort, sourceFarms])

  useEffect(() => {
    sortFarm()
  }, [sortFarm])

  return sortedFarms
}
