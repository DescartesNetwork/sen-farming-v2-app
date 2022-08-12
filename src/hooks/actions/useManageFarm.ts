import { useCallback, useState } from 'react'

const useManageFarm = () => {
  const [visible, setVisible] = useState(false)

  const budget = 100
  const liquidity = 319649695

  const confirm = useCallback(() => {
    console.log('confirm')
  }, [])

  return { visible, setVisible, confirm, budget, liquidity }
}

export default useManageFarm
