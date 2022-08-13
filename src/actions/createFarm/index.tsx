import { useState } from 'react'

import { Button, Card, Col, Row, Space, Typography } from 'antd'
import { MintSelection } from '@sen-use/components'
import AddReward from './addReward'
import AddTime, { Time } from './addTime'
import BoostNFT, { BoostData } from './boostNFT'

import { useAppRouter } from 'hooks/useAppRouter'
import { useNewFarm } from 'hooks/actions/useNewFarm'

import './index.less'

export const MINT_STYLE = {
  padding: '4px 12px',
  height: 40,
  width: '100%',
  background: '#0A0A0A',
}

export type Reward = {
  mintAddress: string
  budget: string
}

export const DEFAULT_REWARD_TOKEN = {
  mintAddress: '',
  budget: '',
}

const CreateFarm = () => {
  const [tokenRewards, setTokenRewards] = useState<Reward[]>([
    DEFAULT_REWARD_TOKEN,
  ])
  const [boostsData, setBoostsData] = useState<BoostData[]>([
    { collection: '', percentage: 0 },
  ])
  const [mintFarm, setMintFarm] = useState('')
  const [time, setTime] = useState({
    startAt: 0,
    endAt: 0,
  })
  const { initializeFarm } = useNewFarm()
  const { pushHistory } = useAppRouter()

  const onChangeTime = (name: keyof Time, value: number) => {
    return setTime({ ...time, [name]: value })
  }

  const addFarm = async () => {
    await initializeFarm({
      inputMint: mintFarm,
      startAfter: time.startAt,
      endAfter: time.endAt,
    })
  }

  return (
    <Row justify="center">
      <Col xs={24} md={12} lg={10}>
        <Card bordered={false}>
          <Row gutter={[32, 32]}>
            <Col span={24}>
              <Typography.Title level={4}>Add Farm</Typography.Title>
            </Col>
            <Col span={24}>
              <Space direction="vertical" style={{ width: '100%' }}>
                <Typography.Title level={5}>Input</Typography.Title>
                <MintSelection
                  value={mintFarm}
                  onChange={setMintFarm}
                  style={{ ...MINT_STYLE, textAlign: 'left' }}
                  placeholder="Select LP token"
                />
              </Space>
            </Col>
            <Col span={24}>
              <AddReward
                tokenRewards={tokenRewards}
                setTokenRewards={setTokenRewards}
              />
            </Col>
            <Col span={24}>
              <AddTime time={time} onChange={onChangeTime} />
            </Col>
            <Col span={24}>
              <BoostNFT onChange={setBoostsData} boostsData={boostsData} />
            </Col>
            <Col span={12}>
              <Button
                onClick={() => pushHistory('/farms')}
                size="large"
                ghost
                block
              >
                Cancel
              </Button>
            </Col>
            <Col span={12}>
              <Button size="large" type="primary" onClick={addFarm} block>
                Add
              </Button>
            </Col>
          </Row>
        </Card>
      </Col>
    </Row>
  )
}

export default CreateFarm
