import { Col, Row, Typography } from 'antd'
import TotalPendingReward from 'components/debt/totalPendingReward'
import MintAvatarPrice from 'components/mintAvatarPrice'
import SpaceBetween from 'components/spaceBetween'

import { useConvertRewards } from 'hooks/useConvertRewards'
import HarvestAmount from './harvestAmount'

const HarvestInfos = ({ farmAddress }: { farmAddress: string }) => {
  const convertRewards = useConvertRewards(farmAddress)

  return (
    <Row gutter={[24, 24]}>
      <Col span={24}>
        <SpaceBetween title={<Typography.Text>Your rewards</Typography.Text>}>
          <Typography.Title level={2}>
            <TotalPendingReward farmAddress={farmAddress} />
          </Typography.Title>
        </SpaceBetween>
      </Col>
      {convertRewards.map((reward, idx) => (
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
