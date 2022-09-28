import { CSSProperties, ReactNode, useMemo } from 'react'

import { Tag } from 'antd'

const FARM_TAG_COLOR = {
  primary: '#a0e86f',
  warning: '#f0ff00',
}

type FarmTagProps = {
  type?: 'primary' | 'warning'
  radius?: number
  children: ReactNode
  bordered?: boolean
  opacity?: CSSProperties['opacity']
  style?: CSSProperties
  color?: string
}
const FarmTag = ({
  type = 'primary',
  style,
  radius = 6,
  children,
  bordered = true,
  opacity = 0,
  color,
}: FarmTagProps) => {
  const tagColor = color ? color : FARM_TAG_COLOR[type]
  const borderStyle = bordered
    ? { border: `1px solid ${tagColor}` }
    : { border: 'none' }

  const rbgToHex = (rgb: string) => {
    const [r, g, b] = rgb.split(',')
    return `#${1 << 24}${Number(r) << 16}${Number(g) << 8}${b}`
  }

  const hextToRgba = (hex: string, opacity: CSSProperties['opacity']) => {
    const nextHex = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
    if (!nextHex) return hex
    const rgbStr = new Array(3)
      .fill('')
      .map((_, idx) => parseInt(nextHex[idx + 1], 16))
    return `rgb(${rgbStr.join(',')}, ${opacity})`
  }

  const background = useMemo(() => {
    let background = 'transparent'
    if (tagColor.startsWith('rgb')) background = rbgToHex(tagColor)
    if (tagColor.startsWith('#')) background = hextToRgba(tagColor, opacity)
    return { background }
  }, [opacity, tagColor])

  return (
    <Tag
      style={{
        color: tagColor,
        borderColor: tagColor,
        borderRadius: radius,
        marginRight: 0,
        ...background,
        ...borderStyle,
        ...style,
      }}
    >
      {children}
    </Tag>
  )
}

export default FarmTag
