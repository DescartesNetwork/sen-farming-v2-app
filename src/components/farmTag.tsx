import { CSSProperties } from 'react'

import { Tag } from 'antd'

const FARM_TAG_COLOR = {
  primary: '#A0E86F',
}

type FarmTagProps = {
  type?: 'primary'
  style?: CSSProperties
  radius?: number
  children: string
}
const FarmTag = ({
  type = 'primary',
  style,
  radius = 6,
  children,
}: FarmTagProps) => {
  return (
    <Tag
      style={{
        color: FARM_TAG_COLOR[type],
        background: 'transparent',
        borderColor: FARM_TAG_COLOR[type],
        borderRadius: radius,
        ...style,
      }}
    >
      {children}
    </Tag>
  )
}

export default FarmTag
