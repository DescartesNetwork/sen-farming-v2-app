import { Button } from 'antd'
import { useHarvest } from 'hooks/actions/useHarvest'

type HarvestButtonProps = { farmAddress: string }
const HarvestButton = ({ farmAddress }: HarvestButtonProps) => {
  const { loading, onHarvest } = useHarvest()

  return (
    <Button
      loading={loading}
      onClick={() => onHarvest(farmAddress)}
      block
      type="primary"
    >
      Harvest
    </Button>
  )
}

export default HarvestButton
