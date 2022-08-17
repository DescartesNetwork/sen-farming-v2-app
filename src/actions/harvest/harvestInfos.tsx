import { Col, Row, Typography } from 'antd'
import TotalPendingReward from 'components/debt/totalPendingReward'
import MintAvatarPrice from 'components/mintAvatarPrice'
import SpaceBetween from 'components/spaceBetween'

import { useConvertRewards } from 'hooks/useConvertRewards'
import HarvestAmount from './harvestAmount'

const HarvestInfos = ({ farmAddress }: { farmAddress: string }) => {
  const convertRewards = useConvertRewards(farmAddress)

  return (
    <Row gutter={[12, 12]}>
      <Col span={24}>
        <SpaceBetween
          floatContent={
            <Typography.Title level={2}>
              <TotalPendingReward farmAddress={farmAddress} />
            </Typography.Title>
          }
        >
          <Typography.Text>Your rewards</Typography.Text>
        </SpaceBetween>
      </Col>
      {convertRewards.map((reward, idx) => (
        <Col span={24} key={reward.mint + idx}>
          <SpaceBetween floatContent={<HarvestAmount reward={reward} />}>
            <MintAvatarPrice
              mintAddress={reward.mint}
              style={{ fontSize: 16 }}
            />
          </SpaceBetween>
        </Col>
      ))}
    </Row>
  )
}

export default HarvestInfos
