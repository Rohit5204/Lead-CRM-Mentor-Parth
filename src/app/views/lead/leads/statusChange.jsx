import axios from "axios";
import React, { useState, useEffect } from "react";
import { Form, Row, Col } from 'react-bootstrap';
import { Autocomplete, TextField, FormControl } from '@mui/material';
import { BASE_URL } from "app/utils/constant";

const StatusChange = ({ theStatusChange, handleDialog }) => {
    const [leadId] = useState(theStatusChange.leadId);
    const [name] = useState(theStatusChange.name);

    const [statusName, setStatusName] = useState([]);

    const [myOptions4, setMyOptions4] = useState(theStatusChange.statusName);
    const [remarks, setRemarks] = useState(theStatusChange.remarks);


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
        axios.get(BASE_URL + `/api/getMasterData?masterName=statusmaster`, { headers: headers }).then((res) => {
            for (var i = 0; i < res.data.data.length; i++) {
                setStatusName(current => [...current, res.data.data[i].name]);
                setId3(current => [...current, res.data.data[i].id, res.data.data[i].name])
            }
        });
    }, [])


    const getFetchLeadData = () => {
        axios.post(BASE_URL + `/api/getFilteredLeadData`, {
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
            remarks: remarks,
            statusId: statusid,
            actionBy: 1,
            isMeeting: 1,
            name: theStatusChange.name,
            mobileNo: theStatusChange.mobileNo,
            streetName: theStatusChange.streetName,
            cityName: theStatusChange.cityName,
            stateName: theStatusChange.stateName,
            zipCode: theStatusChange.zipCode,
            countryName: theStatusChange.countryName,
            intrestedIn: theStatusChange.intrestedIn,
            sourceId: theStatusChange.sourceId,
            assignId: theStatusChange.assignId,
            label: theStatusChange.label,
            alternateMobile: theStatusChange.alternateMobile,
            clientName: theStatusChange.clientName,
            expectedAmount: theStatusChange.expectedAmount
        };
        // e.preventDefault();
        console.log(UpdateUser)
        axios.post(BASE_URL + `/api/updateLeadData`, UpdateUser,
            { headers: headers });
        // getFetchLeadData()
        handleDialog()
    };
    const [followUpDate, setFollowUpDate] = useState("");
    const [followUpTme, setFollowUpTime] = useState("");
    const [nextFollowUpDate, setNextFollowUpDate] = useState("");
    const [nextFollowUpTme, setNextFollowUpTime] = useState("");
    const [remark, setRemark] = useState("");
    const followUpData = {
        leadId: leadId,
        followUpDate: followUpDate,
        followUpTme: followUpTme,
        remarks: remark,
        nextFollowUpDate: followUpDate,
        nextFollowUpTme: followUpTme,
        createdBy: 1
    };
    const postData = () => {
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
        updateLead();
        postData();
        blankForm();
        getFetchLeadData()
        handleDialog()
    };

    const [meetingDate, setMeetingDate] = useState("");
    const [fromTime, setFromTime] = useState("");
    const [toTime, setToTime] = useState("");

    const MeetingData = {
        leadId: leadId,
        meetingDate: meetingDate,
        fromTime: fromTime,
        toTime: toTime,
        remark: remark,
    };

    const postData1 = () => {
        axios.post(BASE_URL + `/api/saveLeadMeetings`, MeetingData,
            { headers: headers });
    };
    const blankForm1 = () => {
        setMeetingDate('')
        setFromTime('')
        setToTime('')
        setRemark('')
    };
    const handleSubmit1 = (e) => {
        e.preventDefault();
        updateLead();
        postData1();
        blankForm1();
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
                        value={leadId}
                        placeholder="Enter the Lead Name"
                    />
                </Col>
                <Col>
                    <Form.Label>Lead Name</Form.Label>
                    <Form.Control
                        disabled
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
            {(function () {
                if (myOptions4 == "FollowUp") {
                    return <>
                        <br />
                        <h6>Follow Up Detail's</h6>
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
                                <Form.Control
                                    type="time"
                                    placeholder="Enter Next Followup Time"
                                    value={followUpTme}
                                    onChange={(e) => setFollowUpTime(e.target.value)}
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
                    </>
                }
                else if (myOptions4 == "FT (Meeting)") {
                    return <>
                        <br />
                        <h6>Meeting Detail's</h6>
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
                    </>
                }
                else {
                    return <>
                        <Form.Label>Remark</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            onChange={(e) => setRemarks(e.target.value)}
                            value={remarks}
                            required
                            placeholder="Comment"
                        />

                    </>
                }
            })()}
            <br />
            <div style={{ display: "flex", justifyContent: 'flex-end' }}>
                {(function () {
                    if (myOptions4 == "FollowUp") {
                        return <>
                            <button type="submit"
                                className="btn btn-secondary"
                                style={{ margin: 5 + 'px' }}
                                onClick={handleSubmit}
                            >Add Followup
                            </button>&nbsp;
                        </>
                    }
                    else if (myOptions4 == "FT (Meeting)") {
                        return <>
                            <button type="submit"
                                className="btn btn-secondary"
                                style={{ margin: 5 + 'px' }}
                                onClick={handleSubmit1}
                            >Add Meeting
                            </button>&nbsp;
                        </>
                    }
                    else {
                        return <>
                            <button type="submit"
                                className="btn btn-success"
                                // style={{ margin: 5 + 'px' }}
                                onClick={updateLead}>Update Status
                            </button>
                        </>
                    }
                })()}
            </div>
        </div>
    )
};

export default StatusChange;