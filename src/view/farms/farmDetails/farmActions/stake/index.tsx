import IonIcon from '@sentre/antd-ionicon'

import { Row, Col, Typography, Button, Space, Card } from 'antd'
import CardNumbericInput from '../cardNumbericInput'
import ExtraTypography from '../extraTypography'

import './index.less'

const Stake = () => {
  return (
    <Row gutter={[16, 16]} style={{ height: '100%' }}>
      <Col span={24}>
        <Typography.Text type="secondary">
          <IonIcon name="alert-circle-outline" /> The pending reward will be
          automatically harvested when you stake more.
        </Typography.Text>
      </Col>
      <Col span={24}>
        <CardNumbericInput />
      </Col>
      <Col span={24}>
        <Space size={6}>
          <Typography.Text>Use NFTs to increase LP</Typography.Text>
          <Typography.Text type="secondary">
            <IonIcon name="alert-circle-outline" />
          </Typography.Text>
        </Space>
      </Col>
      <Col span={24}>
        <Card
          className="upload-box card-nft-image-only"
          bodyStyle={{ padding: 0 }}
        >
          <Button
            type="text"
            className="icon-add-nft"
            icon={<IonIcon name="add-outline" style={{ color: '#a0e86f' }} />}
          />
          <Button
            type="text"
            className="icon-delete-nft"
            icon={<IonIcon name="trash-outline" />}
          />
        </Card>
      </Col>
      <Col span={24}>
        <Card
          bodyStyle={{ padding: 12 }}
          style={{ boxShadow: 'none', borderRadius: 8, background: '#2D2E2D' }}
          bordered={false}
        >
          <Space size={8} direction="vertical" style={{ width: '100%' }}>
            <ExtraTypography label="Your stake" content={'0 LP'} />
            <ExtraTypography label="Boost by NFT" content={'+ 0 LP'} />
            <ExtraTypography label="Total" content={'0 LP'} />
          </Space>
        </Card>
      </Col>
      <Col span={24}>
        <Button type="primary" block>
          Enter an amount
        </Button>
      </Col>
      <Col span={24}>
        <Button type="text" style={{ color: '#a0e86f' }} block>
          Get BTC - SNTR LP
        </Button>
      </Col>
    </Row>
  )
}

export default Stake
