import { styled } from '@mui/system';
import { Breadcrumb } from 'app/components';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Row, Col, Modal, InputGroup } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';
import ReminderMail from './reminderMail';
import ClearIcon from '@mui/icons-material/Clear';
import moment from 'moment/moment';
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

const ManageRecovery = () => {
    // const [APIData, setAPIData] = useState([]);

    const [sendMailObj, setSendMailObj] = useState(null);
    const [showMail, setShowMail] = useState(false);
    const handleCloseMail = () => setShowMail(false);

    const handleSendMail = (subscriber) => {
        setSendMailObj(subscriber);
        setShowMail(true);
    };
    const navigate = useNavigate();
    const changePage = () => {
        navigate('/employees/addEmployee');
    };
    const [userData, setUserData] = useState([]);
    const items = localStorage.getItem('accessToken');
    const roleCode = localStorage.getItem('roleCode');
    const userId = localStorage.getItem('userId');
    const headers = {
        "x-access-token": items,
        "roleCode": roleCode,
        "userId": userId
    }
    const firstdate = moment().startOf('month').format('YYYY-MM-DD');
    const lastdate = moment().endOf('month').format("YYYY-MM-DD");

    const [startDate, setstartDate] = useState(firstdate)
    const [endDate, setendDate] = useState(lastdate)
    //get method
    const fetchRecovery = () => {
        axios.post(BASE_URL + `/api/getPendingInstalments`, {
            fromDate: startDate,
            toDate: endDate,
            userId: 1
        }, { headers: headers }).then((response) => {
            setUserData(response.data.data);
        });
    }
    useEffect(() => {
        fetchRecovery()
    }, [userData]);

    return (
        <Container>
            <Box>
                <Box className="breadcrumb">
                    <Breadcrumb
                        routeSegments={[
                            { name: 'Dashboard', path: '/dashboard/default' },
                            { name: 'Recovery List', path: '/myDeal/recovery/manageRecovery' },
                            { name: 'Installment Recovery' },
                        ]}
                    />
                </Box>
                <Box>
                    <Row>
                        <Col md="6">
                            <Form.Label htmlFor="basic-url">Apply Date Range (By Default Current Month Start Date and End Date is selected) </Form.Label>
                            <InputGroup className="mb-3">
                                <Form.Control
                                    value={startDate}
                                    onChange={(e) => setstartDate(e.target.value)}
                                    type="date" />
                                <Form.Control
                                    value={endDate}
                                    onChange={(e) => setendDate(e.target.value)}
                                    type="date" />

                            </InputGroup>
                        </Col>

                    </Row>
                </Box>

                <Box className="text-center" width="100%" overflow="auto">
                    {/* Table Section */}
                    <h4>Recovery List</h4>
                    <StyledTable className="table table-striped table-bordered" style={{ 'borderRadius': '1px' }}>
                        <TableHead style={{ borderLeft: '1px solid red', borderRight: '1px solid red' }} className='text-center'>
                            <TableRow>
                                <TableCell align="center">Invoice No</TableCell>
                                <TableCell align="center">Client Name</TableCell>
                                <TableCell align="center">EMI Date</TableCell>
                                <TableCell align="center">EMI Amount</TableCell>
                                <TableCell align="center">Fine Amount</TableCell>
                                <TableCell align="center">Status</TableCell>
                                <TableCell align="center">Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {userData.map((subscriber, index) => {
                                // if (subscriber.status == 1) {
                                return (
                                    <TableRow key={index}>
                                        <TableCell align="center">{subscriber.invoiceNumber}</TableCell>
                                        <TableCell align="center">{subscriber.clientName}</TableCell>
                                        <TableCell align="center">{new Date(subscriber.instalmentDate).toLocaleDateString('en-GB')}</TableCell>
                                        <TableCell align="center">₹ {subscriber.instalmentAmount}</TableCell>
                                        <TableCell align="center">₹ {subscriber.fineAmount == null ? 0 : subscriber.fineAmount}</TableCell>
                                        <TableCell align="center">
                                            {subscriber.hasPaid == 1 ? (
                                                <Chip color="success" label="Paid" />
                                            ) : (
                                                <Chip color="warning" label="Not Paid" />
                                            )}
                                        </TableCell>
                                        <TableCell align="center">
                                            <IconButton onClick={() => handleSendMail(subscriber)}>
                                                <Icon color="red">mail</Icon>
                                            </IconButton>
                                            <Link to="/myDeal/recovery/editRecoveryInstallment" state={subscriber}>
                                                <IconButton>
                                                    <Icon color="success">edit</Icon>
                                                </IconButton>
                                            </Link>
                                        </TableCell>
                                    </TableRow>
                                );
                                // }
                            })}
                        </TableBody>
                    </StyledTable>
                </Box>
                <Modal
                    show={showMail}
                    onHide={handleCloseMail}
                    backdrop="static"
                    keyboard={false}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                >
                    <Modal.Header>
                        <Modal.Title>Send Reminder Mail</Modal.Title>
                        <IconButton type="button" onClick={handleCloseMail}>
                            <ClearIcon />
                        </IconButton>
                    </Modal.Header>
                    <Modal.Body>
                        <ReminderMail theClientMail={sendMailObj} handleDialog={handleCloseMail}></ReminderMail>
                    </Modal.Body>
                    <Modal.Footer>
                        <button
                            type="submit"
                            className="btn btn-error"
                            style={{ marginTop: 5 + 'px' }}
                            onClick={handleCloseMail}
                        >
                            Cancel
                        </button>
                    </Modal.Footer>
                </Modal>
            </Box>
        </Container>
    );
};

export default ManageRecovery;
