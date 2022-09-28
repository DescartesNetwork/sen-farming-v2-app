import { ReactNode, useCallback, useEffect, useMemo, useState } from 'react'
import { BN } from '@project-serum/anchor'
import { util } from '@sentre/senhub'

import { Col, Row, Tooltip, Typography } from 'antd'

import { useFarmBoosting } from 'hooks/farm/useFarmBoosting'
import configs from 'configs'

type NFTToolTipInfoProps = {
  mintAddress: string
  children: ReactNode
  farmAddress: string
}

const NFTToolTipInfo = ({
  mintAddress,
  children,
  farmAddress,
}: NFTToolTipInfoProps) => {
  const [rate, setRate] = useState(new BN(0))
  const farmBoostingData = useFarmBoosting(farmAddress)

  const getBoostRateList = useCallback(async () => {
    let percent = new BN(0)
    const {
      data: { collection },
    } = await configs.sol.metaplexNFT.getNftMetadata(mintAddress)
    if (!collection) return setRate(percent)

    for (const farmData of farmBoostingData) {
      const { boostingCollection, boostingCoefficient } = farmData
      if (boostingCollection.toBase58() === collection.key) {
        percent = boostingCoefficient
        break
      }
    }

    return setRate(percent)
  }, [farmBoostingData, mintAddress])

  const percentage = useMemo(
    () => util.numeric(rate.toNumber() / 10 ** 9).format('0,0.[00]%'),
    [rate],
  )

  useEffect(() => {
    getBoostRateList()
  }, [getBoostRateList])

  return (
    <Tooltip
      title={
        <Row style={{ width: 150 }} align="middle">
          <Col flex="auto">
            <Typography.Text type="secondary">Boosted</Typography.Text>
          </Col>
          <Col>
            <Typography.Text>{percentage}</Typography.Text>
          </Col>
        </Row>
      }
    >
      {children}
    </Tooltip>
  )
}

export default NFTToolTipInfo
