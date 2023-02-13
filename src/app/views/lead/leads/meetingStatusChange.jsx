import axios from "axios";
import React, { useState, useEffect } from "react";
import { Form, Row, Col, InputGroup } from 'react-bootstrap';
import { Autocomplete, TextField, FormControl } from '@mui/material';

const MettingStatusChange = ({ theMettingStatusChange, handleDialog }) => {
    // console.log(theClientMail)
    const [leadId] = useState(theMettingStatusChange.leadId);
    const [name] = useState(theMettingStatusChange.name);

    const [statusName, setStatusName] = useState([]);

    const [myOptions4, setMyOptions4] = useState(theMettingStatusChange.statusName);


    const [id3, setId3] = useState([]);
    const items = localStorage.getItem('accessToken');
    const roleCode = localStorage.getItem('roleCode');
    const userId = localStorage.getItem('userId');
    const headers = {
        "x-access-token": items,
        "roleCode": roleCode,
        "userId": userId
    }
    const [APIData, setAPIData] = useState([]);
    useEffect(() => {
        axios.get(`http://43.204.38.243:3001/api/getMasterData?masterName=statusmaster`, { headers: headers }).then((res) => {
            for (var i = 0; i < res.data.data.length; i++) {
                setStatusName(current => [...current, res.data.data[i].name]);
                setId3(current => [...current, res.data.data[i].id, res.data.data[i].name])
            }
        });
    }, [])


    const getFetchLeadData = () => {
        axios.post(`http://43.204.38.243:3001/api/getFilteredLeadData`, {
            leadId: 0,
            userId: 0,
            statusId: 0,
            searchKey: "",
            locationkey: "",
            platformId: 0,
            opType: ""
        }, { headers: { "x-access-token": items, "roleCode": roleCode, "userId": userId } })
            .then((response) => {
                setAPIData(response.data.data);
            });
    }
    const updateLead = (e) => {
        var statusid;
        for (var i = 0; i < id3.length; i++) {
            if (myOptions4 == id3[i]) {
                statusid = id3[i - 1]
            }
        }
        const UpdateUser = {
            leadId: leadId,
            remarks: null,
            statusId: statusid,
            actionBy: 1,
            isMeeting: 1,
            name: theMettingStatusChange.name,
            mobileNo: theMettingStatusChange.mobileNo,
            streetName: theMettingStatusChange.streetName,
            cityName: theMettingStatusChange.cityName,
            stateName: theMettingStatusChange.stateName,
            zipCode: theMettingStatusChange.zipCode,
            countryName: theMettingStatusChange.countryName,
            intrestedIn: theMettingStatusChange.intrestedIn,
            sourceId: theMettingStatusChange.sourceId,
            assignId: theMettingStatusChange.assignId,
            label: theMettingStatusChange.label,
            alternateMobile: theMettingStatusChange.alternateMobile,
            clientName: theMettingStatusChange.clientName,
            expectedAmount: theMettingStatusChange.expectedAmount
        };
        e.preventDefault();
        console.log(UpdateUser)
        axios.post(`http://43.204.38.243:3001/api/updateLeadData`, UpdateUser,
            { headers: headers });
        getFetchLeadData()
        handleDialog()
    };


    const [meetingDate, setMeetingDate] = useState("");
    const [fromTime, setFromTime] = useState("");
    const [toTime, setToTime] = useState("");
    const [remark, setRemark] = useState("");

    const MeetingData = {
        leadId: leadId,
        meetingDate: meetingDate,
        fromTime: fromTime,
        toTime: toTime,
        remark: remark,
    };

    const postData = () => {
        // console.log({ MeetingData })
        axios.post(`http://43.204.38.243:3001/api/saveLeadMeetings`, MeetingData,
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
        getFetchLeadData()
        handleDialog()
    };

    return (
        <div>
            <Row>
                <Col>
                    <Form.Label>Lead No</Form.Label>
                    <Form.Control
                        disabled
                        // onChange={(e) => setLeadId(e.target.value)}
                        value={leadId}
                        placeholder="Enter the Lead Name"
                    />
                </Col>
                <Col>
                    <Form.Label>Lead Name</Form.Label>
                    <Form.Control
                        disabled
                        // onChange={(e) => setName(e.target.value)}
                        value={name}
                        placeholder="Enter the Lead Name"
                    />
                </Col>
            </Row>
            <Row>
                <Col xs={6}>
                    <Form.Label>Status</Form.Label>
                    <FormControl>
                        <Autocomplete
                            style={{ width: 370 }}
                            freeSolo
                            autoComplete
                            autoHighlight
                            value={myOptions4}
                            options={statusName}
                            onChange={(e) => setMyOptions4(e.currentTarget.innerHTML)}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    variant="outlined"
                                    label="Select the Status"
                                    size="small"
                                />
                            )}
                        />
                    </FormControl>
                </Col>
            </Row>

            <br />
            <h5>Meeting Detail's</h5>
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

            <br />
            <div style={{ display: "flex", justifyContent: 'flex-end' }}>
                <button type="submit"
                    className="btn btn-secondary"
                    style={{ margin: 5 + 'px' }}
                    onClick={handleSubmit}
                >Add Meeting
                </button>&nbsp;

                <button type="submit"
                    className="btn btn-success"
                    // style={{ margin: 5 + 'px' }}
                    onClick={updateLead}>Update Status
                </button>
            </div>
        </div>
    )
};

export default MettingStatusChange;