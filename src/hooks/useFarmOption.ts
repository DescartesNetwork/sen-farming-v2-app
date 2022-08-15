import { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { useWalletAddress } from '@sentre/senhub'

import { FARM_OPTION } from 'constant'
import { AppState } from 'model'

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
    for (const key in FARM_OPTION) {
      let farmAmount = 0
      switch (key) {
        case 'all': {
          farmAmount = Object.keys(farms).length
          break
        }
        case 'sentre': {
          // To-do: Filter later
          break
        }
        case 'staked': {
          const yourStaking = Object.values(debts).filter(
            (val) =>
              val.authority.toBase58() === walletAddress &&
              !!val.shares &&
              !val.shares.isZero(),
          )
          farmAmount = yourStaking.length
          break
        }
        case 'your': {
          const yourFarm = Object.values(farms).filter(
            (val) => val.authority.toBase58() === walletAddress,
          )
          farmAmount = yourFarm.length
          break
        }
        default:
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
