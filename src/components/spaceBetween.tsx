import { ReactNode } from 'react'

import { Col, Row } from 'antd'

type SpaceBetweenProps = {
  title: ReactNode
  children?: ReactNode
  align?: 'top' | 'middle' | 'bottom' | 'stretch'
  wrap?: boolean
}

const SpaceBetween = ({
  title,
  children,
  align = 'middle',
  wrap = true,
}: SpaceBetweenProps) => (
  <Row align={align} wrap={wrap}>
    <Col flex="auto">{title}</Col>
    <Col>{children}</Col>
  </Row>
)

export default SpaceBetween
