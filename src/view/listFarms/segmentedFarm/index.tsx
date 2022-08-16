import { Segmented } from 'antd'
import { useDispatch } from 'react-redux'

import { useFarmOption } from 'hooks/useFarmOption'
import { setFarmTab } from 'model/main.controller'

const SegmentedFarm = () => {
  const dispatch = useDispatch()
  const { farmingOptions } = useFarmOption()
  return (
    <Segmented
      options={farmingOptions}
      onChange={(val) => dispatch(setFarmTab(val.toString()))}
    />
  )
}

export default SegmentedFarm
