import axios from "axios";
import React, { useState, useEffect } from "react";
import { Form, Row, Col, InputGroup } from 'react-bootstrap';
import { Autocomplete, TextField } from '@mui/material';
import { BASE_URL } from "app/utils/constant";

const SendInvoiceMail = ({ theClientMail, handleDialog, onTableRefresh }) => {
    // console.log(theClientMail)
    const [selectedFile, setSelectedFile] = useState();
    const [invoiceNumber] = useState(theClientMail.invoiceNumber);
    const [billTo] = useState(theClientMail.billTo);
    const [clientEmail] = useState(theClientMail.clientEmail);

    const [emailData, setEmailData] = useState([]);
    const [id1, setId1] = useState([]);
    const [myOptions, setMyOptions] = useState(null);


    const abc = () => {
        const fileInput = document.querySelector('input[type="file"]')
        const blobPdf = new Blob([localStorage.getItem('invoiceDocument')], {
            type
                :
                "application/pdf"
        })
        const file = new File([blobPdf], 'invoice.pdf',
            {
                type
                    :
                    "application/pdf"
            })
        const dataTransfer = new DataTransfer()
        dataTransfer.items.add(file)
        fileInput.files = dataTransfer.files
        console.log(file)
        setSelectedFile(file)
    }

    useEffect(() => {
        axios.get(BASE_URL + `/api/getEmailTemplate?_id=0`,
            { headers: headers }).then((res) => {
                for (var i = 0; i < res.data.data.length; i++) {
                    setEmailData(current => [...current, res.data.data[i].emailSubject]);
                    setId1(current => [...current, res.data.data[i].id, res.data.data[i].emailSubject])
                }
            });
        abc()
    }, []);
    var catdurationid
    for (var i = 0; i < id1.length; i++) {
        if (myOptions == id1[i]) {
            catdurationid = id1[i - 1]
        }
    }
    const data1 = {
        invoiceNumber: invoiceNumber,
        clientEmail: clientEmail,
        statusId: 2,
        emailTemplateId: catdurationid
    }
    const changeHandler = (event) => {
        setSelectedFile(event.target.files[0]);

    };
    const items = localStorage.getItem('accessToken');
    const roleCode = localStorage.getItem('roleCode');
    const userId = localStorage.getItem('userId');
    const headers = {
        "x-access-token": items,
        "roleCode": roleCode,
        "userId": userId
    }
    const handleSubmission = async () => {
        const formData = new FormData();
        formData.append('data', JSON.stringify(data1));
        formData.append('file', selectedFile);
        // for (var pair of formData.entries()) {
        //     console.log(pair[0] + ', ' + pair[1]);
        // }
        console.log({ data: data1, file: selectedFile })

        await axios.post(BASE_URL + `/api/sendInvoiceMail`, formData, {
            headers: headers
        })
            .then(() => {
                handleDialog();
                onTableRefresh();
            })
            .catch(error => {
                console.error("Error sending in mail:", error);
            });
    };
    const changePage = () => {
        handleDialog();
    }
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
                    <Form.Label>Select Invoice</Form.Label>
                    <br />
                    <input type="file" name="file" onChange={changeHandler} />
                </Col>
            </Row>
            <br />
            <Row>
                <Col className="d-flex justify-content-end">
                    <button type="button"
                        className="btn btn-secondary"
                        style={{ margin: 5 + 'px' }}
                        onClick={changePage}>Cancel
                    </button>&nbsp;
                    <button type="submit"
                        className="btn btn-success"
                        style={{ margin: 5 + 'px' }}
                        onClick={handleSubmission}>Send
                    </button>
                </Col>
            </Row>
        </div >
    )
};

export default SendInvoiceMail;