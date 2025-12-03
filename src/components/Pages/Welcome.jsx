import React, { useState } from 'react'
import Inbox from '../MailBox/Inbox';
import Sentbox from '../Mailbox/Sentbox';
import { Button, Col, Row } from 'react-bootstrap';
import "./Welcome.css"; 
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { uiActions } from '../store/uiSlice';
const Welcome = () => {
  const [showInbox, setShowInbox] = useState(true);
  const [showOutbox, setShowOutbox] = useState(false);
  const navigate = useNavigate();
  const unread = useSelector(state => state.mails.totalUnread);
  // const selectedMail = useSelector(state => state.ui.selectedMail);
  const dispatch = useDispatch();
  return (
    <>
    <div className='d-block bg-body-secondary fs-1 p-4 fw-bold text-center'>Welcome to Mail Box Client!</div>
    
    <div className='m-3 '>
      <Row className='welcome-ui'>
        <Col sm={3}>
        <div className='d-flex flex-column'>
          <Button className="m-1"variant='info' onClick={()=>{
            setShowInbox(prev => !prev)
            setShowOutbox(false);
            dispatch(uiActions.selectMail(null));
          }}>Inbox {unread}</Button>
          <Button className="m-1" variant='info' onClick={()=>{
            setShowOutbox(prev => !prev);
            setShowInbox(false);
          }}>sentbox</Button>
        </div>
        </Col>
        <Col>
        {showInbox && <Inbox />}
        {showOutbox && <Sentbox />}
        </Col>
      </Row>
      <div>
        <Button variant='primary' onClick={()=> navigate('/mail')} className='compose-btn'>Compose</Button>
      </div>
    </div>
    </>
  )
}

export default Welcome