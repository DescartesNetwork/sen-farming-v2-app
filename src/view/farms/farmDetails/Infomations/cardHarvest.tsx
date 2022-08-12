import { Card, Col, Row } from 'antd'
import Harvest from 'actions/harvest'
import HarvestInfos from 'actions/harvest/harvestInfos'

const CardHarvest = () => {
  return (
    <Card
      style={{
        borderColor: '#A0E86F',
        background: 'rgba(160, 232, 111, 0.05)',
      }}
    >
      <Row gutter={[12, 12]}>
        <Col span={24}>
          <HarvestInfos />
        </Col>
        <Col span={24}>
          <Harvest farmAddress="7EgNqh13vcDSP8q3qYDHa6thA1fk7PkCDvJviJieq9dR" />
        </Col>
      </Row>
    </Card>
  )
}

export default CardHarvest
