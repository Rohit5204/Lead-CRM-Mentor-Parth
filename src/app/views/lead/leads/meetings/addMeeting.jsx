import React, { useState, useEffect } from "react";
import { styled } from '@mui/system';
import { Row, Col, Button, Form } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { SimpleCard } from "app/components";

const Div = styled('div')(({ theme }) => ({
    margin: '0px 0px 0px 441px',
}));

const ManageMettings = () => {
    const location = useLocation();
    // const [APIData, setAPIData] = useState([]);
    // const [followUpLeads, setFollowUpLeads] = useState(APIData.followupData);
    // console.log("Lead Follow UP=" + followUpLeads)
    const token = localStorage.getItem('accessToken');

    const [leadId, setLeadId] = useState(location.state.leadId);
    const [meetingDate, setMeetingDate] = useState("");
    const [fromTime, setFromTime] = useState("");
    const [toTime, setToTime] = useState("");
    const [remark, setRemark] = useState("");

    // Payload for Followup Lead
    const MeetingData = {
        leadId: leadId,
        meetingDate: meetingDate,
        fromTime: fromTime,
        toTime: toTime,
        remark: remark,
    };
    const [APIData, setAPIData] = useState([]);
    useEffect(() => {
        axios.post(`http://35.89.6.16:4002/api/getFilteredLeadData`, { leadId: leadId, userId: 0, statusId: 0 },
            { headers: { "x-access-token": token } })
            .then((response) => {
                for (var i = 0; i < response.data.data.length; i++) {
                    setAPIData(response.data.data[i].meetingData);
                    console.log(response.data.data[i].meetingData)
                    console.log(APIData)
                }
            });
    }, []);
    const postData = () => {
        // console.log({ MeetingData })
        axios.post(`http://35.89.6.16:4002/api/saveLeadMeetings`, MeetingData,
            { headers: { "x-access-token": token } });
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
            <Div className="mt-2">
                <Row>
                    <div>
                        <Button variant="primary" onClick={changePage}>Back</Button>
                    </div>&nbsp;
                    <div>
                        <Button variant="success" onClick={handleSubmit}>Add</Button>
                    </div>
                </Row>
            </Div>
            <Row className="mt-2">
                <SimpleCard>
                    <h5 className='text-center'>Meeting Detail's</h5>
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
                        {APIData.map((follow, index) => {
                            <tbody className='text-center'>
                                <tr key={index}>
                                    <td>{follow.id}</td>
                                    <td>{follow.meetingDate}</td>
                                    <td>{follow.fromTime}</td>
                                    <td>{follow.toTime}</td>
                                    <td>{follow.remark}</td>
                                </tr>
                            </tbody>
                        })}
                    </table>
                </SimpleCard>
            </Row>
        </div>
    );
}
export default ManageMettings;