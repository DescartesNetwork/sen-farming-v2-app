import { Col, Row } from 'antd'
import FarmInfomations from './Infomations'
import FarmActions from './farmActions'
import Layout from 'components/layout'

const FarmDetails = () => {
  return (
    <Layout>
      <Row gutter={[24, 24]}>
        <Col span={14}>
          <FarmInfomations />
        </Col>
        <Col span={10}>
          <FarmActions />
        </Col>
      </Row>
    </Layout>
  )
}

export default FarmDetails
