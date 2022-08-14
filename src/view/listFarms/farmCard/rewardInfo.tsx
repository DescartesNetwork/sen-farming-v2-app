import { Col, Row, Space, Typography, Tooltip } from 'antd'
import { MintAvatar, MintSymbol } from '@sen-use/components'
import IonIcon from '@sentre/antd-ionicon'
import SpaceBetween from 'components/spaceBetween'
import HarvestButton from 'actions/harvest/harvestButton'

import { useFarmRewards } from 'hooks/farm/useFarmRewards'

const Explain = ({ farmAddress }: { farmAddress: string }) => {
  const farmRewards = useFarmRewards(farmAddress)

  return (
    <Row gutter={[8, 8]}>
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
              <Typography.Title level={5}>
                195 <span style={{ color: '#A1A1A1' }}>($1.9)</span>
              </Typography.Title>
            </SpaceBetween>
          ))}
        </Space>
      </Col>
      <Col span={24}>
        <HarvestButton farmAddress="farm address" />
      </Col>
    </Row>
  )
}

const RewardInfo = ({ farmAddress }: { farmAddress: string }) => {
  return (
    <Tooltip title={<Explain farmAddress={farmAddress} />}>
      <IonIcon name="information-circle-outline" className="icon-describe" />
    </Tooltip>
  )
}

export default RewardInfo
