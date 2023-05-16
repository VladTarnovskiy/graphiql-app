/* eslint-disable import/no-cycle */
/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getIntrospectionQuery } from 'graphql';
import { RootState } from '../store';

interface InitialState {
  status: '' | 'loading' | 'succeeded' | 'failed';
  response: string;
  error: string;
}

const initialState: InitialState = {
  status: '',
  response: '',
  error: '',
};

export const fetchDocsRequest = createAsyncThunk('docs/fetchDocsRequest', async () => {
  try {
    const response = await fetch('https://rickandmortyapi.com/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // ...JSON.parse(headersInput),
      },
      body: JSON.stringify({
        query: getIntrospectionQuery(),
      }),
    });
    const datax = await response.json();
    const editData = JSON.stringify(datax, null, '\t');
    return editData as string;
  } catch (e) {
    return e as string;
  }
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
        state.error = action.error.message!;
      });
  },
});

export default docsSlice.reducer;

export const { setResponse } = docsSlice.actions;

export const selectDocsResponseValue = (state: RootState) => state.docs.response;
export const selectDocsResponseStatus = (state: RootState) => state.docs.status;
export const selectDocsResponseError = (state: RootState) => state.docs.error;
