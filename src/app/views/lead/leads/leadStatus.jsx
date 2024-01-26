import React, { useState } from "react";
import { Form, Row, Col, Button } from 'react-bootstrap';

const LeadStatus = ({ theLeadStatus, handleDialog }) => {
    const [leadId] = useState(theLeadStatus.leadId);
    const [name] = useState(theLeadStatus.name);
    const [content, setContent] = useState("🌟 Welcome to our family of clients! 🌟 We're thrilled to have you on board and look forward to delivering exceptional service tailored to your needs. Feel free to reach out with any questions or requests. We're here to make your experience with us extraordinary.");

    const [paymentOption, setPaymentOption] = useState('upi');
    const [upiId, setUpiId] = useState('');
    const [bankName, setBankName] = useState('');
    const [accountNo, setAccountNo] = useState('');
    const [ifsc, setIfsc] = useState('');

    const constructMessage = () => {
        if (paymentOption === 'upi') {
            return `Hey ${name},%0aGreetings from BOOSTOCK INFO !!!%0aThanks for showing your interest.%0aPlease make the payment via UPI. UPI ID: ${upiId}%0a${content}%0aPlease visit our website for more details www.boostok.in&app_absent=0`;
        } else if (paymentOption === 'bank') {
            return `Hey,%0aGreetings from BOOSTOCK INFO !!!%0aThanks for showing your interest.%0aPlease make the payment via bank transfer.%0aBank Details:%0aBank Name: ${bankName}%0aAccount No: ${accountNo}%0aIFSC: ${ifsc}%0a${content}%0aPlease visit our website for more details www.boostok.in&app_absent=0`;
        }
    };

    const sendWhatsAppMessage = () => {
        const message = constructMessage();
        const url = `whatsapp://send?phone=${theLeadStatus.mobileNo}&text=${message}`;

        // Check if the browser supports the whatsapp:// protocol
        if (window.navigator.userAgent.match(/(iPhone|iPod|iPad|Android|webOS|BlackBerry|IEMobile|Opera Mini)/)) {
            window.location.href = url;
        } else {
            // For desktop browsers
            window.open(url, '_blank');
        }
    };

    const changePage = () => {
        handleDialog();
    };

    return (
        <div>
            <Row>
                <Col>
                    <Form.Label>Lead No</Form.Label>
                    <Form.Control
                        disabled
                        value={leadId}
                        placeholder="Enter the Lead Name"
                    />
                </Col>
                <Col>
                    <Form.Label>Lead Name</Form.Label>
                    <Form.Control
                        disabled
                        value={name}
                        placeholder="Enter the Lead Name"
                    />
                </Col>
            </Row>
            <br></br>
            <label style={{ color: 'red' }}>Share Company Details</label>
            <br></br>
            <Row>
                <Col>
                    <Form.Label>Company Name</Form.Label>
                    <Form.Control
                        disabled
                        value={"Unity Share Info"}
                        placeholder="Enter the Lead Name"
                    />
                </Col>
                <Col>
                    <Form.Label>Company Address</Form.Label>
                    <Form.Control
                        disabled
                        value={"Vashi, Navi Mumbai"}
                        placeholder="Enter the Lead Name"
                    />
                </Col>
            </Row>
            <Row>
                <Col>
                    <Form.Label>Contact Number</Form.Label>
                    <Form.Control
                        disabled
                        value={"7715815877"}
                        placeholder="Enter the Lead Name"
                    />
                </Col>
                <Col>
                    <Form.Label>Website Link</Form.Label>
                    <Form.Control
                        disabled
                        value={"www.unityshareinfo.com"}
                        placeholder="Enter the Lead Name"
                    />
                </Col>
            </Row>
            <Row className='mt-1 mb-1'>
                <Col>
                    <Form.Label>Select Payment Option</Form.Label>
                    <div>
                        <Form.Check
                            inline
                            label="UPI"
                            type="radio"
                            id="upi-radio"
                            checked={paymentOption === 'upi'}
                            onChange={() => setPaymentOption('upi')}
                        />
                        <Form.Check
                            inline
                            label="Bank"
                            type="radio"
                            id="bank-radio"
                            checked={paymentOption === 'bank'}
                            onChange={() => setPaymentOption('bank')}
                        />
                    </div>
                </Col>
            </Row>
            {paymentOption === 'upi' && (
                <Row>
                    <Col>
                        <Form.Label>UPI ID</Form.Label>
                        <Form.Control
                            type="text"
                            value={upiId}
                            onChange={(e) => setUpiId(e.target.value)}
                            placeholder="Enter UPI ID"
                        />
                    </Col>
                </Row>
            )}
            {paymentOption === 'bank' && (
                <Row>
                    <Col>
                        <Form.Label>Bank Name</Form.Label>
                        <Form.Control
                            type="text"
                            value={bankName}
                            onChange={(e) => setBankName(e.target.value)}
                            placeholder="Enter Bank Name"
                        />
                    </Col>
                    <Col>
                        <Form.Label>Account No</Form.Label>
                        <Form.Control
                            type="text"
                            value={accountNo}
                            onChange={(e) => setAccountNo(e.target.value)}
                            placeholder="Enter Account No"
                        />
                    </Col>
                    <Col>
                        <Form.Label>IFSC</Form.Label>
                        <Form.Control
                            type="text"
                            value={ifsc}
                            onChange={(e) => setIfsc(e.target.value)}
                            placeholder="Enter IFSC"
                        />
                    </Col>
                </Row>
            )}
            <Row className='mt-1'>
                <Col>
                    <Form.Label>Message</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={4}
                        onChange={(e) => setContent(e.target.value)}
                        value={content}
                        placeholder="Welcome Message"
                    />
                </Col>
            </Row>
            <br />
            <Row>
                <Col className="d-flex justify-content-end">
                    <Button onClick={changePage} variant="secondary">Cancel</Button>
                    &nbsp;
                    <Button onClick={sendWhatsAppMessage} variant="success">Share</Button>
                </Col>
            </Row>
        </div>
    );
};


export default LeadStatus;
