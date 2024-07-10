import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    DataLoading: false
}

const LoadingSlice = createSlice({
    name: 'loading',
    initialState,
    reducers: {
      setLoading: (state,action) => {
        state.DataLoading = action.payload;
      },
    }

})
export const { setLoading } = LoadingSlice.actions;
export default LoadingSlice.reducer;
