import { useCallback } from 'react'
import { useDispatch } from 'react-redux'

import { useGetAllFarmLiquidity } from './useGetAllFarmLiquidity'
import { useGetAllFarmApr } from './useGetAllFarmApr'

import { AppDispatch } from 'model'
import { getRewards } from 'model/rewards.controller'
import { SortDirection, SortType } from 'model/main.controller'
import { FarmState } from 'model/farms.controller'

export const useSortFarms = () => {
  const dispatch = useDispatch<AppDispatch>()
  const getAllFarmLiquidity = useGetAllFarmLiquidity()
  const getAllFarmApr = useGetAllFarmApr()

  const sortFarms = useCallback(
    async (farms: FarmState, sortType: Record<SortType, SortDirection>) => {
      let listFarms = Object.keys(farms)
      if (sortType.liquidity !== SortDirection.null) {
        const allLiquidity = await getAllFarmLiquidity(farms)
        listFarms = listFarms.sort((a, b) =>
          sortType.liquidity === SortDirection.ASC
            ? allLiquidity[b] - allLiquidity[a]
            : allLiquidity[a] - allLiquidity[b],
        )
      }
      if (sortType.apr !== SortDirection.null) {
        const rewards = await dispatch(getRewards()).unwrap()
        const allApr = await getAllFarmApr(farms, rewards)
        listFarms = listFarms.sort((a, b) =>
          sortType.apr === SortDirection.ASC
            ? allApr[b] - allApr[a]
            : allApr[a] - allApr[b],
        )
      }
      return listFarms
    },
    [dispatch, getAllFarmApr, getAllFarmLiquidity],
  )

  return sortFarms
}
