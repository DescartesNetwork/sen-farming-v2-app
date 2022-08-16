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
      const amountPerWeek = reward.totalRewards
        .mul(new BN(secondPerWeek))
        .div(farmOracle.get_lifetime())
      return {
        mint: reward.rewardMint,
        amount: amountPerWeek,
        total: reward.totalRewards,
      }
    })
  }, [farmOracle, rewards])

  return (
    <Card bordered={false} style={{ background: '#2D2E2D', height: '100%' }}>
      <Row gutter={[12, 12]}>
        <Col>
          <SpaceBetween title={<Typography.Text>Farm rewards</Typography.Text>}>
            {/* trick to align title */}
            <Col span={24} style={{ height: 41 }} />
          </SpaceBetween>
        </Col>

        {/* Rewards mint a */}
        {farmRewardsDaily.map(({ mint, amount, total }, idx) => (
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
              <Space
                size={0}
                direction="vertical"
                style={{ textAlign: 'right' }}
              >
                <Typography.Title level={5}>
                  <MintAmount
                    mintAddress={mint}
                    amount={total}
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
                  {' / Week'}
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
