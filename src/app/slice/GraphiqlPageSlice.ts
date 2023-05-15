/* eslint-disable import/no-cycle */
/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';

interface InitialState {
  inputData: string;
  variables: string;
  header: string;
  response: string;
}

const initialState: InitialState = {
  inputData: '',
  variables: '{}',
  header: '',
  response: '',
};

export const garphiqlPageSlice = createSlice({
  name: 'editorInfo',
  initialState,
  reducers: {
    setInputData: (state, { payload }) => {
      state.inputData = payload;
    },
    setHeaders: (state, { payload }) => {
      state.header = payload;
    },
    setVariables: (state, { payload }) => {
      state.variables = payload;
    },
    setResponse: (state, { payload }) => {
      state.response = payload;
    },
  },
});

export const { setInputData } = garphiqlPageSlice.actions;
export const { setHeaders } = garphiqlPageSlice.actions;
export const { setVariables } = garphiqlPageSlice.actions;
export const { setResponse } = garphiqlPageSlice.actions;

export default garphiqlPageSlice.reducer;

export const selectInputDataValue = (state: RootState) => state.graphiql.inputData;
export const selectVariablesValue = (state: RootState) => state.graphiql.variables;
export const selectHeadersValue = (state: RootState) => state.graphiql.header;
export const selectResponseValue = (state: RootState) => state.graphiql.response;
