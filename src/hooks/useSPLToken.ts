import { useCallback, useEffect, useState } from 'react'
import { SplTokenProvider } from '@sentre/senhub'

export const useSPLToken = () => {
  const [mints, setMints] = useState<string[]>([])

  const fetchSLPMints = useCallback(async () => {
    const senSPLokenProvider = new SplTokenProvider()

    const splTokens = await senSPLokenProvider.getTokenList()

    const splMints = splTokens.map(({ address }) => address)

    return setMints(splMints)
  }, [])

  useEffect(() => {
    fetchSLPMints()
  }, [fetchSLPMints])

  return { mints }
}
