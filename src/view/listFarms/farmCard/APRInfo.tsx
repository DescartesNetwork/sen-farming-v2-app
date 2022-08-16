import { Col, Row, Space, Typography, Divider } from 'antd'
import SpaceBetween from 'components/spaceBetween'
import { MintAvatar, MintSymbol } from '@sen-use/components'

import { useFarmRewards } from 'hooks/farm/useFarmRewards'

const APRInfo = ({ farmAddress }: { farmAddress: string }) => {
  const farmRewards = useFarmRewards(farmAddress)

  return (
    <Row gutter={[8, 8]}>
      <Col span={24}>
        <Typography.Text className="caption">Farm reward</Typography.Text>
      </Col>
      <Col span={24}>
        <Space direction="vertical" style={{ width: '100%' }}>
          {farmRewards.map((reward) => (
            <SpaceBetween
              key={reward.rewardMint.toBase58()}
              title={
                <Space>
                  <MintAvatar mintAddress={reward.rewardMint} />
                  <MintSymbol mintAddress={reward.rewardMint} />
                </Space>
              }
            >
              <Typography.Title level={5}>1000/Week</Typography.Title>
            </SpaceBetween>
          ))}
        </Space>
      </Col>
      <Col span={24}>
        <Divider style={{ margin: 4 }} />
      </Col>
      <Col span={24}>
        <Typography.Text>
          To get SNTR and ZET rewards, you need to join the pool by
          participating in the liquidity offering. Rewards will be distributed
          weekly.
        </Typography.Text>
      </Col>
    </Row>
  )
}

export default APRInfo
