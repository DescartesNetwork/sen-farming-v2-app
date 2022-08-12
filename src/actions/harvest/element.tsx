import React from 'react'
import { Address } from '@project-serum/anchor'

import { MintAvatar, MintSymbol } from '@sen-use/components'
import { Col, Row, Typography } from 'antd'

type ElementProps = {
  farmAddress: Address
}
const Element = ({ farmAddress }: ElementProps) => {
  // To-do: Get mints from redux
  const { mintIn, mintOut } = { mintIn: '', mintOut: '' }

  return (
    <Row gutter={[8, 8]}>
      {[mintIn, mintOut].map((mint) => (
        <Col>
          <Row gutter={[8, 8]} justify="space-between">
            <Col>
              <MintAvatar mintAddress={mintIn} />
              <MintSymbol mintAddress={mintOut} />
            </Col>
            <Col flex={1}>
              <Row justify="end">
                <Col>
                  <Typography.Text>195</Typography.Text>
                  <Typography.Text type="secondary">($1.9)</Typography.Text>
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
