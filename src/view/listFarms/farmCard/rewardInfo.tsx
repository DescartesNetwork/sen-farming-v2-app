import { Card, Col, Row, Space, Typography } from 'antd'
import {
  MintAvatar,
  MintSymbol,
  MintAmount,
  MintTotalValue,
} from '@sen-use/app'
import SpaceBetween from 'components/spaceBetween'

import { useConvertRewards } from 'hooks/useConvertRewards'

const RewardInfo = ({ farmAddress }: { farmAddress: string }) => {
  const convertRewards = useConvertRewards(farmAddress)

  if (!convertRewards.length) return <Typography.Text>No Data.</Typography.Text>

  return (
    <Card
      bordered={false}
      style={{ background: 'transparent' }}
      bodyStyle={{ padding: 4 }}
    >
      <Row gutter={[8, 8]}>
        <Col span={24}>
          <Space direction="vertical" style={{ width: '100%' }}>
            {convertRewards.map(({ mint, amount }) => (
              <SpaceBetween
                key={mint}
                floatContent={
                  <Typography.Title level={5}>
                    <MintAmount mintAddress={mint} amount={amount} />{' '}
                    <span style={{ color: '#A1A1A1' }}>
                      (<MintTotalValue mintAddress={mint} amount={amount} />)
                    </span>
                  </Typography.Title>
                }
                gutter={[24, 24]}
              >
                <Space>
                  <MintAvatar mintAddress={mint} />
                  <MintSymbol mintAddress={mint} />
                </Space>
              </SpaceBetween>
            ))}
          </Space>
        </Col>
      </Row>
    </Card>
  )
}

export default RewardInfo
