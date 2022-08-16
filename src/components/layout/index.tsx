import { Col, Row } from 'antd'

type LayoutProps = {
  children: JSX.Element
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <Row justify="center">
      <Col xs={24} style={{ maxWidth: 1140 }}>
        {children}
      </Col>
    </Row>
  )
}

export default Layout
