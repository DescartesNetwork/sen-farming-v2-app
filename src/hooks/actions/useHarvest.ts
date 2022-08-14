import { web3 } from '@project-serum/anchor'
import { useCallback, useState } from 'react'

import { notifyError, notifySuccess } from 'helper'

export const useHarvest = (farmAddress: string) => {
  // To-do: Get data from redux
  const [loading, setLoading] = useState(false)

  const harvest = useCallback(async () => {
    try {
      setLoading(true)
      const transaction = new web3.Transaction()
      // Unstake
      const { tx: txUnstake } = await window.senFarming.unstake({
        farm: farmAddress,
        sendAndConfirm: false,
      })
      transaction.add(txUnstake)
      // Stake
      const { tx: txStake } = await window.senFarming.stake({
        farm: farmAddress,
        sendAndConfirm: false,
      })
      transaction.add(txStake)
      // Claim
      const { tx: txClaim } = await window.senFarming.claim({
        farm: farmAddress,
        sendAndConfirm: false,
      })
      transaction.add(txClaim)
      // Convert
      const provider = window.senFarming.provider
      const txId = await provider.sendAndConfirm(transaction)
      notifySuccess('Harvested', txId)
    } catch (error: any) {
      notifyError(error)
    } finally {
      setLoading(false)
    }
  }, [farmAddress])

  return { harvest, loading }
}
