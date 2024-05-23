import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    dataUser: {}
}

export const loginSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        addDataUser: (state, action) => {
            state.dataUser = action.payload;
        }
    }
})

export const { addDataUser } = loginSlice.actions;
export default loginSlice.reducer;