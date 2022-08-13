import { useCallback, useEffect, useState } from 'react'

// import { useMintUsd } from '../useMintUsd'

export const useLiquidity = (farmAddress: string) => {
  // To-do: Get data from redux
  // const {
  //   farms: { [farmAddress]: farmData },
  // } = useSelector((state: AppState) => state)
  // const { getTotalValue } = useMintUsd()
  const [liquidity, setLiquidity] = useState(0)

  const calcLiquidity = useCallback(async () => {
    // To-do: Process liquidity calculation
    // if (!farmData) return setLiquidity(0)
    // const { total_shares, mint_stake } = farmData
    // const totalValue = await getTotalValue({
    //   mintAddress: mint_stake,
    //   amount: total_shares,
    // })
    return setLiquidity(0)
  }, [])

  useEffect(() => {
    calcLiquidity()
  }, [calcLiquidity])

  return liquidity
}
