import { useState } from 'react'

import IonIcon from '@sentre/antd-ionicon'
import { Button, Col, Modal, Row, Space, Typography } from 'antd'
import NFTAvatar from 'components/nftAvatar'
import SpaceBetween from 'components/spaceBetween'

const BoostingNFT = () => {
  const [removeable, setRemoveable] = useState(false)
  const [visible, setVisible] = useState(false)
  const [unstakeNFT, setUnstakeNFT] = useState('')

  const [stakedNFTs, setStakedNFTs] = useState<string[]>([
    'E3XvnyR46WV3W3Sv7nXAzPoN4LJLNmL84aUinN39WsXX',
    'FDbqKkB9P1crrmxFTiKFvYHKphrXzAyXLdfh77KetT6P',
    'FeHKuGmqXS7BKQcC2hpX6as19unm7foUBrSgTsZLKTTs',
  ])

  const onRemoveNFT = (mintAddress: string) => {
    setVisible(true)
    setUnstakeNFT(mintAddress)
  }

  const unstateNFT = () => {
    const nextStakedNFTs = stakedNFTs.filter(
      (nftAddress) => nftAddress !== unstakeNFT,
    )
    setVisible(false)
    setStakedNFTs(nextStakedNFTs)
  }

  const onCloseModal = () => {
    setVisible(false)
    setUnstakeNFT('')
  }

  return (
    <Row gutter={[16, 16]}>
      <Col span={24}>
        <SpaceBetween title="Your staked NFTs">
          {stakedNFTs.length > 0 && (
            <Button type="text" onClick={() => setRemoveable(!removeable)}>
              {removeable ? 'Cancel' : 'Unstake'}
            </Button>
          )}
        </SpaceBetween>
      </Col>
      <Col span={24}>
        <Row gutter={[16, 16]}>
          {stakedNFTs.map((nftAddress) => (
            <Col key={nftAddress}>
              <NFTAvatar
                mintAddress={nftAddress}
                removeable={removeable}
                onRemoveNFT={onRemoveNFT}
              />
            </Col>
          ))}
        </Row>
      </Col>
      <Modal
        visible={visible}
        onCancel={onCloseModal}
        footer={false}
        closable={false}
      >
        <Row gutter={[16, 16]}>
          <Col span={24}>
            <Space>
              <IonIcon
                name="information-circle-outline"
                style={{ fontSize: 18, color: '#FA8C16' }}
              />
              <Typography.Title level={5}>
                Are you sure to Unstake NFTs?
              </Typography.Title>
            </Space>
          </Col>
          <Col span={24} style={{ textAlign: 'right' }}>
            <Space>
              <Button ghost onClick={onCloseModal}>
                Cancel
              </Button>
              <Button
                style={{ background: '#FF666E', borderColor: '#FF666E' }}
                type="primary"
                onClick={unstateNFT}
              >
                Unstake
              </Button>
            </Space>
          </Col>
        </Row>
      </Modal>
    </Row>
  )
}

export default BoostingNFT
