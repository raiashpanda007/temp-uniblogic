import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    status: false,
    userData: {}
}

const authSlice = createSlice({
    name:'auth',
    initialState,
    reducers:{
        Login: (state, action) => {
            state.status = true;
            state.userData = action.payload;

        },
        Logout: (state) => {
            state.status = false;
            state.user = {};
        }
    }
});

export const {Login, Logout} = authSlice.actions;
export default authSlice.reducer;