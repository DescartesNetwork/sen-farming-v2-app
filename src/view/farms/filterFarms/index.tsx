import { Segmented } from 'antd'
import { useFarmOption } from 'hooks/useFarmOption'

const FilterFarms = () => {
  const { farmingOptions } = useFarmOption()
  return <Segmented options={farmingOptions} />
}

export default FilterFarms
