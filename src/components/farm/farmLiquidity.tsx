import { util } from '@sentre/senhub'

import { useFarmLiquidity } from 'hooks/farm/useFarmLiquidity'

const FarmLiquidity = ({ farmAddress }: { farmAddress: string }) => {
  const liquidity = useFarmLiquidity(farmAddress)
  return <span>{util.numeric(liquidity).format('$0,0.[00]a')}</span>
}
export default FarmLiquidity
