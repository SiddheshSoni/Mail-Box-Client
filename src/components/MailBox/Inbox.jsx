import React, { useEffect } from 'react';
import { getMail } from '../API/SendMail';

const Inbox = () => {
    let result ;
    const getMails = async ()=>{
        return await getMail();
    }
    useEffect(()=>{
        result = getMail();
    },[]);
    console.log(result);
    
  return (
    <div>
      <h2>Inbox</h2>
      <p>Your received messages will appear here.</p>
    </div>
  );
};

export default Inbox;

