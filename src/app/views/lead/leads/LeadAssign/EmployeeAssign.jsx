import * as React from 'react';
import { styled } from '@mui/system';
import { Breadcrumb, SimpleCard } from 'app/components';
import { Box, MenuItem, FormControl, Select, TextField, Autocomplete } from '@mui/material';
import { Form, Row, Col, Button } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { BASE_URL } from 'app/utils/constant';

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
    const [id, setId] = useState(theAssignedData.empId);
    const [name, setName] = useState(theAssignedData.employeeName);
    const [assignedUser, setAssignedUser] = useState(theAssignedData.assignedUser);
    const [remark, setRemark] = useState('');
    // const [reassign, setReassign] = useState(theAssignedData.gsPrice);
    const [assignTo, setAssignTo] = useState([]);
    const [id1, setId1] = useState([]);
    const [myOptions3, setMyOptions3] = useState(null);

    const items = localStorage.getItem('accessToken');
    const roleCode = localStorage.getItem('roleCode');
    const userId = localStorage.getItem('userId');
    const headers = {
        "x-access-token": items,
        "roleCode": roleCode,
        "userId": userId
    }
    useEffect(() => {

        axios.get(BASE_URL + `/api/getMasterData?masterName=usermaster`, { headers: headers }).then((res) => {
            for (var i = 0; i < res.data.status.length; i++) {
                setAssignTo(current => [...current, res.data.status[i].firstName + " " + res.data.status[i].lastName]);
                setId1(current => [...current, res.data.status[i].userId, res.data.status[i].firstName + " " + res.data.status[i].lastName])
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
            alternateMobile: theAssignedData.alternateMobile,
            clientName: theAssignedData.clientName,
            expectedAmount: theAssignedData.expectedAmount
        };
        console.log({ UpdateUser });
        e.preventDefault();
        axios.post(BASE_URL + `/api/updateLeadData`, UpdateUser, { headers: headers })
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
                        <Form.Label>Remark</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={1}
                            onChange={(e) => setRemark(e.target.value)}
                            value={remark}
                            placeholder="Street"
                        />
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
                            Transfer
                        </button>
                    </Col>
                </Row>
            </Form>
            {/* </SimpleCard> */}
        </Container>
    );
};

export default AssignEmployee;
