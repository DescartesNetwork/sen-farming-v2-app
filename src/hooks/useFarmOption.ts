import { FARM_OPTION } from 'constant'
import { useMemo } from 'react'

type FarmOption = {
  label: string
  value: string
}

export const useFarmOption = () => {
  const farmingOptions: FarmOption[] = useMemo(() => {
    const options: FarmOption[] = []
    for (const key in FARM_OPTION) {
      const option: FarmOption = {
        label: `${FARM_OPTION[key]} (10)`,
        value: key,
      }
      options.push(option)
    }
    return options
  }, [])

  return { farmingOptions }
}
