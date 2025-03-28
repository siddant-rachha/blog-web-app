import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from '@/globalState/reducers';

export const store = configureStore({
  reducer: rootReducer,
});

export type GlobalRootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
