import * as React from 'react';
import { styled } from '@mui/system';
import { Breadcrumb, SimpleCard } from 'app/components';
import { Box, MenuItem, FormControl, Select, TextField, Autocomplete } from '@mui/material';
import { Form, Row, Col, Button } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import axios from 'axios';

const Container = styled('div')(({ theme }) => ({
    margin: '30px',
    [theme.breakpoints.down('sm')]: { margin: '16px' },
    '& .breadcrumb': {
        marginBottom: '30px',
        [theme.breakpoints.down('sm')]: { marginBottom: '16px' },
    },
}));
const Div = styled('div')(() => ({
    margin: '410px',
}));
const AssignEmployee = ({ theAssignedData }) => {
    // console.log(theAssignedData)
    const [id, setId] = useState(theAssignedData.leadId);
    const [name, setName] = useState(theAssignedData.name);
    const [assignedUser, setAssignedUser] = useState(theAssignedData.assignedUser);
    // const [reassign, setReassign] = useState(theAssignedData.gsPrice);
    const [assignTo, setAssignTo] = useState([]);
    const [id1, setId1] = useState([]);
    const [myOptions3, setMyOptions3] = useState(null);

    useEffect(() => {
        const items = localStorage.getItem('accessToken');
        axios.get(`http://35.89.6.16:4002/api/getMasterData?masterName=usermaster`, { headers: { "x-access-token": items } }).then((res) => {
            for (var i = 0; i < res.data.data.length; i++) {
                setAssignTo(current => [...current, res.data.data[i].firstName + " " + res.data.data[i].lastName]);
                setId1(current => [...current, res.data.data[i].userId, res.data.data[i].firstName + " " + res.data.data[i].lastName])
            }
        });
    }, []);
    const updateLead = (e) => {
        var assignedid
        for (var i = 0; i < id1.length; i++) {
            if (myOptions3 == id1[i]) {
                assignedid = id1[i - 1]
            }
        }
        const UpdateUser = {
            leadId: id,
            remarks: theAssignedData.remarks,
            statusId: theAssignedData.status,
            actionBy: 1,
            isMeeting: 1,
            name: name,
            mobileNo: theAssignedData.mobileNo,
            streetName: theAssignedData.streetName,
            cityName: theAssignedData.cityName,
            stateName: theAssignedData.stateName,
            zipCode: theAssignedData.zipCode,
            countryName: theAssignedData.countryName,
            intrestedIn: theAssignedData.intrestedIn,
            sourceId: theAssignedData.sourceId,
            assignId: assignedid,
            label: theAssignedData.label,
            alternateMobile: theAssignedData.mobileNo
        };
        console.log({ UpdateUser });
        const items = localStorage.getItem('accessToken');
        e.preventDefault();
        axios.post(`http://35.89.6.16:4002/api/updateLeadData`, UpdateUser, { headers: { "x-access-token": items } })
            .then(() => useEffect);
    };

    // const blankForm = () => {
    //   setCatType('');
    //   setName('');
    //   setPrice('');
    //   setDescription('');
    // };
    const handleSubmit = (e) => {
        e.preventDefault();
        // blankForm();
    };
    return (
        <Container>
            {/* <SimpleCard title="Update Catalogue Detail's"> */}
            <Form onSubmit={handleSubmit}>
                <Row>
                    <Col>
                        <Form.Label>Lead ID</Form.Label>
                        <Form.Control
                            disabled
                            onChange={(e) => setId(e.target.value)}
                            value={id}
                            placeholder="Enter the Lead Name"
                        />
                    </Col>
                    <Col>
                        <Form.Label>Lead Name</Form.Label>
                        <Form.Control
                            disabled
                            onChange={(e) => setName(e.target.value)}
                            value={name}
                            placeholder="Enter the Lead Name"
                        />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Label>Current Assign Employee</Form.Label>
                        <Form.Control
                            disabled
                            onChange={(e) => setAssignedUser(e.target.value)}
                            value={assignedUser}
                            placeholder="Enter the Lead Name"
                        />
                    </Col>
                    <Col>
                        <FormControl>
                            <Form.Label>Re-Assign</Form.Label>
                            <Autocomplete
                                style={{ width: 330 }}
                                freeSolo
                                autoComplete
                                autoHighlight
                                options={assignTo}
                                value={myOptions3}
                                onChange={(e) => setMyOptions3(e.currentTarget.innerHTML)}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}

                                        variant="outlined"
                                        label="Select the Employee to Assign"
                                        size="small"
                                    />
                                )}
                            />
                        </FormControl>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <button
                            type="submit"
                            className="btn btn-success"
                            style={{ marginTop: 5 + 'px' }}
                            onClick={updateLead}
                        >
                            Re-Assign
                        </button>
                    </Col>
                </Row>
            </Form>
            {/* </SimpleCard> */}
        </Container>
    );
};

export default AssignEmployee;
