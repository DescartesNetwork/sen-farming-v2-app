import { useEffect } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import { useUI } from '@sentre/senhub'

import Farms from './farms'
import CreateFarm from 'actions/createFarm'

import { useAppRouter } from 'hooks/useAppRouter'

import './index.less'
const View = () => {
  const { setBackground } = useUI()
  const { appRoute } = useAppRouter()

  useEffect(() => {
    setBackground({ light: '#1B1B1B', dark: '#1B1B1B' })
  }, [setBackground])

  return (
    <Switch>
      <Route path={`${appRoute}/farms`} component={Farms} />
      <Route path={`${appRoute}/create-farm`} component={CreateFarm} />
      <Route path="*">
        <Redirect to={`${appRoute}/farms`} />
      </Route>
    </Switch>
  )
}

export default View
