import { useCallback, useState } from 'react'

import { useFarming } from 'hooks/useFarming'
import { notifyError, notifySuccess } from 'helper'

type HavestProps = { _: string }

export const useHavest = () => {
  // To-do: Get data from redux
  const { farming } = useFarming()
  console.log(farming)
  const [loading, setLoading] = useState(false)

  const havest = useCallback(async ({ _ }: HavestProps) => {
    try {
      setLoading(true)
      // To-do: Process input
      // ...

      // To-do: Call transaction
      const txId = ''

      notifySuccess('Havest', txId)
    } catch (error: any) {
      notifyError(error)
    } finally {
      setLoading(false)
    }
  }, [])

  return { havest, loading }
}
