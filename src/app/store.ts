/* eslint-disable import/no-cycle */
import { configureStore } from '@reduxjs/toolkit';
import GraphiQLReducer from './slice/GraphiqlPageSlice';
import AuthorizationReducer from './slice/AuthorizationPage.slice';
import SettingsReducer from './slice/SettingsSlice';

export const store = configureStore({
  reducer: {
    authorization: AuthorizationReducer,
    graphiql: GraphiQLReducer,
    settings: SettingsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
