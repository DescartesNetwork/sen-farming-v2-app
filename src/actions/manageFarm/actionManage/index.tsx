import { Fragment, useState } from 'react'

import { Col, Row, Segmented, Tabs } from 'antd'
import Seed from './seed'
import UnSeed from './unSeed'
import FreezeOrThaw from './freezeOrThaw'
import Close from './close'

export const MANANGE_ACTIONS: Record<string, string> = {
  Seed: 'Seed',
  Unseed: 'Unseed',
  FreezeThaw: 'Freeze/Thaw',
  Close: 'Close',
}

const ActionManageFarm = () => {
  const [manageAction, setManageAction] = useState(MANANGE_ACTIONS.Seed)

  return (
    <Row gutter={[16, 16]} style={{ height: '100%' }}>
      <Col span={24}>
        <Segmented
          value={manageAction}
          options={Object.keys(MANANGE_ACTIONS).map((key) => {
            return { label: key, value: MANANGE_ACTIONS[key] }
          })}
          onChange={(val) => setManageAction(val.toString())}
        />
      </Col>
      <Col span={24}>
        <Tabs
          defaultActiveKey={MANANGE_ACTIONS.Seed}
          activeKey={manageAction}
          style={{ width: '100%', height: '100%' }}
          renderTabBar={() => <Fragment />}
        >
          {/* Seed */}
          <Tabs.TabPane
            tab={MANANGE_ACTIONS.Seed}
            key={MANANGE_ACTIONS.Seed}
            style={{ width: '100%', height: '100%' }}
          >
            <Seed />
          </Tabs.TabPane>

          {/* Un Seed */}
          <Tabs.TabPane
            tab={MANANGE_ACTIONS.Unseed}
            key={MANANGE_ACTIONS.Unseed}
          >
            <UnSeed />
          </Tabs.TabPane>

          {/* Freeze or Thaw farm */}
          <Tabs.TabPane
            tab={MANANGE_ACTIONS.FreezeThaw}
            key={MANANGE_ACTIONS.FreezeThaw}
          >
            <FreezeOrThaw />
          </Tabs.TabPane>

          {/* Close Farm */}
          <Tabs.TabPane tab={MANANGE_ACTIONS.Close} key={MANANGE_ACTIONS.Close}>
            <Close />
          </Tabs.TabPane>
        </Tabs>
      </Col>
    </Row>
  )
}

export default ActionManageFarm
