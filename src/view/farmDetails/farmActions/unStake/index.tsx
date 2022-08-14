import IonIcon from '@sentre/antd-ionicon'

import { Row, Col, Typography, Button } from 'antd'
import CardNumbericInput from 'components/cardNumbericInput'

const UnStake = () => {
  return (
    <Row gutter={[16, 16]}>
      <Col span={24}>
        <Typography.Text type="secondary">
          <IonIcon name="alert-circle-outline" /> The pending reward will be
          automatically harvested when you unstake.
        </Typography.Text>
      </Col>
      <Col span={24}>
        <CardNumbericInput />
      </Col>
      <Col span={24}>
        <Button
          type="primary"
          block
          style={{ background: '#FF666E', borderColor: '#FF666E' }}
        >
          Unstake
        </Button>
      </Col>
    </Row>
  )
}

export default UnStake
