import { useEffect } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import { useUI } from '@sentre/senhub'

import CreateFarm from 'actions/createFarm'
import ListFarms from './listFarms'
import FarmDetails from './farmDetails'

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
      <Route exact path={`${appRoute}/create-farm`} component={CreateFarm} />
      <Route exact path={`${appRoute}/farms`} component={ListFarms} />
      <Route path={`${appRoute}/:farmAddress`} component={FarmDetails} />
      <Route path="*">
        <Redirect to={`${appRoute}/farms`} />
      </Route>
    </Switch>
  )
}

export default View
