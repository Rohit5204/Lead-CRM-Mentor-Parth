import axios from "axios";
import React, { useState, useEffect } from "react";
import { Form, Row, Col, InputGroup } from 'react-bootstrap';
import { Autocomplete, TextField, FormControl } from '@mui/material';

const StatusChange = ({ theStatusChange, handleDialog }) => {
    // console.log(theClientMail)
    const [leadId] = useState(theStatusChange.leadId);
    const [name] = useState(theStatusChange.name);

    const [statusName, setStatusName] = useState([]);

    const [myOptions4, setMyOptions4] = useState(theStatusChange.statusName);


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
        axios.get(`https://43.204.38.243:3001/api/getMasterData?masterName=statusmaster`, { headers: headers }).then((res) => {
            for (var i = 0; i < res.data.data.length; i++) {
                setStatusName(current => [...current, res.data.data[i].name]);
                setId3(current => [...current, res.data.data[i].id, res.data.data[i].name])
            }
        });
    }, [])


    const getFetchLeadData = () => {
        axios.post(`https://43.204.38.243:3001/api/getFilteredLeadData`, {
            leadId: 0,
            userId: 0,
            statusId: 5,
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
        e.preventDefault();
        console.log(UpdateUser)
        axios.post(`https://43.204.38.243:3001/api/updateLeadData`, UpdateUser,
            { headers: headers });
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
            <div style={{ display: "flex", justifyContent: 'flex-end' }}>
                {/* <button type="submit"
                    className="btn btn-secondary"
                // style={{ margin: 5 + 'px' }}
                >Cancel
                </button>&nbsp; */}
                <button type="submit"
                    className="btn btn-success"
                    // style={{ margin: 5 + 'px' }}
                    onClick={updateLead}>Update
                </button>
            </div>
        </div>
    )
};

export default StatusChange;