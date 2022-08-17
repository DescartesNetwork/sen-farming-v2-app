import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { util } from '@sentre/senhub'
import { DebtData } from '@sentre/farming'

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
  if (!util.isAddress(address)) throw new Error('Invalid farm address')
  if (!data) throw new Error('Data is empty')
  return { [address]: data }
})

export const getDebts = createAsyncThunk<DebtState, void, { state: any }>(
  `${NAME}/getDebts`,
  async (_, { getState }) => {
    const { debts } = getState()
    return debts
  },
)

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
