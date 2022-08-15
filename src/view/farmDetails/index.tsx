import { useParams } from 'react-router-dom'

import { Col, Row } from 'antd'
import FarmInfo from './Infomations'
import FarmActions from './farmActions'
import Layout from 'components/layout'
import FarmDetailsHeader from './farmDetailsHeader'

const FarmDetails = () => {
  const { farmAddress } = useParams<{ farmAddress: string }>()

  return (
    <Layout>
      <Row gutter={[24, 24]}>
        <Col span={24}>
          <FarmDetailsHeader />
        </Col>
        <Col xs={24} lg={14}>
          <FarmInfo farmAddress={farmAddress} />
        </Col>
        <Col xs={24} lg={10}>
          <FarmActions farmAddress={farmAddress} />
        </Col>
      </Row>
    </Layout>
  )
}

export default FarmDetails