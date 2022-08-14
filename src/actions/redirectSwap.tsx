import { useHistory } from 'react-router-dom'

import { Button } from 'antd'

const POOL_ADDRESS = '2MUTe972Pk7dkccNCpouWj6YcrUw227nNyZ6upMpeLA8'

const RedirectSwap = () => {
  const history = useHistory()

  const onRedirectSwap = () => {
    return history.push(
      `app/balansol?autoInstall=true/details?pool=${POOL_ADDRESS}`,
    )
  }

  return (
    <Button ghost onClick={onRedirectSwap}>
      Swap
    </Button>
  )
}

export default RedirectSwap
