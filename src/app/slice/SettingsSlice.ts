/* eslint-disable import/no-cycle */
/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';

interface InitialState {
  language: string;
  theme: string;
}

const initialState: InitialState = {
  language: '',
  theme: '',
};

export const settingsSlice = createSlice({
  name: 'settings info',
  initialState,
  reducers: {
    setLanguage: (state, { payload }) => {
      state.language = payload;
    },
    setTheme: (state, { payload }) => {
      state.theme = payload;
    },
  },
});

export const { setLanguage } = settingsSlice.actions;
export const { setTheme } = settingsSlice.actions;

export default settingsSlice.reducer;

export const selectLanguage = (state: RootState) => state.settings.language;
export const selectTheme = (state: RootState) => state.settings.theme;
