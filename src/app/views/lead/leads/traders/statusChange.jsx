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

const LeadStatusChange = ({ theViewData, handleDialog }) => {
    const [leadId, setLeadID] = useState(theViewData.leadId);
    const token = localStorage.getItem('accessToken');
    const roleCode = localStorage.getItem('roleCode');
    const userId = localStorage.getItem('userId');
    const headers = {
        "x-access-token": token,
        "roleCode": roleCode,
        "userId": userId
    }

    const [traderDate, settraderDate] = useState(theViewData.traderDate)
    const [traderAmt, settraderAmt] = useState(theViewData.traderAmt)
    const [remarks, setremarks] = useState(theViewData.remarks)
    const [status, setstatus] = useState(theViewData.status)

    const [compStatus, setcompStatus] = useState(theViewData.compStatus)
    const [compAmt, setcompAmt] = useState(theViewData.compAmt)
    const [plAmt, setplAmt] = useState(theViewData.plAmt)

    const updateTrader = () => {
        const transData = {
            id: theViewData.id,
            leadId: theViewData.leadId,
            remarks: remarks,
            compStatus: compStatus,
            compAmt: compAmt
        };
        axios.post(BASE_URL + `/api/updateLeadTrader`, transData,
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
                        <Form.Label>Trading Date</Form.Label>
                        <Form.Control

                            placeholder="Enter any Remarks"

                            value={new Date(traderDate).toLocaleDateString('en-GB')}
                        />
                    </Col>
                    <Col>
                        <Form.Label>Trading Amount</Form.Label>
                        <Form.Control
                            disabled
                            placeholder="Enter the Trading Amount"

                            value={traderAmt}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <FormControl sx={{ m: 0, width: '100%' }} size="small">
                            <Form.Label>Client Status</Form.Label>
                            <Select required value={status}
                                disabled
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
                            disabled
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
                        <button type='button' className="btn btn-success" onClick={updateTrader}>
                            Update
                        </button>
                    </Col>
                </Row>

            </div>
        </>
    )
}
export default LeadStatusChange