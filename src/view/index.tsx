import { useEffect } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import { useUI } from '@sentre/senhub'

import Farms from './farms'
import CreateFarm from 'actions/createFarm'
import FarmDetails from './farms/farmDetails'

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
      <Route exact path={`${appRoute}/farms`} component={Farms} />
      <Route exact path={`${appRoute}/create-farm`} component={CreateFarm} />
      <Route path={`${appRoute}/:farmAddress`} component={FarmDetails} />
      <Route path="*">
        <Redirect to={`${appRoute}/farms`} />
      </Route>
    </Switch>
  )
}

export default View
