import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { util } from '@sentre/senhub'
import { FarmData } from '@sentre/farming'

export type FarmState = Record<string, FarmData>

const NAME = 'farms'
const initialState: FarmState = {}

/**
 * Actions
 */

export const initFarms = createAsyncThunk(
  `${NAME}/initFarms`,
  async (bulk: FarmState) => {
    return bulk
  },
)

export const upsetFarm = createAsyncThunk<
  FarmState,
  { address: string; data: FarmData },
  { state: any }
>(`${NAME}/upsetFarm`, async ({ address, data }) => {
  if (!util.isAddress(address)) throw new Error('Invalid farm address')
  if (!data) throw new Error('Data is empty')
  return { [address]: data }
})

/**
 * Usual procedure
 */

const slice = createSlice({
  name: NAME,
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    void builder
      .addCase(
        initFarms.fulfilled,
        (state, { payload }) => void Object.assign(state, payload),
      )
      .addCase(
        upsetFarm.fulfilled,
        (state, { payload }) => void Object.assign(state, payload),
      ),
})

export default slice.reducer
