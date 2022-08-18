import { CSSProperties } from 'react'
import { MintAvatar, MintPrice, MintSymbol } from '@sen-use/app'

import { Space, Typography } from 'antd'

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
          <MintPrice mintAddress={mintAddress} format="0,0.[000]" />
        </Typography.Text>
      </Space>
    </Space>
  )
}

export default MintAvatarPrice
