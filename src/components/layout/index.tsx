import { Col, Row } from 'antd'

type LayoutProps = {
  children: JSX.Element
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <Row justify="center">
      <Col xs={24} md={20} lg={16}>
        {children}
      </Col>
    </Row>
  )
}

export default Layout
