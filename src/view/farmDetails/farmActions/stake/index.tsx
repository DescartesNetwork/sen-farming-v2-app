import { useState } from 'react'
import IonIcon from '@sentre/antd-ionicon'

import { Row, Col, Typography, Button, Space, Card, Modal } from 'antd'
import CardNumbericInput from 'components/cardNumbericInput'
import ExtraTypography from '../extraTypography'

import {
  AvatarNFT,
  SearchNFT as ModalContentListNFTs,
} from '@sen-use/components'

import './index.less'

const Stake = () => {
  const [visible, setVisible] = useState(false)
  const [selectedNFTs, setNftsSelected] = useState<string[]>([])

  const onSelect = (nftAddress: string) => {
    setVisible(false)
    if (!selectedNFTs.includes(nftAddress))
      setNftsSelected([...selectedNFTs, nftAddress])
  }

  const onDelete = (nftAddress: string) => {
    setNftsSelected(selectedNFTs.filter((nft) => nft !== nftAddress))
  }

  return (
    <Row gutter={[16, 16]} style={{ height: '100%' }}>
      <Col span={24}>
        <Typography.Text type="secondary">
          <IonIcon name="alert-circle-outline" /> The pending reward will be
          automatically harvested when you stake more.
        </Typography.Text>
      </Col>
      <Col span={24}>
        <CardNumbericInput />
      </Col>
      <Col span={24}>
        <Space size={6}>
          <Typography.Text>Use NFTs to increase LP</Typography.Text>
          <Typography.Text type="secondary">
            <IonIcon name="alert-circle-outline" />
          </Typography.Text>
        </Space>
      </Col>
      <Col span={24}>
        <Row gutter={[16, 16]}>
          {selectedNFTs.map((nftAddress) => (
            <Col key={nftAddress}>
              <Card
                className="upload-box card-nft-image-only"
                bodyStyle={{ padding: 0 }}
              >
                <div className="nft-image">
                  <AvatarNFT
                    mintAddress={nftAddress}
                    size={64}
                    style={{ borderRadius: 8, marginTop: -1 }}
                  />
                </div>
                <Button
                  type="text"
                  className="icon-delete-nft"
                  icon={<IonIcon name="trash-outline" />}
                  onClick={() => onDelete(nftAddress)}
                />
              </Card>
            </Col>
          ))}
          <Col>
            <Card
              className="upload-box card-nft-image-only"
              bodyStyle={{ padding: 0 }}
              onClick={() => setVisible(true)}
            >
              <Button
                type="text"
                className="icon-add-nft"
                icon={
                  <IonIcon name="add-outline" style={{ color: '#a0e86f' }} />
                }
              />
            </Card>
          </Col>
        </Row>
      </Col>
      <Col span={24}>
        <Card
          bodyStyle={{ padding: 12 }}
          style={{ boxShadow: 'none', borderRadius: 8, background: '#2D2E2D' }}
          bordered={false}
        >
          <Space size={8} direction="vertical" style={{ width: '100%' }}>
            <ExtraTypography label="Your stake" content={'0 LP'} />
            <ExtraTypography label="Boost by NFT" content={'+ 0 LP'} />
            <ExtraTypography label="Total" content={'0 LP'} />
          </Space>
        </Card>
      </Col>
      <Col span={24}>
        <Button type="primary" block>
          Enter an amount
        </Button>
      </Col>
      <Col span={24}>
        <Button type="text" style={{ color: '#a0e86f' }} block>
          Get BTC - SNTR LP
        </Button>
      </Col>
      <Modal
        visible={visible}
        closeIcon={<IonIcon name="close-outline" />}
        onCancel={() => setVisible(false)}
        footer={null}
        className="modal-nft-selection"
        style={{ paddingBottom: 0 }}
      >
        <Row gutter={[24, 24]} style={{ maxHeight: 400 }}>
          <Col span={24}>
            <Typography.Title level={4}>Select a NFT</Typography.Title>
          </Col>
          <Col span={24}>
            <ModalContentListNFTs
              onSelect={onSelect}
              selectedNFTs={selectedNFTs}
              // collectionAddress={acceptedCollections}
            />
          </Col>
        </Row>
      </Modal>
    </Row>
  )
}

export default Stake
