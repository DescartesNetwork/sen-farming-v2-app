import { Row, Col, Button } from 'antd'
import CardNumbericInput from 'components/cardNumbericInput'

const Seed = () => {
  return (
    <Row gutter={[16, 16]}>
      <Col span={24}>
        <CardNumbericInput value="" onChange={() => {}} />
      </Col>
      <Col span={24}>
        <Button size="large" type="primary" block>
          Seed
        </Button>
      </Col>
    </Row>
  )
}

export default Seed
