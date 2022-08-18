import { useMemo, useState } from 'react'
import { utilsBN } from '@sen-use/web3'
import { useMintDecimals, util } from '@sentre/senhub'

import { Row, Col, Typography, Button, Space, Card } from 'antd'
import CardNumbericInput from 'components/cardNumbericInput'
import SpaceBetween from 'components/spaceBetween'
import { MintSymbol } from '@sen-use/app'

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
            {/* Your stake */}
            <SpaceBetween
              floatContent={
                <Space size={6}>
                  <Typography.Title level={5}>
                    {yourAmountIn || 0}
                  </Typography.Title>
                  <Typography.Title level={5}>
                    <MintSymbol mintAddress={farmData.inputMint.toBase58()} />
                  </Typography.Title>
                </Space>
              }
            >
              <Typography.Text type="secondary">Your stake</Typography.Text>
            </SpaceBetween>
            {/* Boosted by NFT */}
            <SpaceBetween
              floatContent={
                <Space size={6}>
                  <Typography.Title level={5}>+{boostByNFT}</Typography.Title>
                  <Typography.Title level={5}>
                    <MintSymbol mintAddress={farmData.inputMint.toBase58()} />
                  </Typography.Title>
                </Space>
              }
            >
              <Typography.Text type="secondary">Boosted by NFT</Typography.Text>
            </SpaceBetween>
            {/* Total staked */}
            <SpaceBetween
              floatContent={
                <Space size={6}>
                  <Typography.Title
                    style={{ color: '#A0E86F' }}
                    level={4}
                  >{`${Number(totalAmountIn)}`}</Typography.Title>
                  <Typography.Title level={5}>
                    <MintSymbol mintAddress={farmData.inputMint.toBase58()} />
                  </Typography.Title>
                </Space>
              }
            >
              <Typography.Text type="secondary">Total</Typography.Text>
            </SpaceBetween>
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
