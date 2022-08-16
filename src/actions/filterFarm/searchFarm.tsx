import { useDispatch } from 'react-redux'

import IonIcon from '@sentre/antd-ionicon'
import { Card, Input, Space } from 'antd'

import { setSearchKey } from 'model/main.controller'

type SearchFarmProps = { placeholder?: string }

const SearchFarm = ({
  placeholder = 'Search by name, address',
}: SearchFarmProps) => {
  const dispatch = useDispatch()

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
          style={{ width: '100%' }}
          placeholder={placeholder}
          onChange={(e) => dispatch(setSearchKey(e.target.value))}
        />
      </Space>
    </Card>
  )
}

export default SearchFarm
