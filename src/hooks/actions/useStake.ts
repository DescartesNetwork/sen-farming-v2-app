import { useCallback, useState } from 'react'
import { useMintDecimals } from '@sentre/senhub'
import { web3, BN } from '@project-serum/anchor'
import { utilsBN } from '@sen-use/web3'

import { useDebtData } from 'hooks/debt/useDebtData'
import { useFarmData } from 'hooks/farm/useFarmData'
import { useLock } from './useLock'

import { notifyError } from 'helper'
import { PRECISION } from 'constant'

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
  const onLockNFT = useLock(farmAddress)

  const stake = useCallback(
    async ({ inAmount, nfts }: StakeProps) => {
      try {
        setLoading(true)
        // Validate
        if (!decimals) throw new Error('Not find mint decimals')
        const listTxs: web3.Transaction[] = []
        const depositAmount = !debtData ? new BN(0) : debtData.shares
        const leverage = !debtData ? new BN(1) : debtData.leverage

        // Initialize debt if needed
        if (!debtData) {
          const { tx } = await window.senFarming.initializeDebt({
            farm: farmAddress,
            sendAndConfirm: false,
          })
          listTxs.push(tx)
        }

        // Unstake + Withdraw all
        const txUnstakeWithdraw = new web3.Transaction()
        const { tx: txUnstake } = await window.senFarming.unstake({
          farm: farmAddress,
          sendAndConfirm: false,
        })

        const { tx: txWithdraw } = await window.senFarming.withdraw({
          farm: farmAddress,
          shares: depositAmount,
          sendAndConfirm: false,
        })
        txUnstakeWithdraw.add(txUnstake)
        txUnstakeWithdraw.add(txWithdraw)

        if (nfts.length) {
          // Lock NFT
          for (const nft of nfts) {
            const txLockNft = await onLockNFT(nft)
            // listTxs.push(txLockNft)
            txUnstakeWithdraw.add(txLockNft)
          }
        }
        listTxs.push(txUnstakeWithdraw)

        // Calc amountBN deposit
        const amountBN = utilsBN.decimalize(inAmount, decimals)
        const oldAmount = depositAmount.mul(PRECISION).div(leverage)

        // Deposit + Stake
        const txDepositStake = new web3.Transaction()
        const { tx: txDeposit } = await window.senFarming.deposit({
          farm: farmAddress,
          inAmount: amountBN.add(oldAmount),
          sendAndConfirm: false,
        })
        const { tx: txStake } = await window.senFarming.stake({
          farm: farmAddress,
          sendAndConfirm: false,
        })
        txDepositStake.add(txDeposit)
        txDepositStake.add(txStake)
        listTxs.push(txDepositStake)

        const provider = window.senFarming.provider
        await provider.sendAll(
          listTxs.map((tx) => {
            return { tx }
          }),
        )
        return window.notify({
          type: 'success',
          description: 'Staked successfully.',
        })
      } catch (error: any) {
        return notifyError(error)
      } finally {
        setLoading(false)
      }
    },
    [debtData, decimals, farmAddress, onLockNFT],
  )

  return { stake, loading }
}
