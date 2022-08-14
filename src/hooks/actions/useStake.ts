import { useCallback, useState } from 'react'
import { useMintDecimals } from '@sentre/senhub'
import { web3 } from '@project-serum/anchor'

import { notifyError, notifySuccess } from 'helper'
import { useDebtData } from 'hooks/useDebt'
import { useFarmData } from 'hooks/farm/useFarmData'
import { utilsBN } from '@sen-use/web3/dist'

type StakeProps = {
  farm: string
  inAmount: number
  nfts: string[]
}

export const useStake = (farmAddress: string) => {
  const [loading, setLoading] = useState(false)
  const debtData = useDebtData(farmAddress)
  const farmData = useFarmData(farmAddress)
  const decimals = useMintDecimals({
    mintAddress: farmData?.inputMint.toBase58(),
  })

  const stake = useCallback(
    async ({ inAmount, nfts }: StakeProps) => {
      try {
        setLoading(true)
        // Validate
        if (!decimals) throw new Error('Not find mint decimals')
        const transaction = new web3.Transaction()
        // Initialize debt if needed
        if (!debtData) {
          const { tx } = await window.senFarming.initializeDebt({
            farm: farmAddress,
            sendAndConfirm: false,
          })
          transaction.add(tx)
        }
        // Unstake and withdraw if needed
        if (!debtData?.shares.isZero()) {
          const { tx } = await window.senFarming.unstake({
            farm: farmAddress,
            sendAndConfirm: false,
          })
          transaction.add(tx)
        }
        // Calc amountBN deposit
        const amountBN = utilsBN.decimalize(inAmount, decimals)
        // Deposit
        const { tx: txDeposit } = await window.senFarming.deposit({
          farm: farmAddress,
          inAmount: amountBN,
          sendAndConfirm: false,
        })
        transaction.add(txDeposit)
        // TODO: Stake

        const provider = window.senFarming.provider
        const txId = await provider.sendAndConfirm(transaction)
        notifySuccess('Stake', txId)
      } catch (error: any) {
        notifyError(error)
      } finally {
        setLoading(false)
      }
    },
    [debtData, decimals, farmAddress],
  )

  return { stake, loading }
}
