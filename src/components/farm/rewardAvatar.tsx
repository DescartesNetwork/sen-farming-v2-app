import { useMemo } from 'react'
import { useSelector } from 'react-redux'

import { Space } from 'antd'
import { MintAvatar } from '@sen-use/components'

import { AppState } from 'model'

const RewardAvatar = ({ farm }: { farm: string }) => {
  const rewards = useSelector((state: AppState) => state.rewards)

  const farmRewards = useMemo(
    () =>
      Object.values(rewards).filter(
        (reward) => reward.farm.toBase58() === farm,
      ),
    [farm, rewards],
  )

  return (
    <Space size={4}>
      {farmRewards.map((reward) => (
        <MintAvatar
          key={reward.rewardMint.toBase58()}
          mintAddress={reward.rewardMint}
        />
      ))}
    </Space>
  )
}

export default RewardAvatar
