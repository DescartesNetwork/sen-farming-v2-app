import { util } from '@sentre/senhub'

import { Col, Row, Space, Typography } from 'antd'
import { FarmApr, FarmLiquidity } from 'components/farm'
import FarmAvatar from 'components/farm/farmAvatar'
import SpaceVertical from 'components/spaceVertical'
import TimeCountDown from 'components/timeCountDown'

import { useStakedData } from 'hooks/debt/useStakedData'
import { useStakedTotalValue } from 'hooks/debt/useStakedTotalValue'
import { useFarmData } from 'hooks/farm/useFarmData'

const FarmHeader = ({ farmAddress }: { farmAddress: string }) => {
  const stakedData = useStakedData(farmAddress)
  const stakedValue = useStakedTotalValue(farmAddress)
  const { endDate } = useFarmData(farmAddress)

  return (
    <Row gutter={[24, 24]}>
      <Col>
        <Space direction="vertical" size={12}>
          <FarmAvatar
            farmAddress={farmAddress}
            textStyle={{ fontSize: 30, fontWeight: 700 }}
          />
          <Space size={6}>
            <Typography.Text type="secondary">End in</Typography.Text>
            <TimeCountDown endTime={Math.floor(endDate.toNumber())} />
          </Space>
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
                <Typography.Title level={4}>
                  {util.numeric(stakedData.amount).format('0,0.[00]')} LP
                </Typography.Title>
              </SpaceVertical>
              <Typography.Text type="secondary">
                {util.numeric(stakedValue).format('$0,0.[00]')}
              </Typography.Text>
            </Space>
          </Col>
          <Col>
            <SpaceVertical label="Your pool share">
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

export default FarmHeader
