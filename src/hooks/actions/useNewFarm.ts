import { useCallback, useState } from 'react'
import { web3 } from '@project-serum/anchor'

import { useFarming } from 'hooks/useFarming'
import { notifyError, notifySuccess } from 'helper'

// type FarmProps = {}

export const useNewFarm = () => {
  // To-do: Get data from redux
  const { farming } = useFarming()
  console.log(farming)
  const [loading, setLoading] = useState(false)

  const initializeFarm = useCallback(async () => {
    try {
      setLoading(true)
      // To-do: Process input
      // ...

      const { txId } = await farming.initializeFarm({
        inputMint: new web3.PublicKey(
          '5YwUkPdXLoujGkZuo9B4LsLKj3hdkDcfP4derpspifSJ',
        ),
        startAfter: 123,
        endAfter: 588,
      })

      notifySuccess('Initialize farm', `${txId}`)
    } catch (error: any) {
      notifyError(error)
    } finally {
      setLoading(false)
    }
  }, [farming])

  return { initializeFarm, loading }
}
