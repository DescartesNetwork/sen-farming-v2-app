import { util } from '@sentre/senhub'
import { BN } from '@project-serum/anchor'

import { Col, Row, Typography } from 'antd'
import MintAvatarPrice from 'components/mintAvatarPrice'
import SpaceBetween from 'components/spaceBetween'
import { useGetDebtReward } from 'hooks/debt/useGetDebtReward'

import { usePendingRewards } from 'hooks/usePendingRewards'
import { useCallback, useEffect, useState } from 'react'
import HarvestAmount from './harvestAmount'

const HarvestInfos = ({ farmAddress }: { farmAddress: string }) => {
  const pendingRewards = usePendingRewards(farmAddress)
  const [totalReward, setTotalReward] = useState(new BN(0))
  const getDebtReward = useGetDebtReward(farmAddress)

  const updateReward = useCallback(async () => {
    const totalReward = await getDebtReward()
    setTotalReward(totalReward.div(new BN(10 ** 9)))
  }, [getDebtReward])

  useEffect(() => {
    const interval = setInterval(() => {
      updateReward()
    }, 1000)
    return () => clearInterval(interval)
  }, [updateReward])

  return (
    <Row gutter={[24, 24]}>
      <Col span={24}>
        {totalReward.toNumber()}
        <SpaceBetween title={<Typography.Text>Your rewards</Typography.Text>}>
          <Typography.Title level={2}>
            ${util.numeric(2.9).format('0,0.[0000]')}
          </Typography.Title>
        </SpaceBetween>
      </Col>
      {pendingRewards.map((reward, idx) => (
        <Col span={24} key={reward.mint + idx}>
          <SpaceBetween
            title={
              <MintAvatarPrice
                mintAddress={reward.mint}
                style={{ fontSize: 16 }}
              />
            }
          >
            <HarvestAmount reward={reward} />
          </SpaceBetween>
        </Col>
      ))}
    </Row>
  )
}

export default HarvestInfos
