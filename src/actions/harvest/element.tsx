import { Address } from '@project-serum/anchor'

import {
  MintAvatar,
  MintSymbol,
  MintAmount,
  MintTotalValue,
} from '@sen-use/app'
import { Col, Row, Typography } from 'antd'

import { useConvertRewards } from 'hooks/useConvertRewards'

type ElementProps = {
  farmAddress: Address
}
const Element = ({ farmAddress }: ElementProps) => {
  const convertRewards = useConvertRewards(farmAddress.toString())

  return (
    <Row gutter={[8, 8]}>
      {convertRewards.map(({ amount, mint }) => (
        <Col>
          <Row gutter={[8, 8]} justify="space-between">
            <Col>
              <MintAvatar mintAddress={mint} />
              <MintSymbol mintAddress={mint} />
            </Col>
            <Col flex={1}>
              <Row justify="end">
                <Col>
                  <Typography.Text>
                    <MintAmount mintAddress={mint} amount={amount} />
                  </Typography.Text>
                  <Typography.Text type="secondary">
                    (<MintTotalValue mintAddress={mint} amount={amount} />)
                  </Typography.Text>
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
      ))}
    </Row>
  )
}

export default Element
