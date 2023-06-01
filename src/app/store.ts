/* eslint-disable import/no-cycle */
import { configureStore } from '@reduxjs/toolkit';
import GraphiQLReducer from './slice/GraphiqlPageSlice';
import AuthorizationReducer from './slice/AuthorizationPage.slice';
import SettingsReducer from './slice/SettingsSlice';
import DocsReducer from './slice/DocsSlice';

export const store = configureStore({
  reducer: {
    authorization: AuthorizationReducer,
    graphiql: GraphiQLReducer,
    settings: SettingsReducer,
    docs: DocsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: null,
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
