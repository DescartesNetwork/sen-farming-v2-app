import { useDispatch } from 'react-redux'

import IonIcon from '@sentre/antd-ionicon'
import { Input } from 'antd'

import { setSearchKey } from 'model/main.controller'

type SearchFarmProps = { placeholder?: string }

const SearchFarm = ({
  placeholder = 'Search by name, address',
}: SearchFarmProps) => {
  const dispatch = useDispatch()

  return (
    <div className="search">
      <IonIcon name="search-outline" className="search-icon" />
      <Input
        bordered={false}
        style={{ width: '100%' }}
        placeholder={placeholder}
        onChange={(e) => dispatch(setSearchKey(e.target.value))}
        className="search-content"
      />
    </div>
  )
}

export default SearchFarm
