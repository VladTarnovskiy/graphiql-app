/* eslint-disable import/no-cycle */
/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';

interface InitialState {
  status: '' | 'loading' | 'succeeded' | 'failed';
  inputData: string;
  variables: string;
  header: string;
  response: string;
  error: string;
}

interface FetchInputs {
  query: string;
  variables: string;
}

const initialState: InitialState = {
  status: '',
  inputData: '',
  variables: '{}',
  header: '',
  response: '',
  error: '',
};

export const fetchDataRequest = createAsyncThunk<string, FetchInputs>(
  'graphiql/fetchDataRequest',
  async (data: FetchInputs) => {
    const response = await fetch('https://rickandmortyapi.com/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // ...JSON.parse(headersInput),
      },
      body: JSON.stringify({
        query: `${data.query}`,
        variables: JSON.parse(data.variables),
      }),
    });
    const datax = await response.json();
    const editData = JSON.stringify(datax, null, '\t');
    return editData;
  }
);

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
  extraReducers(builder) {
    builder
      .addCase(fetchDataRequest.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchDataRequest.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.response = action.payload;
      })
      .addCase(fetchDataRequest.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message!;
      });
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
export const selectResponseStatus = (state: RootState) => state.graphiql.status;
export const selectResponseError = (state: RootState) => state.graphiql.error;
