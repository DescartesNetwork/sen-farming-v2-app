import { useState } from 'react'
import { util } from '@sentre/senhub'

import IonIcon from '@sentre/antd-ionicon'
import { Button, Col, Modal, Row, Space, Spin, Typography } from 'antd'
import NFTAvatar from 'components/nftAvatar'
import SpaceBetween from 'components/spaceBetween'
import FarmTag from 'components/farmTag'
import NFTToolTipInfo from 'components/nftToolTipInfo'

import { useUnlock } from 'hooks/actions/useUnlock'
import { useNFTStaked } from 'hooks/boost/useNFTStaked'
import { useTotalBoosted } from 'hooks/boost/useTotalBoosted'

import './index.less'

const UnstakeNFT = ({ farmAddress }: { farmAddress: string }) => {
  const [removeable, setRemoveable] = useState(false)
  const [unstakeNFT, setUnstakeNFT] = useState('')
  const unlockNft = useUnlock(farmAddress)
  const stakedNFTs = useNFTStaked(farmAddress)
  const totalBoosted = useTotalBoosted(farmAddress)

  const onRemoveNFT = (mintAddress: string) => {
    setUnstakeNFT(mintAddress)
  }

  const onCloseModal = () => setUnstakeNFT('')

  const handleUnlockNft = async () => {
    await unlockNft.unlock(unstakeNFT)
    setUnstakeNFT('')
  }

  return (
    <Row gutter={[16, 16]}>
      <Col span={24}>
        <SpaceBetween
          floatContent={
            !!stakedNFTs.length && (
              <Button type="text" onClick={() => setRemoveable(!removeable)}>
                {removeable ? 'Cancel' : 'Unstake'}
              </Button>
            )
          }
        >
          <Space>
            <Typography.Title level={5}>Your locked NFTs</Typography.Title>
            {!!stakedNFTs.length && (
              <FarmTag>{`${util
                .numeric(Number(totalBoosted) / 10 ** 9)
                .format('0,0.[00]%')}`}</FarmTag>
            )}
          </Space>
        </SpaceBetween>
      </Col>
      <Spin spinning={unlockNft.loading}>
        <Col span={24}>
          <Row gutter={[16, 16]}>
            {stakedNFTs?.map((nft) => (
              <NFTToolTipInfo
                farmAddress={farmAddress}
                mintAddress={nft.mint}
                key={nft.mint}
              >
                <Col style={{ cursor: 'pointer' }}>
                  <NFTAvatar
                    mintAddress={nft.mint}
                    removeable={removeable}
                    onRemoveNFT={onRemoveNFT}
                  />
                </Col>
              </NFTToolTipInfo>
            ))}
          </Row>
        </Col>
      </Spin>
      <Modal
        visible={!!unstakeNFT}
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
                loading={unlockNft.loading}
                onClick={handleUnlockNft}
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

export default UnstakeNFT
