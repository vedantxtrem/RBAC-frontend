import { configureStore } from "@reduxjs/toolkit";

import authSliceReducer from './Slice/UserSlice.js'

const store = configureStore({
    reducer: {
        user : authSliceReducer
    },
    devTools: true
});

export default store;