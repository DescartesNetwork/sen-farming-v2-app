import { useState } from 'react'

import IonIcon from '@sentre/antd-ionicon'
import { Button, Card, Col, Input, Row, Space, Typography } from 'antd'
import { useTransferOwner } from 'hooks/actions/useTransferOwner'

type TransferOwnerProps = {
  placeholder?: string
  farmAddress: string
}
const TransferOwner = ({
  placeholder = 'E.g. BkLRcJu...',
  farmAddress,
}: TransferOwnerProps) => {
  const [value, setValue] = useState('')
  const { transferOwner, loading } = useTransferOwner()

  return (
    <Row gutter={[24, 24]}>
      <Col span={24}>
        <Space>
          <IonIcon name="alert-circle-outline" />
          <Typography.Text type="secondary">
            Your current account will lose the farm control when you transfer
            ownership.
          </Typography.Text>
        </Space>
      </Col>

      {/* Card input transfer ownership */}
      <Col span={24}>
        <Card
          bordered={false}
          style={{ background: '#2D2E2D' }}
          bodyStyle={{ padding: 16 }}
        >
          <Row gutter={[8, 8]}>
            <Col>
              <Typography.Text>Transfer to Ownership</Typography.Text>
            </Col>
            <Col span={24}>
              <Input
                bordered={false}
                value={value}
                placeholder={placeholder}
                onChange={(e) => setValue(e.target.value)}
              />
            </Col>
          </Row>
        </Card>
      </Col>
      {/* Transfer */}
      <Col span={24}>
        <Button
          ghost
          onClick={() => transferOwner(farmAddress, value)}
          block
          loading={loading}
          disabled={!value}
        >
          Transfer
        </Button>
      </Col>
    </Row>
  )
}

export default TransferOwner
