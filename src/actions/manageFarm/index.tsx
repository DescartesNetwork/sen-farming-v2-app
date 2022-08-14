import { Fragment } from 'react'

import IonIcon from '@sentre/antd-ionicon'
import { Button, Col, Modal, Row, Space, Typography } from 'antd'
import CardFarmInfos from './cardFarmInfos'

import useManageFarm from 'hooks/actions/useManageFarm'
import ActionManageFarm from './actionManage'

type ManageFarmProps = { farmAddress: string }
const ManageFarm = ({ farmAddress }: ManageFarmProps) => {
  const { visible, setVisible } = useManageFarm()
  // TODO: check permission - authority === walletAddress

  return (
    <Fragment>
      <Button ghost onClick={() => setVisible(true)}>
        Manage
      </Button>
      <Modal
        visible={visible}
        onCancel={() => setVisible(false)}
        footer={false}
        closeIcon={<IonIcon name="close-outline" />}
        title={
          <Space>
            <IonIcon name="leaf-outline" />
            <Typography.Title level={4}>Farm Management</Typography.Title>
          </Space>
        }
      >
        <Row gutter={[24, 24]}>
          <Col span={24}>
            <CardFarmInfos farmAddress={farmAddress} />
          </Col>
          <Col span={24}>
            <ActionManageFarm />
          </Col>
        </Row>
      </Modal>
    </Fragment>
  )
}

export default ManageFarm
