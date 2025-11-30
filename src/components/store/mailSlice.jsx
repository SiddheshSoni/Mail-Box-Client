import { createSlice } from '@reduxjs/toolkit'

const initialState ={
    inbox:[]
}
const mailSlice = createSlice({
    name:"mails",
    initialState,
    reducers:{
        setMails(state, action){
            state.inbox = action.payload;
        }
    }
})
export const mailActions = mailSlice.actions;
export default mailSlice.reducer;