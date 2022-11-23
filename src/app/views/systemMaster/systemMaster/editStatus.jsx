import * as React from 'react';
import { styled } from '@mui/system';
import { Breadcrumb, SimpleCard } from 'app/components';
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
const EditStatus = ({ theEditStatus }) => {
    console.log(theEditStatus)
    const [id, setId] = useState(theEditStatus.id);
    const [masterName, setMasterName] = useState('Status');
    const [inputText, setInputText] = useState(theEditStatus.name);

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
        console.log({ UpdatePlatform });
        e.preventDefault();
        axios.post(`http://213.136.72.177/cms/api/mastersUpsert`, UpdatePlatform, { headers: { "x-access-token": items } })
            .then(() => useEffect);
        setInputText('');
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
                        <Form.Label>Platform Name</Form.Label>
                        <Form.Control
                            disabled
                            value={masterName}
                            onChange={(e) => setMasterName(e.target.value)}
                            placeholder="Enter the Platform Name"
                        />
                    </Col>
                    <Col md="6">
                        <Form.Label>Satus Name</Form.Label>
                        <Form.Control
                            onChange={(e) => setInputText(e.target.value)}
                            value={inputText}
                            placeholder="Enter the Label Name"
                        />
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

export default EditStatus;
