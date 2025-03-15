import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { sliceNames } from '@/globalState/sliceNames';
import { PostType } from '@/types/types';

export const postsSlice = createSlice({
  name: sliceNames.postsSlice,
  initialState: {
    allPosts: [] as PostType[],
  },
  reducers: {
    setAllPosts: (state, action: PayloadAction<PostType[]>) => {
      state.allPosts = action.payload;
    },
  },
});

export const postsSliceReducer = postsSlice.reducer;

export const { ...postsSliceActions } = postsSlice.actions;
