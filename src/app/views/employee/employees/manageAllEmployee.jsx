import { styled } from '@mui/system';
import { Breadcrumb } from 'app/components';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Row, Col, InputGroup } from 'react-bootstrap';
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
    Button,
    Grid,
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

const ManageAllEmployee = () => {
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
    const roleCode = localStorage.getItem('roleCode');
    const userId = localStorage.getItem('userId');
    const headers = {
        "x-access-token": items,
        "roleCode": roleCode,
        "userId": userId
    }
    //get method
    useEffect(() => {
        axios.get(BASE_URL + `/api/getMasterData?masterName=usermaster`,
            { headers: headers }).then((response) => {
                console.log(response.data.status)
                setUserData(response.data.status);
            });
    }, [userData]);

    return (
        <Container>
            <Box>
                <Box className="breadcrumb">
                    <Breadcrumb
                        routeSegments={[
                            { name: 'Manage Employee', path: '/employees/manageAllEmployee' },
                            { name: 'Employee Detail Page' },
                        ]}
                    />
                </Box>
                <Grid container spacing={4}>

                    <Grid item xs={12} md={10}>
                        <h4 style={{ textAlign: 'center', marginLeft: '5px' }}>Manage Employee Login </h4>
                    </Grid>
                    <Grid item xs={12} md={2}>
                        <div className="d-flex justify-content-end">
                            <Button
                                id="demo-customized-button"
                                size='large'

                                variant="contained"
                                disableElevation
                                onClick={changePage}>
                                ADD
                            </Button>
                        </div>
                    </Grid>

                </Grid>
                <br />

                <Box className="text-center" width="100%" overflow="auto">
                    {/* Table Section */}

                    <StyledTable className="table table-striped table-bordered" style={{ 'borderRadius': '1px' }}>
                        <TableHead style={{ borderLeft: '1px solid red', borderRight: '1px solid red' }} className='text-center'>
                            <TableRow>
                                <TableCell align="center">User Id</TableCell>
                                <TableCell align="center">Name</TableCell>
                                <TableCell align="center">Email</TableCell>
                                <TableCell align="center">Mobile Number</TableCell>
                                <TableCell align="center">Username</TableCell>
                                <TableCell align="center">Role</TableCell>
                                <TableCell align="center">Status</TableCell>
                                <TableCell align="center">Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {userData.map((subscriber, index) => (

                                <TableRow key={index}>
                                    <TableCell align="center">{subscriber.userId}</TableCell>
                                    <TableCell align="center">
                                        {subscriber.firstName} {subscriber.lastName}
                                    </TableCell>
                                    <TableCell align="center">{subscriber.email}</TableCell>
                                    <TableCell align="center">{subscriber.mobileNo}</TableCell>
                                    <TableCell align="center">{subscriber.userName}</TableCell>
                                    <TableCell align="center">{subscriber.roleName}</TableCell>
                                    <TableCell align="center">
                                        {subscriber.recodStatus == 1 ? (
                                            <Chip color="success" label="Active" />
                                        ) : (
                                            <Chip color="warning" label="Inactive" />
                                        )}
                                    </TableCell>
                                    <TableCell align="center">
                                        <Link to="/employees/editEmployee" state={subscriber}>
                                            <IconButton>
                                                <Icon color="success">edit</Icon>
                                            </IconButton>
                                        </Link>
                                    </TableCell>
                                </TableRow>


                            ))}
                        </TableBody>
                    </StyledTable>
                </Box>
            </Box>
        </Container >
    );
};

export default ManageAllEmployee;
