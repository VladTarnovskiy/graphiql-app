import { configureStore } from '@reduxjs/toolkit';
import GraphiQLReducer from './slice/GraphiqlPageSlice';
import AuthorizationReducer from './slice/AuthorizationPage.slice';

export const store = configureStore({
  reducer: { authorization: AuthorizationReducer, graphiql: GraphiQLReducer },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
