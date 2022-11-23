import * as React from 'react';
import { styled } from '@mui/system';
import { Breadcrumb, SimpleCard } from 'app/components';
import { Box, MenuItem, FormControl, InputLabel, Select } from '@mui/material';
import { Form, Row, Col, Button } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import axios from 'axios';


const Div = styled('div')(() => ({
    margin: '6px 0px 0px 350px',
}));
const EditEMI = ({ theEditEMI, handleDialog }) => {
    // console.log(theEditEMI)
    const [id, setId] = useState(theEditEMI.id);
    const [instalmentNumber, setInstalmentNumber] = useState(theEditEMI.instalmentNumber);
    const [instalmentAmount, setinstalmentAmount] = useState(theEditEMI.instalmentAmount);
    const [instalmentDate, setinstalmentDate] = useState(theEditEMI.instalmentDate);
    const [fineAmount, setfineAmount] = useState(theEditEMI.fineAmount);
    const [hasPaid, sethasPaid] = useState(theEditEMI.hasPaid);

    const UpdateData = {
        instalmentId: id,
        instalmentNumber: instalmentNumber,
        instalmentAmount: instalmentAmount,
        instalmentDate: instalmentDate,
        fineAmount: fineAmount,
        hasPaid: hasPaid,
        updatedBy: 1
    };
    const updateInstallment = (e) => {
        const items = localStorage.getItem('accessToken');
        // console.log({ UpdateData });
        e.preventDefault();
        axios.post(`http://213.136.72.177/cms/api/updateProductInstalment`, UpdateData, { headers: { "x-access-token": items } }).then(() => useEffect);
        handleDialog();
    };
    const handleSubmit = (e) => {
        e.preventDefault();
    };
    return (
        <div>
            <Form onSubmit={handleSubmit} >
                <Row>
                    <Col className="mt-1">
                        <Form.Label>Installment No</Form.Label>
                        <Form.Control
                            disabled
                            onChange={(e) => setInstalmentNumber(e.target.value)}
                            value={instalmentNumber}
                            placeholder="Enter the Name"
                        />
                    </Col>
                    <Col className="mt-1">
                        <Form.Label>Installment Amount</Form.Label>
                        <Form.Control
                            onChange={(e) => setinstalmentAmount(e.target.value)}
                            value={instalmentAmount}
                            placeholder="Enter the EMI Amount"
                        />
                    </Col>
                </Row>
                <Row>
                    <Col className="mt-1">
                        <Form.Label>New Installment Date</Form.Label>
                        <Form.Control
                            type='date'
                            onChange={(e) => setinstalmentDate(e.target.value)}
                            value={instalmentDate}
                            placeholder="Enter the Price"
                        />
                    </Col>
                    <Col className="mt-1">
                        <Form.Label>Penatly Charges</Form.Label>
                        <Form.Control
                            type='number'
                            onChange={(e) => setfineAmount(e.target.value)}
                            value={fineAmount}
                            placeholder="Enter the Fine Amount"
                        />
                    </Col>
                </Row>
                <Row className="mt-1">
                    <Col className="mt-1">
                        <FormControl sx={{ m: 0, minWidth: 370 }} size="small">
                            <Form.Label>Status</Form.Label>
                            <Select
                                value={hasPaid}
                                label="Age"
                                onChange={(e) => sethasPaid(e.target.value)}
                            >
                                <MenuItem value={0}>Payment Pending</MenuItem>
                                <MenuItem value={1}>Payment Recieved</MenuItem>
                            </Select>
                        </FormControl>
                    </Col>
                </Row>
                <Div>
                    <Row>
                        <Col>
                            <button
                                type="submit"
                                className="btn btn-success"
                                style={{ marginTop: 5 + 'px' }}
                                onClick={updateInstallment}
                            > Update
                            </button>
                        </Col>
                    </Row>
                </Div>
            </Form>
        </div>
    );
};

export default EditEMI;
