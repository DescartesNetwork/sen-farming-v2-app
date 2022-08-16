import { MouseEvent } from 'react'

import { Button } from 'antd'
import { useHarvest } from 'hooks/actions/useHarvest'
import { SizeType } from 'antd/lib/config-provider/SizeContext'

type HarvestButtonProps = {
  farmAddress: string
  size?: SizeType
  disabled?: boolean
}
const HarvestButton = ({
  farmAddress,
  size = 'middle',
  disabled = false,
}: HarvestButtonProps) => {
  const { loading, harvest } = useHarvest(farmAddress)

  // stopPropagation() to stop propagation to parent elements.
  const onHarvest = (e: MouseEvent<HTMLElement>) => {
    e.stopPropagation()
    return harvest()
  }

  return (
    <Button
      size={size}
      loading={loading}
      onClick={onHarvest}
      block
      type="primary"
      disabled={disabled}
    >
      Harvest
    </Button>
  )
}

export default HarvestButton
