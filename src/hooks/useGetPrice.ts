import { useCallback, useEffect, useState } from 'react'
import { tokenProvider, util } from '@sentre/senhub'
import { Address } from '@project-serum/anchor'

export const useGetPrice = () => {
  const getPrice = useCallback(
    async (mintAddress: Address): Promise<number> => {
      try {
        const token = await tokenProvider.findByAddress(mintAddress)
        const ticket = token?.extensions?.coingeckoId
        const cgkData = await util.fetchCGK(ticket)
        return cgkData.price
      } catch (error) {
        return 0
      }
    },
    [],
  )

  return getPrice
}

export const usePrice = (mintAddress: string) => {
  const [price, setPrice] = useState<number>()
  const getPrice = useGetPrice()

  const updatePrice = useCallback(async () => {
    if (price !== undefined) return
    const mintPrice = await getPrice(mintAddress)
    setPrice(mintPrice)
  }, [getPrice, mintAddress, price])

  useEffect(() => {
    updatePrice()
  }, [updatePrice])

  return price || 0
}
