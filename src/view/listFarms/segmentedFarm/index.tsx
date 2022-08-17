import { Segmented } from 'antd'
import { useDispatch, useSelector } from 'react-redux'

import { setFarmTab } from 'model/main.controller'
import { FarmTab } from 'constant'
import { AppState } from 'model'

const SegmentedFarm = () => {
  const farmTab = useSelector((state: AppState) => state.main.farmTab)
  const dispatch = useDispatch()

  return (
    <Segmented
      options={[
        { value: FarmTab.All, label: FarmTab.All },
        { value: FarmTab.Staked, label: FarmTab.Staked },
        { value: FarmTab.Your, label: FarmTab.Your },
        { value: FarmTab.Expired, label: FarmTab.Expired },
      ]}
      value={farmTab}
      onChange={(val) => dispatch(setFarmTab(val.toString()))}
    />
  )
}

export default SegmentedFarm
