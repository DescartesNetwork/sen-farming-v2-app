import { useAccountBalanceByMintAddress } from '@sen-use/app'
import { MintSymbol } from '@sen-use/components'
import { util } from '@sentre/senhub'

import { Card, Space, Row, Col, Typography, Button } from 'antd'
import { useMemo } from 'react'
import NumericInput from './numericInput'
import SpaceBetween from './spaceBetween'

type CardNumbericInputProps = {
  mint?: string
  value: string
  available?: number
  onChange: (value: string) => void
}

const CardNumbericInput = ({
  mint = '',
  value,
  onChange,
  available,
}: CardNumbericInputProps) => {
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
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <SpaceBetween
            floatContent={
              <Space size={6}>
                <Typography.Text type="secondary">Available:</Typography.Text>
                <Typography.Text>
                  {`${util.numeric(currentAvailable).format('0,0.[00]')}`}
                </Typography.Text>
                <MintSymbol mintAddress={mint} />
              </Space>
            }
          >
            <Typography.Text type="secondary">Amount</Typography.Text>
          </SpaceBetween>
        </Col>
        <Col span={24}>
          <SpaceBetween
            floatContent={
              <Button
                size="small"
                type="text"
                style={{ color: '#C6F1A9' }}
                onClick={() => onChange(currentAvailable.toString())}
              >
                MAX
              </Button>
            }
            wrap={false}
          >
            <NumericInput
              value={value}
              onChange={onChange}
              max={currentAvailable.toString()}
            />
          </SpaceBetween>
        </Col>
      </Row>
    </Card>
  )
}

export default CardNumbericInput
