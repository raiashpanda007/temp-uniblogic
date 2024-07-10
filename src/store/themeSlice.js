import { createSlice } from "@reduxjs/toolkit";
const getInitialTheme = () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) return savedTheme;

    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'Dark' : 'Light';
  };

const initialState = {
    currtheme: getInitialTheme()
};

const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        setTheme: (state, action) => {
            if (state.currtheme === 'Light') {
                state.currtheme = 'Dark';
                localStorage.setItem('theme', 'Dark');
            } else {
                state.currtheme = 'Light';
                localStorage.setItem('theme', 'Light');
            }
        }
    }
});

export const { setTheme } = themeSlice.actions;
export default themeSlice.reducer;
