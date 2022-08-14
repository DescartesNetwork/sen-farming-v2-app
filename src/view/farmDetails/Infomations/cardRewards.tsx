import { util } from '@sentre/senhub'

import { Card, Col, Row, Typography } from 'antd'
import FarmAvatar from 'components/farmAvatar'
import SpaceBetween from 'components/spaceBetween'

const CardRewards = () => {
  return (
    <Card bordered={false} style={{ background: '#2D2E2D', height: '100%' }}>
      <Row gutter={[24, 24]}>
        <Col>
          <Typography.Text>Farm rewards</Typography.Text>
        </Col>
        {/* Rewards mint a */}
        <Col span={24}>
          <SpaceBetween
            title={
              <FarmAvatar
                size={24}
                farmAddress="5YwUkPdXLoujGkZuo9B4LsLKj3hdkDcfP4derpspifSJ"
              />
            }
          >
            <Typography.Title level={5}>
              {util.numeric(1000).format('0,0.[0000]')}/Week
            </Typography.Title>
          </SpaceBetween>
        </Col>
        {/* Rewards mint b */}
        <Col span={24}>
          <SpaceBetween
            title={
              <FarmAvatar
                size={24}
                farmAddress="5YwUkPdXLoujGkZuo9B4LsLKj3hdkDcfP4derpspifSJ"
              />
            }
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
