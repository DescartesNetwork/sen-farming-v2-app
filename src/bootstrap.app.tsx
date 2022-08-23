import { memo, useEffect } from 'react'
import { Provider } from 'react-redux'
import { AntdProvider, useSetBackground } from '@sentre/senhub'

import { View } from 'view'

import model from 'model'
import configs from 'configs'
import { AppLoader } from 'appLoader'

import './static/styles/dark.less'
import './static/styles/light.less'

const {
  manifest: { appId },
} = configs

export const Layout = memo(() => {
  return (
    <Provider store={model}>
      <AppLoader>
        <View />
      </AppLoader>
    </Provider>
  )
})

export const Background = () => {
  const setBackground = useSetBackground()

  useEffect(() => {
    setBackground({ light: '#141413', dark: '#141413' })
  }, [setBackground])

  return <Layout />
}

export const Page = () => {
  return (
    <AntdProvider appId={appId} prefixCls={appId}>
      <Background />
    </AntdProvider>
  )
}

export * from 'static.app'
