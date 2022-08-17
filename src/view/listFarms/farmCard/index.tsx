import { memo, useCallback, useEffect, useMemo, useState } from 'react'
import { useAppRoute } from '@sentre/senhub'

import { Button, Card, Col, Progress, Row, Space, Tag, Typography } from 'antd'
import { RewardsAvatar, FarmApr, FarmAvatar } from 'components/farm'
import TotalPendingReward from 'components/debt/totalPendingReward'
import RewardInfo from './rewardInfo'
import APRInfo from './APRInfo'
import SpaceBetween from 'components/spaceBetween'
import HarvestButton from 'actions/harvest/harvestButton'
import IonIcon from '@sentre/antd-ionicon'
import CardTooltip from './cardTooltip'
import FarmLiquidity from 'components/farm/farmLiquidity'

import { useFarmBoosting } from 'hooks/farm/useFarmBoosting'
import TimeCountDown from 'components/timeCountDown'
import { useFarmData } from 'hooks/farm/useFarmData'
import { useGetDebtReward } from 'hooks/debt/useGetDebtReward'

import configs from 'configs'
import './index.less'
import { BN } from 'bn.js'
import FarmTag from 'components/farmTag'

const FarmCard = ({ farmAddress }: { farmAddress: string }) => {
  const { to } = useAppRoute(configs.manifest.appId)
  const farmBoostingData = useFarmBoosting(farmAddress)
  const getDebtReward = useGetDebtReward(farmAddress)
  const { endDate, startDate } = useFarmData(farmAddress)
  const [debReward, setDebReward] = useState(new BN(0))

  const percentProgress = useMemo(() => {
    if (!endDate || !startDate) return 0
    const end = endDate.toNumber() * 1000
    const start = startDate.toNumber() * 1000
    const now = Date.now()

    if (end < now) return 100

    return ((now - start) / (end - start)) * 100
  }, [endDate, startDate])

  const getDebtRewards = useCallback(async () => {
    const debReward = await getDebtReward()
    setDebReward(debReward)
  }, [getDebtReward])

  useEffect(() => {
    getDebtRewards()
  }, [getDebtRewards])

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
                <FarmTag
                  type="primary"
                  bordered={false}
                  opacity={0.1}
                  radius={8}
                  style={{ padding: '1px 8px' }}
                >
                  ⚡ Boost
                </FarmTag>
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
                  <TimeCountDown
                    label="End in"
                    endTime={Math.floor(endDate.toNumber())}
                  />
                  <Progress
                    type="circle"
                    percent={percentProgress}
                    showInfo={percentProgress === 100}
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
                  {!debReward.isZero() && (
                    <HarvestButton size="small" farmAddress={farmAddress} />
                  )}
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
