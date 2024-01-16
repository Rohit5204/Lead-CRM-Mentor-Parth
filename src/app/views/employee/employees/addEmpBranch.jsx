import { styled } from '@mui/system';
import { Breadcrumb, SimpleCard } from 'app/components';
import { Form, Row, Col, Button, InputGroup } from 'react-bootstrap';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import {
    Box,
    Icon,
    IconButton,
    MenuItem,
    Select,
    Autocomplete,
    FormControl,
    TextField,
} from '@mui/material';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from 'app/utils/constant';

const AddEmpBranch = () => {
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
    const [userName, setuserName] = useState('');


    const items = localStorage.getItem('accessToken');
    const roleCode = localStorage.getItem('roleCode');
    const userId = localStorage.getItem('userId');
    const headers = {
        "x-access-token": items,
        "roleCode": roleCode,
        "userId": userId
    }

    const [myOptions3, setMyOptions3] = useState(null);


    const [userData, setUserData] = useState([]);
    const [id3, setId3] = useState([]);

    const [userTLData, setUserTLData] = useState([]);
    const [id4, setId4] = useState([]);
    const [myOptions6, setMyOptions6] = useState(null);



    useEffect(() => {
        axios.get(BASE_URL + `/api/getMasterData?masterName=usermaster`,
            { headers: headers }).then((res) => {
                for (var i = 0; i < res.data.status.length; i++) {
                    if (res.data.status[i].roleId == 2) {
                        setUserData(current => [...current, res.data.status[i].firstName + " "
                            + res.data.status[i].lastName]);
                        setId3(current => [...current, res.data.status[i].userId, res.data.status[i].firstName
                            + " " + res.data.status[i].lastName])
                    }
                }
            });
        axios.get(BASE_URL + `/api/getMasterData?masterName=usermaster`,
            { headers: headers }).then((res) => {
                for (var i = 0; i < res.data.status.length; i++) {
                    if (res.data.status[i].roleId == 3) {
                        setUserTLData(current => [...current, res.data.status[i].firstName + " "
                            + res.data.status[i].lastName]);
                        setId4(current => [...current, res.data.status[i].userId, res.data.status[i].firstName
                            + " " + res.data.status[i].lastName])
                    }
                }
            });
    }, []);
    const branchName = window.localStorage.getItem('branchName');
    const branchId = window.localStorage.getItem('branchId');
    const managerName = window.localStorage.getItem('userName');
    const managerId = window.localStorage.getItem('userId');
    //Add data in the table
    const postData = async () => {
        var teamLeaderId
        for (var i = 0; i < id4.length; i++) {
            if (myOptions6 == id4[i]) {
                teamLeaderId = id4[i - 1]
            }
        }
        const AddUser = {
            id: 0,
            firstName: firstName,
            lastName: lastName,
            email: email,
            createdBy: 1,
            lastActive: "",
            userRoleId: myOptions3,
            addedBy: 1,
            password: password,
            mobileNo: mobileNo,
            alternateMobileNo: alternateMobileNo,
            userName: userName,
            recodStatus: 1,
            branchId: branchId,
            tlId: teamLeaderId,
            branchManagerId: managerId
        }
        console.log({ AddUser })
        await axios.post(BASE_URL + '/api/userMasterUpsert', AddUser,
            { headers: headers }).then((res) => {
                alert(res.data.message)
            }).catch(error => {
                alert(error.response.data.message)
            });
        changePage()
    };

    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        postData();
        // changePage();
        // alert('Catalogue Successfully Created');
    };
    const [validated, setValidated] = useState(false);
    const handleSubmit1 = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
            // alert("Please Provide appropriate Data")
        }
        else if (form.checkValidity() != false) {
            postData();
            changePage();
        }
        setValidated(true);
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
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
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
                                    /><Form.Control.Feedback type="invalid">
                                        First Name is Required
                                    </Form.Control.Feedback>
                                </Col>
                                <Col md="6">
                                    <Form.Label>Last Name</Form.Label>
                                    <Form.Control
                                        required
                                        onChange={(e) => setlastName(e.target.value)}
                                        value={lastName}
                                        placeholder="Enter the Last Name"
                                    /><Form.Control.Feedback type="invalid">
                                        Last Name is Required
                                    </Form.Control.Feedback>
                                </Col>
                            </Row>
                            <Row>
                                <Col md="6">
                                    <Form.Label>Mobile Number</Form.Label>
                                    <InputGroup>
                                        <InputGroup.Text id="basic-addon1">
                                            <Icon>phone</Icon>
                                        </InputGroup.Text>
                                        <Form.Control
                                            required
                                            onChange={(e) => setmobileNo(e.target.value)}
                                            value={mobileNo}
                                            placeholder="Enter the Mobile Number"
                                        /><Form.Control.Feedback type="invalid">
                                            Mobile Number is Required
                                        </Form.Control.Feedback></InputGroup>
                                </Col>
                                <Col md="6">
                                    <Form.Label>Alternate Mobile</Form.Label>
                                    <InputGroup>
                                        <InputGroup.Text id="basic-addon1">
                                            <Icon>phone</Icon>
                                        </InputGroup.Text>
                                        <Form.Control
                                            onChange={(e) => setalternateMobileNo(e.target.value)}
                                            value={alternateMobileNo}
                                            placeholder="Enter the Alternate Number"
                                        /></InputGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col md="6">
                                    <Form.Label>Email</Form.Label>
                                    <InputGroup>
                                        <InputGroup.Text id="basic-addon1">
                                            <Icon>email</Icon>
                                        </InputGroup.Text>
                                        <Form.Control
                                            required
                                            type='email'
                                            onChange={(e) => setemail(e.target.value)}
                                            value={email}
                                            placeholder="Enter the personal Email Id"
                                        /><Form.Control.Feedback type="invalid">
                                            Email is Required
                                        </Form.Control.Feedback>
                                    </InputGroup>
                                </Col>
                                <Col md="6">
                                    <Form.Label>Branch Name</Form.Label>
                                    <Form.Control
                                        disabled
                                        required
                                        value={branchName}
                                        placeholder="Enter the Branch Name"
                                    />
                                </Col>
                                <Col md="6">
                                    <Form.Label>Branch Manager</Form.Label>
                                    <Form.Control
                                        disabled
                                        required
                                        value={managerName}
                                        placeholder="Enter the Branch Manager"
                                    />
                                </Col>
                                <Col xs={6}>
                                    <FormControl sx={{ m: 0, width: '100%' }} size="small" >
                                        <InputGroup>
                                            <Form.Label>Role</Form.Label>
                                        </InputGroup>
                                        <Select
                                            required
                                            value={myOptions3}
                                            label="r"
                                            onChange={(e) => setMyOptions3(e.target.value)}
                                        >
                                            <MenuItem value={3}>Team Lead</MenuItem>
                                            <MenuItem value={4}>Employee</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Col>


                            </Row>
                            {(function () {
                                if (myOptions3 == 4) {
                                    return <>
                                        <Row>
                                            <Col md="6">
                                                <InputGroup>
                                                    <Form.Label>Team Leader</Form.Label>
                                                </InputGroup>
                                                <Autocomplete
                                                    freeSolo
                                                    autoComplete
                                                    autoHighlight
                                                    options={userTLData}
                                                    value={myOptions6}
                                                    onChange={(e) => setMyOptions6(e.currentTarget.innerHTML)}
                                                    renderInput={(params) => (
                                                        <TextField
                                                            {...params}

                                                            variant="outlined"
                                                            label="Select the Team Leader"
                                                            size="small"
                                                        />
                                                    )}
                                                />
                                            </Col>
                                        </Row>
                                    </>;
                                }
                                else {
                                    return <>
                                    </>
                                }
                            })()}
                            <br />
                            <h6 style={{ color: 'red' }}>User Credential's </h6>
                            <Row>
                                <Col>
                                    <Form.Label>User Name </Form.Label>
                                    <InputGroup>
                                        <InputGroup.Text id="basic-addon1">
                                            <Icon>person</Icon>
                                        </InputGroup.Text>
                                        <Form.Control
                                            required
                                            onChange={(e) => setuserName(e.target.value)}
                                            value={userName}
                                            placeholder="Enter the User Name"
                                        /><Form.Control.Feedback type="invalid">
                                            Username is Required
                                        </Form.Control.Feedback>
                                    </InputGroup>
                                </Col>
                                <Col>

                                    <FormControl sx={{ width: "100%" }} variant="outlined" >
                                        <Form.Label>Password </Form.Label>
                                        <OutlinedInput
                                            size="small"
                                            id="outlined-adornment-password"
                                            onChange={(e) => setpassword(e.target.value)}
                                            value={password}
                                            type={showPassword ? 'text' : 'password'}
                                            endAdornment={
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        aria-label="toggle password visibility"
                                                        onClick={handleClickShowPassword}
                                                        onMouseDown={handleMouseDownPassword}
                                                        edge="end"
                                                    >
                                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                                    </IconButton>
                                                </InputAdornment>
                                            }
                                            label="h"
                                        /><Form.Control.Feedback type="invalid">
                                            Password is Required
                                        </Form.Control.Feedback>
                                    </FormControl>

                                </Col>
                            </Row>
                        </SimpleCard>
                    </Col>
                </Row>
                <br />
                <Row>
                    <Col className="d-flex justify-content-center">
                        <Button variant="secondary" onClick={changePage}>
                            Cancel
                        </Button>
                        &nbsp;
                        <button type="submit" className="btn btn-success">
                            Save
                        </button>
                    </Col>
                </Row>

            </Form>
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
export default AddEmpBranch;
