import { useMemo } from 'react'
import { BN } from '@project-serum/anchor'

import { useNFTStaked } from './useNFTStaked'
import { useFarmBoosting } from 'hooks/farm/useFarmBoosting'

export const useTotalBoosted = (farmAddress: string) => {
  const stakedNFTs = useNFTStaked(farmAddress)
  const farmBoostingData = useFarmBoosting(farmAddress)

  const totalPercentBoosted = useMemo(() => {
    let totalPercent = new BN(0)
    if (!stakedNFTs.length) return totalPercent
    const percentNFT: Record<string, BN> = {}

    for (const farmData of farmBoostingData) {
      const { boostingCollection, boostingCoefficient } = farmData
      percentNFT[boostingCollection.toBase58()] = boostingCoefficient
    }

    for (const { collection } of stakedNFTs) {
      if (!collection || !percentNFT[collection.key]) continue
      const percent = percentNFT[collection.key]
      totalPercent = totalPercent.add(percent)
    }
    return totalPercent
  }, [farmBoostingData, stakedNFTs])

  return totalPercentBoosted
}
