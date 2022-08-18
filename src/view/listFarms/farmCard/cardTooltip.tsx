import { ReactNode } from 'react'

import { Tooltip, TooltipProps } from 'antd'

type CardTooltipProps = {
  children: ReactNode
  tooltip?: ReactNode
} & TooltipProps
const CardTooltip = ({ children, tooltip, ...rest }: CardTooltipProps) => {
  return (
    <Tooltip title={tooltip} {...rest}>
      {children}
    </Tooltip>
  )
}

export default CardTooltip
