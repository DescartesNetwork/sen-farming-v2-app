import { useMemo } from 'react'
import { utilsBN } from '@sen-use/web3'
import { BN } from '@project-serum/anchor'
import { useWalletBalance } from '@sentre/senhub'
import { NATIVE_MINT } from '@solana/spl-token-v3'

import { SOL_DECIMALS } from 'constant'
import { useAccountBalanceByMintAddress } from './useAccountBalance'

export const useWrapAccountBalance = (mintAddress: string) => {
  const lamports = useWalletBalance()

  const balance = useAccountBalanceByMintAddress(mintAddress)
  const wsol = useAccountBalanceByMintAddress(NATIVE_MINT.toBase58())

  const totalSolBalance = useMemo(() => {
    const total = wsol.amount.add(new BN(lamports))
    const totalBalance = Number(utilsBN.undecimalize(total, SOL_DECIMALS))
    return { balance: totalBalance, amount: total }
  }, [lamports, wsol.amount])

  return mintAddress === NATIVE_MINT.toBase58() ? totalSolBalance : balance
}
