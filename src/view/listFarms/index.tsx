import LazyLoad from '@sentre/react-lazyload'
import { useSelector } from 'react-redux'
import { useCallback, useEffect, useState } from 'react'

import { Button, Col, Row } from 'antd'
import FarmCard from './farmCard'
import Layout from 'components/layout'
import Banner from 'components/banner'
import SpaceBetween from 'components/spaceBetween'
import SegmentedFarm from './segmentedFarm'
import FilterFarm from 'actions/filterFarm'

import { useAppRouter } from 'hooks/useAppRouter'
import { AppState } from 'model'

const Farms = () => {
  const farms = useSelector((state: AppState) => state.farms)
  const rewards = useSelector((state: AppState) => state.rewards)
  const [filteredFarms, setFilteredFarms] = useState<string[]>([])
  const { pushHistory } = useAppRouter()

  // Filter farms has rewards
  const filterFarms = useCallback(() => {
    const filteredFarms: string[] = []
    for (const reward of Object.values(rewards)) {
      const farmAddr = reward.farm.toBase58()
      if (filteredFarms.includes(farmAddr) || !farms[farmAddr]) continue
      filteredFarms.push(farmAddr)
    }
    return setFilteredFarms(filteredFarms)
  }, [farms, rewards])

  useEffect(() => {
    filterFarms()
  }, [filterFarms])

  return (
    <Layout>
      <Row gutter={[24, 24]}>
        <Col span={24}>
          <Banner />
        </Col>
        <Col span={24}>
          <SpaceBetween
            gutter={[16, 16]}
            style={{ flexGrow: 10 }}
            title={<SegmentedFarm />}
            childFlex={1}
          >
            <Button onClick={() => pushHistory('/create-farm')} ghost block>
              Add farm
            </Button>
          </SpaceBetween>
        </Col>
        <Col span={24}>
          <FilterFarm />
        </Col>
        {/* List Farms */}
        <Col span={24}>
          <Row gutter={[24, 24]}>
            {filteredFarms.map((farmAddress) => (
              <Col xs={24} lg={12} key={farmAddress}>
                <LazyLoad height={196}>
                  <FarmCard farmAddress={farmAddress} />
                </LazyLoad>
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
    </Layout>
  )
}

export default Farms
