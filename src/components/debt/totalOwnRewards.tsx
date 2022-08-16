import { Fragment, memo, useCallback, useMemo } from 'react'
import { useSelector } from 'react-redux'
import { useWalletAddress, util } from '@sentre/senhub'
import { useMap, useThrottle } from 'react-use'

import { useConvertRewards } from 'hooks/useConvertRewards'
import { useGetTotalValue } from 'hooks/useGetPrice'
import { AppState } from 'model'

const TotalOwnRewards = () => {
  const debts = useSelector((state: AppState) => state.debts)
  const [map, { set }] = useMap<{ [x: string]: number }>({})
  const walletAddress = useWalletAddress()

  const filteredDebts = useMemo(() => {
    return Object.values(debts).filter((debt) => {
      if (debt.authority.toBase58() !== walletAddress || debt.shares.isZero())
        return false
      return true
    })
  }, [debts, walletAddress])

  const totalRewards = Object.values(map).reduce((sum, a) => sum + a, 0)
  const loaded = Object.values(map).length === filteredDebts.length

  return (
    <span>
      {util.numeric(totalRewards).format('$0,0.[00000]')}
      {/* Sum  rewards*/}
      {filteredDebts.map((debt) => (
        <RewardTracking
          farmAddress={debt.farm.toBase58()}
          upset={set}
          msReload={!loaded || !totalRewards ? 300 : 5000}
        />
      ))}
    </span>
  )
}

export default memo(TotalOwnRewards)

const RewardTracking = memo(
  ({
    farmAddress,
    upset,
    msReload,
  }: {
    farmAddress: string
    msReload: number
    upset: (farm: string, value: number) => void
  }) => {
    const convertRewards = useConvertRewards(farmAddress, msReload)
    const getTotalValue = useGetTotalValue()

    const updateTotalRewards = useCallback(async () => {
      let totalRewards = 0
      await Promise.all(
        convertRewards.map(async (reward) => {
          const totalValue = await getTotalValue(reward.mint, reward.amount)
          totalRewards += totalValue
        }),
      )
      return upset(farmAddress, totalRewards)
    }, [convertRewards, farmAddress, getTotalValue, upset])
    useThrottle(updateTotalRewards, msReload)

    return <Fragment />
  },
)
