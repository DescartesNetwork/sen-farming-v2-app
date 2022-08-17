import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { util } from '@sentre/senhub'
import { RewardData } from '@sentre/farming'

/**
 * Store constructor
 */

export type RewardState = Record<string, RewardData>

const NAME = 'rewards'
const initialState: RewardState = {}

/**
 * Actions
 */

export const initRewards = createAsyncThunk(
  `${NAME}/initRewards
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

export const getRewards = createAsyncThunk<RewardState, void, { state: any }>(
  `${NAME}/getRewards`,
  async (_, { getState }) => {
    const { rewards } = getState()
    return rewards
  },
)

const slice = createSlice({
  name: NAME,
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    void builder
      .addCase(initRewards.fulfilled, (state, { payload }) => payload)
      .addCase(
        upsetReward.fulfilled,
        (state, { payload }) => void Object.assign(state, payload),
      ),
})

export default slice.reducer
