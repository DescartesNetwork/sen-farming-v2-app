import { useMemo, useState } from 'react'
import { util } from '@sentre/senhub'

import { Button, Card, Col, Row, Space, Typography } from 'antd'
import { MintSelection } from '@sen-use/components'
import AddReward from './addReward'
import AddTime, { Time } from './addTime'
import BoostNFT, { BoostData } from './boostNFT'

import { useAppRouter } from 'hooks/useAppRouter'
import { useCreateFarm } from 'hooks/actions/useCreateFarm'

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
  const [boostsData, setBoostsData] = useState<BoostData[]>([])
  const [mintFarm, setMintFarm] = useState('')
  const [time, setTime] = useState({
    startAt: 0,
    endAt: 0,
  })
  const { initializeFarm, loading } = useCreateFarm()

  const { pushHistory } = useAppRouter()

  const onChangeTime = (name: keyof Time, value: number) => {
    return setTime({ ...time, [name]: value })
  }

  const onCreateFarm = async () => {
    await initializeFarm({
      inputMint: mintFarm,
      startAt: time.startAt,
      endAt: time.endAt,
      boostsData,
      tokenRewards,
    })
  }

  const errorMsg = useMemo(() => {
    if (!util.isAddress(mintFarm)) return 'Select input mint'
    if (!Number(time.endAt)) return 'Select end time'
    for (const reward of tokenRewards) {
      if (!util.isAddress(reward.mintAddress)) return 'Select reward mint'
      if (!Number(reward.budget)) return 'Enter budget amount'
    }
    for (const boost of boostsData) {
      if (!util.isAddress(boost.collection)) return 'Select NFT collection'
      if (!Number(boost.percentage)) return 'Enter NFT coefficient'
    }
  }, [boostsData, mintFarm, time.endAt, tokenRewards])

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
              <Button
                size="large"
                type="primary"
                onClick={onCreateFarm}
                block
                disabled={!!errorMsg}
                loading={loading}
              >
                {!!errorMsg ? errorMsg : 'Add'}
              </Button>
            </Col>
          </Row>
        </Card>
      </Col>
    </Row>
  )
}

export default CreateFarm
