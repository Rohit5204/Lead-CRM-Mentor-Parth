import axios from "axios";
import React, { useState, useEffect } from "react";
import { Form, Row, Col, InputGroup } from 'react-bootstrap';
import { Autocomplete, TextField } from '@mui/material';
import { BASE_URL } from "app/utils/constant";

const SendQuotationMail = ({ theClientMail, handleDialog }) => {
    // console.log(theClientMail)
    const [selectedFile, setSelectedFile] = useState();
    const [quotationNumber] = useState(theClientMail.quotationNumber);
    const [billTo] = useState(theClientMail.billTo);
    const [clientEmail] = useState(theClientMail.clientEmail);

    const items = localStorage.getItem('accessToken');
    const roleCode = localStorage.getItem('roleCode');
    const userId = localStorage.getItem('userId');
    const headers = {
        "x-access-token": items,
        "roleCode": roleCode,
        "userId": userId
    }

    const [emailData, setEmailData] = useState([]);
    const [id1, setId1] = useState([]);
    const [myOptions, setMyOptions] = useState(null);
    useEffect(() => {
        axios.get(BASE_URL + `/api/getEmailTemplate?_id=0`,
            { headers: headers }).then((res) => {
                for (var i = 0; i < res.data.data.length; i++) {
                    setEmailData(current => [...current, res.data.data[i].emailSubject]);
                    setId1(current => [...current, res.data.data[i].id, res.data.data[i].emailSubject])
                }
            });
    }, []);
    var catdurationid
    for (var i = 0; i < id1.length; i++) {
        if (myOptions == id1[i]) {
            catdurationid = id1[i - 1]
        }
    }
    const data1 = {
        quotationNumber: quotationNumber,
        clientEmail: clientEmail,
        statusId: 2,
        emailTemplateId: catdurationid
    }
    // const data1 = {
    //     quotationNumber: "0000000032",
    //     clientEmail: "rohit.mentorp@gmail.com"
    // }
    const changeHandler = (event) => {
        setSelectedFile(event.target.files[0]);

    };
    const handleSubmission = async () => {
        const formData = new FormData();
        formData.append('data', JSON.stringify(data1));
        formData.append('file', selectedFile);
        // for (var pair of formData.entries()) {
        //     console.log(pair[0] + ', ' + pair[1]);
        // }
        await axios.post(BASE_URL + '/api/sendQuotationMail',
            formData, {
            headers: headers
        })
        handleDialog();
    };
    return (
        <div>
            <Row>
                <Col>
                    <Form.Label>Invoice Number</Form.Label>
                    <Form.Control
                        disabled
                        value={quotationNumber}
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
                <Col md="6">
                    <InputGroup>
                        <Form.Label className="mt-1">Message Subject</Form.Label>
                    </InputGroup>
                    <Autocomplete
                        style={{ width: 370 }}
                        freeSolo
                        autoComplete
                        autoHighlight
                        options={emailData}
                        value={myOptions}
                        onChange={(e) => setMyOptions(e.currentTarget.innerHTML)}
                        renderInput={(params) => (
                            <TextField
                                {...params}

                                variant="outlined"
                                label="Select the Message Subject"
                                size="small"
                            />
                        )}
                    />
                </Col>
            </Row>
            <Row>
                <Col>
                    <Form.Label>Attach Invoice</Form.Label>
                    <br />
                    <input type="file" name="file" onChange={changeHandler} />
                </Col>
            </Row>
            <div style={{ display: "flex", justifyContent: 'flex-end' }}>
                {/* <button type="submit"
                    className="btn btn-secondary"
                // style={{ margin: 5 + 'px' }}
                >Cancel
                </button>&nbsp; */}
                <button type="submit"
                    className="btn btn-success"
                    // style={{ margin: 5 + 'px' }}
                    onClick={handleSubmission}>Send
                </button>
            </div>
        </div>
    )
};

export default SendQuotationMail;