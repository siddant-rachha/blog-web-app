import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { sliceNames } from '@/globalState/sliceNames';
import { PostType } from '@/types/types';

export const postsSlice = createSlice({
  name: sliceNames.postsSlice,
  initialState: {
    allPosts: [] as PostType[] | [],
    editPost: {} as PostType,
    readPost: {} as PostType,
  },
  reducers: {
    setAllPosts: (state, action: PayloadAction<PostType[]>) => {
      state.allPosts = action.payload;
    },
    setEditPost: (state, action: PayloadAction<PostType>) => {
      state.editPost = action.payload;
    },
    setReadPost: (state, action: PayloadAction<PostType>) => {
      state.readPost = action.payload;
    },
  },
});

export const postsSliceReducer = postsSlice.reducer;

export const { ...postsSliceActions } = postsSlice.actions;
