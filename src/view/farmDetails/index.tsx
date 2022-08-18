import { util } from '@sentre/senhub'
import { useParams } from 'react-router-dom'

import { Col, Row } from 'antd'
import FarmInfo from './Infomations'
import FarmActions from './farmActions'
import Layout from 'components/layout'
import NotFound from './notFound'
import FarmDetailsHeader from './farmDetailsHeader'

import { useFarmData } from 'hooks/farm/useFarmData'

const FarmDetails = () => {
  const { farmAddress } = useParams<{ farmAddress: string }>()
  const farmData = useFarmData(farmAddress)

  if (!util.isAddress(farmAddress) || !farmData) return <NotFound />

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
