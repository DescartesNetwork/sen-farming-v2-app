import { Col, Image, Row, Typography } from 'antd'
import FarmDetailsHeader from './farmDetailsHeader'

import notFound from 'static/images/notfound.png'

const NotFound = () => {
  return (
    <Row gutter={[64, 64]} justify="center">
      <Col span={24}>
        <FarmDetailsHeader />
      </Col>
      <Col xs={24} md={12}>
        <Row
          gutter={[24, 24]}
          style={{ flexDirection: 'column' }}
          align="middle"
        >
          <Col>
            <Image src={notFound} preview={false} />
          </Col>
          <Col>
            <Typography.Title level={2}>
              Farm Address Not Found.
            </Typography.Title>
          </Col>
        </Row>
      </Col>
    </Row>
  )
}

export default NotFound
