import { useMemo, useState } from 'react'
import { utilsBN } from '@sen-use/web3'

import { Row, Col, Button } from 'antd'
import CardNumbericInput from 'components/cardNumbericInput'

import { useUnstake } from 'hooks/actions/useUnstake'
import { useStakedData } from 'hooks/debt/useStakedData'
import { useDebtData } from 'hooks/debt/useDebtData'
import { PRECISION } from 'constant'
import { useMintDecimals } from '@sentre/senhub/dist'

const UnStake = ({ farmAddress }: { farmAddress: string }) => {
  const [outAmount, setOutAmount] = useState<string>('')
  const stakedData = useStakedData(farmAddress)
  const { unstake, loading } = useUnstake(farmAddress)
  const debtData = useDebtData(farmAddress)
  const decimal = useMintDecimals({ mintAddress: stakedData.inputMint }) || 0

  const onUnstake = async () => {
    await unstake({ amount: Number(outAmount) })
    setOutAmount('')
  }

  const available = useMemo(() => {
    if (!debtData) return 0
    const total = debtData.shares.mul(PRECISION).div(debtData.leverage)
    return Number(utilsBN.undecimalize(total, decimal))
  }, [debtData, decimal])

  return (
    <Row gutter={[16, 16]}>
      <Col span={24}>
        <CardNumbericInput
          available={available}
          value={outAmount}
          onChange={setOutAmount}
          mint={stakedData.inputMint}
        />
      </Col>
      <Col span={24}>
        <Button
          type="primary"
          size="large"
          block
          disabled={!Number(outAmount)}
          loading={loading}
          onClick={onUnstake}
          danger
        >
          Unstake
        </Button>
      </Col>
    </Row>
  )
}

export default UnStake
