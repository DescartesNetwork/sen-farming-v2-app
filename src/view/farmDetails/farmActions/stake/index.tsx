import { useMemo, useState } from 'react'
import IonIcon from '@sentre/antd-ionicon'

import { Row, Col, Typography, Button, Space, Card } from 'antd'
import ExtraTypography from '../extraTypography'

import CardNumbericInput from 'components/cardNumbericInput'
import { useFarmData } from 'hooks/farm/useFarmData'
import { useStake } from 'hooks/actions/useStake'

const Stake = ({ farmAddress }: { farmAddress: string }) => {
  const [inAmount, setInAmount] = useState<string>('')
  const farmData = useFarmData(farmAddress)
  const { stake, loading } = useStake(farmAddress)

  const onFullyStake = async () => {
    await stake({
      farm: farmAddress,
      nfts: [],
      inAmount: Number(inAmount),
    })
    setInAmount('')
  }

  const boostAmount = useMemo(() => {
    return 0
  }, [])

  return (
    <Row gutter={[16, 16]} style={{ height: '100%' }}>
      <Col span={24}>
        <Typography.Text type="secondary">
          <IonIcon name="alert-circle-outline" /> The pending reward will be
          automatically harvested when you stake more.
        </Typography.Text>
      </Col>
      <Col span={24}>
        <CardNumbericInput
          mint={farmData.inputMint.toBase58()}
          value={inAmount}
          onChange={setInAmount}
        />
      </Col>

      <Col span={24}>
        <Card
          bodyStyle={{ padding: 12 }}
          style={{ boxShadow: 'none', borderRadius: 8, background: '#2D2E2D' }}
          bordered={false}
        >
          <Space size={8} direction="vertical" style={{ width: '100%' }}>
            <ExtraTypography
              label="Your stake"
              content={`${inAmount || 0} LP`}
            />
            <ExtraTypography
              label="Boost by NFT"
              content={`+ ${boostAmount} LP`}
            />

            <Row align="middle">
              <Col flex={'auto'}>
                <Typography.Text type="secondary">Total</Typography.Text>
              </Col>
              <Col>
                <Typography.Title style={{ color: '#A0E86F' }} level={4}>{`${
                  inAmount || 0 + boostAmount
                } LP`}</Typography.Title>
              </Col>
            </Row>
          </Space>
        </Card>
      </Col>
      <Col span={24}>
        <Button
          size="large"
          type="primary"
          block
          disabled={!Number(inAmount)}
          loading={loading}
          onClick={onFullyStake}
        >
          {!Number(inAmount) ? 'Enter an amount' : 'Stake'}
        </Button>
      </Col>
      {/* <Col span={24}>
        <Button type="text" style={{ color: '#a0e86f' }} block>
          Get <MintSymbol mintAddress={farmData.inputMint} />
        </Button>
      </Col> */}
    </Row>
  )
}

export default Stake
