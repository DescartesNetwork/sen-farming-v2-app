import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { util } from '@sentre/senhub'
import { BoostingData } from '@sentre/farming'

/**
 * Store constructor
 */

export type BoostingState = Record<string, BoostingData>

const NAME = 'boosting'
const initialState: BoostingState = {}

/**
 * Actions
 */

export const initBoosting = createAsyncThunk(
  `${NAME}/initBoosting
  `,
  async (bulk: BoostingState) => {
    return bulk
  },
)

export const upsetBoosting = createAsyncThunk<
  BoostingState,
  { address: string; data: BoostingData },
  { state: any }
>(`${NAME}/upsetBoosting`, async ({ address, data }) => {
  if (!util.isAddress(address)) throw new Error('Invalid boosting address')
  if (!data) throw new Error('Data is empty')
  return { [address]: data }
})

export const getBoosts = createAsyncThunk<BoostingState, void, { state: any }>(
  `${NAME}/getBoosts`,
  async (_, { getState }) => {
    const { boosting } = getState()
    return boosting
  },
)

const slice = createSlice({
  name: NAME,
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    void builder
      .addCase(initBoosting.fulfilled, (state, { payload }) => payload)
      .addCase(
        upsetBoosting.fulfilled,
        (state, { payload }) => void Object.assign(state, payload),
      ),
})

export default slice.reducer
