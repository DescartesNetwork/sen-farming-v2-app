import { memo } from 'react'
import { useAppRoute } from '@sentre/senhub'

import { Button, Card, Col, Row, Space, Tag, Typography } from 'antd'
import RewardInfo from './rewardInfo'
import APRInfo from './APRInfo'
import FarmAvatar from 'components/farmAvatar'
import RewardAvatar from 'components/farm/rewardAvatar'
import PendingReward from 'components/farm/pendingReward'

import configs from 'configs'

const FarmCard = ({ farmAddress }: { farmAddress: string }) => {
  const { to } = useAppRoute(configs.manifest.appId)

  return (
    <Card
      bodyStyle={{ padding: '20px 16px' }}
      hoverable
      bordered={false}
      onClick={() => to(`/${farmAddress}`)}
    >
      <Row gutter={[20, 20]}>
        <Col span={24}>
          <Row gutter={[8, 8]} align="middle">
            <Col flex="auto">
              <FarmAvatar
                farmAddress={farmAddress}
                textStyle={{ fontSize: 20, fontWeight: 700 }}
                hoverable
              />
            </Col>
            <Col>
              <Tag
                style={{
                  color: '#A0E86F',
                  background: 'rgba(160, 232, 111, 0.1)',
                  border: 'none',
                  borderRadius: 8,
                  padding: '1px 8px',
                }}
              >
                ⚡ Boost
              </Tag>
            </Col>
            <Col span={24}>
              <Button type="text" style={{ marginLeft: -15 }}>
                Go pool
              </Button>
            </Col>
          </Row>
        </Col>
        <Col span={24}>
          <Row justify="space-between">
            <Col>
              <Space direction="vertical">
                <Space>
                  <Typography.Text type="secondary">APR</Typography.Text>
                  <APRInfo farmAddress={farmAddress} />
                </Space>
                <Typography.Title level={5} style={{ color: '#a0e86f' }}>
                  5.05%
                </Typography.Title>
                <RewardAvatar farmAddress={farmAddress} />
              </Space>
            </Col>
            <Col>
              <Space direction="vertical">
                <Typography.Text type="secondary">Liquidity</Typography.Text>
                <Typography.Text>$91,327.81</Typography.Text>
              </Space>
            </Col>
            <Col>
              <Space direction="vertical">
                <Space>
                  <Typography.Text type="secondary">
                    Your reward
                  </Typography.Text>
                  <RewardInfo farmAddress={farmAddress} />
                </Space>
                <Typography.Title level={5}>
                  <PendingReward farmAddress={farmAddress} />
                </Typography.Title>
              </Space>
            </Col>
          </Row>
        </Col>
      </Row>
    </Card>
  )
}

export default memo(FarmCard)
