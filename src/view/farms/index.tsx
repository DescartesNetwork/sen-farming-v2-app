import { Button, Col, Input, Row } from 'antd'
import FarmCard from './farmCard'
import FilterFarms from './filterFarms'
import Layout from 'components/layout'
import Banner from 'components/banner'

import { useAppRouter } from 'hooks/useAppRouter'

const Farms = () => {
  const { pushHistory } = useAppRouter()
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
        <Col span={24}>
          <Row gutter={[12, 12]}>
            {['1', '2', '3', '4'].map((farmAddress) => (
              <Col xs={24} lg={12} key={farmAddress}>
                <FarmCard farmAddress={farmAddress} />
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
    </Layout>
  )
}

export default Farms
