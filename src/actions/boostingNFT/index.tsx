import { useState } from 'react'

import IonIcon from '@sentre/antd-ionicon'
import { Button, Col, Modal, Row, Space, Typography } from 'antd'
import NFTAvatar from 'components/nftAvatar'
import SpaceBetween from 'components/spaceBetween'

import { useDebtTreasurerAddress } from 'hooks/debt/useDebtData'
import { useNFTsByOwnerAndCollection } from '@sen-use/components'

const BoostingNFT = ({ farmAddress }: { farmAddress: string }) => {
  const [removeable, setRemoveable] = useState(false)
  const [visible, setVisible] = useState(false)
  const [unstakeNFT, setUnstakeNFT] = useState('')

  const treasurerAddress = useDebtTreasurerAddress(farmAddress)
  const { nftsSortByCollection } = useNFTsByOwnerAndCollection(treasurerAddress)

  const onRemoveNFT = (mintAddress: string) => {
    setVisible(true)
    setUnstakeNFT(mintAddress)
  }

  const unstateNFT = () => {
    setVisible(false)
    if (!nftsSortByCollection) return
    // Call function unstakeNFT
    console.log('unstateNFT: ', unstakeNFT)
  }

  const onCloseModal = () => {
    setVisible(false)
    setUnstakeNFT('')
  }

  return (
    <Row gutter={[16, 16]}>
      <Col span={24}>
        <SpaceBetween title="Your staked NFTs">
          {nftsSortByCollection && (
            <Button type="text" onClick={() => setRemoveable(!removeable)}>
              {removeable ? 'Cancel' : 'Unstake'}
            </Button>
          )}
        </SpaceBetween>
      </Col>
      <Col span={24}>
        <Row gutter={[16, 16]}>
          {nftsSortByCollection?.map((nft) => (
            <Col key={nft.mint}>
              <NFTAvatar
                mintAddress={nft.mint}
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
            <Space align="baseline">
              <IonIcon
                name="information-circle-outline"
                style={{ fontSize: 18, color: '#FA8C16' }}
              />
              <Space direction="vertical">
                <Typography.Title level={5}>
                  Are you sure to Unstake NFTs?
                </Typography.Title>
                <Typography.Text>
                  Your staked LP will be reduced in proportion with the unstake
                  NFTs.
                </Typography.Text>
              </Space>
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
