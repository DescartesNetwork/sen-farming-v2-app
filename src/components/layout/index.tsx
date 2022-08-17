import { Col, Row } from 'antd'

type LayoutProps = {
  children: JSX.Element
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <Row justify="center">
      <Col style={{ maxWidth: 1140, width: '100%' }}>{children}</Col>
    </Row>
  )
}

export default Layout
