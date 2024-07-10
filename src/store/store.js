import {configureStore} from '@reduxjs/toolkit';
import authSlice from './authSlice';
import themeSlice from './themeSlice';
import LoadingSLice from './LoadingSLice';
export const store = configureStore({
    reducer:{
        auth:authSlice,
        theme:themeSlice,
        Loading : LoadingSLice
    }
});