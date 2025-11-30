import React from 'react';
import { Navbar, Nav, Button, Container } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router';

const Navigation = () => {
    const navigate = useNavigate();

    const logoutHandler = () => {
        // Clear user data from local storage
        localStorage.removeItem('idToken');
        localStorage.removeItem('user');
        // Navigate back to the signup/login page
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
