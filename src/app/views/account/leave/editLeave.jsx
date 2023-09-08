import React, { useEffect, useState } from 'react';
import { Grid, InputLabel, MenuItem, FormControl, Select, TextField, Button, Autocomplete } from "@mui/material";
import axios from 'axios';
import { BASE_URL1 } from 'app/utils/constant';
import { Col, Row, Form } from 'react-bootstrap';

const EditLeave = ({ theEditData, handleClose }) => {
    const org = localStorage.getItem('branchName')

    const [empName, setEmpName] = useState(theEditData.empName);
    const [leaveReason, setLeaveReason] = useState(theEditData.leaveReason);
    const [no_of_days, setNoOfDays] = useState(theEditData.no_of_days);
    const [startDate, setStartDate] = useState(theEditData.startDate);
    const [endDate, setEndDate] = useState(theEditData.endDate);
    const [status, setStatus] = useState(theEditData.status);
    const [message, setMessage] = useState(theEditData.message);

    const updateLeaveData = () => {
        const LeaveData = {
            empName: empName,
            leaveReason: leaveReason,
            no_of_days: no_of_days,
            startDate: startDate,
            endDate: endDate,
            department: "Advisory",
            organization: org,
            status: status,
            message: message

        };
        axios.put(BASE_URL1 + "/updateLeave/" + theEditData._id, LeaveData);
        handleClose();
    };

    const changePage = () => {
        handleClose();
    };

    return (
        <>

            <form>
                <Row>
                    <Col md="6">
                        <Form.Label>Employee Name</Form.Label>
                        <Form.Control
                            disabled
                            required
                            value={empName}
                            onChange={(e) => setEmpName(e.target.value)}
                            placeholder='Enter the Employee Name'
                        />
                    </Col>
                    <Col md="6">
                        <Form.Label>No of Day's</Form.Label>
                        <Form.Control
                            disabled
                            placeholder="Enter the No of Days"
                            value={no_of_days}
                            onChange={(e) => setNoOfDays(e.target.value)}
                        />
                    </Col>


                </Row>
                <Row>
                    <Col md="12">
                        <Form.Label>Leave Reason</Form.Label>
                        <Form.Control
                            type='text'
                            required
                            disabled
                            placeholder="Please Enter the Leave Reason"
                            value={leaveReason}
                            onChange={(e) => setLeaveReason(e.target.value)}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col md="6">
                        <Form.Label>Start Date</Form.Label>
                        <Form.Control
                            disabled
                            required
                            value={new Date(startDate).toLocaleDateString('en-GB')}
                        />
                    </Col>
                    <Col md="6">
                        <Form.Label>End Date</Form.Label>
                        <Form.Control
                            disabled
                            required
                            value={new Date(endDate).toLocaleDateString('en-GB')}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <FormControl sx={{ m: 0, width: '100%' }} size="small" className="mt-1">
                            <Form.Label>Status</Form.Label>
                            <Select required value={status}
                                onChange={(e) => setStatus(e.target.value)}
                                label="."
                            >
                                <MenuItem value={0}>Approved</MenuItem>
                                <MenuItem value={1}>Waiting</MenuItem>
                                <MenuItem value={2}>Cancel</MenuItem>
                                <MenuItem value={3}>Reject</MenuItem>
                            </Select>
                        </FormControl>
                    </Col>
                </Row>
                <Row>
                    <Col md="12">
                        <Form.Label>Message</Form.Label>
                        <Form.Control
                            type='text'
                            required
                            placeholder="Message (If Any)"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                        />
                    </Col>
                </Row>
            </form>
            <br />
            <div style={{ textAlign: 'right' }}>
                <Button onClick={changePage} variant="contained">Cancel</Button>&nbsp;
                <Button variant="contained" color="success" onClick={updateLeaveData}>Update</Button>
            </div>

        </>

    )
}

export default EditLeave;
