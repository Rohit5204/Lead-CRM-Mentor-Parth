import React, { useState, useEffect } from "react";
import { styled } from '@mui/system';
import { Row, Col, Button, Form } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { SimpleCard } from "app/components";
import { BASE_URL } from "app/utils/constant";

const Div = styled('div')(({ theme }) => ({
    margin: '0px 0px 0px 441px',
}));

const ManageMettings = () => {
    const location = useLocation();
    const token = localStorage.getItem('accessToken');
    const [APIData123, setAPIData123] = useState([]);
    const [leadId, setLeadId] = useState(location.state.leadId);
    const [meetingDate, setMeetingDate] = useState("");
    const [fromTime, setFromTime] = useState("");
    const [toTime, setToTime] = useState("");
    const [remark, setRemark] = useState("");

    const roleCode = localStorage.getItem('roleCode');
    const userId = localStorage.getItem('userId');
    const headers = {
        "x-access-token": token,
        "roleCode": roleCode,
        "userId": userId
    }
    // Payload for Followup Lead
    const MeetingData = {
        leadId: leadId,
        meetingDate: meetingDate,
        fromTime: fromTime,
        toTime: toTime,
        remark: remark,
    };


    useEffect(() => {
        getData()
        // setAPIData123(["hii", "hellos", "ROHIT"])
        // console.log("APIDATA=" + APIData123)
    }, [APIData123]);

    const getData = () => {
        // let abc = null
        axios.post(BASE_URL + `/api/getFilteredLeadData`,
            {
                leadId: leadId, userId: 0, statusId: 0, searchKey: "",
                locationkey: "", platformId: 0, opType: ""
            },
            { headers: headers }).then((response) => {
                for (var i = 0; i < response.data.data.length; i++) {
                    // console.log("Meeting Data =")
                    setAPIData123(response.data.data[i].meetingData)
                    // console.log(abc)
                    // setAPIData123(["hii", "hellos"]);
                    // console.log(APIData123)
                }
            });
    }
    const postData = () => {
        // console.log({ MeetingData })
        axios.post(BASE_URL + `/api/saveLeadMeetings`, MeetingData,
            { headers: headers });
    };
    const blankForm = () => {
        setMeetingDate('')
        setFromTime('')
        setToTime('')
        setRemark('')
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
                    <Form.Label>Meeting Date</Form.Label>
                    <Form.Control
                        type="date"
                        placeholder="Enter Followup Date"
                        onChange={(e) => setMeetingDate(e.target.value)}
                        value={meetingDate}
                    />
                </Col>
                <Col>
                    <Form.Label>Start Time</Form.Label>
                    <Form.Control
                        type="time"
                        placeholder="Enter Followup Time"
                        onChange={(e) => setFromTime(e.target.value)}
                        value={fromTime}
                    />
                </Col>
                <Col>
                    <Form.Label>End Time</Form.Label>
                    <Form.Control
                        type="time"
                        placeholder="Enter Next Followup Time"
                        onChange={(e) => setToTime(e.target.value)}
                        value={toTime}
                    />
                </Col>
            </Row>
            <Row>
                <Col>
                    <Form.Label>Remarks</Form.Label>
                    <Form.Control
                        placeholder="Enter any Remarks"
                        onChange={(e) => setRemark(e.target.value)}
                        value={remark}
                    />
                </Col>
            </Row>

            <Row className="mt-2">
                <Col className="text-center">
                    <Button variant="secondary" onClick={changePage}>Back</Button>
                    &nbsp;
                    <Button variant="success" onClick={handleSubmit}>Add</Button>
                </Col>
            </Row>

            {/* {JSON.stringify(APIData123)} */}
            <Row className="mt-2">

                <Col><h5 className='text-center'>Meeting Detail's</h5></Col>
                <table className="table table-striped table-bordered" style={{ 'borderRadius': '2px' }}>
                    <thead style={{ "color": "MidnightBlue" }} className='text-center'>
                        <tr>
                            <th>Sr No.</th>
                            <th>Meeting Date</th>
                            <th>Start Time</th>
                            <th>End Time</th>
                            <th>Remarks</th>
                        </tr>
                    </thead>

                    {APIData123.map((follow, index) => {
                        return (
                            <tbody className='text-center'>
                                <tr key={index}>
                                    <td>{follow.id}</td>
                                    <td>{new Date(follow.meetingDate).toLocaleDateString()}</td>
                                    <td>{follow.fromTime}</td>
                                    <td>{follow.toTime}</td>
                                    <td>{follow.remark}</td>
                                </tr>
                            </tbody>
                        )
                    })}
                </table>

            </Row>
        </div>
    );
}
export default ManageMettings;