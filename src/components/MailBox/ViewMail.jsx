import React from 'react';
import { useSelector } from 'react-redux';
import { Container, Card, Alert } from 'react-bootstrap';
import "./ViewMail.css"
const ViewMail = () => {
    const mail = useSelector(state => state.ui.selectedMail);

    if (!mail) {
        return (
            <Container className="mt-4">
                <Alert variant="warning">Mail not found or is still loading...</Alert>
            </Container>
        );
    }

    return (
        <div>
            <div className="view-mail">
                <div className='view-mail-from'>
                    <span className=' fw-medium opacity-75'>From:</span> {mail.from}
                </div>
                <div  >
                    <div className='view-mail-subject '>
                        <span className='fw-medium opacity-75'>Subject:</span> {mail.subject}
                    </div>
                    <div className='view-mail-body' dangerouslySetInnerHTML={{ __html: mail.mailContent }} />
                </div>
            </div>
        </div>
    );
};

export default ViewMail;
