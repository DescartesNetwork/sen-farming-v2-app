import moment from 'moment'

import { Col, Row, Space, Typography, Tooltip, Divider } from 'antd'
import SpaceBetween from 'components/spaceBetween'
import { MintAvatar, MintSymbol } from '@sen-use/components'

import { MINTS } from './index'
import { DATE_FORMAT } from 'constant'
import IonIcon from '@sentre/antd-ionicon'

const Explain = () => (
  <Row gutter={[8, 8]}>
    <Col span={24}>
      <Typography.Text className="caption">Daily reward</Typography.Text>
    </Col>
    <Col span={24}>
      <Space direction="vertical" style={{ width: '100%' }}>
        {MINTS.map((mintAddress) => (
          <SpaceBetween
            key={mintAddress}
            lefValue={
              <Space>
                <MintAvatar mintAddress={mintAddress} />
                <MintSymbol mintAddress={mintAddress} />
              </Space>
            }
            rightValue={
              <Typography.Title level={5}>1000/Week</Typography.Title>
            }
          />
        ))}
      </Space>
    </Col>
    <Col span={24}>
      <SpaceBetween
        lefValue={<Typography.Text className="caption">End at</Typography.Text>}
        rightValue={
          <Typography.Title level={5}>
            {moment(Date.now()).format(DATE_FORMAT)}
          </Typography.Title>
        }
      />
    </Col>
    <Col span={24}>
      <Divider style={{ margin: 4 }} />
    </Col>
    <Col span={24}>
      <Typography.Text>
        To get SNTR and ZET rewards, you need to join the pool by participating
        in the liquidity offering. Rewards will be distributed weekly.
      </Typography.Text>
    </Col>
  </Row>
)

const APRInfo = () => {
  return (
    <Tooltip title={<Explain />}>
      <IonIcon name="information-circle-outline" className="icon-describe" />
    </Tooltip>
  )
}

export default APRInfo
