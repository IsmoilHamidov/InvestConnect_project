import { configureStore } from '@reduxjs/toolkit';
import { api } from './slice/products';
import { userApi } from '@/Pages/UserPage/apiSlice';
import { profileSlice } from "./slice/profile"

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [profileSlice.reducerPath]: profileSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware, userApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
