import { useAccountBalanceByMintAddress } from '@sen-use/app/dist'
import { util } from '@sentre/senhub/dist'
import { Card, Space, Row, Col, Typography, InputNumber, Button } from 'antd'

type MintNumberInputProps = {
  mint: string
  value: string
  onChange: (value: string) => void
}

const MintNumberInput = ({ mint, value, onChange }: MintNumberInputProps) => {
  const { balance } = useAccountBalanceByMintAddress(mint)

  return (
    <Card
      bodyStyle={{ padding: 12 }}
      style={{ boxShadow: 'none', borderRadius: 8, background: '#0A0A0A' }}
      bordered={false}
    >
      <Space style={{ width: '100%' }} direction="vertical">
        {/* Title + Available */}
        <Row wrap={false}>
          <Col flex="auto">
            <Typography.Text>Amount</Typography.Text>
          </Col>
          <Col>
            <Space size={6}>
              <Typography.Text>Available:</Typography.Text>
              <Typography.Text>
                {`${util.numeric(balance).format('0,0.[00]')} LPT`}
              </Typography.Text>
            </Space>
          </Col>
        </Row>
        {/* Number Input */}
        <Row align="middle" wrap={false}>
          <Col flex="auto">
            <InputNumber
              stringMode
              decimalSeparator="."
              controls={false}
              placeholder={'0'}
              bordered={false}
              size="large"
              style={{
                padding: 0,
                width: '100%',
                color: '#C6F1A9',
                fontSize: 24,
              }}
              value={value}
              onChange={onChange}
            />
          </Col>
          <Col>
            <Button
              type="text"
              style={{ marginRight: -15, color: '#C6F1A9' }}
              onClick={() => onChange(balance.toString())}
            >
              MAX
            </Button>
          </Col>
        </Row>
      </Space>
    </Card>
  )
}

export default MintNumberInput
