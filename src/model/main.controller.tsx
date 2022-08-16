import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { FarmTab } from 'constant'

/**
 * Interface & Utility
 */

export enum SortDirection {
  ASC = 'ASC',
  DESC = 'DESC',
  null = 'null',
}
export type SortType = 'liquidity' | 'apr'

export type MainState = {
  searchKey: string
  sortType: Record<SortType, SortDirection>
  farmTab: string
  boostOnly: boolean
}

/**
 * Store constructor
 */

const NAME = 'main'
const initialState: MainState = {
  searchKey: '',
  sortType: { liquidity: SortDirection.null, apr: SortDirection.null },
  farmTab: FarmTab.All,
  boostOnly: false,
}

/**
 * Actions
 */

export const setSearchKey = createAsyncThunk(
  `${NAME}/setSearchKey`,
  async (searchKey: string) => {
    return { searchKey }
  },
)

export const setSort = createAsyncThunk(
  `${NAME}/setSort`,
  async (sortType: Record<SortType, SortDirection>) => {
    return { sortType }
  },
)

export const setFarmTab = createAsyncThunk(
  `${NAME}/setFarmTab`,
  async (farmTab: string) => {
    return { farmTab }
  },
)

export const switchBoostOnly = createAsyncThunk<
  Partial<MainState>,
  void,
  { state: any }
>(`${NAME}/switchBoostOnly`, async (_, { getState }) => {
  const {
    main: { boostOnly },
  } = getState()
  return {
    boostOnly: !boostOnly,
  }
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
        setSearchKey.fulfilled,
        (state, { payload }) => void Object.assign(state, payload),
      )
      .addCase(
        setSort.fulfilled,
        (state, { payload }) => void Object.assign(state, payload),
      )
      .addCase(
        switchBoostOnly.fulfilled,
        (state, { payload }) => void Object.assign(state, payload),
      )
      .addCase(
        setFarmTab.fulfilled,
        (state, { payload }) => void Object.assign(state, payload),
      ),
})

export default slice.reducer
