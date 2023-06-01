import { createSlice } from '@reduxjs/toolkit';

interface InitialState {
  page: string;
}

const initialState: InitialState = {
  page: 'Registration',
};

export const AuthorizationPageSlice = createSlice({
  name: 'Authorization State',
  initialState,
  reducers: {
    authorizationPageText: (state, { payload }) => {
      state.page = payload;
    },
  },
});

export const { authorizationPageText } = AuthorizationPageSlice.actions;

export default AuthorizationPageSlice.reducer;
