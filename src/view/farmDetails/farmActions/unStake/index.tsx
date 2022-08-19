import { useState } from 'react'

import { Row, Col, Button } from 'antd'
import { useUnstake } from 'hooks/actions/useUnstake'
import { useStakedData } from 'hooks/debt/useStakedData'
import CardNumbericInput from 'components/cardNumbericInput'

const UnStake = ({ farmAddress }: { farmAddress: string }) => {
  const [outAmount, setOutAmount] = useState<string>('')
  const stakedData = useStakedData(farmAddress)
  const { unstake, loading } = useUnstake(farmAddress)

  const onUnstake = async () => {
    await unstake({ amount: Number(outAmount) })
    setOutAmount('')
  }

  return (
    <Row gutter={[16, 16]}>
      <Col span={24}>
        <CardNumbericInput
          available={stakedData.amount}
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
