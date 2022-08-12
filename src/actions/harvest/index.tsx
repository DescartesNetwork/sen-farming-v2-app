import { Button } from 'antd'
import { useHarvest } from 'hooks/actions/useHarvest'

type HarvestProps = { farmAddress: string }
const Harvest = ({ farmAddress }: HarvestProps) => {
  const { loading, onHarvest } = useHarvest(farmAddress)

  return (
    <Button loading={loading} onClick={onHarvest} block type="primary">
      Harvest
    </Button>
  )
}

export default Harvest