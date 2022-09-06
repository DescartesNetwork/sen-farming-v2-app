import { Col, Row } from 'antd'
import SearchFarm from './searchFarm'
import SortFarm from './sortFarm'

import './index.less'

const FilterFarm = () => {
  return (
    <Row gutter={[24, 24]}>
      <Col xs={24} md={8}>
        <SearchFarm />
      </Col>
      <Col flex={1}>
        <SortFarm />
      </Col>
    </Row>
  )
}

export default FilterFarm
