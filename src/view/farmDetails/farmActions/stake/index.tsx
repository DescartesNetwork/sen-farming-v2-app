import { Fragment, useMemo, useState } from 'react'
import IonIcon from '@sentre/antd-ionicon'

import { Row, Col, Typography, Button, Space, Card, Modal, Tooltip } from 'antd'
import ExtraTypography from '../extraTypography'
import {
  AvatarNFT,
  SearchNFT as ModalContentListNFTs,
} from '@sen-use/components'

import CardNumbericInput from 'components/cardNumbericInput'
import { useFarmData } from 'hooks/farm/useFarmData'
import { useStake } from 'hooks/actions/useStake'
import { useFarmBoosting } from 'hooks/farm/useFarmBoosting'

import './index.less'

const Stake = ({ farmAddress }: { farmAddress: string }) => {
  const [visible, setVisible] = useState(false)
  const [selectedNFTs, setNftsSelected] = useState<string[]>([])
  const [inAmount, setInAmount] = useState<string>('')
  const farmData = useFarmData(farmAddress)
  const farmBoostingData = useFarmBoosting(farmAddress)
  const { stake, loading } = useStake(farmAddress)

  const acceptedCollections = useMemo(
    () =>
      farmBoostingData.map((boostingData) =>
        boostingData.boostingCollection.toBase58(),
      ),
    [farmBoostingData],
  )

  const onSelect = (nftAddress: string) => {
    setVisible(false)
    if (!selectedNFTs.includes(nftAddress))
      setNftsSelected([...selectedNFTs, nftAddress])
  }

  const onDelete = (nftAddress: string) => {
    setNftsSelected(selectedNFTs.filter((nft) => nft !== nftAddress))
  }

  const onFullyStake = async () => {
    await stake({
      farm: farmAddress,
      nfts: selectedNFTs,
      inAmount: Number(inAmount),
    })
    setInAmount('')
  }

  const boostAmount = useMemo(() => {
    return 0
  }, [])

  return (
    <Row gutter={[16, 16]} style={{ height: '100%' }}>
      <Col span={24}>
        <Typography.Text type="secondary">
          <IonIcon name="alert-circle-outline" /> The pending reward will be
          automatically harvested when you stake more.
        </Typography.Text>
      </Col>
      <Col span={24}>
        <CardNumbericInput
          mint={farmData.inputMint.toBase58()}
          value={inAmount}
          onChange={setInAmount}
        />
      </Col>
      {!!farmBoostingData.length && (
        <Fragment>
          <Col span={24}>
            <Space size={6}>
              <Typography.Text>Use NFTs to increase LP</Typography.Text>
              <Typography.Text type="secondary">
                <Tooltip
                  placement="right"
                  title="Only farm owner-approved NFTs can be used for this farm. Each NFT collection will give a different boost rate depending on the settings of the farm owner."
                >
                  <IonIcon name="alert-circle-outline" />
                </Tooltip>
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
                      <IonIcon
                        name="add-outline"
                        style={{ color: '#a0e86f' }}
                      />
                    }
                  />
                </Card>
              </Col>
            </Row>
          </Col>
        </Fragment>
      )}
      <Col span={24}>
        <Card
          bodyStyle={{ padding: 12 }}
          style={{ boxShadow: 'none', borderRadius: 8, background: '#2D2E2D' }}
          bordered={false}
        >
          <Space size={8} direction="vertical" style={{ width: '100%' }}>
            <ExtraTypography
              label="Your stake"
              content={`${inAmount || 0} LP`}
            />
            <ExtraTypography
              label="Boost by NFT"
              content={`+ ${boostAmount} LP`}
            />

            <Row align="middle">
              <Col flex={'auto'}>
                <Typography.Text type="secondary">Total</Typography.Text>
              </Col>
              <Col>
                <Typography.Title style={{ color: '#A0E86F' }} level={4}>{`${
                  inAmount || 0 + boostAmount
                } LP`}</Typography.Title>
              </Col>
            </Row>
          </Space>
        </Card>
      </Col>
      <Col span={24}>
        <Button
          type="primary"
          block
          disabled={!Number(inAmount)}
          loading={loading}
          onClick={onFullyStake}
        >
          {!Number(inAmount) ? 'Enter an amount' : 'Stake'}
        </Button>
      </Col>
      {/* <Col span={24}>
        <Button type="text" style={{ color: '#a0e86f' }} block>
          Get <MintSymbol mintAddress={farmData.inputMint} />
        </Button>
      </Col> */}
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
              collectionAddress={acceptedCollections}
            />
          </Col>
        </Row>
      </Modal>
    </Row>
  )
}

export default Stake
