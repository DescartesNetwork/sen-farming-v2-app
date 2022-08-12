import { Button } from 'antd'
import { useHarvest } from 'hooks/actions/useHarvest'

const Harvest = () => {
  const { loading, onHarvest } = useHarvest()

  return (
    <Button loading={loading} onClick={onHarvest} block type="primary">
      Harvest
    </Button>
  )
}

export default Harvest
