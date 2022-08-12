import { Row, Col, InputNumber, Button } from 'antd'

const NumericInput = () => {
  return (
    <Row align="middle" wrap={false}>
      <Col flex="auto">
        <InputNumber
          stringMode
          decimalSeparator="."
          controls={false}
          placeholder={'0'}
          bordered={false}
          size="large"
          style={{ padding: 0, width: '100%', color: '#C6F1A9', fontSize: 24 }}
        />
      </Col>
      <Col>
        <Button type="text" style={{ marginRight: -15 }}>
          MAX
        </Button>
      </Col>
    </Row>
  )
}

export default NumericInput
