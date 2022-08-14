import { useState } from 'react'

import { Button, Col, Row } from 'antd'
import NFTAvatar from 'components/nftAvatar'
import SpaceBetween from 'components/spaceBetween'

const BoostingNFT = () => {
  const [removeable, setRemoveable] = useState(false)

  return (
    <Row gutter={[16, 16]}>
      <Col span={24}>
        <SpaceBetween title="Your staked NFTs">
          <Button type="text" onClick={() => setRemoveable(!removeable)}>
            {removeable ? 'Cancel' : 'Unstake'}
          </Button>
        </SpaceBetween>
      </Col>
      <Col span={24}>
        <Row gutter={[16, 16]}>
          {[1, 2].map((nft, idx) => (
            <Col key={idx}>
              <NFTAvatar
                src={
                  'https://descartesnetwork.github.io/defiland-iframe/static/asset/panel-1.948017c921884130.png'
                }
                removeable={removeable}
              />
            </Col>
          ))}
        </Row>
      </Col>
    </Row>
  )
}

export default BoostingNFT
