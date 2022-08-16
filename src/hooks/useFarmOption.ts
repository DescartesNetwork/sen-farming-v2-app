import { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { useWalletAddress } from '@sentre/senhub'

import { FARM_OPTION } from 'constant'
import { AppState } from 'model'
import { BN } from 'bn.js'

type FarmOption = {
  label: string
  value: string
}

export const useFarmOption = () => {
  const farms = useSelector((state: AppState) => state.farms)
  const debts = useSelector((state: AppState) => state.debts)
  const walletAddress = useWalletAddress()

  const farmingOptions: FarmOption[] = useMemo(() => {
    const options: FarmOption[] = []
    const rewardableFarms = Object.keys(farms).filter((val) =>
      farms[val].totalRewards.gt(new BN(0)),
    )
    for (const key in FARM_OPTION) {
      let farmAmount = 0
      switch (key) {
        case 'staked': {
          const yourStaking = Object.values(debts).filter(
            (val) =>
              val.authority.toBase58() === walletAddress &&
              !!val.shares &&
              !val.shares.isZero(),
          )
          const yourRewardableStaking = yourStaking.filter((val) =>
            rewardableFarms.includes(val.farm.toBase58()),
          )
          farmAmount = yourRewardableStaking.length
          break
        }
        case 'your': {
          const yourFarm = rewardableFarms.filter(
            (val) => farms[val].authority.toBase58() === walletAddress,
          )
          farmAmount = yourFarm.length
          break
        }
        case 'finished': {
          const endFarm = rewardableFarms.filter((val) =>
            farms[val].endDate
              .sub(new BN(new Date().getTime() / 1000))
              .lte(new BN(0)),
          )
          farmAmount = endFarm.length
          break
        }
        default:
          farmAmount = Object.keys(rewardableFarms).length
          break
      }

      const option: FarmOption = {
        label: `${FARM_OPTION[key]} (${farmAmount})`,
        value: key,
      }
      options.push(option)
    }
    return options
  }, [debts, farms, walletAddress])

  return { farmingOptions }
}
