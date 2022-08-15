import { util } from '@sentre/senhub'

import { Typography } from 'antd'
import { useStakedTotalValue } from 'hooks/debt/useStakedTotalValue'

type PriceTooltipProps = { farmAddress: string }
const PriceTooltip = ({ farmAddress }: PriceTooltipProps) => {
  const stakedValue = useStakedTotalValue(farmAddress)

  return (
    <Typography.Text type="secondary">
      ≈ {util.numeric(stakedValue).format('$0,0.[00]')}
    </Typography.Text>
  )
}

export default PriceTooltip
