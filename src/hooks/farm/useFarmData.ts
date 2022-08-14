import { useSelector } from 'react-redux'
import { AppState } from 'model'

export const useFarmData = (farmAddress: string) => {
  const farmData = useSelector((state: AppState) => state.farms[farmAddress])
  return farmData
}
