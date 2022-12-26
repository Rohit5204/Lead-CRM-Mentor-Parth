import { styled } from '@mui/system';
import { Breadcrumb, SimpleCard } from 'app/components';
import { Form, Row, Col, Button, InputGroup } from 'react-bootstrap';
import { Box, Icon, FormControl, Select, MenuItem } from '@mui/material';
import React, { useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

const EditEmployee = () => {
    const location = useLocation();
    // console.log(location.state);
    const navigate = useNavigate();
    const changePage = () => {
        navigate('/employees/manageEmployee');
    };
    const [id, setId] = useState(location.state.userId);
    const [firstName, setfirstName] = useState(location.state.firstName);
    const [lastName, setlastName] = useState(location.state.lastName);
    const [email, setemail] = useState(location.state.email);
    const [password, setpassword] = useState(location.state.password);
    const [mobileNo, setmobileNo] = useState(location.state.mobileNo);
    const [alternateMobileNo, setalternateMobileNo] = useState(location.state.alternateMobileNo);
    const [lastActive, setlastActive] = useState(location.state.lastActive);
    const [userName, setuserName] = useState(location.state.userName);
    const [userRoleId, setuserRoleId] = useState(location.state.roleId);
    const [recodStatus, setRecodStatus] = useState(location.state.recodStatus)

    const UpdateUser = {
        id: id,
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
        mobileNo: mobileNo,
        alternateMobileNo: alternateMobileNo,
        userName: userName,
        updatedBy: 1,
        lastActive: lastActive,
        userRoleId: userRoleId,
        addedBy: 0,
        recodStatus: recodStatus
    }
    const items = localStorage.getItem('accessToken');
    //Update data in the table
    const UpdateData = () => {
        console.log({ UpdateUser })
        axios.post('https://43.204.38.243:3000/api/userMasterUpsert', UpdateUser, { headers: { "x-access-token": items } });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        UpdateData();
        changePage();
    };
    return (
        <Container>
            <Box className="breadcrumb">
                <Breadcrumb
                    routeSegments={[
                        { name: 'Update Employee Detail', path: '/employees/manageEmployee' },
                        { name: 'Update Employee Page' },
                    ]}
                />
            </Box>
            <Row>
                <Col>
                    <SimpleCard title="Update Employee">
                        <Row>
                            <Col md="6">
                                <Form.Label>First Name</Form.Label>
                                <Form.Control
                                    required
                                    onChange={(e) => setfirstName(e.target.value)}
                                    value={firstName}
                                    placeholder="Enter the First Name"
                                />
                            </Col>
                            <Col md="6">
                                <Form.Label>Last Name</Form.Label>
                                <Form.Control
                                    required
                                    onChange={(e) => setlastName(e.target.value)}
                                    value={lastName}
                                    placeholder="Enter the Last Name"
                                />
                            </Col>
                        </Row>
                        <Row className='mt-2'>
                            <Col md="6">
                                <Form.Label>Mobile Number</Form.Label>
                                <InputGroup className="mb-3">
                                    <InputGroup.Text id="basic-addon1">
                                        <Icon>phone</Icon>
                                    </InputGroup.Text>
                                    <Form.Control

                                        required
                                        onChange={(e) => setmobileNo(e.target.value)}
                                        value={mobileNo}
                                        placeholder="Enter the Mobile Number"
                                    /></InputGroup>
                            </Col>
                            <Col md="6">
                                <Form.Label>Alternate Mobile</Form.Label>
                                <InputGroup className="mb-3">
                                    <InputGroup.Text id="basic-addon1">
                                        <Icon>phone</Icon>
                                    </InputGroup.Text>
                                    <Form.Control
                                        required
                                        onChange={(e) => setalternateMobileNo(e.target.value)}
                                        value={alternateMobileNo}
                                        placeholder="Enter the Alternate Number"
                                    /></InputGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Form.Label>Email</Form.Label>
                                <InputGroup className="mb-3">
                                    <InputGroup.Text id="basic-addon1">
                                        <Icon>email</Icon>
                                    </InputGroup.Text>
                                    <Form.Control
                                        required
                                        onChange={(e) => setemail(e.target.value)}
                                        value={email}
                                        placeholder="Enter the personal Email Id"
                                    />
                                </InputGroup>
                            </Col>
                            <Col>
                                <FormControl sx={{ m: 0, minWidth: 470 }} size="small" className="mt-1">
                                    <Form.Label>Role </Form.Label>
                                    <Select
                                        value={userRoleId}
                                        onChange={(e) => setuserRoleId(e.target.value)}
                                        label="Role">
                                        <MenuItem value={1}>ADMIN</MenuItem>
                                        <MenuItem value={2}>EMPLOYEE</MenuItem>
                                    </Select>
                                </FormControl>
                            </Col>
                        </Row>
                        <h6 style={{ color: 'red' }}>User Credential's </h6>
                        <Row>
                            <Col>
                                <Form.Label>User Name </Form.Label>
                                <InputGroup className="mb-3">
                                    <InputGroup.Text id="basic-addon1">
                                        <Icon>person</Icon>
                                    </InputGroup.Text>
                                    <Form.Control

                                        required
                                        onChange={(e) => setuserName(e.target.value)}
                                        value={userName}
                                        placeholder="Enter the User Name"
                                    />
                                </InputGroup>
                            </Col>
                            {/* <Col>
                                <Form.Label>Password </Form.Label>
                                <InputGroup className="mb-3">
                                    <InputGroup.Text id="basic-addon1">
                                        <Icon>password</Icon>
                                    </InputGroup.Text>
                                    <Form.Control
                                        disabled
                                        required
                                        type='password'
                                        onChange={(e) => setpassword(e.target.value)}
                                        value={password}
                                        placeholder="Enter the Password"
                                    /></InputGroup>
                            </Col> */}
                            <Col>
                                <FormControl sx={{ m: 0, minWidth: 470 }} size="small" className="mt-1">
                                    <Form.Label>Status </Form.Label>
                                    <Select
                                        value={recodStatus}
                                        onChange={(e) => setRecodStatus(e.target.value)}
                                        label="Status">
                                        <MenuItem value={0}>Inactive</MenuItem>
                                        <MenuItem value={1}>Active</MenuItem>
                                    </Select>
                                </FormControl>
                            </Col>

                        </Row>
                    </SimpleCard>
                </Col>
            </Row>
            <Div className="mt-2">
                <Row>
                    <Col>
                        <Button variant="secondary" onClick={changePage}>
                            Cancel
                        </Button>
                        &nbsp;
                        <button type="button" className="btn btn-success" onClick={handleSubmit}>
                            Update
                        </button>
                    </Col>
                </Row>
            </Div>
        </Container >
    );
};
// Custom Style Section
const Container = styled('div')(({ theme }) => ({
    margin: '30px',
    [theme.breakpoints.down('sm')]: { margin: '16px' },
    '& .breadcrumb': {
        marginBottom: '30px',
        [theme.breakpoints.down('sm')]: { marginBottom: '16px' },
    },
}));
const Div = styled('div')(() => ({
    margin: '0px 0px 0px 441px',
}));
export default EditEmployee;
