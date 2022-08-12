import { Button, Card, Col, Row, Space, Tag, Typography } from 'antd'
import { MintAvatar } from '@sen-use/components'
import RewardInfo from './rewardInfo'
import APRInfo from './APRInfo'
import FarmAvatar from 'components/farmAvatar'

export const MINTS = [
  'zbLcPeHWQ7yQXT7fEYHeNBKGM3wdGhNYL9jryVpys5J',
  'So11111111111111111111111111111111111111112',
]

type FarmCardProps = {
  farmAddress: string
}

const FarmCard = ({ farmAddress }: FarmCardProps) => {
  return (
    <Card bodyStyle={{ padding: '20px 16px' }} hoverable bordered={false}>
      <Row gutter={[20, 20]}>
        <Col span={24}>
          <Row gutter={[8, 8]} align="middle">
            <Col flex="auto">
              <FarmAvatar
                farmAddress={'7EgNqh13vcDSP8q3qYDHa6thA1fk7PkCDvJviJieq9dR'}
                textStyle={{ fontSize: 20, fontWeight: 700 }}
                hoverable
              />
            </Col>
            <Col>
              <Tag
                style={{
                  color: '#A0E86F',
                  background: 'rgba(160, 232, 111, 0.1)',
                  border: 'none',
                  borderRadius: 8,
                  padding: '1px 8px',
                }}
              >
                ⚡ Boost
              </Tag>
            </Col>
            <Col span={24}>
              <Button type="text" style={{ marginLeft: -15 }}>
                Go pool
              </Button>
            </Col>
          </Row>
        </Col>
        <Col span={24}>
          <Row justify="space-between">
            <Col>
              <Space direction="vertical">
                <Space>
                  <Typography.Text type="secondary">APR</Typography.Text>
                  <APRInfo />
                </Space>
                <Typography.Title level={5}>5.05%</Typography.Title>
                <Space size={4}>
                  {MINTS.map((mintAddress) => (
                    <MintAvatar key={mintAddress} mintAddress={mintAddress} />
                  ))}
                </Space>
              </Space>
            </Col>
            <Col>
              <Space direction="vertical">
                <Typography.Text type="secondary">Liquidity</Typography.Text>
                <Typography.Text>$91,327.81</Typography.Text>
              </Space>
            </Col>
            <Col>
              <Space direction="vertical">
                <Space>
                  <Typography.Text type="secondary">
                    Your reward
                  </Typography.Text>
                  <RewardInfo />
                </Space>
                <Typography.Title level={5} style={{ color: '#a0e86f' }}>
                  $2.9
                </Typography.Title>
              </Space>
            </Col>
          </Row>
        </Col>
      </Row>
    </Card>
  )
}

export default FarmCard
