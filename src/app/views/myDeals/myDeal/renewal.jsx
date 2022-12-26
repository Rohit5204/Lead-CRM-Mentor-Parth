import { styled } from '@mui/system';
import { Breadcrumb } from 'app/components';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Row, Col, Modal, InputGroup } from 'react-bootstrap';
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
    // const [obj1, setObj1] = useState(null);
    // const [APIData, setAPIData] = useState([]);
    // const [show, setShow] = useState(false);
    // //Dialog Form
    // const handleClose = () => setShow(false);

    // const handleShow = (catalogue) => {
    //   setObj1(catalogue);
    //   setShow(true);
    // };
    const navigate = useNavigate();
    const changePage = () => {
        navigate('/employees/addEmployee');
    };
    const [userData, setUserData] = useState([]);
    const items = localStorage.getItem('accessToken');
    //get method
    useEffect(() => {
        axios.get(`https://43.204.38.243:3000/api/getMasterData?masterName=usermaster`,
            { headers: { "x-access-token": items } }).then((response) => {
                setUserData(response.data.data);
            });
    }, [userData]);

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
                    <StyledTable>
                        <TableHead>
                            <TableRow>
                                <TableCell align="justify">Sr No</TableCell>
                                <TableCell align="justify">Client Name</TableCell>
                                <TableCell align="justify">Product Name</TableCell>
                                <TableCell align="justify">Purchase Date</TableCell>
                                <TableCell align="justify">Renewal Date</TableCell>
                                <TableCell align="justify">Remaning Days</TableCell>
                                <TableCell align="center">Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                <TableCell align="justify">0000000001</TableCell>
                                <TableCell align="justify">Rohit Jaiswal</TableCell>
                                <TableCell align="justify">INDEX Option</TableCell>
                                <TableCell align="justify">02/11/2022</TableCell>
                                <TableCell align="justify">02/01/2023</TableCell>

                                <TableCell align="justify"><Chip color="warning" label="21 Days Left" /></TableCell>
                                <TableCell align="center">
                                    <IconButton>
                                        <Icon color="success">send</Icon>
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell align="justify">0000000025</TableCell>
                                <TableCell align="justify">Vikram Jadhav</TableCell>
                                <TableCell align="justify">EQUITY</TableCell>
                                <TableCell align="justify">14/11/2022</TableCell>
                                <TableCell align="justify">14/01/2023</TableCell>
                                <TableCell align="justify"><Chip color="success" label="61 Days Left" /></TableCell>
                                <TableCell align="center">
                                    <IconButton>
                                        <Icon color="success">send</Icon>
                                    </IconButton>
                                </TableCell>
                            </TableRow>

                        </TableBody>
                    </StyledTable>
                </Box>
            </Box>
        </Container>
    );
};

export default Renewal;
