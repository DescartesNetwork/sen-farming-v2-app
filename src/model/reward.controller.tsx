import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { util } from '@sentre/senhub'
import { RewardData } from '@sentre/farming'

/**
 * Store constructor
 */

export type RewardState = Record<string, RewardData>

const NAME = 'reward'
const initialState: RewardState = {}

/**
 * Actions
 */

export const initReward = createAsyncThunk(
  `${NAME}/initReward
  `,
  async (bulk: RewardState) => {
    return bulk
  },
)

export const upsetReward = createAsyncThunk<
  RewardState,
  { address: string; data: RewardData },
  { state: any }
>(`${NAME}/upsetReward`, async ({ address, data }) => {
  if (!util.isAddress(address)) throw new Error('Invalid reward address')
  if (!data) throw new Error('Data is empty')
  return { [address]: data }
})

const slice = createSlice({
  name: NAME,
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    void builder
      .addCase(initReward.fulfilled, (state, { payload }) => payload)
      .addCase(
        upsetReward.fulfilled,
        (state, { payload }) => void Object.assign(state, payload),
      ),
})

export default slice.reducer
