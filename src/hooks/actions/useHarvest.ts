import { useCallback, useState } from 'react'

import { notifyError, notifySuccess } from 'helper'

export const useHarvest = () => {
  // To-do: Get data from redux
  const [loading, setLoading] = useState(false)

  const onHarvest = useCallback(async () => {
    try {
      setLoading(true)
      // To-do: Process input
      // ...

      // To-do: Call transaction
      const txId = ''

      notifySuccess('Harvested', txId)
    } catch (error: any) {
      notifyError(error)
    } finally {
      setLoading(false)
    }
  }, [])

  return { onHarvest, loading }
}
