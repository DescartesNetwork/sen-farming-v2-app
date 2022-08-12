import { Col, Row, Space, Typography, Tooltip } from 'antd'
import { MintAvatar, MintSymbol } from '@sen-use/components'
import IonIcon from '@sentre/antd-ionicon'
import Harvest from 'actions/harvest'
import SpaceBetween from 'components/spaceBetween'

import { MINTS } from './index'

const Explain = () => (
  <Row gutter={[8, 8]}>
    <Col span={24}>
      <Space direction="vertical" style={{ width: '100%' }}>
        {MINTS.map((mintAddress) => (
          <SpaceBetween
            key={mintAddress}
            title={
              <Space>
                <MintAvatar mintAddress={mintAddress} />
                <MintSymbol mintAddress={mintAddress} />
              </Space>
            }
          >
            <Typography.Title level={5}>
              195 <span style={{ color: '#A1A1A1' }}>($1.9)</span>
            </Typography.Title>
          </SpaceBetween>
        ))}
      </Space>
    </Col>
    <Col span={24}>
      <Harvest farmAddress="farm address" />
    </Col>
  </Row>
)

const RewardInfo = () => {
  return (
    <Tooltip title={<Explain />}>
      <IonIcon name="information-circle-outline" className="icon-describe" />
    </Tooltip>
  )
}

export default RewardInfo
