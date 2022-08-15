import { memo } from 'react'
import { useAppRoute } from '@sentre/senhub'

import { Button, Card, Col, Row, Space, Tag, Typography } from 'antd'
import { RewardsAvatar, FarmApr, FarmAvatar } from 'components/farm'
import TotalPendingReward from 'components/debt/totalPendingReward'
import RewardInfo from './rewardInfo'
import APRInfo from './APRInfo'

import configs from 'configs'
import FarmLiquidity from 'components/farm/farmLiquidity'

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
            {/* APR */}
            <Col>
              <Space direction="vertical">
                <Space>
                  <Typography.Text type="secondary">APR</Typography.Text>
                  <APRInfo farmAddress={farmAddress} />
                </Space>
                <Typography.Title level={5} style={{ color: '#a0e86f' }}>
                  <FarmApr farmAddress={farmAddress} />
                </Typography.Title>
                <RewardsAvatar farmAddress={farmAddress} />
              </Space>
            </Col>
            {/* Liquidity */}
            <Col>
              <Space direction="vertical">
                <Typography.Text type="secondary">Liquidity</Typography.Text>
                <Typography.Text>
                  <FarmLiquidity farmAddress={farmAddress} />
                </Typography.Text>
              </Space>
            </Col>
            {/* Pending rewards */}
            <Col>
              <Space direction="vertical">
                <Space>
                  <Typography.Text type="secondary">
                    Your rewards
                  </Typography.Text>
                  <RewardInfo farmAddress={farmAddress} />
                </Space>
                <Typography.Title level={5}>
                  <TotalPendingReward farmAddress={farmAddress} />
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
