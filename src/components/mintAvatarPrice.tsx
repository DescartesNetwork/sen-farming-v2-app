import { MintAvatar, MintSymbol } from '@sen-use/components'
import { util } from '@sentre/senhub'

import { Space, Typography } from 'antd'

import { usePrice } from 'hooks/useGetPrice'
import { CSSProperties } from 'react'

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
  const price = usePrice(mintAddress)

  return (
    <Space>
      <MintAvatar mintAddress={mintAddress} size={size} />
      <Space direction="vertical" size={0}>
        <Typography.Text style={{ ...style }}>
          <MintSymbol mintAddress={mintAddress} />
        </Typography.Text>
        <Typography.Text type="secondary">
          ${util.numeric(price).format('0,0.[00]')}
        </Typography.Text>
      </Space>
    </Space>
  )
}

export default MintAvatarPrice
