import React, { useState } from 'react'
import Inbox from '../Mailbox/Inbox';
import Sentbox from '../Mailbox/Sentbox';
import { Button, Col, Row } from 'react-bootstrap';

const Welcome = () => {
  const [showInbox, setShowInbox] = useState(false);
  const [showOutbox, setShowOutbox] = useState(false);
  return (
    <>
    <div className='d-block bg-body-secondary fs-1 p-4 fw-bold'>Welcome to Mail Box Client!</div>
    
    <div className='justify-content-center m-3 '>
      <Row>
        <Col>
          <Button variant='info' onClick={()=>{
            setShowInbox(prev => !prev)
            setShowOutbox(false);
            }}>Inbox</Button>
        </Col>
        <Col>
          <Button variant='info' onClick={()=>{
            setShowOutbox(prev => !prev);
            setShowInbox(false);
            }}>sentbox</Button>
        </Col>
      </Row>
      <Row>
        {showInbox && <Inbox />}
        {showOutbox && <Sentbox />}
      </Row>
    </div>
    </>
  )
}

export default Welcome