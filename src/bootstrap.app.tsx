import { memo, useEffect } from 'react'
import { Provider } from 'react-redux'
import { UIProvider, useUI } from '@sentre/senhub'

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
  const { setBackground } = useUI()

  useEffect(() => {
    setBackground({ light: '#141413', dark: '#141413' })
  }, [setBackground])

  return <Layout />
}

export const Page = () => {
  return (
    <UIProvider
      appId={appId}
      antd={{ prefixCls: appId }}
      style={{ paddingBottom: 24 }}
    >
      <Background />
    </UIProvider>
  )
}

export * from 'static.app'
