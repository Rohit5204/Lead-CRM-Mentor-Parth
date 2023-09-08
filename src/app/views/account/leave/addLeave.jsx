import React, { useEffect, useState } from 'react';
import { Grid, InputLabel, MenuItem, FormControl, Select, TextField, Button, Autocomplete } from "@mui/material";
import axios from 'axios';
import { BASE_URL1 } from 'app/utils/constant';
import { Col, Row, Form } from 'react-bootstrap';

const AddLeave = ({ handleClose }) => {
    const userName = localStorage.getItem('name')

    const [empName, setEmpName] = useState(userName);
    const [leaveReason, setLeaveReason] = useState("");
    const [no_of_days, setNoOfDays] = useState();
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    const org = localStorage.getItem('branchName')

    const postLeaveData = () => {
        const LeaveData = {
            empName: empName,
            leaveReason: leaveReason,
            no_of_days: no_of_days,
            startDate: startDate,
            endDate: endDate,
            department: "Advisory",
            status: 1,
            organization: org,
        };
        axios.post(BASE_URL1 + "/saveLeave", LeaveData);
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
                            type='number'
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
                            type='date'
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                        />
                    </Col>
                    <Col md="6">
                        <Form.Label>End Date</Form.Label>
                        <Form.Control
                            type='date'
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                        />
                    </Col>
                </Row>
            </form>
            <br />
            <div style={{ textAlign: 'right' }}>
                <Button onClick={changePage} variant="contained">Cancel</Button>&nbsp;
                <Button variant="contained" color="success" onClick={postLeaveData}>Submit</Button>
            </div>

        </>

    )
}

export default AddLeave;
