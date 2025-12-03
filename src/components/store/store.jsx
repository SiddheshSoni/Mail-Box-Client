import { configureStore } from "@reduxjs/toolkit";
import mailReducer from "./mailSlice";
import authReducer from "./authSlice";
import uiReducer from "./uiSlice"

const store = configureStore({
    reducer:{mails: mailReducer, auth : authReducer, ui: uiReducer }
});

export default store;