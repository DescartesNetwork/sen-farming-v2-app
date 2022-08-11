import { ReactNode } from 'react'

import { Col, Row } from 'antd'

type SpaceBetweenProps = { lefValue: ReactNode; rightValue: ReactNode }

const SpaceBetween = ({ lefValue, rightValue }: SpaceBetweenProps) => (
  <Row>
    <Col flex="auto">{lefValue}</Col>
    <Col>{rightValue}</Col>
  </Row>
)

export default SpaceBetween
