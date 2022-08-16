import { MouseEvent, useCallback, useEffect, useState } from 'react'

import { Button } from 'antd'
import { useHarvest } from 'hooks/actions/useHarvest'
import { SizeType } from 'antd/lib/config-provider/SizeContext'
import { useConvertRewards } from 'hooks/useConvertRewards'

type HarvestButtonProps = {
  farmAddress: string
  size?: SizeType
}
const HarvestButton = ({
  farmAddress,
  size = 'middle',
}: HarvestButtonProps) => {
  const { loading, harvest } = useHarvest(farmAddress)
  const [disabled, setDisable] = useState(true)
  const convertRewards = useConvertRewards(farmAddress)

  // stopPropagation() to stop propagation to parent elements.
  const onHarvest = (e: MouseEvent<HTMLElement>) => {
    e.stopPropagation()
    return harvest()
  }

  const updateStatus = useCallback(() => {
    const canHarvest = !convertRewards[0]?.amount.isZero()
    setDisable(!canHarvest)
  }, [convertRewards])
  useEffect(() => {
    updateStatus()
  }, [updateStatus])

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
