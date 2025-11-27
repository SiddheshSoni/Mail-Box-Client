import React, { useRef, useState } from 'react'
import { Alert, Button, Form, FormControl, FormLabel, Row } from 'react-bootstrap';
import "./Signup.css"
import Authenticate from '../API/Authentication';

const Signup = () => {
    const emailRef = useRef();
    const passwordRef = useRef();
    const confirmPasswordRef = useRef();
    const [error, setError] = useState(null);

    const submitHandler= async (e)=>{
        e.preventDefault();

        const enteredEmail = emailRef.current.value;
        const enteredPassword = passwordRef.current.value;
        const enteredConfirmPassword = confirmPasswordRef.current.value;

        if(enteredConfirmPassword !== enteredPassword){
            setError("Passwords do not match!");
            return;
        }

        const result = await Authenticate(enteredEmail, enteredPassword);
        
        if(!result.ok){
            setError(result.error);
        } else{
            console.log("user has successfullt Signed up!");
        }
    } 
  return (
    <>
    <div className='signup'>
        <div className='signup-card'>
            <h2 className=' mb-4 text-center'>Signup</h2>
            <Form onSubmit={submitHandler}>
                <Row className='mb-3'>
                    <FormControl placeholder='Email' type='email' ref={emailRef} required/>
                </Row>
                <Row className='mb-3'>
                    <FormControl placeholder='Password' type="password" ref={passwordRef} required/>
                </Row>
                <Row className='mb-3'>
                    <FormControl placeholder='confirm Password' type='password' ref={confirmPasswordRef} required/>
                </Row>
                <Row className=' mt-4'>
                    <Button type='submit' variant="primary">Sign up</Button>
                </Row>
            </Form>
        </div>
        {error && <Alert>{error}</Alert>}
        <div className='signup-option text-center mt-3'>
            <p type="button">Have an account? Login </p>
        </div>
    </div>
    </>
  )
}

export default Signup;