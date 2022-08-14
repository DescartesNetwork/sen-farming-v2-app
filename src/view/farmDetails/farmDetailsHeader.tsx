import { Button, Col, Row, Space } from 'antd'
import IonIcon from '@sentre/antd-ionicon'
import ManageFarm from 'actions/manageFarm'

import { useAppRouter } from 'hooks/useAppRouter'
import RedirectSwap from 'actions/redirectSwap'

const ID_NAME = 'farmAddress'

const FarmDetailsHeader = () => {
  const { getIdFromUrl } = useAppRouter()
  const farmAddress = getIdFromUrl(ID_NAME)

  return (
    <Row justify="space-between">
      <Col>
        <Button
          type="text"
          icon={<IonIcon name="arrow-back-outline" />}
          onClick={() => {}}
          style={{ padding: 0, background: 'trasparent' }}
        >
          Back
        </Button>
      </Col>
      <Col>
        <Space>
          <ManageFarm farmAddress={farmAddress} />
          <RedirectSwap />
        </Space>
      </Col>
    </Row>
  )
}

export default FarmDetailsHeader
