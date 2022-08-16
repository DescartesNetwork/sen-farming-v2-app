import { Fragment, useState } from 'react'
import { useWalletAddress, util } from '@sentre/senhub'

import { Card, Col, Row, Segmented, Tabs } from 'antd'
import Stake from './stake'
import UnStake from './unStake'
import TransferOwner from 'actions/transferOwner'

import { useFarmData } from 'hooks/farm/useFarmData'

export const FARM_ACTIONS: Record<string, string> = {
  Stake: 'Stake',
  Unstake: 'Unstake',
  Transfer: 'Transfer Ownership',
}

const FarmActions = ({ farmAddress }: { farmAddress: string }) => {
  const [farmAction, setFarmAction] = useState(FARM_ACTIONS.Stake)
  const { authority } = useFarmData(farmAddress)
  const walletAddress = useWalletAddress()

  const disabled =
    !util.isAddress(walletAddress) || walletAddress !== authority.toBase58()

  return (
    <Card bordered={false} style={{ height: '100%' }}>
      <Row gutter={[16, 16]} style={{ height: '100%' }}>
        <Col span={24}>
          <Segmented
            value={farmAction}
            options={Object.keys(FARM_ACTIONS)
              .filter((key) => {
                if (key === 'Transfer') return !disabled
                return true
              })
              .map((key) => {
                return { label: FARM_ACTIONS[key], value: FARM_ACTIONS[key] }
              })}
            onChange={(val) => setFarmAction(val.toString())}
          />
        </Col>
        <Col span={24}>
          <Tabs
            defaultActiveKey={FARM_ACTIONS.Stake}
            activeKey={farmAction}
            style={{ width: '100%', height: '100%' }}
            onChange={setFarmAction}
            renderTabBar={() => <Fragment />}
          >
            <Tabs.TabPane tab={FARM_ACTIONS.Stake} key={FARM_ACTIONS.Stake}>
              <Stake farmAddress={farmAddress} />
            </Tabs.TabPane>

            <Tabs.TabPane tab={FARM_ACTIONS.Unstake} key={FARM_ACTIONS.Unstake}>
              <UnStake farmAddress={farmAddress} />
            </Tabs.TabPane>
            <Tabs.TabPane
              tab={FARM_ACTIONS.Transfer}
              key={FARM_ACTIONS.Transfer}
              disabled={disabled}
            >
              <TransferOwner farmAddress={farmAddress} />
            </Tabs.TabPane>
          </Tabs>
        </Col>
      </Row>
    </Card>
  )
}

export default FarmActions
