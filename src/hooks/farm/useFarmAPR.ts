import { useCallback, useState } from 'react'
import { useDebounce } from 'react-use'

export const useFarmAPR = (farmAddress: string) => {
  const [apr, setApr] = useState(0)

  const calcAPR = useCallback(async () => {
    if (!farmAddress) return setApr(0)
    return setApr(Math.random())
  }, [farmAddress])
  useDebounce(calcAPR, 250, [calcAPR])

  return apr
}
