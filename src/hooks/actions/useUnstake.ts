import { useCallback, useState } from 'react'
import { web3 } from '@project-serum/anchor'
import { utilsBN } from '@sen-use/web3'
import { useMintDecimals } from '@sentre/senhub'

import { notifyError, notifySuccess } from 'helper'
import { useFarmData } from 'hooks/farm/useFarmData'
import { useDebtData } from 'hooks/debt/useDebtData'
import { useWrapAndUnwrapSolIfNeed } from 'hooks/useWrapAndUnwrapSolIfNeed'
import { PRECISION } from 'constant'

export const useUnstake = (farmAddress: string) => {
  const [loading, setLoading] = useState(false)
  const farmData = useFarmData(farmAddress)
  const debtData = useDebtData(farmAddress)
  const { createUnWrapSolTxIfNeed } = useWrapAndUnwrapSolIfNeed()

  const decimals = useMintDecimals({
    mintAddress: farmData?.inputMint.toBase58(),
  })

  const unstake = useCallback(
    async ({ amount }: { amount: number }) => {
      try {
        setLoading(true)
        // Validate
        if (!decimals) throw new Error('Not find mint decimals')
        if (!debtData) return

        const amountBN = utilsBN
          .decimalize(amount, decimals)
          .mul(debtData.leverage)
          .div(PRECISION)

        const transaction = new web3.Transaction()
        // Unstake all
        const { tx: txUnstake } = await window.senFarming.unstake({
          farm: farmAddress,
          sendAndConfirm: false,
        })
        transaction.add(txUnstake)
        // Withdraw
        const { tx: txWithdraw } = await window.senFarming.withdraw({
          farm: farmAddress,
          shares: amountBN,
          sendAndConfirm: false,
        })
        transaction.add(txWithdraw)

        // UnWrapsol
        const wrapSolTx = await createUnWrapSolTxIfNeed(
          farmData?.inputMint.toBase58(),
        )
        if (wrapSolTx) transaction.add(wrapSolTx)
        // Stake all
        const { tx: txStake } = await window.senFarming.stake({
          farm: farmAddress,
          sendAndConfirm: false,
        })
        transaction.add(txStake)

        const provider = window.senFarming.provider
        const txId = await provider.sendAndConfirm(transaction)
        notifySuccess('Unstake', txId)
      } catch (error: any) {
        notifyError(error)
      } finally {
        setLoading(false)
      }
    },
    [
      createUnWrapSolTxIfNeed,
      debtData,
      decimals,
      farmAddress,
      farmData?.inputMint,
    ],
  )

  return { unstake, loading }
}
