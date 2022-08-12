import { ReactNode } from 'react'

import { Row, Col, Typography } from 'antd'

const ExtraTypography = ({
  label = '',
  content = '',
}: {
  label?: string
  content?: string | ReactNode
}) => {
  return (
    <Row align="middle">
      <Col flex={'auto'}>
        <Typography.Text type="secondary">{label}</Typography.Text>
      </Col>
      <Col>
        <Typography.Title level={5}>{content}</Typography.Title>
      </Col>
    </Row>
  )
}
export default ExtraTypography
