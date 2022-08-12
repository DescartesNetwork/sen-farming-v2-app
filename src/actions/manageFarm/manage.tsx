import { Fragment } from 'react'

import IonIcon from '@sentre/antd-ionicon'
import { Button, Card, Col, Modal, Row, Space, Typography } from 'antd'
import FarmAvatar from 'components/farmAvatar'
import SpaceBetween from 'components/spaceBetween'

import useManageFarm from 'hooks/actions/useManageFarm'

type ManageProps = { farmAddress: string }
const Manage = ({ farmAddress }: ManageProps) => {
  const { visible, setVisible, liquidity, budget } = useManageFarm()

  return (
    <Fragment>
      <Button type="primary" onClick={() => {}}>
        Manage
      </Button>
      <Modal
        visible={visible}
        onCancel={() => setVisible(false)}
        footer={false}
        closable={false}
      >
        <Row gutter={[24, 24]}>
          <Col>
            <Space>
              <IonIcon name="leaf-outline" />
              <Typography.Title level={4}>Farm Management</Typography.Title>
            </Space>
          </Col>
          <Col span={24}>
            <Card>
              <Row gutter={[16, 16]}>
                <Col span={24}>
                  <SpaceBetween
                    title={
                      <FarmAvatar
                        farmAddress={farmAddress}
                        size={24}
                        textStyle={{ fontSize: 16, fontWeight: 700 }}
                      />
                    }
                  >
                    {farmAddress}
                  </SpaceBetween>
                </Col>
                <Col span={24}>
                  <SpaceBetween title="Liquidity">{liquidity}</SpaceBetween>
                </Col>
                <Col span={24}>
                  <SpaceBetween title="Budget">{budget}</SpaceBetween>
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
      </Modal>
    </Fragment>
  )
}

export default Manage
