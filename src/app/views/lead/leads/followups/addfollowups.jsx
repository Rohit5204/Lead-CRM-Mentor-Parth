import React, { useState, useEffect } from "react";
import { Row, Col, Button, Form } from 'react-bootstrap';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { SimpleCard } from "app/components";
import { styled } from '@mui/system';
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import axios from 'axios';
import { BASE_URL } from "app/utils/constant";

const ManageFollowups = () => {
    const location = useLocation();
    const token = localStorage.getItem('accessToken');
    const roleCode = localStorage.getItem('roleCode');
    const userId = localStorage.getItem('userId');
    const headers = {
        "x-access-token": token,
        "roleCode": roleCode,
        "userId": userId
    }
    // const [followUpLeads, setFollowUpLeads] = useState(APIData);
    // console.log("Lead Follow UP=" + followUpLeads)
    const [APIData456, setAPIData456] = useState([]);
    const [leadId, setLeadId] = useState(location.state.leadId);
    const [followUpDate, setFollowUpDate] = useState("");
    const [followUpTme, setFollowUpTime] = useState("");
    const [nextFollowUpDate, setNextFollowUpDate] = useState("");
    const [nextFollowUpTme, setNextFollowUpTime] = useState("");
    const [remarks, setRemarks] = useState("");

    // Payload for Followup Lead

    useEffect(() => {
        getData1()
    }, [APIData456]);
    const getData1 = () => {
        axios.post(BASE_URL + `/api/getFilteredLeadData`, {
            leadId: leadId, userId: 0, statusId: 0, searchKey: "",
            locationkey: "", platformId: 0, opType: ""
        },
            { headers: headers })
            .then((response) => {
                for (var i = 0; i < response.data.data.length; i++) {
                    setAPIData456(response.data.data[i].followupData);
                    // response.data.data[i].followupData);
                    // console.log(response.data.data[i].followupData)
                    // console.log(APIData)
                }
            });
    }
    const postData = () => {
        const followUpData = {
            leadId: leadId,
            followUpDate: followUpDate,
            followUpTme: followUpTme,
            remarks: remarks,
            nextFollowUpDate: followUpDate,
            nextFollowUpTme: followUpTme,
            createdBy: 1
        };
        // console.log({ followUpData })
        axios.post(BASE_URL + `/api/saveLeadFollowups`, followUpData,
            { headers: headers });
    };
    const blankForm = () => {
        setFollowUpDate('')
        setFollowUpTime('')
        setNextFollowUpDate('')
        setNextFollowUpTime('')
        setRemarks('')
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        postData();
        blankForm();
    };
    const navigate = useNavigate();
    const changePage = () => {
        navigate('/leads/manageLeads');
    };
    return (
        <div>
            <Row>
                <Col>
                    <Form.Label>Followup Date</Form.Label>
                    <Form.Control
                        type="date"
                        placeholder="Enter Followup Date"
                        onChange={(e) => setFollowUpDate(e.target.value)}
                        value={followUpDate}
                    />
                </Col>
                <Col>
                    <Form.Label>Followup Time</Form.Label>
                    <br />
                    {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <Stack spacing={3}>
                            <TimePicker
                                value={followUpTme}
                                onChange={(e) => setFollowUpTime(e.target.value)}
                                renderInput={(params) => <TextField {...params} />}
                            /></Stack>
                    </LocalizationProvider> */}
                    <Form.Control
                        type="time"
                        placeholder="Enter Next Followup Time"
                        value={followUpTme}
                        onChange={(e) => setFollowUpTime(e.target.value)}
                    />
                </Col>
            </Row>
            {/* <Row>
                <Col>
                    <Form.Label>Next Followup Date</Form.Label>
                    <Form.Control
                        type="date"
                        placeholder="Enter Next Followup Date"
                        onChange={(e) => setNextFollowUpDate(e.target.value)}
                        value={nextFollowUpDate}
                    />
                </Col>
                <Col>
                    <Form.Label>Next Followup Time</Form.Label>
                    <Form.Control
                        type="time"
                        placeholder="Enter Next Followup Time"
                        onChange={(e) => setNextFollowUpTime(e.target.value)}
                        value={nextFollowUpTme}
                    />
                </Col>
            </Row> */}
            <Row>
                <Col>
                    <Form.Label>Remarks</Form.Label>
                    <Form.Control
                        placeholder="Enter any Remarks"
                        onChange={(e) => setRemarks(e.target.value)}
                        value={remarks}
                    />
                </Col>
            </Row>

            <Row className="mt-2">
                <Col className="text-center">
                    <Link to="/leads/manageLeads" >
                        <Button variant="secondary" >Back</Button>
                    </Link>&nbsp;
                    <Button variant="success" onClick={handleSubmit}>Add</Button>
                </Col>
            </Row>

            {/* {JSON.stringify(APIData456)} */}
            <Row className="mt-5">
                <Col> <h5 className='text-center'>Followup Detail's</h5></Col>


                <table className="table table-striped table-bordered" style={{ 'borderRadius': '2px' }}>
                    <thead style={{ "color": "MidnightBlue" }} className='text-center'>
                        <tr>
                            <th>Sr No.</th>
                            <th>FollowUp Date</th>
                            <th>FollowUp Time</th>

                            <th>Remarks</th>
                        </tr>
                    </thead>
                    {APIData456.map((follow, index) => {
                        return (
                            <tbody className='text-center'>
                                <tr key={index}>
                                    <td>{follow.id}</td>
                                    <td>{new Date(follow.followUpDate).toLocaleDateString('en-GB')}</td>
                                    <td>{follow.followUpTme}</td>

                                    <td>{follow.remarks}</td>
                                </tr>
                            </tbody>
                        )
                    })}
                </table>

            </Row>
        </div>
    );
}
export default ManageFollowups;