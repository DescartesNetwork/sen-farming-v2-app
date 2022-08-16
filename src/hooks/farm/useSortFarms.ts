import { useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import { useAllFarmLiquidity } from './useAllFarmLiquidity'
import { useAllFarmAPR } from './useAllFarmAPR'
import { AppState } from 'model'
import { SortDirection } from 'model/main.controller'

export const useSortFarms = (sourceFarms: string[]) => {
  const sortType = useSelector((state: AppState) => state.main.sortType)
  const [sortedFarms, setSortedFarms] = useState<string[]>([])
  const farmLiquidities = useAllFarmLiquidity()
  const { roiList } = useAllFarmAPR()

  const sortFarm = useCallback(async () => {
    if (!Object.keys(sortType).length) return setSortedFarms(sourceFarms)
    if (sortType.liquidity !== SortDirection.null) {
      sourceFarms.sort((a, b) =>
        sortType.liquidity === SortDirection.ASC
          ? farmLiquidities[a] - farmLiquidities[b]
          : farmLiquidities[b] - farmLiquidities[a],
      )
    }

    if (sortType.apr !== SortDirection.null)
      sourceFarms.sort((a, b) =>
        sortType.apr === SortDirection.ASC
          ? roiList[a] - roiList[b]
          : roiList[b] - roiList[a],
      )

    return setSortedFarms(sourceFarms)
  }, [farmLiquidities, roiList, sortType, sourceFarms])

  useEffect(() => {
    sortFarm()
  }, [sortFarm])

  return sortedFarms
}
