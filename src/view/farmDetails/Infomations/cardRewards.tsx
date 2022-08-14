import { util } from '@sentre/senhub'

import { Card, Col, Row, Space, Typography } from 'antd'
import { MintAvatar, MintSymbol } from '@sen-use/components'
import SpaceBetween from 'components/spaceBetween'

import { useFarmRewards } from 'hooks/farm/useFarmRewards'

const CardRewards = ({ farmAddress }: { farmAddress: string }) => {
  const rewards = useFarmRewards(farmAddress)

  return (
    <Card bordered={false} style={{ background: '#2D2E2D', height: '100%' }}>
      <Row gutter={[24, 24]}>
        <Col>
          <Typography.Text>Farm rewards</Typography.Text>
        </Col>
        {/* Rewards mint a */}
        {rewards.map((reward) => (
          <Col span={24}>
            <SpaceBetween
              title={
                <Space>
                  <MintAvatar size={24} mintAddress={reward.rewardMint} />
                  <MintSymbol mintAddress={reward.rewardMint} />
                </Space>
              }
            >
              <Typography.Title level={5}>
                {util.numeric(Math.random() * 1000).format('0,0.[0000]')}/Week
              </Typography.Title>
            </SpaceBetween>
          </Col>
        ))}
      </Row>
    </Card>
  )
}

export default CardRewards
