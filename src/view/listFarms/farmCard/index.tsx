import { memo, useMemo } from 'react'
import { useAppRoute } from '@sentre/senhub'

import { Button, Card, Col, Progress, Row, Space, Tag, Typography } from 'antd'
import { RewardsAvatar, FarmApr, FarmAvatar } from 'components/farm'
import TotalPendingReward from 'components/debt/totalPendingReward'
import RewardInfo from './rewardInfo'
import APRInfo from './APRInfo'

import configs from 'configs'
import FarmLiquidity from 'components/farm/farmLiquidity'
import { useFarmBoosting } from 'hooks/farm/useFarmBoosting'
import IonIcon from '@sentre/antd-ionicon'
import CardTooltip from './cardTooltip'
import TimeCountDown from 'components/timeCountDown'
import { useFarmData } from 'hooks/farm/useFarmData'

import './index.less'
import SpaceBetween from 'components/spaceBetween'

const FarmCard = ({ farmAddress }: { farmAddress: string }) => {
  const { to } = useAppRoute(configs.manifest.appId)
  const farmBoostingData = useFarmBoosting(farmAddress)
  const { endDate, startDate } = useFarmData(farmAddress)

  const percentProgress = useMemo(() => {
    if (!endDate || !startDate) return 0
    const end = endDate.toNumber()
    const start = startDate.toNumber()
    const now = Date.now() / 1000

    if (end < now) return 100

    return ((now - start) / (end - start)) * 100
  }, [endDate, startDate])

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
            {!!farmBoostingData.length && (
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
            )}

            {/* Count down */}
            <Col span={24}>
              <SpaceBetween
                title={
                  <Button
                    type="text"
                    style={{ padding: 0, background: 'transparent' }}
                    disabled
                    onClick={() => {}}
                  >
                    Go pool <IonIcon name="open-outline" />
                  </Button>
                }
              >
                <Space>
                  <Space size={6}>
                    <Typography.Text type="secondary">End in</Typography.Text>
                    <TimeCountDown endTime={Math.floor(endDate.toNumber())} />
                  </Space>
                  <Progress
                    type="circle"
                    percent={percentProgress}
                    showInfo={false}
                    className="end-time-progress"
                    strokeWidth={10}
                  />
                </Space>
              </SpaceBetween>
            </Col>
          </Row>
        </Col>
        <Col span={24}>
          <Row justify="space-between">
            {/* APR */}
            <Col>
              <CardTooltip tooltip={<APRInfo farmAddress={farmAddress} />}>
                <Space direction="vertical">
                  <Space>
                    <Typography.Text type="secondary">APR</Typography.Text>
                    <IonIcon
                      name="information-circle-outline"
                      className="icon-describe"
                    />
                  </Space>
                  <Typography.Title level={5} style={{ color: '#a0e86f' }}>
                    <FarmApr farmAddress={farmAddress} />
                  </Typography.Title>
                  <RewardsAvatar farmAddress={farmAddress} />
                </Space>
              </CardTooltip>
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
              <CardTooltip tooltip={<RewardInfo farmAddress={farmAddress} />}>
                <Space direction="vertical">
                  <Space>
                    <Typography.Text type="secondary">
                      Your rewards
                    </Typography.Text>
                    <IonIcon
                      name="information-circle-outline"
                      className="icon-describe"
                    />
                  </Space>
                  <Typography.Title level={5}>
                    <TotalPendingReward farmAddress={farmAddress} />
                  </Typography.Title>
                </Space>
              </CardTooltip>
            </Col>
          </Row>
        </Col>
      </Row>
    </Card>
  )
}

export default memo(FarmCard)
