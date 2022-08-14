import IonIcon from '@sentre/antd-ionicon'
import { Row, Col, Button, Space, Typography } from 'antd'

const FreezeOrThaw = () => {
  return (
    <Row gutter={[16, 16]}>
      <Col span={24}>
        <Space align="start">
          <IonIcon name="alert-circle-outline" />
          <Typography.Text type="secondary">
            Freezing a farm will prevent all actions, until the farm has been
            thawed, but can still "Seed" and "Unseed".
          </Typography.Text>
        </Space>
      </Col>
      <Col span={24}>
        <Button type="primary" block>
          Freeze
        </Button>
      </Col>
    </Row>
  )
}

export default FreezeOrThaw
