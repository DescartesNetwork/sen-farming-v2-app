import IonIcon from '@sentre/antd-ionicon'
import { Row, Col, Button, Space, Typography } from 'antd'

const Close = () => {
  return (
    <Row gutter={[16, 16]}>
      <Col span={24}>
        <Space align="start">
          <IonIcon name="alert-circle-outline" />
          <Typography.Text type="secondary">
            The farm can only be closed when all farmers unstake their tokens!
          </Typography.Text>
        </Space>
      </Col>
      <Col span={24}>
        <Button size="large" type="primary" block>
          Close
        </Button>
      </Col>
    </Row>
  )
}

export default Close
