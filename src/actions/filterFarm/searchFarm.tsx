import { useDispatch, useSelector } from 'react-redux'

import IonIcon from '@sentre/antd-ionicon'
import { Card, Input, Space } from 'antd'

import { setSearchKey } from 'model/main.controller'
import { AppState } from 'model'

type SearchFarmProps = { placeholder?: string }
const SearchFarm = ({
  placeholder = 'Search by name, address',
}: SearchFarmProps) => {
  const searchKey = useSelector((state: AppState) => state.main.searchKey)
  const dispatch = useDispatch()
  const onChange = (e: any) => {
    dispatch(setSearchKey(e.target.value))
  }

  return (
    <Card
      bordered={false}
      bodyStyle={{ padding: '2px 12px' }}
      style={{ background: '#0A0A0A', borderRadius: 8 }}
    >
      <Space style={{ width: '100%' }}>
        <IonIcon name="search-outline" />
        <Input
          bordered={false}
          value={searchKey}
          style={{ width: '100%' }}
          placeholder={placeholder}
          onChange={onChange}
        />
      </Space>
    </Card>
  )
}

export default SearchFarm
