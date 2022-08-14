import moment from 'moment'

import { Col, Row, Space, Typography, Tooltip, Divider } from 'antd'
import SpaceBetween from 'components/spaceBetween'
import { MintAvatar, MintSymbol } from '@sen-use/components'

import { DATE_FORMAT } from 'constant'
import IonIcon from '@sentre/antd-ionicon'
import { useFarmRewards } from 'hooks/farmInfos/useFarmRewards'

const Explain = ({ farmAddress }: { farmAddress: string }) => {
  const farmRewards = useFarmRewards(farmAddress)

  return (
    <Row gutter={[8, 8]}>
      <Col span={24}>
        <Typography.Text className="caption">Daily reward</Typography.Text>
      </Col>
      <Col span={24}>
        <Space direction="vertical" style={{ width: '100%' }}>
          {farmRewards.map((reward) => (
            <SpaceBetween
              key={reward.rewardMint.toBase58()}
              title={
                <Space>
                  <MintAvatar mintAddress={reward.rewardMint} />
                  <MintSymbol mintAddress={reward.rewardMint} />
                </Space>
              }
            >
              <Typography.Title level={5}>1000/Week</Typography.Title>
            </SpaceBetween>
          ))}
        </Space>
      </Col>
      <Col span={24}>
        <SpaceBetween
          title={<Typography.Text className="caption">End at</Typography.Text>}
        >
          <Typography.Title level={5}>
            {moment(Date.now()).format(DATE_FORMAT)}
          </Typography.Title>
        </SpaceBetween>
      </Col>
      <Col span={24}>
        <Divider style={{ margin: 4 }} />
      </Col>
      <Col span={24}>
        <Typography.Text>
          To get SNTR and ZET rewards, you need to join the pool by
          participating in the liquidity offering. Rewards will be distributed
          weekly.
        </Typography.Text>
      </Col>
    </Row>
  )
}

const APRInfo = ({ farmAddress }: { farmAddress: string }) => {
  return (
    <Tooltip title={<Explain farmAddress={farmAddress} />}>
      <IonIcon name="information-circle-outline" className="icon-describe" />
    </Tooltip>
  )
}

export default APRInfo
