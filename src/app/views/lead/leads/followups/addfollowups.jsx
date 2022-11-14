import React, { useState, useEffect } from "react";
import { Row, Col, Button, Form } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import { SimpleCard } from "app/components";
import { styled } from '@mui/system';
import axios from 'axios';

const Div = styled('div')(({ theme }) => ({
    margin: '0px 0px 0px 441px',
}));

const ManageFollowups = () => {
    const location = useLocation();
    const token = localStorage.getItem('accessToken');
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
    const followUpData = {
        leadId: leadId,
        followUpDate: followUpDate,
        followUpTme: followUpTme,
        remarks: remarks,
        nextFollowUpDate: nextFollowUpDate,
        nextFollowUpTme: nextFollowUpTme,
        createdBy: 1
    };
    useEffect(() => {
        getData1()
    }, [APIData456]);
    const getData1 = () => {
        axios.post(`http://35.89.6.16:4002/api/getFilteredLeadData`, { leadId: leadId, userId: 0, statusId: 0, },
            { headers: { "x-access-token": token } })
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
        // console.log({ followUpData })
        axios.post(`http://35.89.6.16:4002/api/saveLeadFollowups`, followUpData,
            { headers: { "x-access-token": token } });
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
                    <Form.Control
                        type="time"
                        placeholder="Enter Followup Time"
                        onChange={(e) => setFollowUpTime(e.target.value)}
                        value={followUpTme}
                    />
                </Col>
            </Row>
            <Row>
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
            </Row>
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
            {/* {JSON.stringify(APIData456)} */}
            <Row className="mt-2">
                <SimpleCard>
                    <h5 className='text-center'>Followup Detail's</h5>

                    <table className="table table-striped table-bordered" style={{ 'borderRadius': '2px' }}>
                        <thead style={{ "color": "MidnightBlue" }} className='text-center'>
                            <tr>
                                <th>Sr No.</th>
                                <th>Follow Date</th>
                                <th>Follow Time</th>
                                <th>Next Follow Date</th>
                                <th>Next Follow Time</th>
                                <th>Remarks</th>
                            </tr>
                        </thead>
                        {APIData456.map((follow, index) => {
                            return (
                                <tbody className='text-center'>
                                    <tr key={index}>
                                        <td>{follow.id}</td>
                                        <td>{new Date(follow.followUpDate).toLocaleDateString()}</td>
                                        <td>{follow.followUpTme}</td>
                                        <td>{new Date(follow.nextFollowUpDate).toLocaleDateString()}</td>
                                        <td>{follow.nextFollowUpTme}</td>
                                        <td>{follow.remarks}</td>
                                    </tr>
                                </tbody>
                            )
                        })}
                    </table>
                </SimpleCard>
            </Row>
        </div>
    );
}
export default ManageFollowups;