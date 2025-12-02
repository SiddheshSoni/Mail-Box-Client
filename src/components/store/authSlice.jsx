import { createSlice } from "@reduxjs/toolkit";

const token = localStorage.getItem("idToken");
const isUserLoggedIn = !!token;

const initialState ={
    idToken:token,
    isLoggedIn: isUserLoggedIn,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers:{
        onLogin(state, action){
            state.idToken = action.payload;
            state.isLoggedIn= true;
        },
        onLogout(state){
            state.idToken = null;
            state.isLoggedIn = false;
        }
    }
});

export const authActions = authSlice.actions;
export default authSlice.reducer;