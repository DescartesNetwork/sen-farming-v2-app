import { useMintDecimals, util } from '@sentre/senhub'
import { utilsBN } from '@sen-use/web3'

import { Space, Typography } from 'antd'

import { usePrice } from 'hooks/useGetPrice'
import { PendingRewardData } from 'hooks/useConvertRewards'

type HarvestAmountProps = { reward: PendingRewardData }
const HarvestAmount = ({ reward }: HarvestAmountProps) => {
  const price = usePrice(reward.mint)
  const decimals = useMintDecimals({ mintAddress: reward.mint }) || 0
  const mintAmount = Number(utilsBN.undecimalize(reward.amount, decimals))

  return (
    <Space direction="vertical" size={0} style={{ textAlign: 'right' }}>
      <Typography.Title level={5}>
        {util.numeric(mintAmount).format('0,0.[00000]')}
      </Typography.Title>
      <Typography.Text type="secondary">{123}</Typography.Text>
    </Space>
  )
}

export default HarvestAmount
