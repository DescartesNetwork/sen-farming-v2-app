import { Card, Space, Row, Col, Typography } from 'antd'
import NumericInput from './numericInput'

const CardNumbericInput = () => {
  return (
    <Card
      bodyStyle={{ padding: 12 }}
      style={{ boxShadow: 'none', borderRadius: 8, background: '#0A0A0A' }}
      bordered={false}
    >
      <Space style={{ width: '100%' }} direction="vertical">
        <Row wrap={false}>
          <Col flex="auto">
            <Typography.Text style={{ color: '#C6F1A9' }}>
              Amount
            </Typography.Text>
          </Col>
          <Col>
            <Space size={6}>
              <Typography.Text style={{ color: '#C6F1A9' }}>
                Available:
              </Typography.Text>
              <Typography.Text style={{ color: '#C6F1A9' }}>
                {/* {util.numeric(available).format('0,0.[00]')} */}
                588.05 LPT
              </Typography.Text>
            </Space>
          </Col>
        </Row>
        <NumericInput />
      </Space>
    </Card>
  )
}

export default CardNumbericInput
