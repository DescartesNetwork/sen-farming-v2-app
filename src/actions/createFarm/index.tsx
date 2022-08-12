import { MintSelection } from '@sen-use/components'
import { Card, Col, Row, Space, Typography } from 'antd'
import Rewards from './rewards'

import './index.less'

const MINT_STYLE = {
  padding: '4px 12px',
  height: 40,
  width: '100%',
  background: '#0A0A0A',
}

const CreateFarm = () => {
  return (
    <Row justify="center">
      <Col xs={24} md={12} lg={10}>
        <Card bordered={false}>
          <Row gutter={[32, 32]}>
            <Col span={24}>
              <Typography.Title level={4}>Add Farm</Typography.Title>
            </Col>
            <Col span={24}>
              <Space direction="vertical" style={{ width: '100%' }}>
                <Typography.Title level={5}>Input</Typography.Title>
                <MintSelection
                  style={{ ...MINT_STYLE, textAlign: 'left' }}
                  placeholder="Select LP token"
                />
              </Space>
            </Col>
            <Col span={24}>
              <Rewards />
            </Col>
          </Row>
        </Card>
      </Col>
    </Row>
  )
}

export default CreateFarm
