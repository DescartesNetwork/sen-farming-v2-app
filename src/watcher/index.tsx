import { Fragment, useMemo } from 'react'

import { useWatcherLoading } from './watcher'

import Loading from 'components/loading'
import FarmsWatcher from './farms.watcher'

export const AppWatcher: React.FC = ({ children }) => {
  const [loadingInfo] = useWatcherLoading()

  const loading = useMemo(
    () =>
      !Object.values(loadingInfo).length ||
      Object.values(loadingInfo).includes(true),
    [loadingInfo],
  )

  return (
    <Fragment>
      <FarmsWatcher />
      {loading ? <Loading /> : children}
    </Fragment>
  )
}
