import { util } from '@sentre/senhub'

import { Card, Col, Row, Space, Typography } from 'antd'
import FarmAvatar from 'components/farm/farmAvatar'
import SpaceBetween from 'components/spaceBetween'
import ExploreAddress from './exploreAddress'

import useManageFarm from 'hooks/actions/useManageFarm'

type CardFarmInfosProps = { farmAddress: string }
const CardFarmInfos = ({ farmAddress }: CardFarmInfosProps) => {
  const { liquidity } = useManageFarm()

  return (
    <Card bordered={false}>
      <Row gutter={[16, 16]}>
        {/* Farm avatar */}
        <Col span={24}>
          <SpaceBetween
            title={
              <FarmAvatar
                farmAddress={farmAddress}
                size={32}
                textStyle={{ fontSize: 16, fontWeight: 700 }}
              />
            }
          >
            <ExploreAddress address={farmAddress} />
          </SpaceBetween>
        </Col>
        {/* Reward */}
        <Col span={24}>
          <SpaceBetween
            title={<Typography.Text type="secondary">Rewards</Typography.Text>}
            align="top"
          >
            <Space style={{ textAlign: 'right' }} direction="vertical" size={4}>
              <Typography.Text>
                {util.numeric(liquidity).format('0,0.[00]')} SNTR
              </Typography.Text>
              <Typography.Text>
                {util.numeric(liquidity).format('0,0.[00]')} SNTR
              </Typography.Text>
            </Space>
          </SpaceBetween>
        </Col>
        {/* NFT */}
        <Col span={24}>
          <Row gutter={[4, 4]}>
            {/* Boost state */}
            <Col span={24}>
              <SpaceBetween title="Boost by NFT">
                <Typography.Text style={{ color: '#A0E86F' }}>
                  Enable
                </Typography.Text>
              </SpaceBetween>
            </Col>
            <Col span={24} /> {/* Safe space */}
            {/* Boost title */}
            <Col span={24}>
              <Row gutter={[16, 16]} justify="space-between" wrap={false}>
                <Col span={6}>
                  <Typography.Text type="secondary">
                    NFT collection
                  </Typography.Text>
                </Col>
                <Col flex={1}>
                  <Typography.Text type="secondary">Boost rate</Typography.Text>
                </Col>
              </Row>
            </Col>
            {/* List NFT */}
            <Col span={24}>
              {[1, 2, 3].map((nft, idx) => (
                <Row gutter={[16, 16]} justify="space-between" wrap={false}>
                  <Col span={6}>
                    <Typography.Text>Name NFT {nft}</Typography.Text>
                  </Col>
                  <Col flex={1}>
                    <Typography.Text>
                      {Math.round(Math.random() * 10)}%
                    </Typography.Text>
                  </Col>
                  <Col>
                    <ExploreAddress address={farmAddress} />
                  </Col>
                </Row>
              ))}
            </Col>
          </Row>
        </Col>
      </Row>
    </Card>
  )
}

export default CardFarmInfos
