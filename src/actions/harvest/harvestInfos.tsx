import { util } from '@sentre/senhub'

import { Col, Row, Typography } from 'antd'
import MintAvatarPrice from 'components/mintAvatarPrice'
import SpaceBetween from 'components/spaceBetween'

import { usePendingRewards } from 'hooks/usePendingRewards'
import HarvestAmount from './harvestAmount'

const HarvestInfos = ({ farmAddress }: { farmAddress: string }) => {
  const pendingRewards = usePendingRewards(farmAddress)

  return (
    <Row gutter={[24, 24]}>
      <Col span={24}>
        <SpaceBetween title={<Typography.Text>Your rewards</Typography.Text>}>
          <Typography.Title level={2}>
            ${util.numeric(2.9).format('0,0.[0000]')}
          </Typography.Title>
        </SpaceBetween>
      </Col>
      {pendingRewards.map((reward, idx) => (
        <Col span={24} key={reward.mint + idx}>
          <SpaceBetween
            title={
              <MintAvatarPrice
                mintAddress={reward.mint}
                style={{ fontSize: 16 }}
              />
            }
          >
            <HarvestAmount reward={reward} />
          </SpaceBetween>
        </Col>
      ))}
    </Row>
  )
}

export default HarvestInfos
