import { useCallback, useEffect, useState } from 'react'
import { FarmData } from '@senswap/sen-js'

export const useFarmList = (): { address: string; data: FarmData }[] => {
  // To-do: Get data from redux
  // const { farms } = useSelector((state: AppState) => state)
  const [farmList, setFarmList] = useState<
    { address: string; data: FarmData }[]
  >([])

  const getFarmList = useCallback(() => {
    // To-do: Handle input and get farm list
    // let newFarmList = []
    // for (const address in farms) {
    //   newFarmList.push({ address, data: farms[address] })
    // }
    // //sort
    // newFarmList = newFarmList.sort((a, b) =>
    //   a.data.total_shares < b.data.total_shares ? 1 : -1,
    // )
    setFarmList([])
  }, [])

  useEffect(() => {
    getFarmList()
  }, [getFarmList])

  return farmList
}
