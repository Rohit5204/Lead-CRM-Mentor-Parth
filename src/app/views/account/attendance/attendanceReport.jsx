import { styled } from '@mui/system';
import { Breadcrumb } from 'app/components';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Row, Col, Modal, InputGroup } from 'react-bootstrap';

import DoneIcon from '@mui/icons-material/Done';
import LogoutIcon from '@mui/icons-material/Logout';
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

import { BASE_URL1 } from 'app/utils/constant';


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

const ManageEmployeeAttendenceLog = () => {

    const org = localStorage.getItem('branchName')
    const [APIData, setAPIData] = useState([])

    const role = localStorage.getItem('roleCode')
    const [searchValue, setSearchValue] = useState('')

    const getAttendenceData = async () => {
        if (role == "BM") {
            await axios.get(BASE_URL1 + `/total-attendence?name=` + org)
                .then((response) => {
                    setAPIData(response.data);
                }
                );
        }
        else {
            await axios.get(BASE_URL1 + `/total-attendence?name=${searchValue}`)
                .then((response) => {
                    setAPIData(response.data);
                }
                );
        }
    }

    const searchData = async (searchString) => {
        if (searchString) {
            setSearchValue(searchString)
        }
        else {
            setSearchValue('')
        }
    }

    useEffect(() => {
        getAttendenceData()
    }, [searchValue]);


    return (
        <Container>
            <Box>
                <Box className="breadcrumb">
                    <Breadcrumb
                        routeSegments={[
                            { name: 'Manage Attandance', path: '/attandanceReport' },
                            { name: 'View Attandance Report' },
                        ]}
                    />
                </Box>
                <Box>
                    <Row>
                        <Col>
                            <InputGroup className="mb-3">

                                <Form.Control
                                    placeholder="Search By Attendence Date"
                                    aria-label="Recipient's username"
                                    aria-describedby="basic-addon2"
                                    onChange={(e) => searchData(e.target.value)}
                                />

                            </InputGroup>
                        </Col>
                    </Row>
                </Box>

                <Box className="text-center" width="100%" overflow="auto">
                    {/* Table Section */}
                    <h4>Attendence Report</h4>
                    <StyledTable className="table table-striped table-bordered" style={{ 'borderRadius': '1px' }}>
                        <TableHead style={{ borderLeft: '1px solid red', borderRight: '1px solid red' }} className='text-center'>
                            <TableRow>
                                <TableCell align="center">Attendence ID</TableCell>
                                <TableCell align="center">Organization</TableCell>
                                <TableCell align="center">Employee Name</TableCell>
                                <TableCell align="center">Present Day</TableCell>
                                <TableCell align="center">Absent Day</TableCell>
                                <TableCell align="center">Half Day</TableCell>
                                <TableCell align="center">Late Mark</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {APIData.map((row, index) => {
                                return (
                                    <TableRow
                                        key={index}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row" align="center">
                                            AR-{index + 1001}
                                        </TableCell>
                                        <TableCell align="center">{row.organization}</TableCell>
                                        <TableCell align="center">{row.fname + " " + row.lname} </TableCell>
                                        <TableCell align="center">{row.present}</TableCell>
                                        <TableCell align="center">{row.absent}</TableCell>

                                        <TableCell align="center">{row.half_day}</TableCell>
                                        <TableCell align="center">{row.latemark}</TableCell>



                                    </TableRow>
                                )
                            })}
                        </TableBody>
                    </StyledTable>

                </Box>
            </Box>
        </Container>
    );
};

export default ManageEmployeeAttendenceLog;
