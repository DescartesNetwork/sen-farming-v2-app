import { Button, Col, Row } from 'antd'
import Layout from 'components/layout'
import Banner from 'components/banner'
import SpaceBetween from 'components/spaceBetween'
import SegmentedFarm from './segmentedFarm'
import FilterFarm from 'actions/filterFarm'

import { useAppRouter } from 'hooks/useAppRouter'
import { ListFarms } from './listFarm'

const Farms = () => {
  const { pushHistory } = useAppRouter()

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
            childFlex={1}
            floatContent={
              <Button onClick={() => pushHistory('/create-farm')} ghost block>
                New Farm
              </Button>
            }
          >
            <SegmentedFarm />
          </SpaceBetween>
        </Col>
        <Col span={24}>
          <FilterFarm />
        </Col>
        <Col span={24}>
          <ListFarms />
        </Col>
      </Row>
    </Layout>
  )
}

export default Farms
