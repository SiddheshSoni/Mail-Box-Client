import { configureStore } from "@reduxjs/toolkit";
import mailReducer from "./mailSlice";

const store = configureStore({
    reducer:{mails: mailReducer}
});

export default store;