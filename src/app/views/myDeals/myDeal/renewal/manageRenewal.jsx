import { styled } from '@mui/system';
import { Breadcrumb } from 'app/components';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Row, Col, Modal, InputGroup } from 'react-bootstrap';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import InsertInvitationIcon from '@mui/icons-material/InsertInvitation';
import { useNavigate, Link } from 'react-router-dom';
import {
    Box,
    Icon,
    Chip,
    IconButton,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
} from '@mui/material';

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

const Renewal = () => {
    const navigate = useNavigate();
    const changePage = () => {
        navigate('/employees/addEmployee');
    };
    const [renewData, setRenewData] = useState([]);
    const items = localStorage.getItem('accessToken');
    //get method
    useEffect(() => {
        axios.post(`https://43.204.38.243:3000/api/getRenewalInstalments`,
            { "userId": 1 }, { headers: { "x-access-token": items } }).then((response) => {
                setRenewData(response.data.data);
            });
    }, [renewData]);

    return (
        <Container>
            <Box>
                <Box className="breadcrumb">
                    <Breadcrumb
                        routeSegments={[
                            { name: 'Renewal List', path: '/myDeal/renewal' },
                            { name: 'Product Renewal' },
                        ]}
                    />
                </Box>
                <Box>
                    <Row>
                        <Col>
                            <InputGroup className="mb-3">
                                {/* <button type="submit" className="btn btn-success" onClick={changePage}>
                                    ADD
                                </button>
                                &nbsp; */}
                                <Form.Control
                                    placeholder="Search Box"
                                    aria-label="Recipient's username"
                                    aria-describedby="basic-addon2"
                                />
                            </InputGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Label htmlFor="basic-url">Apply Filter Search</Form.Label>
                            <br></br>
                            <button type="button" className="btn btn-outline-primary">
                                Last Day
                            </button>
                            &nbsp;
                            <button type="button" className="btn btn-outline-primary">
                                Last Week
                            </button>
                            &nbsp;
                            <button type="button" className="btn btn-outline-primary">
                                Last Month
                            </button>
                            &nbsp;
                        </Col>
                        <Col></Col>
                        <Col>
                            <Form.Label htmlFor="basic-url">Apply Advanced Filter</Form.Label>
                            <br></br>
                            <button type="button" className="btn btn-outline-primary">
                                Advanced Search
                            </button>
                        </Col>
                    </Row>
                </Box>
                <Box className="text-center" width="100%" overflow="auto">
                    {/* Table Section */}
                    <h4>Upcoming Renewal</h4>
                    <StyledTable className="table table-striped table-bordered" style={{ 'borderRadius': '1px' }}>
                        <TableHead style={{ borderLeft: '1px solid red', borderRight: '1px solid red' }} className='text-center'>
                            <TableRow>
                                <TableCell align="center">Invoice No</TableCell>
                                <TableCell align="center">Product Name</TableCell>
                                <TableCell align="center">Client Name</TableCell>
                                <TableCell align="center">Client Email</TableCell>
                                <TableCell align="center">Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {renewData.map((subscriber, index) => {
                                return (
                                    <TableRow key={index}>
                                        <TableCell align="center">{subscriber.invoiceNumber}</TableCell>
                                        <TableCell align="center">{subscriber.poductName}</TableCell>
                                        <TableCell align="center"></TableCell>
                                        <TableCell align="center">{subscriber.clientEmail}</TableCell>
                                        <TableCell align="center">
                                            <Link to="/myDeal/renewal/viewRenew" state={subscriber}>
                                                <IconButton>
                                                    <Icon color="red">visibility</Icon>
                                                </IconButton>
                                            </Link>
                                            <IconButton>
                                                <InsertInvitationIcon color="warning" />
                                            </IconButton>
                                            <Link to="/invoices/addInvoice" state={subscriber}>
                                                <IconButton>
                                                    <AutorenewIcon color="success" />
                                                    {/* <Icon color="success">renew</Icon> */}
                                                </IconButton>
                                            </Link>
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </StyledTable>
                </Box>
            </Box>
        </Container>
    );
};

export default Renewal;
