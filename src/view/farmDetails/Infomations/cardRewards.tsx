import { CSSProperties, useMemo } from 'react'
import { BN } from '@project-serum/anchor'

import { Card, Col, Row, RowProps, Space, Typography } from 'antd'
import { MintAvatar, MintSymbol } from '@sen-use/components'
import SpaceBetween from 'components/spaceBetween'
import MintAmount from 'components/mint/mintAmount'
import { useFarmRewards } from 'hooks/farm/useFarmRewards'
import { useFarmOracle } from 'hooks/farm/useFarmOracle'

type CardRewardsProps = {
  farmAddress: string
  background?: string
  style?: CSSProperties
  bodyStyle?: CSSProperties
  bordered?: boolean
  gutter?: RowProps['gutter']
  titleHeight?: number
  size?: number
  align?: RowProps['align']
}
const CardRewards = ({
  farmAddress,
  background = '#2D2E2D',
  style,
  bodyStyle,
  bordered = false,
  gutter = [12, 12],
  titleHeight = 41,
  size = 24,
  align = 'top',
}: CardRewardsProps) => {
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
    <Card
      bordered={bordered}
      style={{ height: '100%', background, ...style }}
      bodyStyle={{ ...bodyStyle }}
    >
      <Row gutter={gutter}>
        <Col>
          <SpaceBetween title={<Typography.Text>Farm rewards</Typography.Text>}>
            {/* trick to align title */}
            <Col span={24} style={{ height: titleHeight }} />
          </SpaceBetween>
        </Col>

        {/* Rewards mint a */}
        {farmRewardsDaily.map(({ mint, amount, total }, idx) => (
          <Col span={24} key={mint.toBase58() + idx}>
            <SpaceBetween
              title={
                <Space>
                  <MintAvatar size={size} mintAddress={mint} />
                  <MintSymbol mintAddress={mint} />
                </Space>
              }
              align={align}
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
