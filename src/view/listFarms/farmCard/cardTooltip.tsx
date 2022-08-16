import { ReactNode } from 'react'

import { Tooltip } from 'antd'

type CardTooltipProps = {
  children: ReactNode
  tooltip?: ReactNode
}
const CardTooltip = ({ children, tooltip }: CardTooltipProps) => {
  return <Tooltip title={tooltip}>{children}</Tooltip>
}

export default CardTooltip
