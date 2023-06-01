/* eslint-disable import/no-cycle */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { IntrospectionQuery, getIntrospectionQuery } from 'graphql';
import { RootState } from '../store';

interface InitialState {
  status: '' | 'loading' | 'succeeded' | 'failed';
  response: IntrospectionQuery;
  error: string;
}

const initialState: InitialState = {
  status: '',
  response: {} as IntrospectionQuery,
  error: '',
};

export const fetchDocsRequest = createAsyncThunk('docs/fetchDocsRequest', async () => {
  const response = await fetch('https://rickandmortyapi.com/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: getIntrospectionQuery(),
    }),
  });

  const data = await response.json();
  return data.data;
});

export const docsSlice = createSlice({
  name: 'docs',
  initialState,
  reducers: {
    setResponse: (state, { payload }) => {
      state.response = payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchDocsRequest.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchDocsRequest.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.response = action.payload;
      })
      .addCase(fetchDocsRequest.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'error';
      });
  },
});

export default docsSlice.reducer;

export const { setResponse } = docsSlice.actions;

export const selectDocsResponseValue = (state: RootState) => state.docs.response;
export const selectDocsResponseStatus = (state: RootState) => state.docs.status;
export const selectDocsResponseError = (state: RootState) => state.docs.error;
