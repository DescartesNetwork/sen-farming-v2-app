import { web3 } from '@project-serum/anchor'
import { useCallback, useState } from 'react'

import { notifyError, notifySuccess } from 'helper'

export const useHarvest = (farmAddress: string) => {
  // To-do: Get data from redux
  const [loading, setLoading] = useState(false)

  const harvest = useCallback(async () => {
    try {
      setLoading(true)
      const txClaimAll = new web3.Transaction()
      // Unstake
      const { tx: txUnstake } = await window.senFarming.unstake({
        farm: farmAddress,
        sendAndConfirm: false,
      })
      txClaimAll.add(txUnstake)
      // Stake
      const { tx: txStake } = await window.senFarming.stake({
        farm: farmAddress,
        sendAndConfirm: false,
      })
      txClaimAll.add(txStake)
      // Claim
      const { tx: txClaim } = await window.senFarming.claim({
        farm: farmAddress,
        sendAndConfirm: false,
      })
      txClaimAll.add(txClaim)

      // Convert
      const { tx: txConvert } = await window.senFarming.convertRewards({
        farm: farmAddress,
        sendAndConfirm: false,
      })

      const provider = window.senFarming.provider
      const txId = await provider.sendAll([
        { tx: txClaimAll },
        { tx: txConvert },
      ])
      notifySuccess('Harvested', txId[1])
    } catch (error: any) {
      notifyError(error)
    } finally {
      setLoading(false)
    }
  }, [farmAddress])

  return { harvest, loading }
}
