import * as React from 'react';
import { styled } from '@mui/system';
import { Box, MenuItem, FormControl, Select } from '@mui/material';
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
const DurationStatus = ({ theDurationStatus, handleDialog }) => {
    console.log(theDurationStatus)
    const [id, setId] = useState(theDurationStatus.id);
    const [masterName, setMasterName] = useState('Duration');
    const [inputText, setInputText] = useState(theDurationStatus.name);

    const UpdatePlatform = {
        id: id,
        masterName: masterName,
        inputText: inputText,
        recodStatus: 1,
        addedBy: 1,
        updatedBy: 1,
    };
    const updatePlatform = (e) => {
        const items = localStorage.getItem('accessToken');
        const roleCode = localStorage.getItem('roleCode');
        const userId = localStorage.getItem('userId');
        const headers = {
            "x-access-token": items,
            "roleCode": roleCode,
            "userId": userId
        }
        console.log({ UpdatePlatform });
        e.preventDefault();
        axios.post(`https://43.204.38.243:3001/api/mastersUpsert`, UpdatePlatform, { headers: headers })
            .then(() => useEffect);
        setInputText('');
        handleDialog();
    };
    const handleSubmit = (e) => {
        e.preventDefault();
    };
    return (
        <Container>
            {/* <SimpleCard title="Update Catalogue Detail's"> */}
            <Form onSubmit={handleSubmit}>
                <Row>
                    <Col md="6">
                        <Form.Label>Duration Master</Form.Label>
                        <Form.Control
                            disabled
                            value={masterName}
                            onChange={(e) => setMasterName(e.target.value)}
                            placeholder="Enter the Platform Name"
                        />
                    </Col>
                    <Col md="6">
                        <FormControl sx={{ m: 0, minWidth: 350 }} size="small" >
                            <Form.Label>Duration</Form.Label>
                            <Select value={inputText} label="Type" onChange={(e) => setInputText(e.target.value)}>
                                <MenuItem value="30 Days [1 Month]">30 Days [1 Month]</MenuItem>
                                <MenuItem value="60 Days [2 Month]">60 Days [2 Month]</MenuItem>
                                <MenuItem value="90 Days [3 Month]">90 Days [3 Month]</MenuItem>
                                <MenuItem value="180 Days [6 Month]">180 Days [6 Month]</MenuItem>
                                <MenuItem value="365 Days [12 Month]">365 Days [12 Month]</MenuItem>
                            </Select>
                        </FormControl>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <button
                            type="submit"
                            className="btn btn-success"
                            style={{ marginTop: 5 + 'px' }}
                            onClick={updatePlatform}
                        >
                            Update
                        </button>
                    </Col>
                </Row>
            </Form>
            {/* </SimpleCard> */}
        </Container>
    );
};

export default DurationStatus;
