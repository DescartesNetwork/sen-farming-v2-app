import { useCallback } from 'react'
import { BN } from '@project-serum/anchor'

import { useFarmBoosting } from '../farm/useFarmBoosting'

import configs from 'configs'

export const useGetListBoostRate = (farmAddress: string) => {
  const farmBoostingData = useFarmBoosting(farmAddress)

  const getBoostRateList = useCallback(
    async (mintAddresses: string[]) => {
      const percentCollections: Record<string, BN> = {}
      const percentNFT: Record<string, BN> = {}

      for (const farmData of farmBoostingData) {
        const { boostingCollection, boostingCoefficient } = farmData
        percentCollections[boostingCollection.toBase58()] = boostingCoefficient
      }
      for (const mintAddress of mintAddresses) {
        const {
          data: { collection },
        } = await configs.sol.metaplexNFT.getNftMetadata(mintAddress)
        if (!collection || !percentCollections[collection.key]) continue
        const percent = percentCollections[collection.key]
        percentNFT[mintAddress] = percent
      }
      return percentNFT
    },
    [farmBoostingData],
  )

  return getBoostRateList
}
