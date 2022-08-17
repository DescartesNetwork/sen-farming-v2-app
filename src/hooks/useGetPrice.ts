import { useCallback, useEffect, useState } from 'react'
import { tokenProvider, useGetMintDecimals, util } from '@sentre/senhub'
import { Address, BN } from '@project-serum/anchor'
import { utilsBN } from '@sen-use/web3/dist'

const ERRORS: Record<string, boolean> = {}

export const useGetTotalValue = () => {
  const getMintDecimals = useGetMintDecimals()
  const getPrice = useGetPrice()

  const getTotalValue = useCallback(
    async (mintAddress: Address, amountBN: BN): Promise<number> => {
      try {
        const price = await getPrice(mintAddress)
        if (!price) return 0
        const decimals = await getMintDecimals({
          mintAddress: mintAddress.toString(),
        })
        const amount = utilsBN.undecimalize(amountBN, decimals || 0)
        return Number(amount) * price
      } catch (error) {
        return 0
      }
    },
    [getMintDecimals, getPrice],
  )

  return getTotalValue
}

export const useGetPrice = () => {
  const getPrice = useCallback(
    async (mintAddress: Address): Promise<number> => {
      if (ERRORS[mintAddress.toString()]) return 0
      try {
        const token = await tokenProvider.findByAddress(mintAddress)
        const ticket = token?.extensions?.coingeckoId
        const cgkData = await util.fetchCGK(ticket)
        return cgkData.price
      } catch (error) {
        ERRORS[mintAddress.toString()] = true
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

export const useTotalValue = (mintAddress: string, amountBN: BN) => {
  const [totalValue, setTotalValue] = useState(0)
  const getTotalValue = useGetTotalValue()

  const updateTotalValue = useCallback(async () => {
    const totalValue = await getTotalValue(mintAddress, amountBN)
    return setTotalValue(totalValue)
  }, [amountBN, getTotalValue, mintAddress])

  useEffect(() => {
    updateTotalValue()
  }, [updateTotalValue])

  return totalValue
}
