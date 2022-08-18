import { useState } from 'react'

import { Button, Col, Row, Switch, Typography } from 'antd'
import IonIcon from '@sentre/antd-ionicon'
import AddBoost from './addBoost'

export const EMPTY_COLLECTION = { collection: '', percentage: 0 }

export type BoostData = {
  collection: string
  percentage: number
}

type BoostNFTProps = {
  boostsData: BoostData[]
  onChange: (collections: BoostData[]) => void
}

const Explanation = () => (
  <Typography.Text className="caption" type="secondary">
    Enabling <span style={{ color: '#A0E86F' }}>Boost</span> means you allow
    users to lock their NFTs to earn extra rewards. You need to set a boost rate
    for every NFT collection you will use as Boosters.
  </Typography.Text>
)

const BoostNFT = ({ boostsData, onChange }: BoostNFTProps) => {
  const [isBoostNFT, setIsBoostNFT] = useState(false)

  const onAddBoost = () => {
    const nextReward = [...boostsData]
    nextReward.push(EMPTY_COLLECTION)
    return onChange(nextReward)
  }

  const onDelete = (index: number) => {
    const nextBoostsData = [...boostsData]
    nextBoostsData.splice(index, 1)
    return onChange(nextBoostsData)
  }
  const onChangeBoost = (index: number, value: Partial<BoostData>) => {
    const nextBoostsData = [...boostsData]
    const oldData = { ...nextBoostsData[index] }
    nextBoostsData[index] = { ...oldData, ...value }
    return onChange(nextBoostsData)
  }

  const onSwitch = (isBoost: boolean) => {
    onChange([EMPTY_COLLECTION])
    if (!isBoost) onChange([]) // remove collection
    setIsBoostNFT(isBoost)
  }

  return (
    <Row gutter={[12, 12]}>
      <Col span={24}>
        <Row gutter={[8, 8]}>
          <Col flex="auto">
            <Typography.Title level={5}>Boost by NFT</Typography.Title>
          </Col>
          <Col>
            <Switch size="small" onChange={onSwitch} />
          </Col>
          <Col span={24}>
            <Explanation />
          </Col>
        </Row>
      </Col>

      {isBoostNFT &&
        boostsData.map((boostData, index) => (
          <Col span={24} key={index}>
            <AddBoost
              onDelete={onDelete}
              index={index}
              boostData={boostData}
              onChange={onChangeBoost}
            />
          </Col>
        ))}

      {isBoostNFT && (
        <Col span={24}>
          <Button
            size="large"
            icon={<IonIcon name="add-outline" />}
            type="dashed"
            block
            onClick={onAddBoost}
          >
            Add more
          </Button>
        </Col>
      )}
    </Row>
  )
}

export default BoostNFT
