import { Card, Col, Divider, Row } from 'antd'
import BoostingNFT from 'actions/boostingNFT'
import CardHarvest from './cardHarvest'
import CardRewards from './cardRewards'
import FarmHeader from './header'

const FarmInfomations = ({ farmAddress }: { farmAddress: string }) => {
  return (
    <Card bordered={false}>
      <Row gutter={[24, 24]}>
        <Col span={24}>
          <FarmHeader farmAddress={farmAddress} />
        </Col>
        <Col xs={24} md={12}>
          <CardHarvest farmAddress={farmAddress} />
        </Col>
        <Col xs={24} md={12}>
          <CardRewards farmAddress={farmAddress} />
        </Col>
        <Col span={24}>
          <Divider style={{ margin: 0 }} />
        </Col>
        <Col span={24}>
          <BoostingNFT />
        </Col>
      </Row>
    </Card>
  )
}

export default FarmInfomations
