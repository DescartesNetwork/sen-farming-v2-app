import { useCallback, useEffect, useState } from 'react'

import { useDebtData } from 'hooks/debt/useDebtData'

import { MetadataDataType } from 'lib/metaplex'
import configs from 'configs'
import { PRECISION } from 'constant'

export const useNFTStaked = (farmAddress: string) => {
  const debtData = useDebtData(farmAddress)
  const [stakedNFTs, setStakedNFTs] = useState<MetadataDataType[]>([])

  const getListNFTs = useCallback(async () => {
    if (!debtData?.leverage || debtData.leverage.eq(PRECISION))
      return setStakedNFTs([])
    const PDAs = await window.senFarming.deriveAllPDAs({ farm: farmAddress })
    const nfts = await configs.sol.metaplexNFT.findDataByOwner(
      PDAs.debtTreasurer.toBase58(),
    )

    return setStakedNFTs(nfts)
  }, [debtData?.leverage, farmAddress])

  useEffect(() => {
    getListNFTs()
  }, [getListNFTs])

  return stakedNFTs
}
