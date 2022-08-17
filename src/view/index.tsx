import { Redirect, Route, Switch } from 'react-router-dom'

import CreateFarm from 'actions/createFarm'
import ListFarms from './listFarms'
import FarmDetails from './farmDetails'

import { useAppRouter } from 'hooks/useAppRouter'
import './index.less'

export const View = () => {
  const { appRoute } = useAppRouter()

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
