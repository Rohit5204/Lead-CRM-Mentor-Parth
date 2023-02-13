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
const UnAssignEmployee = ({ theUnAssignData }) => {
    // console.log(theUnAssignData)
    const [id, setId] = useState(theUnAssignData.leadId);
    const [name, setName] = useState(theUnAssignData.name);
    // const [assignedUser, setAssignedUser] = useState(theUnAssignData.assignedUser);
    // const [reassign, setReassign] = useState(theUnAssignData.gsPrice);
    const [assignTo, setAssignTo] = useState([]);
    const [id1, setId1] = useState([]);
    const [myOptions3, setMyOptions3] = useState(theUnAssignData.assignedUser);

    const items = localStorage.getItem('accessToken');
    const roleCode = localStorage.getItem('roleCode');
    const userId = localStorage.getItem('userId');
    const headers = {
        "x-access-token": items,
        "roleCode": roleCode,
        "userId": userId
    }
    useEffect(() => {

        axios.get(`http://43.204.38.243:3001/api/getMasterData?masterName=usermaster`, { headers: headers }).then((res) => {
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
            remarks: theUnAssignData.remarks,
            statusId: theUnAssignData.status,
            actionBy: 1,
            isMeeting: 1,
            name: name,
            mobileNo: theUnAssignData.mobileNo,
            streetName: theUnAssignData.streetName,
            cityName: theUnAssignData.cityName,
            stateName: theUnAssignData.stateName,
            zipCode: theUnAssignData.zipCode,
            countryName: theUnAssignData.countryName,
            intrestedIn: theUnAssignData.intrestedIn,
            sourceId: theUnAssignData.sourceId,
            assignId: assignedid,
            label: theUnAssignData.label,
            alternateMobile: theUnAssignData.alternateMobile,
            clientName: theUnAssignData.clientName,
            expectedAmount: theUnAssignData.expectedAmount
        };
        console.log({ UpdateUser });
        e.preventDefault();
        axios.post(`http://43.204.38.243:3001/api/updateLeadData`, UpdateUser, { headers: headers })
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
                        <FormControl>
                            <Form.Label>Assign To</Form.Label>
                            <Autocomplete
                                style={{ width: 710 }}
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
                            Assign
                        </button>
                    </Col>
                </Row>
            </Form>
            {/* </SimpleCard> */}
        </Container>
    );
};

export default UnAssignEmployee;
