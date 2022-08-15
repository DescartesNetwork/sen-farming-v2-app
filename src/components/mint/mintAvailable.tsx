import { memo } from 'react'
import { Address } from '@project-serum/anchor'
import { useAccountBalanceByMintAddress } from '@sen-use/app/dist'
import MintAmount from './mintAmount'

const MintAvailable = ({
  mintAddress,
  format = '0,0.[0000]',
}: {
  mintAddress: Address
  format?: string
}) => {
  const { amount } = useAccountBalanceByMintAddress(mintAddress.toString())
  return (
    <MintAmount mintAddress={mintAddress} amount={amount} format={format} />
  )
}

export default memo(MintAvailable)
