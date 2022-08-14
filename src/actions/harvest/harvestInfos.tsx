import { MintAvatar } from '@sen-use/components/dist'
import { util } from '@sentre/senhub'

import { Col, Row, Space, Typography } from 'antd'
import SpaceBetween from 'components/spaceBetween'

import { usePendingRewards } from 'hooks/usePendingRewards'

const HarvestInfos = ({ farmAddress }: { farmAddress: string }) => {
  const pendingRewards = usePendingRewards(farmAddress)

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
      {pendingRewards.map((reward) => (
        <Col span={24}>
          <SpaceBetween
            title={<MintAvatar mintAddress={reward.mint} size={32} />}
          >
            <Space direction="vertical" size={0}>
              <Typography.Title level={4}>195</Typography.Title>
              <Typography.Text type="secondary">
                ${util.numeric(19.81).format('0,0.[00]')}
              </Typography.Text>
            </Space>
          </SpaceBetween>
        </Col>
      ))}
    </Row>
  )
}

export default HarvestInfos
