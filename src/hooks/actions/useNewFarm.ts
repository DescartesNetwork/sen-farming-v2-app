import { useCallback, useState } from 'react'

import { useFarming } from 'hooks/useFarming'
import { notifyError, notifySuccess } from 'helper'

type FarmProps = { _: string }

export const useNewFarm = () => {
  // To-do: Get data from redux
  const { farming } = useFarming()
  console.log(farming)
  const [loading, setLoading] = useState(false)

  const initializeFarm = useCallback(async ({ _ }: FarmProps) => {
    try {
      setLoading(true)
      // To-do: Process input
      // ...

      // To-do: Call transaction
      const txId = ''

      notifySuccess('Initialize farm', txId)
    } catch (error: any) {
      notifyError(error)
    } finally {
      setLoading(false)
    }
  }, [])

  return { initializeFarm, loading }
}
