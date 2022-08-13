import { useCallback, useState } from 'react'
import { web3 } from '@project-serum/anchor'

import { useFarming } from 'hooks/useFarming'
import { notifyError, notifySuccess } from 'helper'

type InitializeFarmProps = {
  inputMint: string
  startAfter: number
  endAfter: number
  moAmount?: number | undefined
  sendAndConfirm?: Boolean | undefined
}

export const useNewFarm = () => {
  const { farming } = useFarming()
  console.log(farming)
  const [loading, setLoading] = useState(false)

  const initializeFarm = useCallback(
    async ({
      inputMint,
      startAfter,
      endAfter,
      moAmount,
      sendAndConfirm,
    }: InitializeFarmProps) => {
      try {
        setLoading(true)
        const mintPubKey = new web3.PublicKey(inputMint)

        const { txId } = await farming.initializeFarm({
          inputMint: mintPubKey,
          startAfter: startAfter,
          endAfter: endAfter,
        })

        notifySuccess('Initialize farm', `${txId}`)
      } catch (error: any) {
        notifyError(error)
      } finally {
        setLoading(false)
      }
    },
    [farming],
  )

  return { initializeFarm, loading }
}
