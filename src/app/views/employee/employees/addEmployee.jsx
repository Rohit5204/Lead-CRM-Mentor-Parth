import { styled } from '@mui/system';
import { Breadcrumb, SimpleCard } from 'app/components';
import { Form, Row, Col, Button, InputGroup } from 'react-bootstrap';
import {
    Box, Icon,
    IconButton,
} from '@mui/material';
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddEmployee = () => {
    const navigate = useNavigate();
    const changePage = () => {
        navigate('/employees/manageEmployee');
    };
    const [firstName, setfirstName] = useState('');
    const [lastName, setlastName] = useState('');
    const [email, setemail] = useState('');
    const [password, setpassword] = useState('');
    const [mobileNo, setmobileNo] = useState('');
    const [alternateMobileNo, setalternateMobileNo] = useState('');
    const [lastActive, setlastActive] = useState('');
    const [userName, setuserName] = useState('');
    const [userRoleId, setuserRoleId] = useState('');
    //empty the form Text
    // const blankForm = () => {
    //     setCatType('');
    //     setPrice('');
    //     setDescription('');
    // };
    const AddUser = {
        id: 0,
        firstName: firstName,
        lastName: lastName,
        email: email,
        createdBy: 1,
        lastActive: '2022-11-09',
        userRoleId: 0,
        addedBy: 0,
        password: password,
        mobileNo: mobileNo,
        alternateMobileNo: alternateMobileNo,
        userName: userName,
        recodStatus: 1
    }
    const items = localStorage.getItem('accessToken');
    //Add data in the table
    const postData = async () => {
        console.log({ AddUser })
        await axios.post('http://35.89.6.16:4002/api/userMasterUpsert', AddUser,
            { headers: { "x-access-token": items } });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        postData();
    };
    return (
        <Container>
            <Box className="breadcrumb">
                <Breadcrumb
                    routeSegments={[
                        { name: 'Manage Employee', path: '/employees/manageEmployee' },
                        { name: 'Add Employee Page' },
                    ]}
                />
            </Box>
            <Row>
                <Col>
                    <SimpleCard title="Fill Employee Detail's">
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
                        <Row>
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
                            <Col className="mt-1">
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
                            <Col className="mt-1">
                                <Form.Label>Role </Form.Label>
                                <Form.Control
                                    required
                                    onChange={(e) => setuserRoleId(e.target.value)}
                                    value={userRoleId}
                                    placeholder="Enter the Role Level"
                                />
                            </Col>
                        </Row>
                        <br />
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
                            <Col>
                                <Form.Label>Password </Form.Label>
                                <InputGroup className="mb-3">
                                    <InputGroup.Text id="basic-addon1">
                                        <Icon>password</Icon>
                                    </InputGroup.Text>
                                    <Form.Control
                                        required
                                        onChange={(e) => setpassword(e.target.value)}
                                        value={password}
                                        placeholder="Enter the Password"
                                    /></InputGroup>
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
                            Save
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
export default AddEmployee;
