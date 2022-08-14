import { useMintDecimals, util } from '@sentre/senhub'

import { Space, Typography } from 'antd'

import useMintCgk from 'hooks/useMintCgk'
import { PendingRewardData } from 'hooks/usePendingRewards'

type HarvestAmountProps = { reward: PendingRewardData }
const HarvestAmount = ({ reward }: HarvestAmountProps) => {
  const { price } = useMintCgk(reward.mint)
  const decimals = useMintDecimals({ mintAddress: reward.mint }) || 0
  const mintAmount = reward.amount.toNumber() / 10 ** decimals

  return (
    <Space direction="vertical" size={0} style={{ textAlign: 'right' }}>
      <Typography.Title level={5}>
        {util.numeric(mintAmount).format('0,0.[00]')}
      </Typography.Title>
      <Typography.Text type="secondary">
        ${util.numeric(mintAmount * price).format('0,0.[00]')}
      </Typography.Text>
    </Space>
  )
}

export default HarvestAmount
