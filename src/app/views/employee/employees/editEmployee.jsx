import { styled } from '@mui/system';
import { Breadcrumb, SimpleCard } from 'app/components';
import { Form, Row, Col, Button, InputGroup } from 'react-bootstrap';
import { Box, Icon, FormControl, Select, MenuItem, Autocomplete, TextField } from '@mui/material';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { BASE_URL } from 'app/utils/constant';

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

    const [showForm, setShowForm] = useState(false);
    const [showForm1, setShowForm1] = useState(false);
    const [showForm2, setShowForm2] = useState(false);
    const [roleTo, setRoleTo] = useState([]);
    const [officeTo, setOfficeTo] = useState([]);
    const [id1, setId1] = useState([]);
    const [id2, setId2] = useState([]);
    const [myOptions3, setMyOptions3] = useState(location.state.roleName);
    const [myOptions4, setMyOptions4] = useState(location.state.branchName);

    const [userData, setUserData] = useState([]);
    const [id3, setId3] = useState([]);
    const [myOptions5, setMyOptions5] = useState(location.state.bmName);

    const [userTLData, setUserTLData] = useState([]);
    const [id4, setId4] = useState([]);
    const [myOptions6, setMyOptions6] = useState(location.state.tlName);

    const items = localStorage.getItem('accessToken');
    const roleCode = localStorage.getItem('roleCode');
    const userId = localStorage.getItem('userId');
    const headers = {
        "x-access-token": items,
        "roleCode": roleCode,
        "userId": userId
    }

    useEffect(() => {
        axios.get(BASE_URL + `/api/getMasterData?masterName=rolemaster`,
            { headers: headers }).then((res) => {
                for (var i = 0; i < res.data.status.length; i++) {
                    setRoleTo(current => [...current, res.data.status[i].roleName]);
                    setId1(current => [...current, res.data.status[i].id, res.data.status[i].roleName])
                }
            });
        axios.get(BASE_URL + `/api/getMasterData?masterName=branchmaster`,
            { headers: headers }).then((res) => {
                for (var i = 0; i < res.data.status.length; i++) {
                    setOfficeTo(current => [...current, res.data.status[i].branchName]);
                    setId2(current => [...current, res.data.status[i].branchId, res.data.status[i].branchName])
                }
            });
    }, []);

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
    //Update data in the table
    const UpdateData = () => {
        console.log({ UpdateUser })
        axios.post(BASE_URL + '/api/userMasterUpsert', UpdateUser, { headers: headers });
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
                                        disabled
                                        onChange={(e) => setemail(e.target.value)}
                                        value={email}
                                        placeholder="Enter the personal Email Id"
                                    />
                                </InputGroup>
                            </Col>
                            <Col md="6">
                                <InputGroup>
                                    <Form.Label>Role</Form.Label>
                                </InputGroup>
                                <Autocomplete
                                    disabled
                                    freeSolo
                                    autoComplete
                                    autoHighlight
                                    options={roleTo}
                                    value={myOptions3}
                                    onChange={(e) => {
                                        setMyOptions3(e.currentTarget.innerHTML);
                                        if (e.currentTarget.innerHTML == "Branch Manager") {
                                            setShowForm(true);
                                            setShowForm1(false);
                                            setShowForm2(false);
                                        }
                                        else if (e.currentTarget.innerHTML == "Team Lead") {
                                            setShowForm(false);
                                            setShowForm1(true);
                                            setShowForm2(false);
                                        }
                                        else if (e.currentTarget.innerHTML == "Employee") {
                                            setShowForm(false);
                                            setShowForm1(false);
                                            setShowForm2(true);
                                        }
                                        else {
                                            setShowForm(false);
                                            setShowForm1(false);
                                            setShowForm2(false);
                                        }
                                    }}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}

                                            variant="outlined"
                                            label="Select the Calalogue Duration"
                                            size="small"
                                        />
                                    )}
                                />

                            </Col>
                        </Row>
                        {
                            showForm ? (
                                <Row>
                                    <Col md="6">
                                        <InputGroup>
                                            <Form.Label>Branch</Form.Label>
                                        </InputGroup>
                                        <Autocomplete
                                            freeSolo
                                            autoComplete
                                            autoHighlight
                                            options={officeTo}
                                            value={myOptions4}
                                            onChange={(e) => setMyOptions4(e.currentTarget.innerHTML)}
                                            renderInput={(params) => (
                                                <TextField
                                                    {...params}

                                                    variant="outlined"
                                                    label="Select the Branch Name"
                                                    size="small"
                                                />
                                            )}
                                        />
                                    </Col>
                                </Row>

                            ) : (
                                ""
                            )
                        }
                        {
                            showForm1 ? (
                                <Row>
                                    <Col md="6">
                                        <InputGroup>
                                            <Form.Label>Branch</Form.Label>
                                        </InputGroup>
                                        <Autocomplete
                                            freeSolo
                                            autoComplete
                                            autoHighlight
                                            options={officeTo}
                                            value={myOptions4}
                                            onChange={(e) => setMyOptions4(e.currentTarget.innerHTML)}
                                            renderInput={(params) => (
                                                <TextField
                                                    {...params}

                                                    variant="outlined"
                                                    label="Select the Branch Name"
                                                    size="small"
                                                />
                                            )}
                                        />
                                    </Col>
                                    <Col md="6">
                                        <InputGroup>
                                            <Form.Label>Branch Manager</Form.Label>
                                        </InputGroup>
                                        <Autocomplete
                                            freeSolo
                                            autoComplete
                                            autoHighlight
                                            options={userData}
                                            value={myOptions5}
                                            onChange={(e) => setMyOptions5(e.currentTarget.innerHTML)}
                                            renderInput={(params) => (
                                                <TextField
                                                    {...params}

                                                    variant="outlined"
                                                    label="Select the Branch Manager"
                                                    size="small"
                                                />
                                            )}
                                        />
                                    </Col>
                                </Row>
                            ) : (
                                ""
                            )
                        }
                        {
                            showForm2 ? (
                                <>
                                    <Row>
                                        <Col md="6">
                                            <InputGroup>
                                                <Form.Label>Branch</Form.Label>
                                            </InputGroup>
                                            <Autocomplete
                                                freeSolo
                                                autoComplete
                                                autoHighlight
                                                options={officeTo}
                                                value={myOptions4}
                                                onChange={(e) => setMyOptions4(e.currentTarget.innerHTML)}
                                                renderInput={(params) => (
                                                    <TextField
                                                        {...params}

                                                        variant="outlined"
                                                        label="Select the Branch Name"
                                                        size="small"
                                                    />
                                                )}
                                            />
                                        </Col>
                                        <Col md="6">
                                            <InputGroup>
                                                <Form.Label>Branch Manager</Form.Label>
                                            </InputGroup>
                                            <Autocomplete
                                                freeSolo
                                                autoComplete
                                                autoHighlight
                                                options={userData}
                                                value={myOptions5}
                                                onChange={(e) => setMyOptions5(e.currentTarget.innerHTML)}
                                                renderInput={(params) => (
                                                    <TextField
                                                        {...params}

                                                        variant="outlined"
                                                        label="Select the Branch Manager"
                                                        size="small"
                                                    />
                                                )}
                                            />
                                        </Col>
                                    </Row>
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
                                </>
                            ) : (
                                ""
                            )
                        }
                        <h6 style={{ color: 'red' }}>User Credential's </h6>
                        <Row>
                            <Col>
                                <Form.Label>User Name </Form.Label>
                                <InputGroup className="mb-3">
                                    <InputGroup.Text id="basic-addon1">
                                        <Icon>person</Icon>
                                    </InputGroup.Text>
                                    <Form.Control
                                        disabled
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
                            <Col md="6">
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
            <br />
            <Row>
                <Col className="d-flex justify-content-center">
                    <Button variant="secondary" onClick={changePage}>
                        Cancel
                    </Button>
                    &nbsp;
                    <button type="button" className="btn btn-success" onClick={handleSubmit}>
                        Update
                    </button>
                </Col>
            </Row>

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
