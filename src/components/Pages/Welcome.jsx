import React, { useState } from 'react'
import Inbox from '../MailBox/Inbox';
import Sentbox from '../Mailbox/Sentbox';
import { Button, Col, Row } from 'react-bootstrap';
import "./Welcome.css"; 
import { useNavigate } from 'react-router';
import { useSelector } from 'react-redux';
const Welcome = () => {
  const [showInbox, setShowInbox] = useState(false);
  const [showOutbox, setShowOutbox] = useState(false);
  const navigate = useNavigate();
  const unread = useSelector(state => state.mails.totalUnread);

  return (
    <>
    <div className='d-block bg-body-secondary fs-1 p-4 fw-bold'>Welcome to Mail Box Client!</div>
    
    <div className='m-3 '>
      <Row className='welcome-ui'>
        <div>
          <Button className="m-1"variant='info' onClick={()=>{
            setShowInbox(prev => !prev)
            setShowOutbox(false);
          }}>Inbox {unread}</Button>
          <Button className="m-1" variant='info' onClick={()=>{
            setShowOutbox(prev => !prev);
            setShowInbox(false);
          }}>sentbox</Button>
        </div>
      </Row>
      <Row>
        {showInbox && <Inbox />}
        {showOutbox && <Sentbox />}
      </Row>
      <div>
        <Button variant='primary' onClick={()=> navigate('/mail')} className='compose-btn'>Compose</Button>
      </div>
    </div>
    </>
  )
}

export default Welcome