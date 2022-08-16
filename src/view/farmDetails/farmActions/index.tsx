import { useState } from 'react'
import { useWalletAddress, util } from '@sentre/senhub'

import { Card, Col, Row, Tabs } from 'antd'
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
          <Tabs
            defaultActiveKey="Stake"
            activeKey={farmAction}
            style={{ width: '100%', height: '100%' }}
            onChange={setFarmAction}
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
            <Tabs.TabPane
              tab="Transfer Ownership"
              key="Transfer"
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
