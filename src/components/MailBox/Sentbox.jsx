import React, { useEffect} from 'react';
import { DeleteMail, getSentMails, getMails, UpdateMail } from '../API/SendMail';
import { useDispatch, useSelector } from 'react-redux';
import { mailActions } from '../store/mailSlice';
// import { useNavigate } from 'react-router';
import './Inbox.css'
import ViewMail from './ViewMail';
import { uiActions } from '../store/uiSlice';

const Sentbox = () => {
    const dispatch = useDispatch();

    const allMails = useSelector(state => state.mails.mails);
    const sent = useSelector(state => state.mails.sent);
    const selectedMail = useSelector(state => state.ui.selectedMail);

    useEffect(()=>{
        const fetchMails = async ()=>{
            const result = await getMails();
             if(result.ok && result.data){
                const mails = Object.keys(result.data).map(id =>({
                    id, ...result.data[id]
                })).reverse();
                dispatch(mailActions.setMails(mails));
            }
        }
        fetchMails();
    },[dispatch]);

    useEffect(()=>{
        const fetchInboxMails = async()=>{

            const result = await getSentMails();
    
            if(result.ok && result.data){
                // We get the IDs from the API
                const mail_ids = Object.keys(result.data);

                // And immediately use them to find the full mail objects from allMails.
                // No need to store the IDs separately in Redux.
                const SentMails = mail_ids.map(id => {
                    const mailData = allMails.find(mail => mail.id === id);
                    return { id, ...mailData };
                }).filter(mail => mail.subject); // Filter out any potential misses
                
                dispatch(mailActions.setSentMails(SentMails));
            }
        }
        
        fetchInboxMails();
        
    },[dispatch, allMails]);

    const viewMailHandler= async (id)=>{
        const res = await UpdateMail(id);
        if(res.ok){
            dispatch(mailActions.isRead(id));
        }
        const mailId = sent.find(m => m.id === id);
        dispatch(uiActions.selectMail(mailId));
    };
    
    // const deleteMailHandler=async (id)=>{ //only deleting from inbox not sentbox
    //        const res = await DeleteMail(id);
    //        if(res.ok){
    //            dispatch(mailActions.removeMail(id));
    //        }
    // }
    
    return (
        <div>
            {selectedMail ? (<ViewMail />) : (sent.map(mail => (
                <div className='mailbox inbox-mail-title fw-medium' key={mail.id}>
                    <span className={`mail-title`} onClick={()=> viewMailHandler(mail.id)}>
                        <i data-testid={"mail-icon"} className="fa-solid fa-envelope"></i> 
                        {/* <i className={`fa-solid fa-circle ${mail.isRead ? "isRead" : ""}`} ></i> */}
                        {mail.subject} 
                    </span>
                    {/* <i id="delete-btn" className="fa-solid fa-trash-can"></i> */}
                </div>
                )))
            }
        </div>
  );
};

export default Sentbox;
