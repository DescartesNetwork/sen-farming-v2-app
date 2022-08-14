import { useSelector } from 'react-redux'
import { AppState } from 'model'

export const useFarmData = (farmAddress: string) => {
  const farmData = useSelector((state: AppState) => state.farms[farmAddress])
  console.log('farmData', farmData)
  console.log('farmAddress', farmAddress)
  return farmData
}
