import { Col, Row, Typography, Divider } from 'antd'
import CardRewards from 'view/farmDetails/Infomations/cardRewards'

const APRInfo = ({ farmAddress }: { farmAddress: string }) => {
  return (
    <Row gutter={[8, 8]}>
      <Col span={24}>
        <CardRewards
          background="transparent"
          bodyStyle={{ padding: 4 }}
          farmAddress={farmAddress}
          gutter={[8, 8]}
          titleHeight={0}
        />
      </Col>
      <Col span={24}>
        <Divider style={{ margin: 4 }} />
      </Col>
      <Col span={24}>
        <Typography.Text>
          To get SNTR and ZET rewards, you need to join the pool by
          participating in the liquidity offering. Rewards will be distributed
          weekly.
        </Typography.Text>
      </Col>
    </Row>
  )
}

export default APRInfo
