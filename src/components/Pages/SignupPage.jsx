import React, { useRef, useState } from 'react'
import { Alert, Button, Form, FormControl, FormLabel, Row } from 'react-bootstrap';
import "./Signup.css"
import Authenticate from '../API/Authentication';
import { useNavigate } from 'react-router';

const Signup = () => {
    const navigate = useNavigate();

    const emailRef = useRef();
    const passwordRef = useRef();
    const confirmPasswordRef = useRef();
    const [error, setError] = useState(null);
    const [isSignup, setIsSignup] = useState(true);

    const submitHandler= async (e)=>{
        e.preventDefault();

        const enteredEmail = emailRef.current.value.toLowerCase();
        const enteredPassword = passwordRef.current.value;
        
        if(isSignup){
            const enteredConfirmPassword = confirmPasswordRef.current.value;
            
            if(enteredConfirmPassword !== enteredPassword){
                setError("Passwords do not match!");
                return;
            }
        }

        const result = await Authenticate(enteredEmail, enteredPassword, isSignup);
        
        if(!result.ok){
            setError(result.error);
        } else{
            navigate("/Welcome");
            console.log("user has successfullt Signed up!");
        }

    } 
    const [showPass, setShowPass] = useState(false);
    const [showConfirmPass, setShowConfirmPass] = useState(false);
  return (
    <>
    <div className='signup'>
        <div className='signup-card'>
            <h2 className=' mb-4 text-center'>{isSignup ? "Sign up" : "Login"}</h2>
            <Form onSubmit={submitHandler} onChange={()=>setError(null)}>
                <Row className='mb-3'>
                    <FormControl placeholder='Email' type='email' ref={emailRef} required/>
                </Row>
                <Row className='mb-3 password-field'>
                    <FormControl className='password-input ' placeholder='Password' type={showPass?'text':'password'} ref={passwordRef} required/>
                    <span className='toggle-show-btn' onClick={() => setShowPass(prev => !prev)}>
                        <i className={showPass ? "far fa-eye-slash" : "far fa-eye"}></i>
                    </span>
                </Row>
                {isSignup && <Row className='mb-3 password-field'>
                        <FormControl className='password-input'  placeholder='confirm Password' type={showConfirmPass?'text':'password'} ref={confirmPasswordRef} required/>
                        <span className='toggle-show-btn' onClick={() => setShowConfirmPass(prev => !prev)}>
                            <i className={showConfirmPass ? "far fa-eye-slash" : "far fa-eye"}></i>
                        </span>
                </Row>}
                <Row className='mt-4 mb-3'>
                    <Button type='submit' variant="primary">{isSignup ? "Sign up" : "Login"}</Button>
                </Row>
                {error && <Alert variant='danger' className='py-2 text-center' >{error}</Alert>}
                {!isSignup && <a href='#'>Forgot Password?</a>}
            </Form>
        </div>
        <div className='signup-option text-center mt-3'>
            <p type="button" onClick={()=> setIsSignup(prev => !prev)}>{isSignup? "Have an account? Login" : "Don't have an account? Signup"} </p>
        </div>
    </div>
    </>
  )
}

export default Signup;