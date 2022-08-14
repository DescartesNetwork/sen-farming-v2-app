import { useMemo } from 'react'
import { util } from '@sentre/senhub'
import { useAccountBalanceByMintAddress } from '@sen-use/app'

import { Card, Space, Row, Col, Typography, InputNumber, Button } from 'antd'

type MintNumberInputProps = {
  mint?: string
  value: string
  available?: number
  onChange: (value: string) => void
}

const MintNumberInput = ({
  mint = '',
  value,
  onChange,
  available,
}: MintNumberInputProps) => {
  const { balance } = useAccountBalanceByMintAddress(mint)

  const currentAvailable = useMemo(
    () => available || balance,
    [available, balance],
  )

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
                {`${util.numeric(currentAvailable).format('0,0.[00]')} LPT`}
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
              max={currentAvailable.toString()}
            />
          </Col>
          <Col>
            <Button
              type="text"
              style={{ marginRight: -15, color: '#C6F1A9' }}
              onClick={() => onChange(currentAvailable.toString())}
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
