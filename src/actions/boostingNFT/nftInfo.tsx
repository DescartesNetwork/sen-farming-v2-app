import { Tooltip, Row, Col, Typography } from 'antd'
import IonIcon from '@sentre/antd-ionicon'
import ListNFT from './listNFT'

const CardInfo = ({ farmAddress }: { farmAddress: string }) => (
  <Row>
    <Col span={24}>
      <Typography.Text className="caption">
        Only farm owner-approved NFTs can be used for this farm. Each NFT
        collection will give a different boost rate depending on the settings of
        the farm owner. NFTs in the collections below will be approved for this
        farm:
      </Typography.Text>
    </Col>
    <Col span={24}>
      <ListNFT farmAddress={farmAddress} />
    </Col>
  </Row>
)

const NFTInfo = ({ farmAddress }: { farmAddress: string }) => {
  return (
    <Tooltip title={<CardInfo farmAddress={farmAddress} />}>
      <IonIcon
        style={{ fontSize: 18, cursor: 'pointer' }}
        name="information-circle-outline"
      />
    </Tooltip>
  )
}

export default NFTInfo
