import { useState } from 'react'

import { Button, Col, Row, Switch, Typography } from 'antd'
import IonIcon from '@sentre/antd-ionicon'
import AddBoost from './addBoost'

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
    Enable <span style={{ color: '#A0E86F' }}>Boost</span> means that you will
    allow users to use NFTs to increase their contribution. You need to set the
    corresponding plus percentage for each NFT collection.
  </Typography.Text>
)

const BoostNFT = ({ boostsData, onChange }: BoostNFTProps) => {
  const [isBoostNFT, setIsBoostNFT] = useState(false)

  const onAddBoost = () => {
    const nextReward = [...boostsData]
    nextReward.push({ collection: '', percentage: 0 })
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
    if (!isBoost) onChange([]) // remove collection
    setIsBoostNFT(isBoost)
  }

  return (
    <Row gutter={[12, 12]}>
      <Col span={24}>
        <Row gutter={[8, 8]}>
          <Col flex="auto">
            <Typography.Title level={5}>Boosted by NFT</Typography.Title>
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
        boostsData.map((boosData, index) => (
          <Col span={24} key={index}>
            <AddBoost
              onDelete={onDelete}
              index={index}
              boosData={boosData}
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
