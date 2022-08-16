import { useMemo } from 'react'
import { BN } from '@project-serum/anchor'

import { Card, Col, Row, Space, Typography } from 'antd'
import { MintAvatar, MintSymbol } from '@sen-use/components'
import SpaceBetween from 'components/spaceBetween'
import MintAmount from 'components/mint/mintAmount'
import { useFarmRewards } from 'hooks/farm/useFarmRewards'
import { useFarmOracle } from 'hooks/farm/useFarmOracle'

const CardRewards = ({ farmAddress }: { farmAddress: string }) => {
  const farmOracle = useFarmOracle(farmAddress)
  const rewards = useFarmRewards(farmAddress)

  const farmRewardsDaily = useMemo(() => {
    return rewards.map((reward) => {
      const secondPerWeek = 60 * 60 * 24 * 7
      const amountPerDay = reward.totalRewards
        .mul(new BN(secondPerWeek))
        .div(farmOracle.get_lifetime())
      return {
        mint: reward.rewardMint,
        amount: amountPerDay,
      }
    })
  }, [farmOracle, rewards])

  return (
    <Card bordered={false} style={{ background: '#2D2E2D', height: '100%' }}>
      <Row gutter={[24, 24]}>
        <Col>
          <Typography.Text>Farm rewards</Typography.Text>
        </Col>
        {/* Rewards mint a */}
        {farmRewardsDaily.map(({ mint, amount }, idx) => (
          <Col span={24} key={mint.toBase58() + idx}>
            <SpaceBetween
              title={
                <Space>
                  <MintAvatar size={24} mintAddress={mint} />
                  <MintSymbol mintAddress={mint} />
                </Space>
              }
              align="top"
            >
              <Space direction="vertical" style={{ textAlign: 'right' }}>
                <Typography.Title level={5}>
                  <MintAmount
                    mintAddress={mint}
                    amount={amount}
                    format="0,0.[00]"
                  />
                </Typography.Title>
                <Typography.Text type="secondary">
                  <MintAmount
                    mintAddress={mint}
                    amount={amount}
                    format="0,0.[00]"
                    perDate
                  />
                  {' / day'}
                </Typography.Text>
              </Space>
            </SpaceBetween>
          </Col>
        ))}
      </Row>
    </Card>
  )
}

export default CardRewards
