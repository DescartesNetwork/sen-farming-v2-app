import { Col, Row, Typography, Divider } from 'antd'
import GroupMintSymbol from 'components/groupMintSymbol'
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
          size={32}
          align="middle"
        />
      </Col>
      <Col span={24}>
        <Divider style={{ margin: 4, borderColor: '#727272' }} />
      </Col>
      <Col span={24}>
        <Typography.Text>
          To get <GroupMintSymbol farmAddress={farmAddress} /> rewards, you need
          to join the pool by participating in the liquidity offering. Rewards
          will be distributed weekly.
        </Typography.Text>
      </Col>
    </Row>
  )
}

export default APRInfo
