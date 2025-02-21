import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchDemoDataById } from '@/apiService/fetchDemoData/fetchDemoData';
import { sliceNames } from '../sliceNames';

const testSlice = createSlice({
  name: 'test',
  initialState: {},
  reducers: {
    increment: (state) => {
      return state;
    },
  },
});

export const { increment } = testSlice.actions;

const ASYNC_ACTION_NAME = {
  FETCH_USER: `${sliceNames.demo}/fetchDemoData`,
};

// Define the async thunk
const fetchDemoData = createAsyncThunk(
  ASYNC_ACTION_NAME.FETCH_USER,
  async (userId: string) => {
    const response = await fetchDemoDataById(userId);
    return response;
  }
);

export const demoSlice = createSlice({
  name: sliceNames.demo,
  initialState: {
    demo: '',
    status: '',
  },
  reducers: {
    setDemo: (state, action) => {
      state.demo = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(increment, (state) => {
        state.demo = 'demo'; // Example: update state when other slice action is triggered
      })
      // Example handling async action
      .addCase(fetchDemoData.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchDemoData.fulfilled, (state, action) => {
        state.status = 'succeeded';
      })
      .addCase(fetchDemoData.rejected, (state, action) => {
        state.status = 'failed';
      });
  },
});

export const demoReducer = demoSlice.reducer;

export const { setDemo } = demoSlice.actions;
export { fetchDemoData };
