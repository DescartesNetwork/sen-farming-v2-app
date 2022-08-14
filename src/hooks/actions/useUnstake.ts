import { useCallback, useState } from 'react'
import { web3 } from '@project-serum/anchor'
import { utilsBN } from '@sen-use/web3'
import { useMintDecimals } from '@sentre/senhub'

import { notifyError, notifySuccess } from 'helper'
import { useDebtData } from 'hooks/debt/useDebtData'
import { useFarmData } from 'hooks/farm/useFarmData'

export const useUnstake = (farmAddress: string) => {
  const [loading, setLoading] = useState(false)
  const debtData = useDebtData(farmAddress)
  const farmData = useFarmData(farmAddress)
  const decimals = useMintDecimals({
    mintAddress: farmData?.inputMint.toBase58(),
  })

  const unstake = useCallback(
    async ({ amount }: { amount: number }) => {
      try {
        setLoading(true)
        // Validate
        if (!decimals) throw new Error('Not find mint decimals')
        const amountBN = utilsBN.decimalize(amount, decimals)

        const transaction = new web3.Transaction()
        // Unstake all
        const { tx: txUnstake } = await window.senFarming.unstake({
          farm: farmAddress,
          sendAndConfirm: false,
        })
        transaction.add(txUnstake)
        // Withdraw all
        const { tx: txWithdraw } = await window.senFarming.withdraw({
          farm: farmAddress,
          sendAndConfirm: false,
        })
        transaction.add(txWithdraw)
        // Deposit
        const { tx: txDeposit } = await window.senFarming.deposit({
          farm: farmAddress,
          inAmount: debtData.shares.sub(amountBN),
          sendAndConfirm: false,
        })
        transaction.add(txDeposit)
        // Stake
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
    [debtData, decimals, farmAddress],
  )

  return { unstake, loading }
}
