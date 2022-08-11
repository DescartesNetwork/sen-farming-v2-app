import { useCallback, useState } from 'react'

import { useFarming } from 'hooks/useFarming'
import { notifyError, notifySuccess } from 'helper'

type StakeProps = { _: string }

export const useStake = () => {
  // To-do: Get data from redux
  const { farming } = useFarming()
  console.log(farming)
  const [loading, setLoading] = useState(false)

  const stake = useCallback(async ({ _ }: StakeProps) => {
    try {
      setLoading(true)
      // To-do: Process input
      // ...

      // To-do: Call transaction
      const txId = ''

      notifySuccess('Stake', txId)
    } catch (error: any) {
      notifyError(error)
    } finally {
      setLoading(false)
    }
  }, [])

  return { stake, loading }
}
