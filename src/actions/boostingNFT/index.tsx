import { useMemo } from 'react'

import { Button, Card, Col, Row, Space, Typography } from 'antd'
import { AvatarNFT } from '@sen-use/components'
import IonIcon from '@sentre/antd-ionicon'
import NFTInfo from './nftInfo'
import NftSelection from './nftSelection'
import NFTToolTipInfo from 'components/nftToolTipInfo'

import { useFarmBoosting } from 'hooks/farm/useFarmBoosting'

import './index.less'

type BoostingNFTProps = {
  farmAddress: string
  selectedNFTs: string[]
  setSelectedNFTs: (value: string[]) => void
}

const BoostingNFT = (props: BoostingNFTProps) => {
  const { farmAddress, selectedNFTs, setSelectedNFTs } = props
  const farmBoostingData = useFarmBoosting(farmAddress)

  const onSelectNFT = (mintAddress: string) => {
    const nextNTF = [...selectedNFTs]
    nextNTF.push(mintAddress)
    return setSelectedNFTs(nextNTF)
  }

  const onDelete = (mintAddress: string) => {
    const nextNTF = [...selectedNFTs]
    const index = nextNTF.findIndex((mint) => mint === mintAddress)
    if (index === -1) return
    nextNTF.splice(index, 1)
    return setSelectedNFTs(nextNTF)
  }

  const acceptedCollections = useMemo(
    () =>
      farmBoostingData.map((boostingData) =>
        boostingData.boostingCollection.toBase58(),
      ),
    [farmBoostingData],
  )

  return (
    <Row gutter={[8, 8]}>
      <Col span={24}>
        <Space className="space-middle-icon">
          <Typography.Text> Use NFTs to increase LP</Typography.Text>
          <NFTInfo farmAddress={farmAddress} />
        </Space>
      </Col>
      <Col span={24}>
        <Row gutter={[16, 16]}>
          <Col>
            <NftSelection
              acceptedCollections={acceptedCollections}
              onSelect={onSelectNFT}
              selectedNFTs={selectedNFTs}
            />
          </Col>
          {selectedNFTs.map((mintAddress) => (
            <Col key={mintAddress}>
              <NFTToolTipInfo
                farmAddress={farmAddress}
                mintAddress={mintAddress}
              >
                <Card className="upload-box card-nft-image-only">
                  <div className="nft-image">
                    <AvatarNFT
                      mintAddress={mintAddress}
                      size={64}
                      style={{ borderRadius: 8, marginTop: -1 }}
                    />
                  </div>

                  <Button
                    type="text"
                    className="icon-delete-nft"
                    onClick={() => onDelete(mintAddress)}
                    icon={<IonIcon name="trash-outline" />}
                  />
                </Card>
              </NFTToolTipInfo>
            </Col>
          ))}
        </Row>
      </Col>
    </Row>
  )
}

export default BoostingNFT
