import { rootReducer } from '@/globalState/reducers';
import { configureStore } from '@reduxjs/toolkit';

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
