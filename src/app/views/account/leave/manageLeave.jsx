import { styled } from '@mui/system';
import { Breadcrumb } from 'app/components';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Row, Col, Modal, InputGroup } from 'react-bootstrap';
import ClearIcon from '@mui/icons-material/Clear';
import { useNavigate } from 'react-router-dom';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteIcon from '@mui/icons-material/Delete';
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
import { BASE_URL, BASE_URL1 } from 'app/utils/constant';
import EditLeave from './editLeave';
import AddLeave from './addLeave';

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

const ManageLeave = () => {
    const [obj1, setObj1] = useState(null);
    const [APIData, setAPIData] = useState([]);
    const [show, setShow] = useState(false);
    //Dialog Form
    const handleClose = () => setShow(false);
    const handleShow = (catalogue) => {
        setObj1(catalogue);
        setShow(true);
    };
    const navigate = useNavigate();
    const changePage = () => {
        navigate('/catalogues/addCatalogue');
    };

    const [updateStatus, setUpdateStatus] = useState(false)
    //Dialog Form

    const handleShowStatus = () => {
        setUpdateStatus(true);
    };
    const handleCloseStatus = () => setUpdateStatus(false);

    //get method
    const items = localStorage.getItem('accessToken');
    const roleCode = localStorage.getItem('roleCode');
    const userId = localStorage.getItem('userId');

    const headers = {
        "x-access-token": items,
        "roleCode": roleCode,
        "userId": userId
    }

    const org = localStorage.getItem('branchName')

    const handleClickSnak = (row) => {
        axios.delete(BASE_URL1 + `/deleteLeave/` + row._id)
    };
    const getLeaveData = async () => {
        if (roleCode == "EMP") {
            await axios.get(BASE_URL1 + `/getLeave?empName=` + "Rohit")
                .then((response) => {
                    setAPIData(response.data);
                }
                );
        }
        else if (roleCode == "BM") {
            await axios.get(BASE_URL1 + `/getLeave?organization=` + org)
                .then((response) => {
                    setAPIData(response.data);
                }
                );
        }
        else {
            await axios.get(BASE_URL1 + `/getLeave`)
                .then((response) => {
                    setAPIData(response.data);
                }
                );
        }
    }

    useEffect(() => {
        getLeaveData()
    }, [APIData]);
    return (
        <Container>
            <Box>
                <Box className="breadcrumb">
                    <Breadcrumb
                        routeSegments={[
                            { name: 'Manage Leave Request', path: '/manageLeave' },
                            { name: 'View Leave Details' },
                        ]}
                    />
                </Box>
                <Box>
                    <Row>
                        <Col>
                            <InputGroup className="mb-3">
                                {(function () {
                                    if (roleCode == "EMP" || roleCode == "TL") {
                                        return <> <button type="submit" className="btn btn-success" onClick={handleShowStatus}>
                                            ADD
                                        </button>
                                            &nbsp;</>
                                    }

                                    else {
                                        return <></>
                                    }
                                })()}


                                <Form.Control
                                    placeholder="Search By Employee Name"
                                    aria-label="Recipient's username"
                                    aria-describedby="basic-addon2"
                                // value={searchBox}
                                // onChange={(e) => setSearchBox(e.target.value)}
                                />
                            </InputGroup>
                        </Col>
                    </Row>
                </Box>
                <Box className="text-center" width="100%" overflow="auto">
                    {/* Table Section */}
                    <h4>Manage Leave Request</h4>
                    <StyledTable className="table table-striped table-bordered" style={{ 'borderRadius': '1px' }}>
                        <TableHead style={{ borderLeft: '1px solid red', borderRight: '1px solid red' }} className='text-center'>
                            <TableRow>
                                <TableCell align="center">Leave ID</TableCell>
                                <TableCell align="center">Employee</TableCell>
                                <TableCell align="center">Leave Reason</TableCell>
                                <TableCell align="center">No of Days</TableCell>
                                <TableCell align="center">Leave Start Date</TableCell>
                                <TableCell align="center">Leave End Date</TableCell>
                                <TableCell align="center">Status</TableCell>
                                {(function () {
                                    if (roleCode == "ADMIN" || roleCode == "BM") {
                                        return <TableCell align="center">Action</TableCell>
                                    }
                                    else {
                                        return <></>
                                    }
                                })()}

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
                                            Leave-{index + 101}
                                        </TableCell>
                                        <TableCell align="center">{row.empName}</TableCell>
                                        <TableCell align="center">{row.leaveReason}</TableCell>
                                        <TableCell align="center">{row.no_of_days}</TableCell>
                                        <TableCell align="center">{row.startDate}</TableCell>
                                        <TableCell align="center">{row.endDate}</TableCell>
                                        <TableCell align="center">

                                            {(function () {
                                                if (row.status == 0) {
                                                    return <> <Chip label="Approved" color="success" /></>
                                                }
                                                else if (row.status == 1) {
                                                    return <> <Chip label="Waiting" color="warning" /></>
                                                }
                                                else if (row.status == 2) {
                                                    return <> <Chip label="Cancel" /> </>
                                                }
                                                else {
                                                    return <><Chip label="Reject" color="error" /></>
                                                }
                                            })()}

                                        </TableCell>
                                        {(function () {
                                            if (roleCode == "ADMIN" || roleCode == "BM") {
                                                return <><TableCell align="center">
                                                    <IconButton >
                                                        <VisibilityIcon onClick={() => handleShow(row)} />
                                                    </IconButton>
                                                    <IconButton >
                                                        <DeleteIcon onClick={() => handleClickSnak(row)} />
                                                    </IconButton>

                                                </TableCell>
                                                </>
                                            }
                                            else {
                                                return <></>
                                            }
                                        })()}

                                    </TableRow>
                                )
                            })}
                        </TableBody>
                    </StyledTable>

                </Box>
                <Modal
                    show={show}
                    onHide={handleClose}
                    backdrop="static"
                    keyboard={false}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                >
                    <Modal.Header>
                        <Modal.Title>Update Leave Request</Modal.Title>
                        <IconButton type="button" onClick={handleClose}>
                            <ClearIcon />
                        </IconButton>
                    </Modal.Header>
                    <Modal.Body>
                        <EditLeave theEditData={obj1} handleClose={handleClose}></EditLeave>
                    </Modal.Body>
                </Modal>

                <Modal
                    show={updateStatus}
                    onHide={handleCloseStatus}
                    backdrop="static"
                    keyboard={false}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                >
                    <Modal.Header>
                        <Modal.Title>Raise Leave Request</Modal.Title>
                        <IconButton type="button" onClick={handleCloseStatus}>
                            <ClearIcon />
                        </IconButton>
                    </Modal.Header>
                    <Modal.Body>
                        <AddLeave handleClose={handleCloseStatus}></AddLeave>
                    </Modal.Body>
                </Modal>
            </Box>
        </Container>
    );
};

export default ManageLeave;
