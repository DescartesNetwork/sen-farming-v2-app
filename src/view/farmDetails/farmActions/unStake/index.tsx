import { useState } from 'react'

import IonIcon from '@sentre/antd-ionicon'
import { Row, Col, Typography, Button } from 'antd'
import { useUnstake } from 'hooks/actions/useUnstake'
import { useStakedData } from 'hooks/debt/useStakedData'
import CardNumbericInput from 'components/cardNumbericInput'

const UnStake = ({ farmAddress }: { farmAddress: string }) => {
  const [outAmount, setOutAmount] = useState<string>('')
  const stakedData = useStakedData(farmAddress)
  const { unstake, loading } = useUnstake(farmAddress)

  return (
    <Row gutter={[16, 16]}>
      <Col span={24}>
        <Typography.Text type="secondary">
          <IonIcon name="alert-circle-outline" /> The pending reward will be
          automatically harvested when you unstake.
        </Typography.Text>
      </Col>
      <Col span={24}>
        <CardNumbericInput
          available={stakedData.amount}
          value={outAmount}
          onChange={setOutAmount}
        />
      </Col>
      <Col span={24}>
        <Button
          type="primary"
          block
          style={{ background: '#FF666E', borderColor: '#FF666E' }}
          disabled={!Number(outAmount)}
          loading={loading}
          onClick={() => unstake({ amount: Number(outAmount) })}
        >
          Unstake
        </Button>
      </Col>
    </Row>
  )
}

export default UnStake