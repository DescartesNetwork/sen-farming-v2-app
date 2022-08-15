import { CSSProperties } from 'react'

import IonIcon from '@sentre/antd-ionicon'
import { Button, Card } from 'antd'
import { AvatarNFT } from '@sen-use/components'

type NFTAvatarProps = {
  mintAddress: string
  size?: number
  style?: CSSProperties
  removeable?: boolean
  onRemoveNFT: (mintAddress: string) => void
}
const NFTAvatar = ({
  mintAddress,
  size = 64,
  style,
  removeable = false,
  onRemoveNFT,
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
        <AvatarNFT
          mintAddress={mintAddress}
          style={{
            width: size,
            height: size,
            objectFit: 'cover',
            ...style,
          }}
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
          onClick={() => onRemoveNFT(mintAddress)}
        />
      )}
    </div>
  )
}

export default NFTAvatar
