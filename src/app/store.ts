import { configureStore } from '@reduxjs/toolkit';
import AuthorizationReducer from './slice/AuthorizationPage.slice';

export const store = configureStore({
  reducer: { authorization: AuthorizationReducer },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
