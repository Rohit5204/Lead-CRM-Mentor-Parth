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
const EditCategory = ({ theEditCategory, handleDialog }) => {
    console.log(theEditCategory)
    const [id, setId] = useState(theEditCategory.id);
    const [masterName, setMasterName] = useState('Email');
    const [inputText, setInputText] = useState(theEditCategory.emailCategory);

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
        axios.post(`http://43.204.38.243:3001/api/mastersUpsert`, UpdatePlatform, { headers: headers })
            .then(() => useEffect);
        setInputText('');
        handleDialog()
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
                        <Form.Label>Master Name</Form.Label>
                        <Form.Control
                            disabled
                            value={masterName}
                            onChange={(e) => setMasterName(e.target.value)}
                            placeholder="Enter the Platform Name"
                        />
                    </Col>
                    <Col md="6">
                        <Form.Label>Category Name</Form.Label>
                        <Form.Control
                            onChange={(e) => setInputText(e.target.value)}
                            value={inputText}
                            placeholder="Enter the Email Category Name"
                        />
                    </Col>
                </Row>
                <Row className="mt-2">
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

export default EditCategory;
