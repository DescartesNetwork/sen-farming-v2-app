import { useEffect } from 'react'
import LazyLoad, { forceCheck } from '@sentre/react-lazyload'

import { Button, Col, Row, Spin } from 'antd'
import FarmCard from './farmCard'
import Layout from 'components/layout'
import Banner from 'components/banner'
import SpaceBetween from 'components/spaceBetween'
import SegmentedFarm from './segmentedFarm'
import FilterFarm from 'actions/filterFarm'

import { useAppRouter } from 'hooks/useAppRouter'
import { useSearchedFarms } from 'hooks/farms/useSearchedFarms'
import useFilterFarm from 'hooks/farms/useFilterFarms'
import { useSortFarms } from 'hooks/farms/useSortFarms'

const Farms = () => {
  const { pushHistory } = useAppRouter()
  const filter = useFilterFarm()
  const search = useSearchedFarms(filter.filteredFarm)
  const sortedFarm = useSortFarms(search.searchedFarms)

  useEffect(() => {
    setTimeout(() => forceCheck(), 500)
  }, [sortedFarm])

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
              New Farm
            </Button>
          </SpaceBetween>
        </Col>
        <Col span={24}>
          <FilterFarm />
        </Col>
        {/* List Farms */}

        <Col span={24}>
          <Spin
            spinning={search.loading || filter.loading}
            style={{ minHeight: 200 }}
          >
            <Row gutter={[24, 24]}>
              {sortedFarm.map((farmAddress) => (
                <Col xs={24} lg={12} key={farmAddress}>
                  <LazyLoad height={230.05}>
                    <FarmCard farmAddress={farmAddress} />
                  </LazyLoad>
                </Col>
              ))}
            </Row>
          </Spin>
        </Col>
      </Row>
    </Layout>
  )
}

export default Farms
