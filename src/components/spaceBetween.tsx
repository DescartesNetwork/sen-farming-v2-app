import { CSSProperties, ReactNode } from 'react'

import { Col, ColProps, Row, RowProps } from 'antd'

type SpaceBetweenProps = {
  title?: ReactNode
  children?: ReactNode
  align?: RowProps['align']
  wrap?: boolean
  gutter?: RowProps['gutter']
  style?: CSSProperties
  childFlex?: ColProps['flex']
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
    {!!title && (
      <Col flex="auto" style={{ ...style }}>
        {title}
      </Col>
    )}
    <Col flex={childFlex}>{children}</Col>
  </Row>
)

export default SpaceBetween
