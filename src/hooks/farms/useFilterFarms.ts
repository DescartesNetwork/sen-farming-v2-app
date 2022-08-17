import { useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useDebounce } from 'react-use'
import { useWalletAddress } from '@sentre/senhub'

import { AppState } from 'model'
import { FarmTab } from 'constant'

const useFilterFarm = () => {
  const { boostOnly, farmTab } = useSelector((state: AppState) => state.main)
  const farms = useSelector((state: AppState) => state.farms)
  const rewards = useSelector((state: AppState) => state.rewards)
  const boosting = useSelector((state: AppState) => state.boosting)
  const debts = useSelector((state: AppState) => state.debts)
  const [filteredFarm, setFilteredFarm] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  const walletAddress = useWalletAddress()

  const checkActiveFarm = useCallback(
    (farmAddress: string) => {
      for (const reward of Object.values(rewards)) {
        if (reward.farm.toBase58() === farmAddress) return true
      }
      return false
    },
    [rewards],
  )

  const checkStakedFarm = useCallback(
    (farmAddress: string) => {
      for (const debt of Object.values(debts)) {
        if (debt.authority.toBase58() !== walletAddress) continue
        if (debt.farm.toBase58() !== farmAddress) continue
        return !debt.shares.isZero()
      }
      return false
    },
    [debts, walletAddress],
  )

  const checkYourFarm = useCallback(
    (farmAddress: string) => {
      const farmData = farms[farmAddress]
      return farmData.authority.toBase58() === walletAddress
    },
    [farms, walletAddress],
  )

  const checkBoostFarm = useCallback(
    (farmAddress: string) => {
      for (const boostingData of Object.values(boosting)) {
        if (boostingData.farm.toBase58() === farmAddress) return true
      }
      return false
    },
    [boosting],
  )

  const checkFinishedFarm = useCallback(
    (farmAddress: string) => {
      return new Date().getTime() / 1000 > farms[farmAddress].endDate.toNumber()
    },
    [farms],
  )

  const checkUpcomingFarm = useCallback(
    (farmAddress: string) => {
      return Date.now() / 1000 < farms[farmAddress].startDate.toNumber()
    },
    [farms],
  )

  const filterFarm = useCallback(async () => {
    let newFilteredFarms: string[] = Object.keys(farms).filter(
      (farmAddress) => {
        if (!checkActiveFarm(farmAddress)) return false
        if (boostOnly && !checkBoostFarm(farmAddress)) return false
        // todo check boost
        switch (farmTab) {
          case FarmTab.Staked:
            return checkStakedFarm(farmAddress)
          case FarmTab.Your:
            return checkYourFarm(farmAddress)
          case FarmTab.Expired:
            return checkFinishedFarm(farmAddress)
          case FarmTab.Upcoming:
            return checkUpcomingFarm(farmAddress)
          case FarmTab.All:
            return !checkFinishedFarm(farmAddress)
          default:
            return false
        }
      },
    )
    setFilteredFarm(newFilteredFarms)
    return setLoading(false)
  }, [
    boostOnly,
    checkActiveFarm,
    checkBoostFarm,
    checkFinishedFarm,
    checkStakedFarm,
    checkUpcomingFarm,
    checkYourFarm,
    farmTab,
    farms,
  ])
  useDebounce(filterFarm, 300, [filterFarm])
  useEffect(() => {
    setLoading(true)
  }, [filterFarm])

  return { loading, filteredFarm }
}

export default useFilterFarm
