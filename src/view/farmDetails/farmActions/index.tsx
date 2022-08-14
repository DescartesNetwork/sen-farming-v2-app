import { Card, Col, Row, Segmented, Tabs } from 'antd'
import { Fragment, useState } from 'react'
import Stake from './stake'
import UnStake from './unStake'

export const FARM_ACTIONS: Record<string, string> = {
  Stake: 'Stake',
  Unstake: 'Unstake',
}

const FarmActions = ({ farmAddress }: { farmAddress: string }) => {
  const [farmAction, setFarmAction] = useState(FARM_ACTIONS.Stake)

  return (
    <Card bordered={false} style={{ height: '100%' }}>
      <Row gutter={[16, 16]} style={{ height: '100%' }}>
        <Col span={24}>
          <Segmented
            value={farmAction}
            options={Object.keys(FARM_ACTIONS).map((key) => {
              return { label: key, value: FARM_ACTIONS[key] }
            })}
            onChange={(val) => setFarmAction(val.toString())}
          />
        </Col>
        <Col span={24}>
          <Tabs
            defaultActiveKey="stake"
            activeKey={farmAction}
            style={{ width: '100%', height: '100%' }}
            renderTabBar={() => <Fragment />}
          >
            <Tabs.TabPane
              tab="Stake"
              key="Stake"
              style={{ width: '100%', height: '100%' }}
            >
              <Stake farmAddress={farmAddress} />
            </Tabs.TabPane>
            <Tabs.TabPane tab="Unstake" key="Unstake">
              <UnStake farmAddress={farmAddress} />
            </Tabs.TabPane>
          </Tabs>
        </Col>
      </Row>
    </Card>
  )
}

export default FarmActions
