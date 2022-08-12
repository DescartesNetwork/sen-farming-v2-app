import { useCallback, useState } from 'react'
import { Address } from '@project-serum/anchor'

import { useFarming } from 'hooks/useFarming'
import { notifyError, notifySuccess } from 'helper'

export const useHarvest = () => {
  // To-do: Get data from redux
  const { farming } = useFarming()
  const [loading, setLoading] = useState(false)

  const onHarvest = useCallback(
    async (address: Address) => {
      try {
        console.log(farming, address)
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
    },
    [farming],
  )

  return { onHarvest, loading }
}
