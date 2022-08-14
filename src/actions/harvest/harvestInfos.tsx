import { util } from '@sentre/senhub'

import { Col, Row, Space, Typography } from 'antd'
import FarmAvatar from 'components/farmAvatar'
import SpaceBetween from 'components/spaceBetween'

const HarvestInfos = ({ farmAddress }: { farmAddress: string }) => {
  return (
    <Row gutter={[24, 24]}>
      <Col span={24}>
        <SpaceBetween title={<Typography.Text>Your rewards</Typography.Text>}>
          <Typography.Title level={2}>
            ${util.numeric(2.9).format('0,0.[00]')}
          </Typography.Title>
        </SpaceBetween>
      </Col>
      {/* Mint a */}
      <Col span={24}>
        <SpaceBetween
          title={<FarmAvatar farmAddress={farmAddress} showPrice size={32} />}
        >
          <Space direction="vertical" size={0}>
            <Typography.Title level={4}>195</Typography.Title>
            <Typography.Text type="secondary">
              ${util.numeric(19.81).format('0,0.[00]')}
            </Typography.Text>
          </Space>
        </SpaceBetween>
      </Col>
      {/* Mint b */}
      <Col span={24}>
        <SpaceBetween
          title={<FarmAvatar farmAddress={farmAddress} showPrice size={32} />}
        >
          <Space direction="vertical" size={0}>
            <Typography.Title level={4}>195</Typography.Title>
            <Typography.Text type="secondary">
              ${util.numeric(19.81).format('0,0.[00]')}
            </Typography.Text>
          </Space>
        </SpaceBetween>
      </Col>
    </Row>
  )
}

export default HarvestInfos
