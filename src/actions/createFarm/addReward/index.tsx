import { Button, Col, Row, Typography } from 'antd'
import IonIcon from '@sentre/antd-ionicon'
import RewardToken from './rewardToken'

import { DEFAULT_REWARD_TOKEN, Reward } from '../index'

type AddRewardProps = {
  tokenRewards: Reward[]
  setTokenRewards: (value: Reward[]) => void
}

const AddReward = ({ tokenRewards, setTokenRewards }: AddRewardProps) => {
  const onAddReward = () => {
    const nextReward = [...tokenRewards]
    nextReward.push(DEFAULT_REWARD_TOKEN)
    return setTokenRewards(nextReward)
  }

  const onDelete = (index: number) => {
    const nextReward = [...tokenRewards]
    nextReward.splice(index, 1)
    return setTokenRewards(nextReward)
  }

  const onChange = (index: number, value: Partial<Reward>) => {
    const nextReward = [...tokenRewards]
    const oldData = { ...nextReward[index] }
    nextReward[index] = { ...oldData, ...value }
    return setTokenRewards(nextReward)
  }

  return (
    <Row gutter={[8, 8]}>
      <Col span={24}>
        <Typography.Title level={5}>Rewards</Typography.Title>
      </Col>
      {tokenRewards.map((reward, index) => (
        <Col span={24} key={index}>
          <RewardToken
            onChange={onChange}
            reward={reward}
            index={index}
            onDelete={onDelete}
          />
        </Col>
      ))}
      <Col span={24} />
      <Col span={24}>
        <Button
          size="large"
          icon={<IonIcon name="add-outline" />}
          type="dashed"
          block
          onClick={onAddReward}
        >
          Add more
        </Button>
      </Col>
    </Row>
  )
}

export default AddReward
