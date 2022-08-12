import { configureStore } from '@reduxjs/toolkit'
import { devTools, bigintSerializationMiddleware } from 'model/devTools'

import main from 'model/main.controller'
import farms from 'model/farms.controller'
import debt from 'model/debt.controller'

/**
 * Isolated store
 */
const model = configureStore({
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware(bigintSerializationMiddleware),
  devTools: devTools(process.env.REACT_APP_ID as string),
  reducer: {
    main,
    farms,
    debt,
  },
})

export type AppState = ReturnType<typeof model.getState>
export type AppDispatch = typeof model.dispatch
export default model
