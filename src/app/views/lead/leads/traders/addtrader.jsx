import styled from "@emotion/styled";
import { Button, MenuItem, Select, Table, FormControl, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { BASE_URL } from "app/utils/constant";
import axios from "axios";
import React, { useState } from "react";
import { Col, Form, InputGroup, Modal, Row } from "react-bootstrap";
import { useLocation } from "react-router-dom";

const StyledTable = styled(Table)(() => ({
    whiteSpace: 'pre',
    '& thead': {
        '& tr': { '& th': { paddingLeft: 20, paddingRight: 0 } },
    },
    '& tbody': {
        '& tr': { '& td': { paddingLeft: 30 } },
    },
}));

const AddTrader = ({ handleDialog }) => {
    const location = useLocation();
    const [leadId, setLeadID] = useState(location.state.leadId);
    const name = location.state.name
    const today = new Date();
    const numberOfDaysToAdd = 0;
    const date = today.setDate(today.getDate() + numberOfDaysToAdd);
    const defaultValue = new Date(date).toISOString().split('T')[0];

    const token = localStorage.getItem('accessToken');
    const roleCode = localStorage.getItem('roleCode');
    const userId = localStorage.getItem('userId');
    const headers = {
        "x-access-token": token,
        "roleCode": roleCode,
        "userId": userId
    }

    const [traderDate, settraderDate] = useState(defaultValue)
    const [traderAmt, settraderAmt] = useState()
    const [remarks, setremarks] = useState()
    const [status, setstatus] = useState(0)

    const [compStatus, setcompStatus] = useState(1)
    const [compAmt, setcompAmt] = useState()
    const [plAmt, setplAmt] = useState()

    const postTransaction = () => {
        const transData = {
            leadId: leadId,
            traderAmt: traderAmt,
            traderDate: traderDate,
            remarks: remarks,
            status: status,
            createdBy: userId,
            compStatus: compStatus,
            compAmt: compAmt,
            plAmt: plAmt
        };
        axios.post(BASE_URL + `/api/saveLeadTrader`, transData,
            { headers: headers });
        handleDialog();
    }

    const changePage = () => {
        handleDialog()
    };
    return (
        <>
            <div>
                <Row>
                    <Col>
                        <Form.Label>Trader Lead Id</Form.Label>
                        <InputGroup className="mb-3">
                            <Form.Control
                                required
                                disabled
                                value={leadId}
                                onChange={(event) => setLeadID(event.target.value)}
                                placeholder="Enter the Trader Lead ID"
                            />

                        </InputGroup>
                    </Col>
                    <Col>
                        <Form.Label>Trader Name</Form.Label>
                        <InputGroup className="mb-3">
                            <Form.Control
                                required
                                disabled
                                value={name}
                                // onChange={(event) => setLeadID1(event.target.value)}
                                placeholder="Enter the Trader Lead Name"
                            />

                        </InputGroup>
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <Form.Label>Trading Date</Form.Label>
                        <Form.Control
                            type="date"
                            placeholder="Enter any Remarks"
                            onChange={(e) => settraderDate(e.target.value)}
                            value={traderDate}
                        />
                    </Col>
                    <Col>
                        <Form.Label>Trading Amount</Form.Label>
                        <Form.Control
                            type="number"
                            placeholder="Enter the Trading Amount"
                            onChange={(e) => settraderAmt(e.target.value)}
                            value={traderAmt}
                        />
                    </Col>


                </Row>
                <Row>
                    <Col>
                        <FormControl sx={{ m: 0, width: '100%' }} size="small">
                            <Form.Label>Client Status</Form.Label>
                            <Select required value={status}
                                label="."
                                onChange={(e) => setstatus(e.target.value)}>
                                <MenuItem value={0}>Profit</MenuItem>
                                <MenuItem value={1}>Loss</MenuItem>
                            </Select>
                        </FormControl>
                    </Col>
                    <Col>
                        <Form.Label>Profit/Loss Amount</Form.Label>
                        <Form.Control
                            type="number"
                            placeholder="Enter the Profit/Loss Amount"
                            onChange={(e) => setplAmt(e.target.value)}
                            value={plAmt}
                        />
                    </Col>

                </Row>
                <Row>
                    <Col>
                        <FormControl sx={{ m: 0, width: '100%' }} size="small">
                            <Form.Label>Company Status</Form.Label>
                            <Select required value={compStatus}
                                label="."
                                onChange={(e) => setcompStatus(e.target.value)}>
                                <MenuItem value={0}>Paid</MenuItem>
                                <MenuItem value={1}>Follow Up</MenuItem>
                                <MenuItem value={2}>Runner</MenuItem>
                            </Select>
                        </FormControl>
                    </Col>
                    <Col>
                        <Form.Label>Company Amount</Form.Label>
                        <Form.Control
                            type="number"
                            placeholder="Enter the Company Amount"
                            onChange={(e) => setcompAmt(e.target.value)}
                            value={compAmt}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Label>Remarks</Form.Label>
                        <Form.Control
                            placeholder="Enter any Remarks"
                            onChange={(e) => setremarks(e.target.value)}
                            value={remarks}
                        />
                    </Col>
                </Row>
                <br />
                <Row>
                    <Col className="d-flex justify-content-end">
                        <button className="btn btn-secondary" type='button' onClick={changePage}>
                            Cancel
                        </button>
                        &nbsp;
                        <button type='button' className="btn btn-success" onClick={postTransaction}>
                            Save
                        </button>
                    </Col>
                </Row>

            </div>
        </>
    )
}
export default AddTrader