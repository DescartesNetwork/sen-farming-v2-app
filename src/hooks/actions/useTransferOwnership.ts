import { useCallback, useState } from 'react'

import { useFarming } from 'hooks/useFarming'
import { notifyError, notifySuccess } from 'helper'

type TransferOwnershipProps = { _: string }

export const useTransferOwnership = () => {
  // To-do: Get data from redux
  const { farming } = useFarming()
  console.log(farming)
  const [loading, setLoading] = useState(false)

  const transferOwnership = useCallback(
    async ({ _ }: TransferOwnershipProps) => {
      try {
        setLoading(true)
        // To-do: Process input
        // ...

        // To-do: Call transaction
        const txId = ''

        notifySuccess('Transfer ownership', txId)
      } catch (error: any) {
        notifyError(error)
      } finally {
        setLoading(false)
      }
    },
    [],
  )

  return { transferOwnership, loading }
}
