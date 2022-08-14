import { InputNumber } from 'antd'

type NumericInputProps = {
  value: string
  onChange?: (value: string) => void
  max?: string
}
const NumericInput = ({
  value,
  max,
  onChange = () => {},
}: NumericInputProps) => {
  return (
    <InputNumber
      stringMode
      decimalSeparator="."
      controls={false}
      placeholder={'0'}
      bordered={false}
      size="large"
      style={{
        padding: 0,
        width: '100%',
        color: '#C6F1A9',
        fontSize: 24,
      }}
      value={value}
      onChange={onChange}
      max={max}
    />
  )
}

export default NumericInput
