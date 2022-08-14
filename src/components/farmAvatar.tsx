import { MintAvatar, MintSymbol } from '@sen-use/components'
import IonIcon from '@sentre/antd-ionicon'
import { util } from '@sentre/senhub/dist'
import { Space, Typography } from 'antd'
import { useFarmData } from 'hooks/farmInfos/useFarmData'
import useMintCgk from 'hooks/useMintCgk'
import { CSSProperties } from 'react'

type FarmAvatarProps = {
  farmAddress: string
  size?: number
  textStyle?: CSSProperties
  hoverable?: boolean
  showPrice?: boolean
  spacing?: number
}
const FarmAvatar = ({
  farmAddress,
  size = 44,
  textStyle,
  hoverable = false,
  showPrice = false,
  spacing = 0,
}: FarmAvatarProps) => {
  const { inputMint } = useFarmData(farmAddress)
  const { price } = useMintCgk(farmAddress)
  return (
    <Space size={12}>
      <MintAvatar size={size} mintAddress={inputMint} />
      <Space direction="vertical" size={spacing}>
        <Space>
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
        {!!showPrice && (
          <Typography.Text type="secondary">
            {util.numeric(price).format('0,0.[0000]')}
          </Typography.Text>
        )}
      </Space>
    </Space>
  )
}

export default FarmAvatar
