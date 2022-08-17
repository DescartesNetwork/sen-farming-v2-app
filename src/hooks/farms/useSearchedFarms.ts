import { tokenProvider } from '@sentre/senhub'

import { FarmState } from 'model/farms.controller'

export async function searchFarm(farms: FarmState, searchText: string) {
  if (!searchText) return farms
  // Search Mints
  const mints = await tokenProvider.find(searchText)
  const mapMint = new Map<string, boolean>()
  for (const mint of mints) mapMint.set(mint.address, true)
  // Filter farms
  const filteredFarms: FarmState = {}
  for (const farmAddr in farms) {
    const farmData = farms[farmAddr]
    if (mapMint.has(farmData.inputMint.toBase58())) {
      filteredFarms[farmAddr] = farmData
    }
  }
  return filteredFarms
}
