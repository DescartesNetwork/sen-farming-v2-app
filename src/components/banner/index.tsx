import { Card, Col, Image, Row, Space, Typography } from 'antd'

import IconBanner from 'static/images/icon-banner.png'
import './index.less'

const Banner = () => {
  const textStyle = { color: 'inherit' }
  const style = { color: '#141413' }

  return (
    <Card
      className="banner"
      bordered={false}
      style={{ overflow: 'hidden' }}
      bodyStyle={{ padding: '24px 32px' }}
    >
      <Row
        gutter={[24, 24]}
        style={{ position: 'relative', zIndex: 8, ...style }}
      >
        <Col span={24}>
          <Typography.Title level={4} style={{ ...textStyle }}>
            Sen Farming V2
          </Typography.Title>
        </Col>
        <Col span={24}>
          <Space size={64}>
            {/* Total value stake */}
            <Space direction="vertical">
              <Typography.Text style={{ ...textStyle }}>
                Total value staked
              </Typography.Text>
              <Typography.Title level={3} style={{ ...textStyle }}>
                $460,944.63
              </Typography.Title>
            </Space>
            {/* Your rewards */}
            <Space direction="vertical">
              <Typography.Text style={{ ...textStyle }}>
                Total your rewards
              </Typography.Text>
              <Typography.Title level={3} style={{ ...textStyle }}>
                $0
              </Typography.Title>
            </Space>
          </Space>
        </Col>
      </Row>
      <div className="icon-banner">
        <Image src={IconBanner} preview={false} />
      </div>
    </Card>
  )
}

export default Banner
