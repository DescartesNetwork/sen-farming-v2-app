import { Space } from 'antd'
import { MintAvatar } from '@sen-use/components'

import { useFarmRewards } from 'hooks/farmInfos/useFarmRewards'

const RewardAvatar = ({ farmAddress }: { farmAddress: string }) => {
  const farmRewards = useFarmRewards(farmAddress)

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
