import { useCallback, useState } from 'react'
import { useSelector } from 'react-redux'
import { useDebounce } from 'react-use'
import { tokenProvider } from '@sentre/senhub'

import { AppState } from 'model'

export const useSearchedFarms = (sourceFarms: string[]) => {
  const farms = useSelector((state: AppState) => state.farms)
  const searchKey = useSelector((state: AppState) => state.main.searchKey)
  const [searchedFarms, setSearchedFarms] = useState<string[]>([])

  const search = useCallback(async () => {
    if (!searchKey) return setSearchedFarms(sourceFarms)
    const mints = await tokenProvider.find(searchKey)
    const mapMint = new Map<string, boolean>()
    for (const mint of mints) mapMint.set(mint.address, true)

    const newSearchedFarms: string[] = []
    for (const address of sourceFarms) {
      const farm = farms[address]
      // Search Input Mint + Farm Address
      if (mapMint.has(farm.inputMint.toBase58()) || address.includes(searchKey))
        newSearchedFarms.push(address)
      //TODO: Search another thing
    }
    return setSearchedFarms(newSearchedFarms)
  }, [farms, searchKey, sourceFarms])
  useDebounce(() => search(), 300, [search])

  return searchedFarms
}