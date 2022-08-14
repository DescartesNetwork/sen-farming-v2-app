import IonIcon from '@sentre/antd-ionicon'

import { Row, Col, Typography, Button } from 'antd'
import MintNumberInput from 'components/mintNumberInput'

import { useFarmData } from 'hooks/farm/useFarmData'
import { useState } from 'react'

const UnStake = ({ farmAddress }: { farmAddress: string }) => {
  const farmData = useFarmData(farmAddress)
  const [outAmount, setOutAmount] = useState<string>('')

  return (
    <Row gutter={[16, 16]}>
      <Col span={24}>
        <Typography.Text type="secondary">
          <IonIcon name="alert-circle-outline" /> The pending reward will be
          automatically harvested when you unstake.
        </Typography.Text>
      </Col>
      <Col span={24}>
        <MintNumberInput
          mint={farmData.inputMint.toBase58()}
          value={outAmount}
          onChange={setOutAmount}
        />
      </Col>
      <Col span={24}>
        <Button
          type="primary"
          block
          style={{ background: '#FF666E', borderColor: '#FF666E' }}
        >
          Unstake
        </Button>
      </Col>
    </Row>
  )
}

export default UnStake
