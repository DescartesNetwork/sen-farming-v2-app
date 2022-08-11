import { useCallback, useState } from 'react'

import { useFarming } from 'hooks/useFarming'
import { notifyError, notifySuccess } from 'helper'

type UnstakeProps = { _: string }

export const useUnstake = () => {
  // To-do: Get data from redux
  const { farming } = useFarming()
  console.log(farming)
  const [loading, setLoading] = useState(false)

  const unstake = useCallback(async ({ _ }: UnstakeProps) => {
    try {
      setLoading(true)
      // To-do: Process input
      // ...

      // To-do: Call transaction
      const txId = ''

      notifySuccess('Unstake', txId)
    } catch (error: any) {
      notifyError(error)
    } finally {
      setLoading(false)
    }
  }, [])

  return { unstake, loading }
}
