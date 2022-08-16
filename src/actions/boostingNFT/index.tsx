import { useCallback, useEffect, useMemo, useState } from 'react'

import IonIcon from '@sentre/antd-ionicon'
import { Button, Col, Modal, Row, Space, Spin, Typography } from 'antd'
import NFTAvatar from 'components/nftAvatar'
import SpaceBetween from 'components/spaceBetween'
import NftSelection from './nftSelection'
import FarmTag from 'components/farmTag'

import { useDebtData } from 'hooks/debt/useDebtData'
import { useFarmBoosting } from 'hooks/farm/useFarmBoosting'
import { useUnlock } from 'hooks/actions/useUnlock'
import { useLock } from 'hooks/actions/useLock'
import { useStakedData } from 'hooks/debt/useStakedData'

import { MetadataDataType } from 'lib/metaplex'
import { PRECISION } from 'constant'
import configs from 'configs'

import './index.less'

const BoostingNFT = ({ farmAddress }: { farmAddress: string }) => {
  const [removeable, setRemoveable] = useState(false)
  const [unstakeNFT, setUnstakeNFT] = useState('')
  const [stakedNFTs, setStakedNFTs] = useState<MetadataDataType[]>()

  const debtData = useDebtData(farmAddress)
  const farmBoostingData = useFarmBoosting(farmAddress)
  const lockNft = useLock(farmAddress)
  const unlockNft = useUnlock(farmAddress)
  const stakedData = useStakedData(farmAddress)

  const acceptedCollections = useMemo(
    () =>
      farmBoostingData.map((boostingData) =>
        boostingData.boostingCollection.toBase58(),
      ),
    [farmBoostingData],
  )

  const getListNFTs = useCallback(async () => {
    if (!debtData?.leverage || debtData.leverage.eq(PRECISION))
      return setStakedNFTs([])
    const PDAs = await window.senFarming.deriveAllPDAs({ farm: farmAddress })
    const nfts = await configs.sol.metaplexNFT.findDataByOwner(
      PDAs.debtTreasurer.toBase58(),
    )

    return setStakedNFTs(nfts)
  }, [debtData?.leverage, farmAddress])

  const onRemoveNFT = (mintAddress: string) => {
    setUnstakeNFT(mintAddress)
  }

  const onCloseModal = () => setUnstakeNFT('')

  const handleUnlockNft = async () => {
    await unlockNft.unlock(unstakeNFT)
    setUnstakeNFT('')
  }

  useEffect(() => {
    getListNFTs()
  }, [getListNFTs])

  const loading = unlockNft.loading || lockNft.loading

  return (
    <Row gutter={[16, 16]}>
      <Col span={24}>
        <SpaceBetween
          title={
            <Space>
              <Typography.Title level={5}>Staked NFTs</Typography.Title>
              {!!stakedNFTs?.length && (
                <FarmTag>{`+ ${stakedData.amountStakedNFTs} LP`}</FarmTag>
              )}
            </Space>
          }
        >
          {!!stakedNFTs?.length && (
            <Button type="text" onClick={() => setRemoveable(!removeable)}>
              {removeable ? 'Cancel' : 'Unstake'}
            </Button>
          )}
        </SpaceBetween>
      </Col>
      <Spin spinning={loading}>
        <Col span={24}>
          <Row gutter={[16, 16]}>
            {stakedNFTs?.map((nft) => (
              <Col key={nft.mint}>
                <NFTAvatar
                  mintAddress={nft.mint}
                  removeable={removeable}
                  onRemoveNFT={onRemoveNFT}
                />
              </Col>
            ))}
            <Col>
              <NftSelection
                acceptedCollections={acceptedCollections}
                onSelect={lockNft.lock}
              />
            </Col>
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

export default BoostingNFT
