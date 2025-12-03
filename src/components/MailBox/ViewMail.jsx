import React from 'react';
import { useSelector } from 'react-redux';
import { Container, Card, Alert } from 'react-bootstrap';

const ViewMail = () => {
    // const mailId = props.id;
    const mail = useSelector(state => state.ui.selectedMail);
    
    // const mail = props.selectedMail;

    if (!mail) {
        return (
            <Container className="mt-4">
                <Alert variant="warning">Mail not found or is still loading...</Alert>
            </Container>
        );
    }

    return (
        <Container className="mt-4">
            <Card>
                <Card.Header>
                    <strong>From:</strong> {mail.from}
                </Card.Header>
                <Card.Body>
                    <Card.Title>Subject: {mail.subject}</Card.Title>
                    <hr />
                    <div dangerouslySetInnerHTML={{ __html: mail.mailContent }} />
                </Card.Body>
            </Card>
        </Container>
    );
};

export default ViewMail;
