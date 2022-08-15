import { memo } from 'react'
import { Address } from '@project-serum/anchor'
import { util } from '@sentre/senhub'

import { usePrice } from 'hooks/useGetPrice'

const MintPrice = ({
  mintAddress,
  format = '$0,0.[0000]',
}: {
  mintAddress: Address
  format?: string
}) => {
  const price = usePrice(mintAddress.toString())

  return <span>{util.numeric(price).format(format)}</span>
}
export default memo(MintPrice)
