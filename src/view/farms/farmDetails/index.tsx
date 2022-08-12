import { Col, Row } from 'antd'
import FarmInfomations from './Infomations'
import FarmActions from './farmActions'

const FarmDetails = () => {
  return (
    <Row gutter={[24, 24]}>
      <Col span={16}>
        <FarmInfomations />
      </Col>
      <Col span={8}>
        <FarmActions />
      </Col>
    </Row>
  )
}

export default FarmDetails
