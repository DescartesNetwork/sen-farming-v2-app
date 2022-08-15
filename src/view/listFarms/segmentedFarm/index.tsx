import { Segmented } from 'antd'
import { useFarmOption } from 'hooks/useFarmOption'

const SegmentedFarm = () => {
  const { farmingOptions } = useFarmOption()
  return <Segmented options={farmingOptions} />
}

export default SegmentedFarm
