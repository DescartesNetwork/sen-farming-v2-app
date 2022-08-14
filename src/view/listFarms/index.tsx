import LazyLoad from '@sentre/react-lazyload'
import { useSelector } from 'react-redux'
import { useCallback, useEffect, useState } from 'react'

import { Button, Col, Input, Row } from 'antd'
import FarmCard from './farmCard'
import FilterFarms from './filterFarms'
import Layout from 'components/layout'
import Banner from 'components/banner'

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
          <FilterFarms />
        </Col>
        <Col span={24}>
          <Row justify="space-between" align="middle">
            <Col xs={20} lg={12}>
              <Input placeholder="Search by name, address" />
            </Col>
            <Col>
              <Button onClick={() => pushHistory('/create-farm')} ghost>
                Add farm
              </Button>
            </Col>
          </Row>
        </Col>
        {/* List Farms */}
        <Col span={24}>
          <Row gutter={[12, 12]}>
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
