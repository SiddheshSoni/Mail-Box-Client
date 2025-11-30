import React, { useRef, useState } from 'react'
import { Button, Form, FormControl, FormGroup, FormLabel } from 'react-bootstrap';
import ReactQuill from 'react-quill-new';
import "react-quill-new/dist/quill.core.css";
import "./Mail.css";
import { sendMail } from '../API/SendMail';

const Mail = () => {
    const emailRef= useRef();
    const subjectRef= useRef();
    const [value, setValue] = useState("");
    const loggedInUser = localStorage.getItem("userId");

    const submitHandler= async (e) =>{
        e.preventDefault();

        const mailData = {
            to : emailRef.current.value,
            from: loggedInUser,
            subject : subjectRef.current.value,
            mailContent : value,
        }
        const result = await sendMail(mailData);
        console.log(result);
    };
  return (
    <div className='mail-editor'>
        <Form onSubmit={submitHandler}>
            <FormGroup className="form-group-inline">
                <FormLabel>To:</FormLabel>
                <FormControl ref={emailRef}/>
            </FormGroup>
            <FormGroup className="form-group-inline">
                <FormLabel>Subject:</FormLabel>
                <FormControl ref={subjectRef}/>
            </FormGroup>
            
        <ReactQuill className="quill-editor" theme='snow' style={{ border:"none" }} value={value} onChange={setValue} />

        <Button type='submit' variant='primary' className='sendMailBtn'>Send</Button>
        </Form>
    
    </div>
  )
}

export default Mail;