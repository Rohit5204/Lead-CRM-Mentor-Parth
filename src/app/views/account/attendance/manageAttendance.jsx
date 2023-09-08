import { styled } from '@mui/system';
import { Breadcrumb } from 'app/components';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Row, Col, Modal, InputGroup } from 'react-bootstrap';
import ClearIcon from '@mui/icons-material/Clear';
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
import EmpAttendence from './addAttendance';
import CheckOut from './logout';


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

    //get method
    const items = localStorage.getItem('accessToken');
    const roleCode = localStorage.getItem('roleCode');
    const userId = localStorage.getItem('userId');
    const headers = {
        "x-access-token": items,
        "roleCode": roleCode,
        "userId": userId
    }

    const [obj1, setObj1] = useState(null)
    const [show1, setShow1] = useState(false);
    const handleClose1 = () => setShow1(false);
    const handleShow1 = (data) => {
        setObj1(data)
        setShow1(true);
    };

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => {
        setShow(true);
    };

    const [searchBox, setSearchBox] = useState('')
    const fullName = localStorage.getItem('name')

    var names = fullName.split(' ');

    const [APIData, setAPIData] = useState([])
    const [page, setPage] = useState(1);
    const [no_of_pages, setNoOfPages] = useState(0)

    const getAttandanceLogs = async () => {
        if (roleCode == "EMP") {
            await axios.get(BASE_URL1 + `/getAttendence?page=${page}&fname=` + names[0])
                .then((response) => {
                    setAPIData(response.data.data);
                    setNoOfPages(response.data.totalPages)
                }
                );
        }
        else {
            await axios.get(BASE_URL1 + `/getAttendence?page=${page}`)
                .then((response) => {
                    setAPIData(response.data.data);
                    setNoOfPages(response.data.totalPages)
                }
                );
        }

    }

    useEffect(() => {
        getAttandanceLogs()
    }, [APIData]);


    return (
        <Container>
            <Box>
                <Box className="breadcrumb">
                    <Breadcrumb
                        routeSegments={[
                            { name: 'Manage Attandance', path: '/manageAttandance' },
                            { name: 'View Attandance Details' },
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
                                    value={searchBox}
                                    onChange={(e) => setSearchBox(e.target.value)}
                                /> &nbsp;
                                <button type="submit" className="btn btn-success" onClick={handleShow}>
                                    LOG IN
                                </button>

                            </InputGroup>
                        </Col>
                    </Row>
                </Box>

                <Box className="text-center" width="100%" overflow="auto">
                    {/* Table Section */}
                    <h4>Attendence Logs</h4>
                    <StyledTable className="table table-striped table-bordered" style={{ 'borderRadius': '1px' }}>
                        <TableHead style={{ borderLeft: '1px solid red', borderRight: '1px solid red' }} className='text-center'>
                            <TableRow>
                                <TableCell align="center">Sr. No</TableCell>
                                <TableCell align="center">Organization</TableCell>
                                <TableCell align="center">Date</TableCell>
                                <TableCell align="center">Employee Name</TableCell>
                                <TableCell align="center">Check In Time</TableCell>
                                <TableCell align="center">Check Out Time</TableCell>
                                <TableCell align="center">Attendence</TableCell>
                                <TableCell align="center">Status</TableCell>
                                <TableCell align="center">Action</TableCell>

                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {APIData.map((row, index) => {
                                return (
                                    <TableRow
                                        key={index}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row">
                                            AL-{index + 101}
                                        </TableCell>
                                        <TableCell align="center">{row.organization}</TableCell>
                                        <TableCell align="center">{new Date(row.date).toLocaleDateString('en-GB')}</TableCell>
                                        <TableCell align="center">{row.fname} {row.lname}</TableCell>
                                        <TableCell align="center">
                                            {new Date(row.checkInTime).toLocaleTimeString('en-GB')}
                                        </TableCell>
                                        <TableCell align="center">
                                            {(function () {
                                                if (row.checkOut) {
                                                    return <> {new Date(row.checkOut).toLocaleTimeString('en-GB')}</>;
                                                }

                                                else {
                                                    return <>-</>
                                                }
                                            })()}

                                        </TableCell>
                                        <TableCell align="center">
                                            {(function () {
                                                if (row.attendence == 0) {
                                                    return <Chip label="Absent" color="error" />;
                                                }
                                                else if (row.attendence == 1) {
                                                    return <Chip label="Present" color="success" />;
                                                }
                                                else if (row.attendence == 2) {
                                                    return <Chip label="Half-Day" color="warning" />;
                                                }
                                                else if (row.attendence == 3) {
                                                    return <Chip label="Late Mark" />;
                                                }
                                                else {
                                                    return <Chip label="Leave" />
                                                }
                                            })()}
                                        </TableCell>
                                        <TableCell align="center">
                                            {(function () {
                                                if (row.isApproved == "Verified") {
                                                    return <Chip label="Verified" color="success" />;
                                                }
                                                else {
                                                    return <Chip label="Waiting" color="warning" />
                                                }
                                            })()}
                                        </TableCell>
                                        <TableCell align="center">
                                            {(function () {
                                                if (row.disableLogout == 0) {
                                                    return <IconButton style={{ color: 'red' }} onClick={() => handleShow1(row)}>
                                                        <LogoutIcon />
                                                    </IconButton>;
                                                }
                                                else {
                                                    return <IconButton style={{ color: 'green' }}>
                                                        <DoneIcon />
                                                    </IconButton>
                                                }
                                            })()}

                                        </TableCell>
                                    </TableRow>
                                )
                            })}
                        </TableBody>
                    </StyledTable>

                </Box>
            </Box>
            <Modal
                backdrop="static"
                keyboard={false}
                show={show}
                onHide={handleClose}
                animation={false}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header>
                    <h5>Welcome Back,Let Start You'r Day</h5>
                    <IconButton type="button" onClick={handleClose}>
                        <ClearIcon />
                    </IconButton>
                </Modal.Header>
                <Modal.Body>
                    <EmpAttendence handleClose={handleClose}></EmpAttendence>
                </Modal.Body>
            </Modal>

            <Modal
                backdrop="static"
                keyboard={false}
                show={show1}
                onHide={handleClose1}
                animation={false}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header>
                    <h5>It's Time to say Good Bye</h5>
                    <IconButton type="button" onClick={handleClose1}>
                        <ClearIcon />
                    </IconButton>
                </Modal.Header>
                <Modal.Body>
                    <CheckOut thelogoutData={obj1} handleClose={handleClose1}></CheckOut>
                    {/* <EmpAttendence thelogoutData={obj1} handleClose={handleClose1}></EmpAttendence> */}
                </Modal.Body>
            </Modal>
        </Container>
    );
};

export default ManageEmployeeAttendenceLog;
