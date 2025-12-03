import React, { useEffect} from 'react';
import { DeleteMail, getMail, UpdateMail } from '../API/SendMail';
import { useDispatch, useSelector } from 'react-redux';
import { mailActions } from '../store/mailSlice';
// import { useNavigate } from 'react-router';
import './Inbox.css'
import ViewMail from './ViewMail';
import { uiActions } from '../store/uiSlice';

const Inbox = () => {
    const dispatch = useDispatch();
    // const [selectedMail, setSelectedMail] = useState(null);
    const inbox = useSelector(state => state.mails.inbox);
    const selectedMail = useSelector(state => state.ui.selectedMail);

    useEffect(()=>{
        const fetchMails = async()=>{
            const result = await getMail();
            if(result.ok && result.data){
                const mails = Object.keys(result.data).map(id=>({
                    id, ...result.data[id]
                })).reverse();
                dispatch(mailActions.setMails(mails));
            }
        }
        fetchMails();
    },[dispatch]);

    const viewMailHandler= async (id)=>{
        const res = await UpdateMail(id);
        if(res.ok){
            dispatch(mailActions.isRead(id));
        }
        const mailId = inbox.find(m => m.id === id);
        dispatch(uiActions.selectMail(mailId));
    };

    const deleteMailHandler=async (id)=>{
       const res = await DeleteMail(id);
       if(res.ok){
            dispatch(mailActions.removeMail(id));
       }
    }

    return (
        <div>
            {selectedMail ? (<ViewMail />) : (inbox.map(mail => (
                <div className='mailbox inbox-mail-title' key={mail.id}>
                    <span className={`mail-title ${mail.isRead ? "read" : ""}`} onClick={()=> viewMailHandler(mail.id)}>
                        <i data-testid={"mail-icon"} className="fa-solid fa-envelope"></i> 
                        <i className={`fa-solid fa-circle ${mail.isRead ? "isRead" : ""}`} ></i>
                        {mail.subject} 
                    </span>
                    <i id="delete-btn" onClick={()=>deleteMailHandler(mail.id)} className="fa-solid fa-trash-can"></i>
                </div>
                )))
            }
        </div>
  );
};

export default Inbox;
