import { useMemo, useState } from 'react'
import { utilsBN } from '@sen-use/web3'
import { useMintDecimals, util } from '@sentre/senhub'

import { Row, Col, Typography, Button, Space, Card } from 'antd'
import ExtraTypography from '../extraTypography'
import CardNumbericInput from 'components/cardNumbericInput'

import { useFarmData } from 'hooks/farm/useFarmData'
import { useStake } from 'hooks/actions/useStake'
import { useDebtOracle } from 'hooks/debt/useDebtOracle'

const Stake = ({ farmAddress }: { farmAddress: string }) => {
  const [inAmount, setInAmount] = useState<string>('')
  const farmData = useFarmData(farmAddress)
  const { stake, loading } = useStake(farmAddress)
  const debtOracle = useDebtOracle(farmAddress)
  const decimals =
    useMintDecimals({
      mintAddress: farmData.inputMint.toBase58(),
    }) || 0

  const yourAmountIn = useMemo(() => {
    const inAmountNumber = Number(inAmount)
    if (inAmountNumber === 0) return 0
    return inAmountNumber
  }, [inAmount])

  const totalAmountIn = useMemo(() => {
    return utilsBN.undecimalize(
      debtOracle.deposit(utilsBN.decimalize(yourAmountIn, decimals)),
      decimals,
    )
  }, [debtOracle, decimals, yourAmountIn])

  const boostByNFT = useMemo(() => {
    if (!Number(totalAmountIn)) return 0
    return util
      .numeric(Number(totalAmountIn) - Number(yourAmountIn))
      .format('0,0.[000000000000]')
  }, [totalAmountIn, yourAmountIn])

  const onFullyStake = async () => {
    await stake({
      farm: farmAddress,
      nfts: [],
      inAmount: Number(inAmount),
    })
    setInAmount('')
  }

  return (
    <Row gutter={[16, 16]} style={{ height: '100%' }}>
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
              content={`${yourAmountIn || 0} LP`}
            />
            <ExtraTypography
              label="Boost by NFT"
              content={`+ ${boostByNFT} LP`}
            />

            <Row align="middle">
              <Col flex={'auto'}>
                <Typography.Text type="secondary">Total</Typography.Text>
              </Col>
              <Col>
                <Typography.Title
                  style={{ color: '#A0E86F' }}
                  level={4}
                >{`${Number(totalAmountIn)} LP`}</Typography.Title>
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
