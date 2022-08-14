import { CSSProperties } from 'react'

import { MintAvatar, MintSymbol } from '@sen-use/components'
import IonIcon from '@sentre/antd-ionicon'
import { Space, Typography } from 'antd'

import { useFarmData } from 'hooks/farm/useFarmData'

type FarmAvatarProps = {
  farmAddress: string
  size?: number
  textStyle?: CSSProperties
  hoverable?: boolean
  spacing?: number
}
const FarmAvatar = ({
  farmAddress,
  size = 44,
  textStyle,
  hoverable = false,
  spacing = 0,
}: FarmAvatarProps) => {
  const { inputMint } = useFarmData(farmAddress)
  return (
    <Space size={12}>
      <MintAvatar size={size} mintAddress={inputMint} />
      <Space size={spacing}>
        <Typography.Text style={{ ...textStyle }}>
          <MintSymbol mintAddress={inputMint} />
        </Typography.Text>
        {hoverable && (
          <IonIcon
            name="information-circle-outline"
            className="icon-describe"
          />
        )}
      </Space>
    </Space>
  )
}

export default FarmAvatar
