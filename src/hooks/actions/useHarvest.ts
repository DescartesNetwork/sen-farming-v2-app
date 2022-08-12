import { useCallback, useState } from 'react'

import { useFarming } from 'hooks/useFarming'
import { notifyError, notifySuccess } from 'helper'

export const useHarvest = (farmAddress: string) => {
  // To-do: Get data from redux
  const { farming } = useFarming()
  const [loading, setLoading] = useState(false)

  const onHarvest = useCallback(async () => {
    try {
      console.log(farming, farmAddress)
      setLoading(true)
      // To-do: Process input
      // ...
      console.log(farming, farmAddress)

      // To-do: Call transaction
      const txId = ''

      notifySuccess('Havest', txId)
    } catch (error: any) {
      notifyError(error)
    } finally {
      setLoading(false)
    }
  }, [farmAddress, farming])

  return { onHarvest, loading }
}
