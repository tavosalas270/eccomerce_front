import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import loginReducer from "./loginSlice";
import productReducer from "./productSlice";

export const store = configureStore({
    reducer: {
        login: loginReducer,
        product: productReducer
    }
})