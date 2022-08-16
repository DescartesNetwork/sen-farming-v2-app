import { useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useWalletAddress } from '@sentre/senhub'

import { AppState } from 'model'

const useFilterFarm = () => {
  const { boostOnly, farmTab } = useSelector((state: AppState) => state.main)
  const farms = useSelector((state: AppState) => state.farms)
  const boosting = useSelector((state: AppState) => state.boosting)
  const debts = useSelector((state: AppState) => state.debts)
  const [filteredFarm, setFilteredFarm] = useState<string[]>([])
  const walletAddress = useWalletAddress()

  const filterFarm = useCallback(async () => {
    let newFilteredFarms: string[] = []
    switch (farmTab) {
      case 'sentre': {
        // To-do: Filter later
        newFilteredFarms = Object.keys(farms)
        break
      }
      case 'staked': {
        newFilteredFarms = Object.values(debts)
          .filter(
            (val) =>
              val.authority.toBase58() === walletAddress &&
              !!val.shares &&
              !val.shares.isZero(),
          )
          .map((val) => val.farm.toBase58())
        break
      }
      case 'your': {
        newFilteredFarms = Object.keys(farms).filter(
          (val) => farms[val].authority.toBase58() === walletAddress,
        )
        break
      }
      default:
        newFilteredFarms = Object.keys(farms)
        break
    }

    if (!!boostOnly) {
      const boostFarm = Object.values(boosting).map((val) =>
        val.farm.toBase58(),
      )
      setFilteredFarm(boostFarm.filter((val) => newFilteredFarms.includes(val)))
    }
    setFilteredFarm(newFilteredFarms)
  }, [boostOnly, boosting, debts, farmTab, farms, walletAddress])

  useEffect(() => {
    filterFarm()
  }, [filterFarm])

  return filteredFarm
}

export default useFilterFarm
