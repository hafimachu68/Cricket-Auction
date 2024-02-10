import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import courtslice from "./courtslice";

export const store=configureStore({
    reducer:{
        user:userSlice,
        court:courtslice
    }
})