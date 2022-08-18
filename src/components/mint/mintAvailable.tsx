import { memo } from 'react'
import { Address } from '@project-serum/anchor'
import { MintAmount } from '@sen-use/app'
import { useAccountBalanceByMintAddress } from 'hooks/useAccountBalance'

const MintAvailable = ({
  mintAddress,
  format = '0,0.[0000]',
}: {
  mintAddress: Address
  format?: string
}) => {
  const { amount } = useAccountBalanceByMintAddress(mintAddress.toString())
  return (
    <MintAmount mintAddress={mintAddress} amount={amount} formatter={format} />
  )
}

export default memo(MintAvailable)
