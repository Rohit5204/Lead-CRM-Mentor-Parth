import axios from "axios";
import React, { useState, useEffect } from "react";
import { Form, Row, Col, InputGroup } from 'react-bootstrap';
import { Autocomplete, TextField, FormControl } from '@mui/material';
import { BASE_URL } from "app/utils/constant";

const FollowupStatusChange = ({ theFollowupStatusChange, handleDialog }) => {
    // console.log(theClientMail)
    const [leadId] = useState(theFollowupStatusChange.leadId);
    const [name] = useState(theFollowupStatusChange.name);

    const [statusName, setStatusName] = useState([]);

    const [myOptions4, setMyOptions4] = useState(theFollowupStatusChange.statusName);


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
            remarks: null,
            statusId: statusid,
            actionBy: 1,
            isMeeting: 1,
            name: theFollowupStatusChange.name,
            mobileNo: theFollowupStatusChange.mobileNo,
            streetName: theFollowupStatusChange.streetName,
            cityName: theFollowupStatusChange.cityName,
            stateName: theFollowupStatusChange.stateName,
            zipCode: theFollowupStatusChange.zipCode,
            countryName: theFollowupStatusChange.countryName,
            intrestedIn: theFollowupStatusChange.intrestedIn,
            sourceId: theFollowupStatusChange.sourceId,
            assignId: theFollowupStatusChange.assignId,
            label: theFollowupStatusChange.label,
            alternateMobile: theFollowupStatusChange.alternateMobile,
            clientName: theFollowupStatusChange.clientName,
            expectedAmount: theFollowupStatusChange.expectedAmount
        };
        e.preventDefault();
        console.log(UpdateUser)
        axios.post(BASE_URL + `/api/updateLeadData`, UpdateUser,
            { headers: headers });
        getFetchLeadData()
        handleDialog()
    };


    const [followUpDate, setFollowUpDate] = useState("");
    const [followUpTme, setFollowUpTime] = useState("");
    const [nextFollowUpDate, setNextFollowUpDate] = useState("");
    const [nextFollowUpTme, setNextFollowUpTime] = useState("");
    const [remarks, setRemarks] = useState("");
    const followUpData = {
        leadId: leadId,
        followUpDate: followUpDate,
        followUpTme: followUpTme,
        remarks: remarks,
        nextFollowUpDate: "",
        nextFollowUpTme: "",
        createdBy: 1
    };
    const postData = () => {
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
            <h5>Follow Up Detail's</h5>
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
            <br />
            <div style={{ display: "flex", justifyContent: 'flex-end' }}>
                <button type="submit"
                    className="btn btn-secondary"
                    style={{ margin: 5 + 'px' }}
                    onClick={handleSubmit}
                >Add Followup
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

export default FollowupStatusChange;