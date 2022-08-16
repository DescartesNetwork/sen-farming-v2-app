import { useUI, util } from '@sentre/senhub'

import { Card, Col, Image, Row, Space, Typography } from 'antd'
import TotalOwnRewards from 'components/debt/totalOwnRewards'
import { useAllFarmTotalValue } from 'hooks/useAllFarmTotalValue'

import miningImg from 'static/images/mining.png'
import AnimationBg from './animationBg'
import './index.less'

const textStyle = { color: 'inherit' }
const style = { color: '#141413' }

const Banner = () => {
  const tvl = useAllFarmTotalValue()
  const {
    ui: { width },
  } = useUI()

  const isMobile = width < 575
  const justifyAlign = isMobile ? 'center' : 'end'

  return (
    <Card
      className="banner"
      bordered={false}
      style={{ overflow: 'hidden' }}
      bodyStyle={{ padding: '24px 32px' }}
    >
      <Row gutter={[24, 24]} style={{ ...style }} justify={justifyAlign}>
        <Col xs={{ order: 2, span: 24 }} sm={{ order: 1, span: 24 }}>
          <Typography.Title level={2} style={{ ...textStyle }}>
            Sen Farming V2
          </Typography.Title>
        </Col>
        <Col xs={{ order: 3, span: 24 }} sm={{ order: 3, span: 24 }}>
          <Space size={64}>
            {/* Total value stake */}
            <Space direction="vertical">
              <Typography.Text style={{ ...textStyle }}>
                Total Value Staked
              </Typography.Text>
              <Typography.Title level={3} style={{ ...textStyle }}>
                {util.numeric(tvl).format('$0,0.[00]')}
              </Typography.Title>
            </Space>
            {/* Your rewards */}
            <Space direction="vertical">
              <Typography.Text style={{ ...textStyle }}>
                Total Your Rewards
              </Typography.Text>
              <Typography.Title level={3} style={{ ...textStyle }}>
                <TotalOwnRewards />
              </Typography.Title>
            </Space>
          </Space>
        </Col>
        <Col xs={{ order: 1 }} sm={{ order: 4 }}>
          <div className="icon-banner">
            <Space>
              <Image src={miningImg} preview={false} />
              <AnimationBg />
            </Space>
          </div>
        </Col>
      </Row>
    </Card>
  )
}

export default Banner
