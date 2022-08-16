import { useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useWalletAddress } from '@sentre/senhub'

import { AppState } from 'model'
import BN from 'bn.js'

const useFilterFarm = () => {
  const { boostOnly, farmTab } = useSelector((state: AppState) => state.main)
  const farms = useSelector((state: AppState) => state.farms)
  const boosting = useSelector((state: AppState) => state.boosting)
  const debts = useSelector((state: AppState) => state.debts)
  const [filteredFarm, setFilteredFarm] = useState<string[]>([])
  const walletAddress = useWalletAddress()

  const filterFarm = useCallback(async () => {
    let newFilteredFarms: string[] = []
    const rewardableFarms = Object.keys(farms).filter((val) =>
      farms[val].totalRewards.gt(new BN(0)),
    )
    switch (farmTab) {
      case 'staked': {
        const stakedFarm = Object.values(debts)
          .filter(
            (val) =>
              val.authority.toBase58() === walletAddress &&
              !!val.shares &&
              !val.shares.isZero(),
          )
          .map((val) => val.farm.toBase58())

        newFilteredFarms = stakedFarm.filter((val) =>
          rewardableFarms.includes(val),
        )
        break
      }
      case 'your': {
        newFilteredFarms = rewardableFarms.filter(
          (val) => farms[val].authority.toBase58() === walletAddress,
        )
        break
      }
      case 'finished': {
        newFilteredFarms = rewardableFarms.filter((val) =>
          farms[val].endDate
            .sub(new BN(new Date().getTime() / 1000))
            .lte(new BN(0)),
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
      return setFilteredFarm(
        boostFarm.filter((val) => newFilteredFarms.includes(val)),
      )
    }
    setFilteredFarm(newFilteredFarms)
  }, [boostOnly, boosting, debts, farmTab, farms, walletAddress])

  useEffect(() => {
    filterFarm()
  }, [filterFarm])

  return filteredFarm
}

export default useFilterFarm
