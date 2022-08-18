import { util } from '@sentre/senhub'
import { BN } from '@project-serum/anchor'

import { Col, Row, Space, Tooltip, Typography } from 'antd'
import { FarmApr, FarmLiquidity } from 'components/farm'
import FarmAvatar from 'components/farm/farmAvatar'
import SpaceVertical from 'components/spaceVertical'
import TimeCountDown from 'components/timeCountDown'
import PriceTooltip from './priceTooltip'
import IonIcon from '@sentre/antd-ionicon'
import FarmTag from 'components/farmTag'
import SpaceBetween from 'components/spaceBetween'
import { MintSymbol } from '@sen-use/app'

import { useStakedData } from 'hooks/debt/useStakedData'
import { useFarmData } from 'hooks/farm/useFarmData'
import { useFarmBoosting } from 'hooks/farm/useFarmBoosting'

const CardHeader = ({ farmAddress }: { farmAddress: string }) => {
  const stakedData = useStakedData(farmAddress)
  const { endDate, startDate, inputMint } = useFarmData(farmAddress)
  const farmBoostingData = useFarmBoosting(farmAddress)

  const now = new BN(Date.now() / 1000)

  return (
    <Row gutter={[24, 24]}>
      <Col span={24}>
        <Space style={{ width: '100%' }} direction="vertical" size={12}>
          <SpaceBetween
            floatContent={
              <Space>
                {now.lt(startDate) && (
                  <FarmTag
                    type="warning"
                    bordered={false}
                    opacity={0.1}
                    radius={8}
                    style={{ padding: '1px 8px' }}
                  >
                    <IonIcon name="alarm-outline" /> Upcoming
                  </FarmTag>
                )}
                {!!farmBoostingData.length && (
                  <FarmTag
                    type="primary"
                    bordered={false}
                    opacity={0.1}
                    radius={8}
                    style={{ padding: '1px 8px' }}
                  >
                    ⚡ Boost
                  </FarmTag>
                )}
              </Space>
            }
          >
            <FarmAvatar
              farmAddress={farmAddress}
              textStyle={{ fontSize: 30, fontWeight: 700 }}
              hoverable
            />
          </SpaceBetween>
          {now.lt(startDate) ? (
            <TimeCountDown label={'Start in'} endTime={startDate.toNumber()} />
          ) : (
            <TimeCountDown label={'End in'} endTime={endDate.toNumber()} />
          )}
        </Space>
      </Col>

      <Col span={24}>
        <Row justify="space-between">
          {/* Farm APR */}
          <Col>
            <SpaceVertical label="APR">
              <Typography.Title style={{ color: '#A0E86F' }} level={4}>
                <FarmApr farmAddress={farmAddress} />
              </Typography.Title>
            </SpaceVertical>
          </Col>
          {/* Farm Liquidity */}
          <Col>
            <SpaceVertical label="TVL">
              <Typography.Title level={4}>
                <FarmLiquidity farmAddress={farmAddress} />
              </Typography.Title>
            </SpaceVertical>
          </Col>
          {/* Own Shares */}
          <Col>
            <Space direction="vertical" size={0}>
              <SpaceVertical label="You staked">
                <Tooltip
                  title={<PriceTooltip farmAddress={farmAddress} />}
                  arrowPointAtCenter
                >
                  <Space size={6}>
                    <Typography.Title level={4}>
                      {util.numeric(stakedData.amount).format('0,0.[00]')}
                    </Typography.Title>
                    <Typography.Title level={4}>
                      <MintSymbol mintAddress={inputMint.toBase58()} />
                    </Typography.Title>
                  </Space>
                </Tooltip>
              </SpaceVertical>
            </Space>
          </Col>
          <Col>
            <SpaceVertical label="Your position">
              <Typography.Title level={4}>
                {util.numeric(stakedData.ratio).format('0,0.[00]%')}
              </Typography.Title>
            </SpaceVertical>
          </Col>
        </Row>
      </Col>
    </Row>
  )
}

export default CardHeader
