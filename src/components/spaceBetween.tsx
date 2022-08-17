import { CSSProperties, ReactNode } from 'react'

import { Col, ColProps, Row, RowProps } from 'antd'

type SpaceBetweenProps = {
  floatContent?: ReactNode
  children?: ReactNode
  align?: RowProps['align']
  wrap?: boolean
  gutter?: RowProps['gutter']
  style?: CSSProperties
  childFlex?: ColProps['flex']
}

const SpaceBetween = ({
  floatContent,
  children,
  align = 'middle',
  wrap = true,
  gutter,
  style,
  childFlex,
}: SpaceBetweenProps) => (
  <Row gutter={gutter} align={align} wrap={wrap}>
    <Col flex="auto" style={{ ...style }}>
      {children}
    </Col>
    {!!floatContent && <Col flex={childFlex}>{floatContent}</Col>}
  </Row>
)

export default SpaceBetween
