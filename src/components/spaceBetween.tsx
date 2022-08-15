import { CSSProperties, ReactNode } from 'react'

import { Col, Row } from 'antd'
import { Gutter } from 'antd/lib/grid/row'

type SpaceBetweenProps = {
  title: ReactNode
  children?: ReactNode
  align?: 'top' | 'middle' | 'bottom' | 'stretch'
  wrap?: boolean
  gutter?: Gutter | [Gutter, Gutter]
  style?: CSSProperties
  childFlex?: number | 'none' | 'auto' | string
}

const SpaceBetween = ({
  title,
  children,
  align = 'middle',
  wrap = true,
  gutter,
  style,
  childFlex,
}: SpaceBetweenProps) => (
  <Row gutter={gutter} align={align} wrap={wrap}>
    <Col flex="auto" style={{ ...style }}>
      {title}
    </Col>
    <Col flex={childFlex}>{children}</Col>
  </Row>
)

export default SpaceBetween
