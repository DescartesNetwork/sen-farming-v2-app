import { ReactNode } from 'react'

import { Col, Row } from 'antd'

type SpaceBetweenProps = {
  title: ReactNode
  children?: ReactNode
  align?: 'top' | 'middle' | 'bottom' | 'stretch'
}

const SpaceBetween = ({
  title,
  children,
  align = 'middle',
}: SpaceBetweenProps) => (
  <Row align={align}>
    <Col flex="auto">{title}</Col>
    <Col>{children}</Col>
  </Row>
)

export default SpaceBetween
