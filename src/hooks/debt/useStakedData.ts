import { useMemo } from 'react'
import { BN } from '@project-serum/anchor'
import { useMintDecimals } from '@sentre/senhub'
import { utilsBN } from '@sen-use/web3'

import { useDebtData } from 'hooks/debt/useDebtData'
import { useFarmData } from 'hooks/farm/useFarmData'
// import { PRECISION } from 'constant'

export const useStakedData = (farmAddress: string) => {
  const debtData = useDebtData(farmAddress)
  const farmData = useFarmData(farmAddress)
  const decimals = useMintDecimals({
    mintAddress: farmData?.inputMint.toBase58(),
  })

  const stakedAmount = useMemo(() => {
    if (!debtData) return '0'
    return debtData.shares.toString()
    // return debtData.shares.mul(PRECISION).div(debtData.leverage).toString()
  }, [debtData])

  const farmShareAmount = useMemo(() => {
    return farmData.totalShares.toString()
  }, [farmData.totalShares])

  const result = useMemo(() => {
    const amountBN = new BN(stakedAmount)
    const amount = Number(utilsBN.undecimalize(amountBN, decimals || 0))
    // TODO: get price
    const ratio = Number(stakedAmount) / Number(farmShareAmount)
    return {
      amountBN,
      amount,
      ratio,
    }
  }, [decimals, farmShareAmount, stakedAmount])

  return result
}
