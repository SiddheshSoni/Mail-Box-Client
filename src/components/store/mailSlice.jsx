import { createSlice } from '@reduxjs/toolkit'

const initialState ={
    mails:[],
    inbox:[],
    sent:[],
    totalUnread:0,
}
const mailSlice = createSlice({
    name:"mails",
    initialState,
    reducers:{
        setMails(state, action){
            state.mails = action.payload;
            // state.totalUnread = action.payload.filter(mail => !mail.isRead).length;
        },
        removeMail(state, action){
            const mailId = action.payload;
            const mailToRemove = state.inbox.find(mail => mail.id === mailId);
            if (mailToRemove && !mailToRemove.isRead) {
                state.totalUnread--;
            }
            state.inbox = state.inbox.filter(mail=> mail.id !== action.payload);
        },
        setInboxMails(state, action){
            state.inbox = action.payload;
            state.totalUnread = action.payload.filter(mail => !mail.isRead).length;
        },
        setSentMails(state, action){
            state.sent = action.payload;

        },
        isRead(state, action){
            const mailId = action.payload;
            const mailIndex = state.inbox.findIndex(mail => mail.id === mailId);
            if(mailIndex !== -1){
                const mail = state.inbox[mailIndex];
                if (!mail.isRead) {
                    mail.isRead = true;
                    state.totalUnread--;
                }
            }
        }
    }
})
export const mailActions = mailSlice.actions;
export default mailSlice.reducer;