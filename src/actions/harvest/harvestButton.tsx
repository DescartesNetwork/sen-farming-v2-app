import { Button } from 'antd'
import { useHarvest } from 'hooks/actions/useHarvest'

type HarvestButtonProps = { farmAddress: string }
const HarvestButton = ({ farmAddress }: HarvestButtonProps) => {
  const { loading, harvest } = useHarvest()

  return (
    <Button loading={loading} onClick={() => harvest('')} block type="primary">
      Harvest
    </Button>
  )
}

export default HarvestButton
