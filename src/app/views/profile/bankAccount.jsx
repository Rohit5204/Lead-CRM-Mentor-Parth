import * as React from 'react';
import { styled } from '@mui/system';
import { Breadcrumb, SimpleCard } from 'app/components';
import { Box, MenuItem, FormControl, InputLabel, Select } from '@mui/material';
import { Form, Row, Col, Button } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import axios from 'axios';


const Div = styled('div')(() => ({
    margin: '6px 0px 0px 350px',
}));
const EditPlatformAccount = ({ theEditPlatformAccount, handleDialog }) => {
    // console.log(theEditPlatformAccount)
    const [id, setId] = useState(theEditPlatformAccount.id);
    const [companyId, setcompanyId] = useState(theEditPlatformAccount.companyId);
    const [platformName, setplatformName] = useState(theEditPlatformAccount.platformName);
    const [upiId, setupiId] = useState(theEditPlatformAccount.upiId);
    const [recordStatus, setrecordStatus] = useState(theEditPlatformAccount.recordStatus);

    const UpdateData = {
        id: id,
        companyId: companyId,
        platformName: platformName,
        upiId: upiId,
        recordStatus: recordStatus,
        updatedBy: 1
    };
    const updateInstallment = (e) => {
        const items = localStorage.getItem('accessToken');
        // console.log({ UpdateData });
        e.preventDefault();
        axios.post(`http://213.136.72.177/cms/api/updateCompanyAccounts`, UpdateData,
            { headers: { "x-access-token": items } }).then(() => useEffect);
        handleDialog();
    };
    const handleSubmit = (e) => {
        e.preventDefault();
    };
    return (
        <div>
            <Form onSubmit={handleSubmit} >
                <Row>
                    <Col className="mt-1">
                        <Form.Label>Company Account Id</Form.Label>
                        <Form.Control
                            disabled
                            onChange={(e) => setcompanyId(e.target.value)}
                            value={companyId}
                            placeholder="Enter the Company Account Id"
                        />
                    </Col>
                    <Col className="mt-1">
                        <Form.Label>Wallet Name</Form.Label>
                        <Form.Control
                            onChange={(e) => setplatformName(e.target.value)}
                            value={platformName}
                            placeholder="Enter the Wallet Name"
                        />
                    </Col>
                </Row>
                <Row className="mt-1">
                    <Col className="mt-1">
                        <Form.Label>UPI ID</Form.Label>
                        <Form.Control
                            onChange={(e) => setupiId(e.target.value)}
                            value={upiId}
                            placeholder="Enter the UPI Number"
                        />
                    </Col>
                    <Col className="mt-1">
                        <FormControl sx={{ m: 0, minWidth: 370 }} size="small">
                            <Form.Label>Status</Form.Label>
                            <Select
                                value={recordStatus}
                                label="Age"
                                onChange={(e) => setrecordStatus(e.target.value)}
                            >
                                <MenuItem value={0}>In-Active</MenuItem>
                                <MenuItem value={1}>Active</MenuItem>
                            </Select>
                        </FormControl>
                    </Col>
                </Row>
                <Div>
                    <Row>
                        <Col>
                            <button
                                type="submit"
                                className="btn btn-success"
                                style={{ marginTop: 5 + 'px' }}
                                onClick={updateInstallment}
                            > Update
                            </button>
                        </Col>
                    </Row>
                </Div>
            </Form>
        </div>
    );
};

export default EditPlatformAccount;
