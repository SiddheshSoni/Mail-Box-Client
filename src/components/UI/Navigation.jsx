import React from 'react';
import { Navbar, Nav, Button, Container } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router';
import { authActions } from '../store/authSlice';

const Navigation = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const logoutHandler = () => {
        dispatch(authActions.onLogout());
        localStorage.removeItem('idToken');
        localStorage.removeItem('user');
        navigate('/');
    };

    return (
        <Navbar bg="light" className="mb-4">
            <Container>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav" className="justify-content-center">
                    <Nav className="mx-auto">
                        <Nav.Link as={Link} to="/Welcome">Welcome</Nav.Link>
                        <Nav.Link as={Link} to="/mail">Mail</Nav.Link>
                    </Nav>
                    <Button variant="outline-danger" onClick={logoutHandler}>Logout</Button>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Navigation;
