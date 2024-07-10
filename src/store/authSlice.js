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
            console.log('Action :: Payload:: User Data',action.payload)
            console.log('UserData ::' ,state.userData)
        },
        Logout: (state) => {
            state.status = false;
            state.user = {};
        }
    }
});

export const {Login, Logout} = authSlice.actions;
export default authSlice.reducer;