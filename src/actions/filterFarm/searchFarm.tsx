import IonIcon from '@sentre/antd-ionicon'
import { Card, Input, Space } from 'antd'

type SearchFarmProps = { placeholder?: string }
const SearchFarm = ({
  placeholder = 'Search by name, address',
}: SearchFarmProps) => {
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
        />
      </Space>
    </Card>
  )
}

export default SearchFarm
