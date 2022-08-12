import { util } from '@sentre/senhub'

import { Col, Row, Space, Typography } from 'antd'
import FarmAvatar from 'components/farmAvatar'
import SpaceVertical from 'components/spaceVertical'
import TimeCountDown from 'components/timeCountDown'

const FarmHeader = () => {
  return (
    <Row gutter={[24, 24]}>
      {/* Farm avatar, name , end time */}
      <Col>
        <Space direction="vertical" size={12}>
          <FarmAvatar
            farmAddress={'7EgNqh13vcDSP8q3qYDHa6thA1fk7PkCDvJviJieq9dR'}
            textStyle={{ fontSize: 30, fontWeight: 700 }}
          />
          <Space size={6}>
            <Typography.Text type="secondary">End in</Typography.Text>
            <TimeCountDown endTime={Date.now() / 1000 + 86900} />
          </Space>
        </Space>
      </Col>

      {/* Apr, liquidity, staked */}
      <Col span={24}>
        <Row justify="space-between">
          <Col>
            <SpaceVertical label="APR">
              <Typography.Title style={{ color: '#A0E86F' }} level={4}>
                50.5%
              </Typography.Title>
            </SpaceVertical>
          </Col>
          <Col>
            <SpaceVertical label="Liquidity">
              <Typography.Title level={4}>
                ${util.numeric(91327.8112132).format('0,0.[00]')}
              </Typography.Title>
            </SpaceVertical>
          </Col>
          <Col>
            <Space direction="vertical" size={0}>
              <SpaceVertical label="Your staked">
                <Typography.Title level={4}>
                  {util.numeric(1.5112132).format('0,0.[00]')}LP
                </Typography.Title>
              </SpaceVertical>
              <Typography.Text type="secondary">$198.5</Typography.Text>
            </Space>
          </Col>
          <Col>
            <SpaceVertical label="Your pool share">
              <Typography.Title level={4}>
                {util.numeric(1.5112132).format('0,0.[00]')}LP
              </Typography.Title>
            </SpaceVertical>
          </Col>
        </Row>
      </Col>
    </Row>
  )
}

export default FarmHeader