import { CSSProperties, useCallback, useEffect, useState } from 'react'
import { Address } from '@project-serum/anchor'
import { MintAvatar, MintSymbol, useGetMintPrice } from '@sen-use/app'

import { Space, Typography } from 'antd'
import { util } from '@sentre/senhub'

const MintPrice = ({
  mintAddress,
  format = '$0,0.[0000]',
}: {
  mintAddress: Address
  format?: string
}) => {
  const [price, setPrice] = useState('$0')
  const getMintPrice = useGetMintPrice()

  const updateMintPrice = useCallback(async () => {
    const price = await getMintPrice(mintAddress)
    return setPrice(util.numeric(price).format(format))
  }, [format, mintAddress, getMintPrice])
  useEffect(() => {
    updateMintPrice()
  }, [updateMintPrice])

  return <span>{util.numeric(price).format(format)}</span>
}

type MintAvatarPriceProps = {
  mintAddress: string
  size?: number
  style?: CSSProperties
}
const MintAvatarPrice = ({
  mintAddress,
  size = 32,
  style,
}: MintAvatarPriceProps) => {
  return (
    <Space>
      <MintAvatar mintAddress={mintAddress} size={size} />
      <Space direction="vertical" size={0}>
        <Typography.Text style={{ ...style }}>
          <MintSymbol mintAddress={mintAddress} />
        </Typography.Text>
        <Typography.Text type="secondary">
          <MintPrice mintAddress={mintAddress} format="0,0.[00]" />
        </Typography.Text>
      </Space>
    </Space>
  )
}

export default MintAvatarPrice
