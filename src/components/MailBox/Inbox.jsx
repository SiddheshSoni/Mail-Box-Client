import React, { useEffect, useState } from 'react';
import { getMail } from '../API/SendMail';
import { useDispatch, useSelector } from 'react-redux';
import { mailActions } from '../store/mailSlice';
import { useNavigate } from 'react-router';

const Inbox = () => {
    // const [inbox, setInbox] = useState([]);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const inbox = useSelector(state => state.mails.inbox);
    useEffect(()=>{
        const fetchMails = async()=>{
            const result = await getMail();
            if(result.ok && result.data){
                const mails = Object.keys(result.data).map(id=>({
                    id, ...result.data[id]
                }));
                dispatch(mailActions.setMails(mails));
            }
        }
        fetchMails();
    },[dispatch]);
    const viewMailHandler=(id)=>{
        navigate("/mails/"+ id);
    }
    return (
        <div>
      <h2 className='text-center'>Inbox</h2>
        {console.log(inbox)}
      {!inbox && <p>Your received messages will appear here.</p>}

      {inbox.map(mail => (
        <div className='mailbox' key={mail.id}>
            <h4 onClick={()=> viewMailHandler(mail.id)}>{mail.subject}</h4>
            
            {/* <p dangerouslySetInnerHTML={{ __html: mail.mailContent }}></p> */}
        </div>
        ))}
    </div>
  );
};

export default Inbox;
