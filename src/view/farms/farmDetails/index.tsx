import { Col, Row } from 'antd'
import FarmInfomations from './Infomations'

const FarmDetails = () => {
  return (
    <Row gutter={[24, 24]}>
      <Col span={16}>
        <FarmInfomations />
      </Col>
    </Row>
  )
}

export default FarmDetails
