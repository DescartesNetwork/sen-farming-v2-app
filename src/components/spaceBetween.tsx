import { ReactNode } from 'react'

import { Col, Row } from 'antd'

type SpaceBetweenProps = { title: ReactNode; children?: ReactNode }

const SpaceBetween = ({ title, children }: SpaceBetweenProps) => (
  <Row align="middle">
    <Col flex="auto">{title}</Col>
    <Col>{children}</Col>
  </Row>
)

export default SpaceBetween
