import { useCallback, useEffect, useState } from 'react'
import { util } from '@sentre/senhub'

import { useConvertRewards } from 'hooks/useConvertRewards'
import { useGetTotalValue } from 'hooks/useGetPrice'

const TotalPendingReward = ({ farmAddress }: { farmAddress: string }) => {
  const [totalRewards, setTotalRewards] = useState(0)
  const convertRewards = useConvertRewards(farmAddress, 1000)
  const getTotalValue = useGetTotalValue()

  const updateTotalRewards = useCallback(async () => {
    let totalRewards = 0
    await Promise.all(
      convertRewards.map(async (reward) => {
        const totalValue = await getTotalValue(reward.mint, reward.amount)
        totalRewards += totalValue
      }),
    )
    return setTotalRewards(totalRewards)
  }, [convertRewards, getTotalValue])
  useEffect(() => {
    updateTotalRewards()
  }, [updateTotalRewards])

  return <span>{util.numeric(totalRewards).format('$0,0.[00]')}</span>
}

export default TotalPendingReward
