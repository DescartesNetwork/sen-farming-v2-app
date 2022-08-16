import { util } from '@sentre/senhub'

import { Col, Row, Space, Tooltip, Typography } from 'antd'
import { FarmApr, FarmLiquidity } from 'components/farm'
import FarmAvatar from 'components/farm/farmAvatar'
import SpaceVertical from 'components/spaceVertical'
import TimeCountDown from 'components/timeCountDown'
import PriceTooltip from './priceTooltip'

import { useStakedData } from 'hooks/debt/useStakedData'
import { useFarmData } from 'hooks/farm/useFarmData'

const CardHeader = ({ farmAddress }: { farmAddress: string }) => {
  const stakedData = useStakedData(farmAddress)
  const { endDate } = useFarmData(farmAddress)

  return (
    <Row gutter={[24, 24]}>
      <Col>
        <Space direction="vertical" size={12}>
          <FarmAvatar
            farmAddress={farmAddress}
            textStyle={{ fontSize: 30, fontWeight: 700 }}
          />
          <TimeCountDown
            label="End in"
            endTime={Math.floor(endDate.toNumber())}
          />
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
            <SpaceVertical label="Liquidity">
              <Typography.Title level={4}>
                <FarmLiquidity farmAddress={farmAddress} />
              </Typography.Title>
            </SpaceVertical>
          </Col>
          {/* Own Shares */}
          <Col>
            <Space direction="vertical" size={0}>
              <SpaceVertical label="Your staked">
                <Tooltip
                  title={<PriceTooltip farmAddress={farmAddress} />}
                  arrowPointAtCenter
                >
                  <Typography.Title level={4}>
                    {util.numeric(stakedData.amount).format('0,0.[00]')} LP
                  </Typography.Title>
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
