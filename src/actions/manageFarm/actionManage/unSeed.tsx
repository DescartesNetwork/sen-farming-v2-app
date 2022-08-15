import { Row, Col, Button } from 'antd'
import CardNumbericInput from 'components/cardNumbericInput'

const UnSeed = () => {
  return (
    <Row gutter={[16, 16]}>
      <Col span={24}>
        <CardNumbericInput value="" onChange={() => {}} selectMint />
      </Col>
      <Col span={24}>
        <Button size="large" type="primary" block>
          Unseed
        </Button>
      </Col>
    </Row>
  )
}

export default UnSeed
