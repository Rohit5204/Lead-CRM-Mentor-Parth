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

const ManageDeals = () => {
    const [APIData, setAPIData] = useState([]);

    const [onType, setOnType] = useState('')
    const [searchBox, setSearchBox] = useState('')
    const [locationkey, setLocationkey] = useState('')

    const items = localStorage.getItem('accessToken');
    const roleCode = localStorage.getItem('roleCode');
    const userId = localStorage.getItem('userId');
    const headers = {
        "x-access-token": items,
        "roleCode": roleCode,
        "userId": userId
    }
    //get method
    const getFetchLeadData = () => {
        axios.post(`http://43.204.38.243:3001/api/getFilteredLeadData`, {
            leadId: 0,
            userId: 0,
            statusId: 0,
            searchKey: searchBox,
            locationkey: locationkey,
            platformId: 0,
            opType: onType
        }, { headers: headers })
            .then((response) => {
                setAPIData(response.data.data);
            });
    }
    useEffect(() => {
        getFetchLeadData()
    }, [APIData]);



    return (
        <Container>
            <Box>
                <Row>
                    <Col md="4">
                        <Form.Label htmlFor="basic-url">Apply Filter Search</Form.Label>
                        <br></br>
                        <button type="button" className="btn btn-outline-primary"
                            value={onType}
                            onClick={() => setOnType('DEFAULT')}>
                            ALL
                        </button>
                        &nbsp;
                        <button type="button" className="btn btn-outline-primary"
                            value={onType}
                            onClick={() => setOnType('LASTDAY')}>
                            Last Day
                        </button>
                        &nbsp;
                        <button type="button" className="btn btn-outline-primary"
                            value={onType}
                            onClick={() => setOnType('LASTWEEK')}>
                            Last Week
                        </button>
                        &nbsp;
                        <button type="button" className="btn btn-outline-primary"
                            value={onType}
                            onClick={() => setOnType('LASTMONTH')}>
                            Last Month
                        </button>

                    </Col>
                    <Col md="4">
                        <Form.Label htmlFor="basic-url">Search Lead</Form.Label>
                        <br></br>
                        <InputGroup className="mb-3">
                            <Form.Control
                                placeholder="Search By Lead ID, Name, Mobile Number"
                                aria-label="Recipient's username"
                                aria-describedby="basic-addon2"
                                value={searchBox}
                                onChange={(e) => setSearchBox(e.target.value)}
                            />
                        </InputGroup>
                    </Col>
                    <Col md="4">
                        <Form.Label htmlFor="basic-url">Search Advanced Lead</Form.Label>
                        <br></br>
                        <InputGroup className="mb-3">
                            <Form.Control
                                placeholder="Search By Street, City, State, Country"
                                aria-label="Recipient's username"
                                aria-describedby="basic-addon2"
                                value={locationkey}
                                onChange={(e) => setLocationkey(e.target.value)}
                            />
                        </InputGroup>
                    </Col>
                </Row>
                <Box className="text-center" width="100%" overflow="auto">
                    {/* Table Section */}
                    <StyledTable className="table table-striped table-bordered" style={{ 'borderRadius': '1px' }}>
                        <TableHead style={{ borderLeft: '1px solid red', borderRight: '1px solid red' }} className='text-center'>
                            <TableRow>
                                <TableCell align="center">Lead Id</TableCell>
                                <TableCell align="center">Lead Name</TableCell>
                                <TableCell align="center">Email</TableCell>
                                <TableCell align="center">Mobile Number</TableCell>
                                <TableCell align="center">Intersted In</TableCell>
                                <TableCell align="center">Status</TableCell>
                                <TableCell align="center">Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {APIData.map((subscriber, index) => {
                                if (subscriber.statusName == "Closed") {
                                    return (
                                        <TableRow key={index}>
                                            <TableCell align="center">{subscriber.leadId}</TableCell>
                                            <TableCell align="center">{subscriber.name}</TableCell>
                                            <TableCell align="center">{subscriber.emailId}</TableCell>
                                            <TableCell align="center">{subscriber.mobileNo}</TableCell>
                                            <TableCell align="center">{subscriber.intrestedIn}</TableCell>
                                            <TableCell align="center">
                                                {(function () {
                                                    if (subscriber.statusName == "Closed") {
                                                        return <Chip label="Closed" />;
                                                    }
                                                    else {
                                                        return <Chip label="Not Listed" color="error" />
                                                    }
                                                })()}
                                            </TableCell>
                                            <TableCell align="center">
                                                <Link to="/leads/viewLeads" state={subscriber}>
                                                    <IconButton>
                                                        <Icon color="red">visibility</Icon>
                                                    </IconButton>
                                                </Link>

                                            </TableCell>
                                        </TableRow>
                                    );
                                }
                            })}
                        </TableBody>
                    </StyledTable>
                </Box>

            </Box>
        </Container>
    );
};

export default ManageDeals;
