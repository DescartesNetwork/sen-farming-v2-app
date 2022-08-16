import { Col, Row, Space, Typography } from 'antd'
import { MintAvatar, MintSymbol } from '@sen-use/components'
import SpaceBetween from 'components/spaceBetween'
import HarvestButton from 'actions/harvest/harvestButton'

import MintAmount from 'components/mint/mintAmount'
import { useConvertRewards } from 'hooks/useConvertRewards'
import MintTotalValue from 'components/mint/mintTotalValue'

const RewardInfo = ({ farmAddress }: { farmAddress: string }) => {
  const convertRewards = useConvertRewards(farmAddress)

  return (
    <Row gutter={[8, 8]}>
      <Col span={24}>
        <Space direction="vertical" style={{ width: '100%' }}>
          {convertRewards.map(({ mint, amount }) => (
            <SpaceBetween
              key={mint}
              title={
                <Space>
                  <MintAvatar mintAddress={mint} />
                  <MintSymbol mintAddress={mint} />
                </Space>
              }
            >
              <Typography.Title level={5}>
                <MintAmount mintAddress={mint} amount={amount} />{' '}
                <span style={{ color: '#A1A1A1' }}>
                  (<MintTotalValue mintAddress={mint} amount={amount} />)
                </span>
              </Typography.Title>
            </SpaceBetween>
          ))}
        </Space>
      </Col>
      <Col span={24}>
        <HarvestButton farmAddress={farmAddress} />
      </Col>
    </Row>
  )
}

export default RewardInfo
