import { useCallback, useState } from 'react'
import { util } from '@sentre/senhub'

import { notifyError, notifySuccess } from 'helper'

export const useTransferOwner = () => {
  const [loading, setLoading] = useState(false)

  const transferOwner = useCallback(
    async (farmAddress: string, ownerAddress: string) => {
      if (!util.isAddress(farmAddress) || !util.isAddress(ownerAddress)) return

      try {
        setLoading(true)
        const { txId } = await window.senFarming.transferOwnership({
          farm: farmAddress,
          newOwner: ownerAddress,
        })
        notifySuccess('Transfer', txId)
      } catch (err) {
        notifyError(err)
      } finally {
        setLoading(false)
      }
    },
    [],
  )

  return { transferOwner, loading }
}
