import styled from "@emotion/styled";
import { Button, MenuItem, Select, Table, FormControl, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { BASE_URL } from "app/utils/constant";
import axios from "axios";
import React, { useState } from "react";
import { Col, Form, InputGroup, Modal, Row } from "react-bootstrap";

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

    const [leadID1, setLeadID1] = useState('')
    const [leadID2, setLeadId2] = useState([])
    const getLeadByID = () => {
        axios.post(BASE_URL + `/api/getFilteredLeadData`,
            {
                leadId: leadID1,
                userId: 0,
                statusId: 0,
                searchKey: "",
                locationkey: "",
                platformId: 0,
                opType: ""
            }, { headers: headers }).
            then((res) => {
                setLeadId2(res.data.data)
            });
    }


    const postTransaction = () => {
        const transData = {
            leadId: leadID1,
            traderAmt: traderAmt,
            traderDate: traderDate,
            remarks: remarks,
            status: status,
            createdBy: userId
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
                                value={leadID1}
                                onChange={(event) => setLeadID1(event.target.value)}
                                placeholder="Enter the Trader Lead ID"
                            />
                            <Button variant="contained" color="success" onClick={() => getLeadByID()}>
                                Fetch Lead
                            </Button>
                        </InputGroup>
                    </Col>
                </Row>
                <StyledTable className="table table-striped table-bordered" style={{ 'borderRadius': '2px' }}>
                    <TableHead style={{ borderLeft: '1px solid red', borderRight: '1px solid red' }} className='text-center'>

                        <TableRow>
                            <TableCell align="center">Lead ID</TableCell>
                            <TableCell align="center">Lead Name</TableCell>
                            <TableCell align="center">Platform Name</TableCell>
                            <TableCell align="center">Label</TableCell>

                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {leadID2.map((data, index) => {
                            return (
                                <TableRow key={index}>
                                    <TableCell align="center">{data.leadId}</TableCell>
                                    <TableCell align="center">{data.name}</TableCell>
                                    <TableCell align="center">{data.platformName}</TableCell>
                                    <TableCell align="center">{data.labelName}</TableCell>

                                </TableRow>
                            );
                        })}

                    </TableBody>
                </StyledTable>
                <Row>
                    <Col>
                        <Form.Label>Transaction Date</Form.Label>
                        <Form.Control
                            type="date"
                            placeholder="Enter any Remarks"
                            onChange={(e) => settraderDate(e.target.value)}
                            value={traderDate}
                        />
                    </Col>
                    <Col>
                        <Form.Label>Transaction Amount</Form.Label>
                        <Form.Control
                            type="number"
                            placeholder="Enter the Amount"
                            onChange={(e) => settraderAmt(e.target.value)}
                            value={traderAmt}
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
                <Row>
                    <Col>
                        <FormControl sx={{ m: 0, width: '100%' }} size="small" className="mt-1">
                            <Form.Label>Status</Form.Label>
                            <Select required value={status}
                                label="."
                                onChange={(e) => setstatus(e.target.value)}>
                                <MenuItem value={0}>Profit</MenuItem>
                                <MenuItem value={1}>Loss</MenuItem>
                            </Select>
                        </FormControl>
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