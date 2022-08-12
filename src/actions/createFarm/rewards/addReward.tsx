import { MintSelection } from '@sen-use/components'
import IonIcon from '@sentre/antd-ionicon'
import { Button, Col, Row, Typography } from 'antd'

const AddReward = () => {
  return (
    <Row gutter={[8, 8]}>
      <Col span={24}>
        <Typography.Text>Token #1</Typography.Text>
      </Col>
      <Col span={12}>
        <MintSelection />
      </Col>
      <Col span={12}>
        <MintSelection />
      </Col>
      <Col span={24}>
        <Button
          size="large"
          icon={<IonIcon name="plus-outline" />}
          type="dashed"
          block
        >
          Add more
        </Button>
      </Col>
    </Row>
  )
}

export default AddReward
