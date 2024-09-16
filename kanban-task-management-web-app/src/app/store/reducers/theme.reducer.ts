import { createReducer, on } from '@ngrx/store';
import * as ThemeActions from '../actions/theme.actions';

export interface ThemeState {
  darkMode: boolean;
}

export const initialState: ThemeState = {
  darkMode: localStorage.getItem('darkMode') === 'true' ? true : false,
};

export const themeReducer = createReducer(
  initialState,
  on(ThemeActions.toggleTheme, (state) => {
    const newState = {
      ...state,
      darkMode: !state.darkMode,
    };
    localStorage.setItem('darkMode', newState.darkMode.toString());
    return newState;
  }),
  on(ThemeActions.setDarkMode, (state) => {
    localStorage.setItem('darkMode', 'true');
    return {
      ...state,
      darkMode: true,
    };
  }),
  on(ThemeActions.setLightMode, (state) => {
    localStorage.setItem('darkMode', 'false');
    return {
      ...state,
      darkMode: false,
    };
  })
);
