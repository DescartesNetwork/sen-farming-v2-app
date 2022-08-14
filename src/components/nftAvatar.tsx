import { CSSProperties } from 'react'

import IonIcon from '@sentre/antd-ionicon'
import { Button, Card, Image } from 'antd'

type NFTAvatarProps = {
  src: string
  size?: number
  style?: CSSProperties
  removeable?: boolean
}
const NFTAvatar = ({
  src,
  size = 64,
  style,
  removeable = false,
}: NFTAvatarProps) => {
  return (
    <div style={{ position: 'relative' }}>
      {/* NFT Avatar */}
      <Card
        style={{
          borderRadius: 8,
          overflow: 'hidden',
        }}
        bodyStyle={{ padding: 0 }}
        bordered={false}
      >
        <Image
          style={{
            width: size,
            height: size,
            objectFit: 'cover',
            ...style,
          }}
          src={src}
          preview={false}
        />
      </Card>
      {/* Button remove NFT */}
      {removeable && (
        <Button
          type="text"
          shape="circle"
          style={{
            position: 'absolute',
            minWidth: 16,
            width: 16,
            height: 16,
            top: -4,
            right: -4,
            border: 'none',
            background: '#727272',
            padding: 0,
          }}
          icon={<IonIcon name="close-outline" />}
          onClick={() => {}}
        />
      )}
    </div>
  )
}

export default NFTAvatar
