import axios from "axios";
import React, { useState } from "react";
import { Form, Row, Col, Button, InputGroup } from 'react-bootstrap';

const ReminderMail = ({ theClientMail, handleDialog }) => {
    // console.log(theClientMail)

    const [invoiceNumber] = useState(theClientMail.invoiceNumber);
    const [billTo] = useState(theClientMail.billTo);
    const [clientEmail] = useState(theClientMail.clientEmail);

    const data1 = {
        invoiceNumber: invoiceNumber,
        clientEmail: clientEmail
    }


    const items = localStorage.getItem('accessToken');
    // const handleSubmission = async () => {
    //     await axios.post('https://43.204.38.243:3000/api/sendInvoiceMail',
    //         formData, {
    //         headers: { "x-access-token": items }
    //     })
    //     handleDialog();
    // };
    return (
        <div>
            <Row>
                <Col>
                    <Form.Label>Invoice Number</Form.Label>
                    <Form.Control
                        disabled
                        value={invoiceNumber}
                    />
                </Col>
                <Col>
                    <Form.Label>Client Email</Form.Label>
                    <Form.Control
                        disabled
                        value={clientEmail}
                    />
                </Col>
            </Row>
            <Row>
                <Col>
                    <Form.Label>Client Name</Form.Label>
                    <Form.Control
                        disabled
                        value={billTo}
                    />
                </Col>
                <Col>
                    <Form.Label>Select Invoice</Form.Label>
                    {/* <input type="file" name="file" onChange={changeHandler} /> */}
                </Col>
            </Row>

            <div>
                <button type="submit"
                    className="btn btn-success"
                    style={{ margin: 5 + 'px' }}
                // onClick={handleSubmission}
                >
                    Send
                </button>
            </div>
        </div>
    )
};

export default ReminderMail;