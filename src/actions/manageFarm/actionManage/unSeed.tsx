import { Row, Col, Button } from 'antd'
import CardNumbericInput from 'components/cardNumbericInput'

const UnSeed = () => {
  return (
    <Row gutter={[16, 16]}>
      <Col span={24}>
        <CardNumbericInput selectMint />
      </Col>
      <Col span={24}>
        <Button type="primary" block>
          Unseed
        </Button>
      </Col>
    </Row>
  )
}

export default UnSeed
