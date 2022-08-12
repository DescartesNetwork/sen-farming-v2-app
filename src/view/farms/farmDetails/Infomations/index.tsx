import { Card, Col, Divider, Row } from 'antd'
import CardHarvest from './cardHarvest'
import CardRewards from './cardRewards'
import FarmHeader from './header'

const FarmInfomations = () => {
  return (
    <Card bordered={false}>
      <Row gutter={[24, 24]}>
        <Col span={24}>
          <FarmHeader />
        </Col>
        <Col xs={24} md={12}>
          <CardHarvest />
        </Col>
        <Col xs={24} md={12}>
          <CardRewards />
        </Col>
        <Col span={24}>
          <Divider />
        </Col>
      </Row>
    </Card>
  )
}

export default FarmInfomations
