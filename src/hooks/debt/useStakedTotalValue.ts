import { useCallback, useState } from 'react'
import { useDebounce } from 'react-use'

import { useGetTotalValue } from '@sen-use/app'
import { useStakedData } from 'hooks/debt/useStakedData'
import { useFarmData } from 'hooks/farm/useFarmData'

export const useStakedTotalValue = (farmAddress: string) => {
  const [totalValue, setTotalValue] = useState(0)
  const stakedData = useStakedData(farmAddress)
  const farmData = useFarmData(farmAddress)
  const getTotalValue = useGetTotalValue()

  const updateTotalValue = useCallback(async () => {
    const totalValue = await getTotalValue(
      farmData.inputMint,
      stakedData.amountBN,
    )
    return setTotalValue(totalValue)
  }, [farmData.inputMint, getTotalValue, stakedData.amountBN])
  useDebounce(updateTotalValue, 500, [updateTotalValue])

  return totalValue
}
