import { styled } from '@mui/system';
import { Breadcrumb } from 'app/components';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Row, Col, Modal, InputGroup } from 'react-bootstrap';

import {
    Box,
    Icon,
    IconButton,
    Table,
    TableBody,
    TableCell,
    TableHead,
    Chip,
    TableRow,
} from '@mui/material';
import { BASE_URL } from 'app/utils/constant';


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

const ManageLeaderBoard = () => {

    const [APIData, setAPIData] = useState([]);

    const currentDate = new Date();
    const monthNames = [
        "January", "February", "March", "April",
        "May", "June", "July", "August",
        "September", "October", "November", "December"
    ];

    const currentMonthName = monthNames[currentDate.getMonth()];
    const currentYear = currentDate.getFullYear();

    const items = localStorage.getItem('accessToken');
    const roleCode = localStorage.getItem('roleCode');
    const userId = localStorage.getItem('userId');
    const headers = {
        "x-access-token": items,
        "roleCode": roleCode,
        "userId": userId
    }

    const getLeaderBoard = async () => {
        await axios.get(BASE_URL + `/api/getLeadBoard`,
            { headers: headers })
            .then((response) => {
                setAPIData(response.data.data);
            });
    }

    useEffect(() => {
        getLeaderBoard()
    }, []);

    const roleName = window.localStorage.getItem('roleName');

    return (
        <Container>
            <Box>
                <Box className="breadcrumb">
                    <Breadcrumb
                        routeSegments={[
                            { name: 'Leader Board Details', path: '/manageLeaderBoard' },
                            { name: 'Leader Board' },
                        ]}
                    />
                </Box>
                <Box>
                    <Row>
                        <Col>
                            <InputGroup className="mb-3">

                                <Form.Control
                                    placeholder="Search By Employee Name"
                                    aria-label="Recipient's username"
                                    aria-describedby="basic-addon2"

                                />
                            </InputGroup>
                        </Col>
                    </Row>
                </Box>
                <Box className="text-center" width="100%" overflow="auto">
                    {/* Table Section */}
                    <h4>Leader Board For {currentMonthName} {currentYear}</h4>
                    <StyledTable className="table table-striped table-bordered" style={{ 'borderRadius': '1px' }}>
                        <TableHead style={{ borderLeft: '1px solid red', borderRight: '1px solid red' }} className='text-center'>
                            <TableRow>
                                <TableCell align="center">Rank Wise Employee</TableCell>
                                <TableCell align="center">Employee Name</TableCell>
                                <TableCell align="center">AT (Active Trader Count)</TableCell>
                                <TableCell align="center">Total Amount</TableCell>


                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {APIData.map((catalogue, index) => {
                                return (
                                    <TableRow key={index}>
                                        <TableCell align="center">Rank - {index + 1}</TableCell>
                                        <TableCell align="center">{catalogue.employeeName}</TableCell>
                                        <TableCell align="center">{catalogue.AT_count}</TableCell>
                                        <TableCell align="center">₹ {catalogue.total_amount}</TableCell>
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

export default ManageLeaderBoard;
