import { useParams } from 'react-router-dom'

import { Col, Row } from 'antd'
import FarmInfo from './Infomations'
import FarmActions from './farmActions'
import Layout from 'components/layout'

const FarmDetails = () => {
  const { farmAddress } = useParams<{ farmAddress: string }>()

  return (
    <Layout>
      <Row gutter={[24, 24]}>
        <Col span={14}>
          <FarmInfo farmAddress={farmAddress} />
        </Col>
        <Col span={10}>
          <FarmActions farmAddress={farmAddress} />
        </Col>
      </Row>
    </Layout>
  )
}

export default FarmDetails
