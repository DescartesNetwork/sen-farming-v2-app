import { Button, Col, Row } from 'antd'
import IonIcon from '@sentre/antd-ionicon'

import { useAppRouter } from 'hooks/useAppRouter'

const FarmDetailsHeader = () => {
  const { pushHistory } = useAppRouter()

  return (
    <Row justify="space-between">
      <Col>
        <Button
          type="text"
          icon={<IonIcon name="arrow-back-outline" />}
          onClick={() => {
            pushHistory('/farms')
          }}
          style={{ padding: 0 }}
        >
          Back
        </Button>
      </Col>
    </Row>
  )
}

export default FarmDetailsHeader
