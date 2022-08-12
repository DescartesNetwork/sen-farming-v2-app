import { MintSelection } from '@sen-use/components'
import IonIcon from '@sentre/antd-ionicon'
import { Button, Col, Input, Row, Typography } from 'antd'

import { useSPLToken } from 'hooks/useSPLToken'
import { MINT_STYLE, Reward } from '../index'

type RewardTokenProps = {
  reward: Reward
  index: number
  onDelete: (index: number) => void
  onChange: (index: number, value: Partial<Reward>) => void
}

const RewardToken = ({
  reward,
  index,
  onDelete,
  onChange,
}: RewardTokenProps) => {
  const { mints } = useSPLToken()

  return (
    <Row gutter={[8, 8]}>
      <Col span={24}>
        <Row align="middle">
          <Col flex="auto">
            <Typography.Text>Token #{index + 1}</Typography.Text>
          </Col>
          {index !== 0 && (
            <Col>
              <Button
                onClick={() => onDelete(index)}
                type="text"
                icon={<IonIcon name="trash-outline" />}
              />
            </Col>
          )}
        </Row>
      </Col>
      <Col span={12}>
        <MintSelection
          value={reward.mintAddress}
          mints={mints}
          style={{ ...MINT_STYLE, textAlign: 'left' }}
          onChange={(mintAddress) =>
            onChange(index, { ...reward, mintAddress })
          }
        />
      </Col>
      <Col span={12}>
        <Input
          value={reward.budget}
          style={{ height: 40 }}
          placeholder="Enter budget"
          name="budget"
          onChange={(e) =>
            onChange(index, { ...reward, budget: e.target.value })
          }
        />
      </Col>
    </Row>
  )
}

export default RewardToken
