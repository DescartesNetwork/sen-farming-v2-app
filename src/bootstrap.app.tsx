import { Provider } from 'react-redux'
import { UIProvider } from '@sentre/senhub'

import View from 'view'

import model from 'model'
import configs from 'configs'
import { AppLoader } from 'appLoader'

import './static/styles/dark.less'
import './static/styles/light.less'

const {
  manifest: { appId },
} = configs

export const Page = () => {
  return (
    <UIProvider
      appId={appId}
      antd={{ prefixCls: appId }}
      style={{ paddingBottom: 24 }}
    >
      <Provider store={model}>
        <AppLoader>
          <View />
        </AppLoader>
      </Provider>
    </UIProvider>
  )
}

export * from 'static.app'
