import React from 'react'
import { Address } from '@project-serum/anchor'

import { Button, Col, Row } from 'antd'
import { useHarvest } from 'hooks/actions/useHarvest'
import Element from './element'

type HarvestProps = {
  farmAddress: Address
}
const Harvest = ({ farmAddress }: HarvestProps) => {
  const { onHarvest } = useHarvest()
  return (
    <Row gutter={[16, 16]}>
      <Col>
        <Element farmAddress={farmAddress} />
      </Col>
      <Col>
        <Button onClick={onHarvest} type="primary">
          Harvest
        </Button>
      </Col>
    </Row>
  )
}

export default Harvest
