import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    listProducts: [],
    listCategories: [],
    listUnits: [],
    listIndicators: []
}

export const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        addProducts: (state, action) => {
            state.listProducts = action.payload;
        },
        addCategories: (state, action) => {
            state.listCategories = action.payload;
        },
        addUnits: (state, action) => {
            state.listUnits = action.payload;
        },
        addIndicators: (state, action) => {
            state.listIndicators = action.payload;
        },
    }
})

export const { addProducts, addCategories, addUnits, addIndicators } = productSlice.actions;
export default productSlice.reducer;