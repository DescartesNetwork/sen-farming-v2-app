import { useCallback, useState } from 'react'
import BN from 'bn.js'
import { notifyError, notifySuccess } from 'helper'

type StakeProps = {
  farm: string
  inAmount: BN
  nfts: string[]
}

export const useStake = () => {
  // To-do: Get data from redux
  const [loading, setLoading] = useState(false)

  const stake = useCallback(async ({ farm, inAmount, nfts }: StakeProps) => {
    try {
      setLoading(true)
      const { txId } = await window.senFarming.fullyStake({
        farm,
        inAmount,
        nfts,
      })
      notifySuccess('Stake', txId)
    } catch (error: any) {
      notifyError(error)
    } finally {
      setLoading(false)
    }
  }, [])

  return { stake, loading }
}
