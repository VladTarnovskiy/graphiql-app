/* eslint-disable import/no-cycle */
/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';

interface InitialState {
  language: string;
  theme: string;
}

const initialState: InitialState = {
  language: localStorage.getItem('language')?.toString() || 'en',
  theme: localStorage.getItem('theme')?.toString() || 'dark',
};

export const settingsSlice = createSlice({
  name: 'settings info',
  initialState,
  reducers: {
    setLanguage: (state, { payload }) => {
      localStorage.setItem('language', payload);
      state.language = payload;
    },
    setTheme: (state, { payload }) => {
      localStorage.setItem('theme', payload);
      state.theme = payload;
    },
  },
});

export default settingsSlice.reducer;

export const { setLanguage, setTheme } = settingsSlice.actions;

export const selectLanguage = (state: RootState) => state.settings.language;
export const selectTheme = (state: RootState) => state.settings.theme;
