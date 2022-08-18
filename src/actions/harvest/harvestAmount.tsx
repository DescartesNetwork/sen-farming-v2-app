import { MintAmount, MintTotalValue } from '@sen-use/app/dist'
import { Space, Typography } from 'antd'

import { PendingRewardData } from 'hooks/useConvertRewards'

type HarvestAmountProps = { reward: PendingRewardData }
const HarvestAmount = ({ reward }: HarvestAmountProps) => {
  return (
    <Space direction="vertical" size={0} style={{ textAlign: 'right' }}>
      <Typography.Title level={5}>
        <MintAmount
          mintAddress={reward.mint}
          amount={reward.amount}
          formatter="0,0.[00000]"
        />
      </Typography.Title>
      <Typography.Text type="secondary">
        <MintTotalValue mintAddress={reward.mint} amount={reward.amount} />
      </Typography.Text>
    </Space>
  )
}

export default HarvestAmount
