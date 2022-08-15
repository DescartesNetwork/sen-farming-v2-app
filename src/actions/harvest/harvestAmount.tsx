import { Space, Typography } from 'antd'
import MintAmount from 'components/mint/mintAmount'
import MintPrice from 'components/mint/mintPrice'

import { PendingRewardData } from 'hooks/useConvertRewards'

type HarvestAmountProps = { reward: PendingRewardData }
const HarvestAmount = ({ reward }: HarvestAmountProps) => {
  return (
    <Space direction="vertical" size={0} style={{ textAlign: 'right' }}>
      <Typography.Title level={5}>
        <MintAmount
          mintAddress={reward.mint}
          amount={reward.amount}
          format="0,0.[00000]"
        />
      </Typography.Title>
      <Typography.Text type="secondary">
        <MintPrice mintAddress={reward.mint} />
      </Typography.Text>
    </Space>
  )
}

export default HarvestAmount
