import { styled } from '@mui/system';
import { Breadcrumb } from 'app/components';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import ClearIcon from '@mui/icons-material/Clear';
import { Form, Row, Col, InputGroup, Modal } from 'react-bootstrap';
import {
    Box,
    Icon,
    IconButton,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
} from '@mui/material';

import ViewCardDetails from './viewDigital';
const Container = styled('div')(({ theme }) => ({
    margin: '30px',
    [theme.breakpoints.down('sm')]: { margin: '16px' },
    '& .breadcrumb': {
        marginBottom: '30px',
        [theme.breakpoints.down('sm')]: { marginBottom: '16px' },
    },
}));
const StyledTable = styled(Table)(() => ({
    whiteSpace: 'pre',
    '& thead': {
        '& tr': { '& th': { paddingLeft: 0, paddingRight: 0 } },
    },
    '& tbody': {
        '& tr': { '& td': { paddingLeft: 0 } },
    },
}));

const ManageDigitalCard = () => {
    const [empAPI, setEmpApi] = useState([])
    const items = localStorage.getItem('accessToken');
    const roleCode = localStorage.getItem('roleCode');
    const userId = localStorage.getItem('userId');
    const headers = {
        "x-access-token": items,
        "roleCode": roleCode,
        "userId": userId
    }
    const [showForm, setShowForm] = useState(false);
    const [obj, setObj] = useState(null)

    const handleShow = (subscriber) => {
        setObj(subscriber);
        setShowForm(true);
    };
    const handleClose = () => {
        setShowForm(false);
    }
    const getEmpDigitalCard = () => {
        axios.post(`http://43.204.38.243:3001/api/getDigitalCard`, { _id: 0 },
            { headers: headers })
            .then((response) => {
                setEmpApi(response.data.data);
            });
    }
    useEffect(() => {
        getEmpDigitalCard()
    }, []);
    return (
        <Container>
            <Box>
                <Box className="breadcrumb">
                    <Breadcrumb
                        routeSegments={[
                            { name: 'Manage Digital Card', path: '/digitalCards' },
                            { name: 'Digital Card Detail Page' },
                        ]}
                    />
                </Box>
                <Box>
                    <Row>
                        <Col>
                            <InputGroup className="mb-3">
                                <Link to='/digitalCards/addCard'>
                                    <button type="submit" className="btn btn-success" >
                                        ADD
                                    </button>
                                </Link>

                                &nbsp;
                                <Form.Control
                                    placeholder="Search Box"
                                    aria-label="Recipient's username"
                                    aria-describedby="basic-addon2"
                                />&nbsp;
                                <Link to='/digitalCards/SampleCard'>
                                    <button type="button" className="btn btn-primary">
                                        Card Design
                                    </button>
                                </Link>
                            </InputGroup>
                        </Col>
                    </Row>
                </Box>
                <Box className="text-center" width="100%" overflow="auto">
                    {/* Table Section */}
                    <h4>Digital Card Table List</h4>
                    <StyledTable>
                        <TableHead>
                            <TableRow>
                                <TableCell align="center">Sr. No</TableCell>
                                <TableCell align="center">Name</TableCell>
                                <TableCell align="center">DOB</TableCell>
                                <TableCell align="center">Mobile </TableCell>
                                <TableCell align="center">Email</TableCell>
                                <TableCell align="center">Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {empAPI.map((empCard, index) => {
                                return (
                                    <TableRow key={index}>
                                        <TableCell align="center">{empCard.id}</TableCell>
                                        <TableCell align="center">{empCard.name}</TableCell>
                                        <TableCell align="center">{new Date(empCard.dob).toLocaleDateString('en-GB')}</TableCell>
                                        <TableCell align="center">{empCard.mobileNo1}</TableCell>
                                        <TableCell align="center">{empCard.email}</TableCell>
                                        <TableCell align="center">
                                            {/* <Link to="/leads/viewLeads" state={empCard}> */}
                                            <IconButton onClick={handleShow}>
                                                <Icon color="red">visibility</Icon>
                                            </IconButton>
                                            {/* </Link> */}
                                            <Link to="/digitalCards/editCard" state={empCard}>
                                                <IconButton>
                                                    <Icon color="success">edit</Icon>
                                                </IconButton>
                                            </Link>
                                            <IconButton>
                                                <Icon color="success">delete</Icon>
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </StyledTable>
                </Box>
            </Box>
            <Modal
                show={showForm}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header>
                    <Modal.Title>View Employee Card Detail's</Modal.Title>
                    <IconButton type="button" onClick={handleClose}>
                        <ClearIcon />
                    </IconButton>
                </Modal.Header>
                <Modal.Body>
                    <ViewCardDetails></ViewCardDetails>
                </Modal.Body>

            </Modal>
        </Container>
    );
};

export default ManageDigitalCard;
