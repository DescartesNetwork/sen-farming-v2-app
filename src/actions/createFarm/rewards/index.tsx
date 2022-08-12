import { Col, Row, Typography } from 'antd'
import React from 'react'
import AddReward from './addReward'

const Rewards = () => {
  return (
    <Row gutter={[8, 8]}>
      <Col span={24}>
        <Typography.Title level={5}>Rewards</Typography.Title>
      </Col>
      <Col span={24}>
        <AddReward />
      </Col>
    </Row>
  )
}

export default Rewards
