import * as React from 'react';
import { styled } from '@mui/system';
import { Breadcrumb, SimpleCard } from 'app/components';
import { Box, MenuItem, FormControl, Select, Autocomplete, TextField, } from '@mui/material';
import { Form, Row, Col, InputGroup } from 'react-bootstrap';
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
const StatusCatalogue = ({ theStatusCatalogue, handleDialogStatus }) => {
    // console.log(theStatusCatalogue)
    const [id, setId] = useState(theStatusCatalogue.id);
    const [gsType, setGsType] = useState(theStatusCatalogue.gsType);
    const [gsName, setGsName] = useState(theStatusCatalogue.gsName);
    const [gsPrice, setGsPrice] = useState(theStatusCatalogue.gsPrice);
    const [catStatus, setCatStatus] = useState(theStatusCatalogue.status);
    const [gsDescription, setGsDescription] = useState(theStatusCatalogue.gsDescription);
    const [duration, setDuration] = useState(0)

    const [assignTo, setAssignTo] = useState([]);
    const [id1, setId1] = useState([]);
    const [myOptions3, setMyOptions3] = useState(theStatusCatalogue.durationName);

    useEffect(() => {
        axios.get(BASE_URL + `/api/getMasterData?masterName=durationmaster`,
            { headers: headers }).then((res) => {
                for (var i = 0; i < res.data.data.length; i++) {
                    setAssignTo(current => [...current, res.data.data[i].name]);
                    setId1(current => [...current, res.data.data[i].id, res.data.data[i].name])
                }
            });
    }, []);

    const items = localStorage.getItem('accessToken');
    const roleCode = localStorage.getItem('roleCode');
    const userId = localStorage.getItem('userId');
    const headers = {
        "x-access-token": items,
        "roleCode": roleCode,
        "userId": userId
    }

    const updateCatalogue = (e) => {
        var catdurationid
        for (var i = 0; i < id1.length; i++) {
            if (myOptions3 == id1[i]) {
                catdurationid = id1[i - 1]
            }
        }
        const UpdateCatalogue = {
            catId: id,
            catType: gsType,
            gsName: gsName,
            price: gsPrice,
            description: gsDescription,
            catStatus: catStatus,
            actionBy: 1,
            durationId: catdurationid
        };
        axios.post(BASE_URL + `/api/upsertCatalogue`, UpdateCatalogue,
            { headers: headers }).then(() => useEffect);
        handleDialogStatus();
    };

    const handleSubmit = (e) => {
        e.preventDefault();
    };

    const changePage = () => {
        handleDialogStatus()
    }
    return (
        <Container>
            {/* <SimpleCard title="Update Catalogue Detail's"> */}
            <Form onSubmit={handleSubmit}>
                <Row>
                    <Col md="6" className="ml-8">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            disabled
                            onChange={(e) => setGsName(e.target.value || '')}
                            value={gsName == null ? '' : gsName}
                            placeholder="Enter the Name"
                        />
                    </Col>
                    <Col md="6">
                        <FormControl sx={{ m: 0, width: '100%' }} size="small" >
                            <Form.Label>Type</Form.Label>
                            <Select disabled value={gsType} label="Type" onChange={(e) => setGsType(e.target.value)}>
                                <MenuItem value="">Select the Type</MenuItem>
                                <MenuItem value="Service">Service</MenuItem>
                                <MenuItem value="Product">Product</MenuItem>
                            </Select>
                        </FormControl>
                    </Col>
                </Row>
                <Row>
                    <Col className="mt-1">
                        <Form.Label>Price</Form.Label>
                        <Form.Control
                            disabled
                            onChange={(e) => setGsPrice(e.target.value)}
                            value={gsPrice}
                            placeholder="Enter the Price"
                        />
                    </Col>
                    <Col md="6">
                        <FormControl sx={{ m: 0, width: '100%' }} size="small" >
                            <Form.Label>Status</Form.Label>
                            <Select value={catStatus} label="Type" onChange={(e) => setCatStatus(e.target.value)}>
                                <MenuItem value="">Select the Type</MenuItem>
                                <MenuItem value={0}>INACTIVE</MenuItem>
                                <MenuItem value={1}>ACTIVE</MenuItem>
                            </Select>
                        </FormControl>
                    </Col>
                </Row>
                <br></br>
                <Row>
                    <Col className="d-flex justify-content-end">
                        <button
                            type="submit"
                            className="btn btn-secondary"
                            style={{ marginTop: 5 + 'px' }}
                            onClick={changePage}
                        >Cancel
                        </button>
                        &nbsp;
                        <button
                            type="submit"
                            className="btn btn-success"
                            style={{ marginTop: 5 + 'px' }}
                            onClick={updateCatalogue}
                        >Update
                        </button>
                    </Col>
                </Row>
            </Form>
            {/* </SimpleCard> */}
        </Container>
    );
};

export default StatusCatalogue;
