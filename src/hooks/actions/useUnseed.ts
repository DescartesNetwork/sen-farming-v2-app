import { useCallback, useState } from 'react'

import { useFarming } from 'hooks/useFarming'
import { notifyError, notifySuccess } from 'helper'

type UnseedProps = { _: string }

export const useUnseed = () => {
  // To-do: Get data from redux
  const { farming } = useFarming()
  console.log(farming)
  const [loading, setLoading] = useState(false)

  const seed = useCallback(async ({ _ }: UnseedProps) => {
    try {
      setLoading(true)
      // To-do: Process input
      // ...

      // To-do: Call transaction
      const txId = ''

      notifySuccess('Unseed', txId)
    } catch (error: any) {
      notifyError(error)
    } finally {
      setLoading(false)
    }
  }, [])

  return { seed, loading }
}
