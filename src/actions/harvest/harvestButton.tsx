import { MouseEvent } from 'react'

import { Button } from 'antd'
import { useHarvest } from 'hooks/actions/useHarvest'

const HarvestButton = ({ farmAddress }: { farmAddress: string }) => {
  const { loading, harvest } = useHarvest(farmAddress)

  // stopPropagation() to stop propagation to parent elements.
  const onHarvest = (e: MouseEvent<HTMLElement>) => {
    e.stopPropagation()
    return harvest()
  }

  return (
    <Button loading={loading} onClick={onHarvest} block type="primary">
      Harvest
    </Button>
  )
}

export default HarvestButton
