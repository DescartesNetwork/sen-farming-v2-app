import { Fragment, useState } from 'react'

import { Button, Col, Modal, Row, Space, Typography } from 'antd'
import IonIcon from '@sentre/antd-ionicon'

import {
  AvatarNFT,
  SearchNFT as ModalContentListNFTs,
  searchNFTType,
  useNftMetaData,
} from '@sen-use/components'

type ModalNftCollectionProps = {
  mintAddress?: string
  onSelect: (collectionAddress: string) => void
}

const ModalNftCollection = ({
  onSelect,
  mintAddress,
}: ModalNftCollectionProps) => {
  const [visible, setVisible] = useState(false)
  const { nftInfo, metadata } = useNftMetaData(mintAddress || '')
  const onSelectNFT = (mintAddress: string) => {
    onSelect(mintAddress)
    setVisible(false)
  }

  return (
    <Fragment>
      <Button
        onClick={() => setVisible(true)}
        size="large"
        type="text"
        className="btn-nft"
        block
      >
        <Row gutter={[8, 8]} wrap={false}>
          <Col flex="auto" style={{ textAlign: 'left' }}>
            {!mintAddress ? (
              'Select a collection'
            ) : (
              <Space>
                <AvatarNFT size={24} mintAddress={mintAddress} />
                <Typography.Text>
                  {nftInfo?.name || metadata?.data.data.name}
                </Typography.Text>
              </Space>
            )}
          </Col>
          <Col>
            <IonIcon name="chevron-down-outline" />
          </Col>
        </Row>
      </Button>

      <Modal
        className="modal-nft-selection"
        visible={visible}
        footer={false}
        onCancel={() => setVisible(false)}
        closeIcon={<IonIcon name="close-outline" />}
      >
        <Row gutter={[24, 24]}>
          <Col span={24}>
            <Typography.Title level={4}>
              Select a NFT collection
            </Typography.Title>
          </Col>
          <Col span={24}>
            <ModalContentListNFTs
              onSelect={(mintAddress) => onSelectNFT(mintAddress)}
              searchNFTby={searchNFTType.collections}
            />
          </Col>
        </Row>
      </Modal>
    </Fragment>
  )
}

export default ModalNftCollection
