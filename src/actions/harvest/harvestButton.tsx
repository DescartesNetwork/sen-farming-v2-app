import { Button } from 'antd'
import { useHarvest } from 'hooks/actions/useHarvest'

const HarvestButton = ({ farmAddress }: { farmAddress: string }) => {
  const { loading, harvest } = useHarvest(farmAddress)

  return (
    <Button loading={loading} onClick={() => harvest()} block type="primary">
      Harvest
    </Button>
  )
}

export default HarvestButton
