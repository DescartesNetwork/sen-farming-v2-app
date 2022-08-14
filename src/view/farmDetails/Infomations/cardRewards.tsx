import { util } from '@sentre/senhub'

import { Card, Col, Row, Typography } from 'antd'
import FarmAvatar from 'components/farm/farmAvatar'
import SpaceBetween from 'components/spaceBetween'

const CardRewards = ({ farmAddress }: { farmAddress: string }) => {
  return (
    <Card bordered={false} style={{ background: '#2D2E2D', height: '100%' }}>
      <Row gutter={[24, 24]}>
        <Col>
          <Typography.Text>Farm rewards</Typography.Text>
        </Col>
        {/* Rewards mint a */}
        <Col span={24}>
          <SpaceBetween
            title={<FarmAvatar size={24} farmAddress={farmAddress} />}
          >
            <Typography.Title level={5}>
              {util.numeric(1000).format('0,0.[0000]')}/Week
            </Typography.Title>
          </SpaceBetween>
        </Col>
        {/* Rewards mint b */}
        <Col span={24}>
          <SpaceBetween
            title={<FarmAvatar size={24} farmAddress={farmAddress} />}
          >
            <Typography.Title level={5}>
              {util.numeric(1000).format('0,0.[0000]')}/Week
            </Typography.Title>
          </SpaceBetween>
        </Col>
      </Row>
    </Card>
  )
}

export default CardRewards
