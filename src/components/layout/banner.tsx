import { Card, Col, Image, Row } from 'antd'

import BG from 'static/images/banner.png'

const Banner = () => {
  return (
    <Card className="banner" bordered={false}>
      <Image className="banner-background" preview={false} src={BG} />
      <Row gutter={[24, 24]} className="banner-body">
        <Col span={24} className="banner-material">
          {/* <Image preview={false} src={''} /> */}
        </Col>
      </Row>
    </Card>
  )
}

export default Banner
