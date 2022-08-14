import { InputNumber } from 'antd'

const NumericInput = () => {
  return (
    <InputNumber
      stringMode
      decimalSeparator="."
      controls={false}
      placeholder={'0'}
      bordered={false}
      size="large"
      style={{ padding: 0, width: '100%', color: '#C6F1A9', fontSize: 24 }}
    />
  )
}

export default NumericInput
