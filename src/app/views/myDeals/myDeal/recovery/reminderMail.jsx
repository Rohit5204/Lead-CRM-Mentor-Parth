import { BASE_URL } from "app/utils/constant";
import axios from "axios";
import React, { useState } from "react";
import { Form, Row, Col, Button, InputGroup } from 'react-bootstrap';

const ReminderMail = ({ theClientMail, handleDialog }) => {
    // console.log(theClientMail)
    const items = localStorage.getItem('accessToken');
    const roleCode = localStorage.getItem('roleCode');
    const userId = localStorage.getItem('userId');
    const headers = {
        "x-access-token": items,
        "roleCode": roleCode,
        "userId": userId
    }
    const [invoiceNumber] = useState(theClientMail.invoiceNumber);
    const [clientName] = useState(theClientMail.clientName);
    const [clientEmail] = useState(theClientMail.clientEmail);
    const [productName] = useState(theClientMail.productName)
    const [instalmentAmount] = useState(theClientMail.instalmentAmount)
    const [instalmentDate] = useState(theClientMail.instalmentDate)

    const sendReminderMail = () => {
        const mailBody = {
            invoiceNo: invoiceNumber,
            itemName: "Stock Option",
            date: instalmentDate,
            amount: instalmentAmount,
            emailId: clientEmail,
            emailTemplateId: 3
        }
        axios.post(BASE_URL + '/api/sendReminderMail', mailBody, {
            headers: headers
        })
    }
    const handleSubmission = () => {
        sendReminderMail()
        handleDialog();
    };
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
                        value={clientName}
                    />
                </Col>
                <Col>
                    <Form.Label>Installment Amount</Form.Label>
                    <Form.Control
                        disabled
                        value={instalmentAmount}

                    />
                    {/* <input type="file" name="file" onChange={changeHandler} /> */}
                </Col>
            </Row>
            <Row>
                <Col>
                    <Form.Label>Product Name</Form.Label>
                    <Form.Control
                        disabled
                        value={productName}
                    />
                </Col>
                <Col>
                    <Form.Label>Installment Date</Form.Label>
                    <Form.Control
                        disabled
                        value={new Date(instalmentDate).toLocaleDateString('en-GB')}

                    />
                    {/* <input type="file" name="file" onChange={changeHandler} /> */}
                </Col>
            </Row>

            <div>
                <button type="submit"
                    className="btn btn-success"
                    style={{ margin: 5 + 'px' }}
                    onClick={handleSubmission}
                >
                    Send
                </button>
            </div>
        </div>
    )
};

export default ReminderMail;