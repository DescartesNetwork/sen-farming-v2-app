import { Button } from 'antd'
import { useHarvest } from 'hooks/actions/useHarvest'

const HarvestButton = ({ farmAddress }: { farmAddress: string }) => {
  const { loading, harvest } = useHarvest()

  return (
    <Button
      loading={loading}
      onClick={() => harvest(farmAddress)}
      block
      type="primary"
    >
      Harvest
    </Button>
  )
}

export default HarvestButton
