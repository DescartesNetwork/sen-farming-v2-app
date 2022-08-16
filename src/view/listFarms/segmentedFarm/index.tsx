import { Segmented } from 'antd'
import { useDispatch } from 'react-redux'

import { setFarmTab } from 'model/main.controller'
import { FarmTab } from 'constant'

const SegmentedFarm = () => {
  const dispatch = useDispatch()

  return (
    <Segmented
      options={[
        { value: FarmTab.All, label: FarmTab.All },
        { value: FarmTab.Staked, label: FarmTab.Staked },
        { value: FarmTab.Your, label: FarmTab.Your },
        { value: FarmTab.Finished, label: FarmTab.Finished },
      ]}
      onChange={(val) => dispatch(setFarmTab(val.toString()))}
    />
  )
}

export default SegmentedFarm
