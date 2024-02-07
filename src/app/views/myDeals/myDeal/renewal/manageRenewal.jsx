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

const Renewal = () => {
    const navigate = useNavigate();
    const changePage = () => {
        navigate('/employees/addEmployee');
    };
    const [renewData, setRenewData] = useState([]);
    const items = localStorage.getItem('accessToken');
    const roleCode = localStorage.getItem('roleCode');
    const userId = localStorage.getItem('userId');
    const headers = {
        "x-access-token": items,
        "roleCode": roleCode,
        "userId": userId
    }
    //get method
    useEffect(() => {
        axios.post(BASE_URL + `/api/getRenewalInstalments`,
            { "userId": parseInt(userId) }, { headers: headers }).then((response) => {
                setRenewData(response.data.data);
            });
    }, []);

    return (
        <Container>
            <Box>
                <Box className="breadcrumb">
                    <Breadcrumb
                        routeSegments={[
                            { name: 'Dashboard', path: '/dashboard/default' },
                            { name: 'Renewal List', path: '/myDeal/renewal' },
                            { name: 'Product Renewal' },
                        ]}
                    />
                </Box>
                <Form.Label style={{ color: 'red' }}>
                    Note :- List of Invoice Renewal in Upcoming 30 Days
                </Form.Label>
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
                                {/* <TableCell align="center">Action</TableCell> */}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {renewData.map((subscriber, index) => {
                                return (
                                    <TableRow key={index}>
                                        <TableCell align="center">{subscriber.invoiceNumber}</TableCell>
                                        <TableCell align="center">{subscriber.productName}</TableCell>
                                        <TableCell align="center">{subscriber.clientName}</TableCell>
                                        <TableCell align="center">{subscriber.clientEmail}</TableCell>
                                        {/* <TableCell align="center">
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
                                                   
                                                </IconButton>
                                            </Link>
                                        </TableCell> */}
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
