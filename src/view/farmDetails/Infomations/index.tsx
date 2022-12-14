import { Fragment } from 'react'

import { Card, Col, Divider, Row } from 'antd'
import UnstakeNFT from 'actions/unStakeNFT'
import CardHarvest from './cardHarvest'
import CardRewards from './cardRewards'
import CardHeader from './cardHeader'

import { useFarmBoosting } from 'hooks/farm/useFarmBoosting'

const FarmInfomations = ({ farmAddress }: { farmAddress: string }) => {
  const farmBoostingData = useFarmBoosting(farmAddress)

  return (
    <Card bordered={false} style={{ height: '100%' }}>
      <Row gutter={[24, 24]}>
        <Col span={24}>
          <CardHeader farmAddress={farmAddress} />
        </Col>
        <Col xs={24} md={12} lg={24} xl={12}>
          <CardHarvest farmAddress={farmAddress} />
        </Col>
        <Col xs={24} md={12} lg={24} xl={12}>
          <CardRewards farmAddress={farmAddress} />
        </Col>
        {!!farmBoostingData.length && (
          <Fragment>
            <Col span={24}>
              <Divider style={{ margin: 0 }} />
            </Col>
            <Col span={24}>
              <UnstakeNFT farmAddress={farmAddress} />
            </Col>
          </Fragment>
        )}
      </Row>
    </Card>
  )
}

export default FarmInfomations
