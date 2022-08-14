import { MintSelection } from '@sen-use/components'

import { Card, Space, Row, Col, Typography, Button } from 'antd'
import NumericInput from './numericInput'
import SpaceBetween from './spaceBetween'

const CardNumericInputSelectMint = () => {
  return (
    <Card
      bodyStyle={{ padding: 12 }}
      style={{ boxShadow: 'none', borderRadius: 8, background: '#0A0A0A' }}
      bordered={false}
    >
      <Row gutter={[16, 16]} justify="end">
        <Col span={24}>
          <SpaceBetween title={<NumericInput />}>
            <MintSelection />
          </SpaceBetween>
        </Col>
        <Col>
          <Space size={6}>
            <Typography.Text>Available:</Typography.Text>
            <Typography.Text>
              {/* {util.numeric(available).format('0,0.[00]')} */}
              588.05 LPT
            </Typography.Text>
            <Button size="small">MAX</Button>
          </Space>
        </Col>
      </Row>
    </Card>
  )
}

type CardNumbericInputProps = { selectMint?: boolean }
const CardNumbericInput = ({ selectMint }: CardNumbericInputProps) => {
  if (selectMint) return <CardNumericInputSelectMint />

  return (
    <Card
      bodyStyle={{ padding: 12 }}
      style={{ boxShadow: 'none', borderRadius: 8, background: '#0A0A0A' }}
      bordered={false}
    >
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <SpaceBetween title="Amount">
            <Space size={6}>
              <Typography.Text>Available:</Typography.Text>
              <Typography.Text>
                {/* {util.numeric(available).format('0,0.[00]')} */}
                588.05 LPT
              </Typography.Text>
            </Space>
          </SpaceBetween>
        </Col>
        <Col span={24}>
          <SpaceBetween title={<NumericInput />}>
            <Button size="small">MAX</Button>
          </SpaceBetween>
        </Col>
      </Row>
    </Card>
  )
}

export default CardNumbericInput
