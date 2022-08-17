import { useDispatch } from 'react-redux'
import { useCallback } from 'react'
import { useWalletAddress } from '@sentre/senhub'
import { FarmData } from '@sentre/farming'

import { FarmState, getFarms } from 'model/farms.controller'
import { getRewards, RewardState } from 'model/rewards.controller'
import { DebtState, getDebts } from 'model/debts.controller'
import { BoostingState, getBoosts } from 'model/boosting.controller'
import { AppDispatch } from 'model'
import { FarmTab } from 'constant'

function checkActiveFarm(farmAddress: string, rewards: RewardState) {
  for (const reward of Object.values(rewards)) {
    if (reward.farm.toBase58() === farmAddress) return true
  }
  return false
}

function checkStakedFarm(
  farmAddress: string,
  walletAddress: string,
  debts: DebtState,
) {
  for (const debt of Object.values(debts)) {
    if (debt.authority.toBase58() !== walletAddress) continue
    if (debt.farm.toBase58() !== farmAddress) continue
    return !debt.shares.isZero()
  }
  return false
}

function checkYourFarm(farmData: FarmData, walletAddress: string) {
  return farmData.authority.toBase58() === walletAddress
}

function checkBoostFarm(farmAddress: string, boosts: BoostingState) {
  for (const boostingData of Object.values(boosts)) {
    if (boostingData.farm.toBase58() === farmAddress) return true
  }
  return false
}

function checkFinishedFarm(farmData: FarmData) {
  return new Date().getTime() / 1000 > farmData.endDate.toNumber()
}

function checkUpcomingFarm(farmData: FarmData) {
  return Date.now() / 1000 < farmData.startDate.toNumber()
}

export const useFilterFarms = () => {
  const dispatch = useDispatch<AppDispatch>()
  const walletAddress = useWalletAddress()

  const filterFarms = useCallback(
    async (boostOnly: boolean, farmTab: FarmTab) => {
      let farms = await dispatch(getFarms()).unwrap()
      const debts = await dispatch(getDebts()).unwrap()
      const boosting = await dispatch(getBoosts()).unwrap()
      const rewards = await dispatch(getRewards()).unwrap()

      let filteredFarms: string[] = Object.keys(farms).filter((farmAddress) => {
        const farmData = farms[farmAddress]
        if (!checkActiveFarm(farmAddress, rewards)) return false
        if (boostOnly && !checkBoostFarm(farmAddress, boosting)) return false
        // todo check boost
        switch (farmTab) {
          case FarmTab.Staked:
            return checkStakedFarm(farmAddress, walletAddress, debts)
          case FarmTab.Your:
            return checkYourFarm(farms[farmAddress], walletAddress)
          case FarmTab.Expired:
            return checkFinishedFarm(farmData)
          case FarmTab.Upcoming:
            return checkUpcomingFarm(farmData)
          case FarmTab.All:
            return !checkFinishedFarm(farmData)
          default:
            return false
        }
      })
      const filteredFarmsState: FarmState = {}
      for (const farmAddress of filteredFarms) {
        filteredFarmsState[farmAddress] = farms[farmAddress]
      }
      return filteredFarmsState
    },
    [dispatch, walletAddress],
  )

  return filterFarms
}
