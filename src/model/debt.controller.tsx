import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { account, DebtData } from '@senswap/sen-js'

/**
 * Store constructor
 */

export type DebtState = Record<string, DebtData>

const NAME = 'debts'
const initialState: DebtState = {}

/**
 * Actions
 */

export const initDebt = createAsyncThunk(
  `${NAME}/initDebt
  `,
  async (bulk: DebtState) => {
    return bulk
  },
)

export const upsetDebt = createAsyncThunk<
  DebtState,
  { address: string; data: DebtData },
  { state: any }
>(`${NAME}/upsetDebt`, async ({ address, data }) => {
  if (!account.isAddress(address)) throw new Error('Invalid farm address')
  if (!data) throw new Error('Data is empty')
  return { [address]: data }
})

const slice = createSlice({
  name: NAME,
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    void builder
      .addCase(initDebt.fulfilled, (state, { payload }) => payload)
      .addCase(
        upsetDebt.fulfilled,
        (state, { payload }) => void Object.assign(state, payload),
      ),
})

export default slice.reducer
