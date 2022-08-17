import { useCallback, useEffect, useState } from 'react'
import {
  DataLoader,
  tokenProvider,
  useGetMintDecimals,
  util,
} from '@sentre/senhub'
import { Address, BN } from '@project-serum/anchor'
import { utilsBN } from '@sen-use/web3/dist'

const ERRORS_CGK: Record<string, boolean> = {}
const ERRORS_JUP: Record<string, boolean> = {}

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

const getJupiterPrice = async (mintAddress: string) => {
  const priceUrl = `https://quote-api.jup.ag/v1/quote?inputMint=EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v&outputMint=${mintAddress}&amount=1000000&slippage=1`
  const { data } = await DataLoader.load(
    'getJupiterPrice' + mintAddress,
    async () => (await fetch(priceUrl)).json(),
  )
  const token = await tokenProvider.findByAddress(mintAddress)
  const bestOutput = await utilsBN.undecimalize(
    new BN(data[0].outAmount),
    token?.decimals || 0,
  )
  return 1 / Number(bestOutput)
}

export const useGetPrice = () => {
  const getPrice = useCallback(
    async (mintAddress: Address): Promise<number> => {
      try {
        if (ERRORS_CGK[mintAddress.toString()]) throw new Error('')
        const token = await tokenProvider.findByAddress(mintAddress)
        const ticket = token?.extensions?.coingeckoId
        const cgkData = await util.fetchCGK(ticket)
        return cgkData.price
      } catch (error) {
        ERRORS_CGK[mintAddress.toString()] = true
        try {
          if (ERRORS_JUP[mintAddress.toString()]) throw new Error('')
          const price = await getJupiterPrice(mintAddress.toString())
          return price
        } catch (error) {
          ERRORS_JUP[mintAddress.toString()] = true
          return 0
        }
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
