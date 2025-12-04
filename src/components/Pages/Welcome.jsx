import React, { useState } from 'react'
import Inbox from '../MailBox/Inbox';
import Sentbox from '../MailBox/Sentbox';
import { Button, Col, Row } from 'react-bootstrap';
import "./Welcome.css"; 
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { uiActions } from '../store/uiSlice';

const Welcome = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showInbox, setShowInbox] = useState(false);
  const [showOutbox, setShowOutbox] = useState(false);
  const unread = useSelector(state => state.mails.totalUnread);
 
  const inboxBtnHandler=()=>{
      setShowInbox(true);
      setShowOutbox(false);
      dispatch(uiActions.selectMail(null));
  };

  const sentboxBtnHandler=()=>{
      setShowOutbox(true);
      setShowInbox(false);
  };
  return (
    <>
    <div className='d-block bg-body-secondary fs-1 p-4 fw-bold text-center'>Welcome to Mail Box Client!</div>
    
    <div className='m-3 '>
      <Row className='welcome-ui '>
        <Col sm={3} className='inbox-navigator'>
        <div className='d-flex flex-column '>
          <Button className="inbox-btn border-bottom-0" variant='info' onClick={inboxBtnHandler}>
            Inbox 
            <span className=' fw-medium'> {unread}</span>
            </Button>
          <Button className="inbox-btn" variant='info' onClick={sentboxBtnHandler}>sentbox</Button>
        </div>
        </Col>
        <Col className='p-0 inbox-container'>
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