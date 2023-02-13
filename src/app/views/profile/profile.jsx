import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Breadcrumb } from 'app/components';
import { styled } from '@mui/system';
import { Tab, Tabs } from 'react-bootstrap';
import { Box, Table, TableBody, TableCell, TableHead, TableRow, Icon, IconButton } from '@mui/material';
import '../profile/style.css';
import { useLocation, useNavigate } from 'react-router-dom';

import { Card, Form, Container, Modal, Row, Col } from "react-bootstrap";
import EditPlatformAccount from './bankAccount';

const StyledTable = styled(Table)(() => ({
    whiteSpace: 'pre',
    '& thead': {
        '& tr': { '& th': { paddingLeft: 0, paddingRight: 0 } },
    },
    '& tbody': {
        '& tr': { '& td': { paddingLeft: 0 } },
    },
}));
function ManageProfile() {
    const location = useLocation();
    // console.log(location.state);
    const [companyUPI, setCompanyUPI] = useState([]);

    const [id, setId] = useState(location.state.id);
    const [name, setName] = useState(location.state.name);
    const [contactNo, setcontactNo] = useState(location.state.contactNo);
    const [email, setEmail] = useState(location.state.email);
    const [companyAddress, setCompanyAddress] = useState(location.state.address);
    const [gstNo, setGstNo] = useState(location.state.gstNo);
    const [pincode, setPincode] = useState(location.state.pincode);
    const [stateName, setStateName] = useState(location.state.stateName);
    const [bankName, setBankName] = useState(location.state.bankName);
    const [accountNo, setAccountNo] = useState(location.state.accountNo);
    const [ifsc, setIfsc] = useState(location.state.ifsc);

    const items = localStorage.getItem('accessToken');
    const roleCode = localStorage.getItem('roleCode');
    const userId = localStorage.getItem('userId');
    const headers = {
        "x-access-token": items,
        "roleCode": roleCode,
        "userId": userId
    }

    const [obj1, setObj1] = useState(null);
    const [show, setShow] = useState(false);
    //Dialog Form
    const handleClose = () => setShow(false);
    const handleShow = (catalogue) => {
        setObj1(catalogue);
        setShow(true);
    };
    const [logo, setLogo] = useState('/assets/images/illustrations/boostock-info-04.svg')
    const onImageChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            setLogo(URL.createObjectURL(event.target.files[0]));
        }
    }
    const getAccountsData = () => {
        axios.post(`http://43.204.38.243:3001/api/getCompanyMaster`, { id: 1 },
            { headers: headers })
            .then((response) => {
                for (var i = 0; i < response.data.data.length; i++) {
                    setCompanyUPI(response.data.data[i].accounts);
                }
            });
    }
    const userCard = {
        id: id,
        logo: "company.png",
        contactNo: contactNo,
        companyAddress: companyAddress,
        email: email,
        gstNo: gstNo,
        stateName: stateName,
        pincode: pincode,
        paymentTransferType: "bankTransfer",
        bankName: bankName,
        accountNo: accountNo,
        ifsc: ifsc,
        recordStatus: 1,
        createdBy: 1
    }
    const postData = () => {
        axios.post('http://43.204.38.243:3001/api/updateCompanyMaster', userCard,
            { headers: headers }
        );
    };
    useEffect(() => {
        getAccountsData();
    }, []);
    const navigate = useNavigate();
    const changePage = () => {
        navigate('/manageProfile');
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        postData();
        changePage();
    };

    // const submitForm = form => {
    //     form.preventDefault();
    //     const formData = new FormData();
    //     formData.append("image", mydata.file);
    //     // for (var pair of formData.entries()) {
    //     //   console.log(pair[1]);
    //     // }
    //     const config = {
    //       headers: {
    //         "content-type": "multipart/form-data"
    //       }
    //     };
    //     axios
    //       .post("api/profile/upload", formData, config)
    //       .then(response => {
    //         alert("The file is successfully uploaded");
    //       })
    //       .catch(error => {});
    //   };

    return (
        <>
            <Container fluid className="mt-4 mb-5">
                <Box className="breadcrumb">
                    <Breadcrumb
                        routeSegments={[
                            { name: 'Manage Organization', path: '/manageProfile' },
                            { name: 'Profile Page' },
                        ]}
                    />
                </Box>
                <Card>
                    <Card.Body>
                        <h6>Company Profile Details</h6>
                        <Row>
                            <Col md="3">
                                <div className="text-center">
                                    <img src={logo} sizes="20px" width="200" alt="preview image" className="avatar img-circle img-thumbnail" />

                                    <button type="button" className="btn-warning" onChange={onImageChange}>
                                        Change Logo
                                        <input type="file" accept="image/*" name="image-upload" id="input" />
                                    </button>
                                </div>
                            </Col>
                            <Col>
                                <Box>
                                    <Tabs
                                        defaultActiveKey="home"
                                        id="fill-tab-example"
                                        className="mb-3"
                                        fill
                                    >
                                        <Tab eventKey="home" title="Company Details">
                                            <form className="form" action="##" method="post" id="registrationForm">
                                                <Row className='mt-1'>
                                                    <Col>
                                                        <Form.Group>
                                                            <label>Company Name</label>
                                                            <Form.Control

                                                                value={name}
                                                                onChange={(e) => setName(e.target.value)}
                                                                placeholder="Company Name"

                                                            ></Form.Control>
                                                        </Form.Group>
                                                    </Col>
                                                </Row>
                                                <Row className='mt-1'> <Col>
                                                    <Form.Group>
                                                        <label>Email</label>
                                                        <Form.Control
                                                            value={email}
                                                            onChange={(e) => setEmail(e.target.value)}
                                                            placeholder="Company Registered Email"
                                                            type="text"
                                                        ></Form.Control>
                                                    </Form.Group>
                                                </Col>
                                                    <Col >
                                                        <Form.Group>
                                                            <label>Contact No</label>
                                                            <Form.Control
                                                                value={contactNo}
                                                                onChange={(e) => setcontactNo(e.target.value)}
                                                                placeholder="Company Contact Number"

                                                            ></Form.Control>
                                                        </Form.Group>
                                                    </Col>
                                                </Row>
                                                <Row className='mt-1'>
                                                    <Col md="12">
                                                        <Form.Group>
                                                            <label>Address</label>
                                                            <Form.Control
                                                                value={companyAddress}
                                                                onChange={(e) => setCompanyAddress(e.target.value)}
                                                                placeholder="Home Address"
                                                                type="text"
                                                            ></Form.Control>
                                                        </Form.Group>
                                                    </Col>
                                                </Row>
                                                <Row className='mt-1'>
                                                    <Col md="4">
                                                        <Form.Group>
                                                            <label>City</label>
                                                            <Form.Control
                                                                defaultValue="Mumbai"
                                                                placeholder="City"
                                                                type="text"
                                                            ></Form.Control>
                                                        </Form.Group>
                                                    </Col>
                                                    <Col md="4">
                                                        <Form.Group>
                                                            <label>State</label>
                                                            <Form.Control
                                                                value={stateName}
                                                                onChange={(e) => setStateName(e.target.value)}
                                                                placeholder="Enter the State Name"
                                                            ></Form.Control>
                                                        </Form.Group>
                                                    </Col>
                                                    <Col md="4">
                                                        <Form.Group>
                                                            <label>Country</label>
                                                            <Form.Control
                                                                defaultValue="India"
                                                                placeholder="Country"
                                                                type="text"
                                                            ></Form.Control>
                                                        </Form.Group>
                                                    </Col>
                                                </Row>
                                                <Row className='mt-1'>
                                                    <Col md="4">
                                                        <Form.Group>
                                                            <label>Postal Code</label>
                                                            <Form.Control
                                                                value={pincode}
                                                                onChange={(e) => setPincode(e.target.value)}
                                                                placeholder="522225"
                                                                type="number"
                                                            ></Form.Control>
                                                        </Form.Group>
                                                    </Col>
                                                    <Col md="4">
                                                        <Form.Group>
                                                            <label>GST No</label>
                                                            <Form.Control
                                                                value={gstNo}
                                                                onChange={(e) => setGstNo(e.target.value)}
                                                                placeholder="Country"
                                                                type="text"
                                                            ></Form.Control>
                                                        </Form.Group>
                                                    </Col>
                                                </Row>
                                                <div style={{ marginLeft: "320px", marginTop: "10px" }}>
                                                    <button className="btn btn" type="button" onClick={changePage}>
                                                        Back
                                                    </button>&nbsp;
                                                    <button className="btn btn-success" type="submit" onClick={handleSubmit}>
                                                        Update
                                                    </button>
                                                </div>
                                            </form>
                                        </Tab>
                                        <Tab eventKey="profile" title="Bank Details">
                                            <h6>Company Bank Details</h6>
                                            <Row className='mt-1'>
                                                <Col>
                                                    <Form.Group>
                                                        <label>Account Holder Name</label>
                                                        <Form.Control
                                                            defaultValue="Lead CRM Tracker"
                                                            placeholder="Company"
                                                            type="text"
                                                        ></Form.Control>
                                                    </Form.Group>
                                                </Col>

                                            </Row>
                                            <Row className='mt-1'>
                                                <Col>
                                                    <Form.Group>
                                                        <label>Bank Name</label>
                                                        <Form.Control
                                                            value={bankName}
                                                            onChange={(e) => setBankName(e.target.value)}
                                                            placeholder="Company"
                                                            type="text"
                                                        ></Form.Control>
                                                    </Form.Group>
                                                </Col>
                                                <Col>
                                                    <Form.Group>
                                                        <label>Account Type</label>
                                                        <Form.Control
                                                            defaultValue="Current"
                                                            placeholder="Company"
                                                            type="text"
                                                        ></Form.Control>
                                                    </Form.Group>
                                                </Col>
                                            </Row>
                                            <Row className='mt-1'>
                                                <Col>
                                                    <Form.Group>
                                                        <label>Account No</label>
                                                        <Form.Control
                                                            value={accountNo}
                                                            onChange={(e) => setAccountNo(e.target.value)}
                                                            placeholder="Company Registered Email"
                                                            type="text"
                                                        ></Form.Control>
                                                    </Form.Group>
                                                </Col>
                                                <Col >
                                                    <Form.Group>
                                                        <label>IFSC Code</label>
                                                        <Form.Control
                                                            value={ifsc}
                                                            onChange={(e) => setIfsc(e.target.value)}
                                                            placeholder="Company Contact Number"
                                                            type="text"
                                                        ></Form.Control>
                                                    </Form.Group>
                                                </Col>
                                            </Row>
                                            <Row className='mt-1'>
                                                <Col>
                                                    <Form.Group>
                                                        <label>Branch Name</label>
                                                        <Form.Control
                                                            defaultValue="Vashi"
                                                            placeholder="Company Contact Number"
                                                            type="text"
                                                        ></Form.Control>
                                                    </Form.Group>
                                                </Col>
                                            </Row>
                                            <div style={{ marginLeft: "320px", marginTop: "10px" }}>
                                                <button className="btn btn-success" type="submit" onClick={handleSubmit} >
                                                    Update
                                                </button>
                                            </div>
                                        </Tab>
                                        <Tab eventKey="longer-tab" title="UPI ID">

                                            <h6>Online Transaction</h6>
                                            <StyledTable className="table table-striped table-bordered" style={{ 'borderRadius': '2px' }}>
                                                <TableHead style={{ borderLeft: '1px solid red', borderRight: '1px solid red' }} className='text-center'>

                                                    <TableRow>
                                                        <TableCell align="center">Sr No</TableCell>
                                                        <TableCell align="center">Platform Name</TableCell>
                                                        <TableCell align="center">UPI ID</TableCell>
                                                        <TableCell align="center">Action</TableCell>
                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                    {companyUPI.map((quotation, index) => {
                                                        return (
                                                            <TableRow key={index}>
                                                                <TableCell align="center">{quotation.id}</TableCell>
                                                                {/* <TableCell align="justify">{quotation.createdDate}</TableCell> */}
                                                                <TableCell align="center">{quotation.platformName}</TableCell>
                                                                <TableCell align="center">{quotation.upiId}</TableCell>
                                                                <TableCell align="center">
                                                                    <IconButton onClick={() => handleShow(quotation)}>
                                                                        <Icon color="success" >edit</Icon>
                                                                    </IconButton>
                                                                </TableCell>
                                                            </TableRow>
                                                        );
                                                    })}
                                                </TableBody>
                                            </StyledTable>
                                        </Tab>
                                    </Tabs>
                                </Box>
                            </Col>
                        </Row>
                        {/* <div class="container bootstrap snippet">
                            
                            <div class="row">

                                <div class="col-sm-3">


                                    <div class="text-center">
                                        <img src="/assets/images/payment-card/boostock-logo.jpg" class="avatar img-circle img-thumbnail" alt="avatar" />
                                        <h6>Upload a different photo...</h6>
                                        <input type="file" class="text-center center-block file-upload" />
                                    </div>
                                    <hr /><br />


                                    <div class="panel panel-default">
                                <div class="panel-heading">Website <i class="fa fa-link fa-1x"></i></div>
                                <div class="panel-body"><a href="http://www.boostock.in">boostock.in</a></div>
                            </div>

                                    
                            <ul class="list-group">
                                <li class="list-group-item text-muted">Activity <i class="fa fa-dashboard fa-1x"></i></li>
                                <li class="list-group-item text-right"><span class="pull-left"><strong>Shares</strong></span> 125</li>
                                <li class="list-group-item text-right"><span class="pull-left"><strong>Likes</strong></span> 13</li>
                                <li class="list-group-item text-right"><span class="pull-left"><strong>Posts</strong></span> 37</li>
                                <li class="list-group-item text-right"><span class="pull-left"><strong>Followers</strong></span> 78</li>
                            </ul>

                                    <div class="panel panel-default">
                                <div class="panel-heading">Social Media</div>
                                <div class="panel-body">
                                    <i class="fa fa-facebook fa-2x"></i> <i class="fa fa-github fa-2x"></i> <i class="fa fa-twitter fa-2x"></i> <i class="fa fa-pinterest fa-2x"></i> <i class="fa fa-google-plus fa-2x"></i>
                                </div>
                            </div>

                                </div>


                                <Box>
                                    <Tabs
                                        defaultActiveKey="home"
                                        id="fill-tab-example"
                                        className="mb-3"
                                        fill
                                    >
                                        <Tab eventKey="home" title="Company Details">
                                            <form class="form" action="##" method="post" id="registrationForm">
                                                <div class="form-group">

                                                    <div class="col-xs-6">
                                                        <Form.Group>
                                                            <label>Company Name</label>
                                                            <Form.Control
                                                                defaultValue="Boostock The Finance Advisory"
                                                                placeholder="Company"
                                                                type="text"
                                                            ></Form.Control>
                                                        </Form.Group>
                                                    </div>
                                                </div>
                                                <div class="form-group">
                                                    <Row> <Col>
                                                        <Form.Group>
                                                            <label>Email</label>
                                                            <Form.Control
                                                                defaultValue="Mike"
                                                                placeholder="Company Registered Email"
                                                                type="text"
                                                            ></Form.Control>
                                                        </Form.Group>
                                                    </Col>
                                                        <Col >
                                                            <Form.Group>
                                                                <label>Contact No</label>
                                                                <Form.Control
                                                                    defaultValue="Andrew"
                                                                    placeholder="Company Contact Number"
                                                                    type="text"
                                                                ></Form.Control>
                                                            </Form.Group>
                                                        </Col></Row>

                                                </div>

                                                <Row>
                                                    <Col md="12">
                                                        <Form.Group>
                                                            <label>Address</label>
                                                            <Form.Control
                                                                defaultValue="Bld Mihail Kogalniceanu, nr. 8 Bl 1, Sc 1, Ap 09"
                                                                placeholder="Home Address"
                                                                type="text"
                                                            ></Form.Control>
                                                        </Form.Group>
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col className="pr-1" md="4">
                                                        <Form.Group>
                                                            <label>City</label>
                                                            <Form.Control
                                                                defaultValue="Mike"
                                                                placeholder="City"
                                                                type="text"
                                                            ></Form.Control>
                                                        </Form.Group>
                                                    </Col>
                                                    <Col className="px-1" md="4">
                                                        <Form.Group>
                                                            <label>Country</label>
                                                            <Form.Control
                                                                defaultValue="India"
                                                                placeholder="Country"
                                                                type="text"
                                                            ></Form.Control>
                                                        </Form.Group>
                                                    </Col>
                                                    <Col className="pl-1" md="4">
                                                        <Form.Group>
                                                            <label>Postal Code</label>
                                                            <Form.Control
                                                                placeholder="ZIP Code"
                                                                type="number"
                                                            ></Form.Control>
                                                        </Form.Group>
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col className="pr-1" md="6">
                                                        <Form.Group>
                                                            <label>GST No</label>
                                                            <Form.Control
                                                                defaultValue="Andrew"
                                                                placeholder="Country"
                                                                type="text"
                                                            ></Form.Control>
                                                        </Form.Group>
                                                    </Col>

                                                </Row>

                                                <div class="form-group">
                                                    <div class="col-xs-12">
                                                        <br />
                                                        <button class="btn btn btn-success" type="submit">
                                                            <i class="glyphicon glyphicon-ok-sign"></i> Update
                                                        </button>

                                                    </div>
                                                </div>
                                            </form>
                                        </Tab>
                                        <Tab eventKey="profile" title="Bank Details">
                                            <form class="form" action="##" method="post" id="registrationForm">
                                                <div class="form-group">

                                                    <div class="col-xs-6">
                                                        <Form.Group>
                                                            <label>Company Name</label>
                                                            <Form.Control
                                                                defaultValue="Boostock The Finance Advisory"
                                                                placeholder="Company"
                                                                type="text"
                                                            ></Form.Control>
                                                        </Form.Group>
                                                    </div>
                                                </div>
                                                <div class="form-group">
                                                    <Row> <Col>
                                                        <Form.Group>
                                                            <label>Email</label>
                                                            <Form.Control
                                                                defaultValue="Mike"
                                                                placeholder="Company Registered Email"
                                                                type="text"
                                                            ></Form.Control>
                                                        </Form.Group>
                                                    </Col>
                                                        <Col >
                                                            <Form.Group>
                                                                <label>Contact No</label>
                                                                <Form.Control
                                                                    defaultValue="Andrew"
                                                                    placeholder="Company Contact Number"
                                                                    type="text"
                                                                ></Form.Control>
                                                            </Form.Group>
                                                        </Col></Row>

                                                </div>

                                                <Row>
                                                    <Col md="12">
                                                        <Form.Group>
                                                            <label>Address</label>
                                                            <Form.Control
                                                                defaultValue="Bld Mihail Kogalniceanu, nr. 8 Bl 1, Sc 1, Ap 09"
                                                                placeholder="Home Address"
                                                                type="text"
                                                            ></Form.Control>
                                                        </Form.Group>
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col className="pr-1" md="4">
                                                        <Form.Group>
                                                            <label>City</label>
                                                            <Form.Control
                                                                defaultValue="Mike"
                                                                placeholder="City"
                                                                type="text"
                                                            ></Form.Control>
                                                        </Form.Group>
                                                    </Col>
                                                    <Col className="px-1" md="4">
                                                        <Form.Group>
                                                            <label>Country</label>
                                                            <Form.Control
                                                                defaultValue="India"
                                                                placeholder="Country"
                                                                type="text"
                                                            ></Form.Control>
                                                        </Form.Group>
                                                    </Col>
                                                    <Col className="pl-1" md="4">
                                                        <Form.Group>
                                                            <label>Postal Code</label>
                                                            <Form.Control
                                                                placeholder="ZIP Code"
                                                                type="number"
                                                            ></Form.Control>
                                                        </Form.Group>
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col className="pr-1" md="6">
                                                        <Form.Group>
                                                            <label>GST No</label>
                                                            <Form.Control
                                                                defaultValue="Andrew"
                                                                placeholder="Country"
                                                                type="text"
                                                            ></Form.Control>
                                                        </Form.Group>
                                                    </Col>
                                                    <Col className="px-1" md="6">
                                                        <Form.Group>
                                                            <label>GST No</label>
                                                            <Form.Control
                                                                defaultValue="Andrew"
                                                                placeholder="Country"
                                                                type="text"
                                                            ></Form.Control>
                                                        </Form.Group>
                                                    </Col>
                                                </Row>

                                                <div class="form-group">
                                                    <div class="col-xs-12">
                                                        <br />
                                                        <button class="btn btn btn-success" type="submit"><i class="glyphicon glyphicon-ok-sign"></i> Save</button>&nbsp;
                                                        <button class="btn btn" type="reset"><i class="glyphicon glyphicon-repeat"></i> Reset</button>
                                                    </div>
                                                </div>
                                            </form>
                                        </Tab>
                                        <Tab eventKey="longer-tab" title="Other">
                                            <form class="form" action="##" method="post" id="registrationForm">
                                                <div class="form-group">

                                                    <div class="col-xs-6">
                                                        <Form.Group>
                                                            <label>Company Name</label>
                                                            <Form.Control
                                                                defaultValue="Boostock The Finance Advisory"
                                                                placeholder="Company"
                                                                type="text"
                                                            ></Form.Control>
                                                        </Form.Group>
                                                    </div>
                                                </div>
                                                <div class="form-group">
                                                    <Row> <Col>
                                                        <Form.Group>
                                                            <label>Email</label>
                                                            <Form.Control
                                                                defaultValue="Mike"
                                                                placeholder="Company Registered Email"
                                                                type="text"
                                                            ></Form.Control>
                                                        </Form.Group>
                                                    </Col>
                                                        <Col >
                                                            <Form.Group>
                                                                <label>Contact No</label>
                                                                <Form.Control
                                                                    defaultValue="Andrew"
                                                                    placeholder="Company Contact Number"
                                                                    type="text"
                                                                ></Form.Control>
                                                            </Form.Group>
                                                        </Col></Row>

                                                </div>

                                                <Row>
                                                    <Col md="12">
                                                        <Form.Group>
                                                            <label>Address</label>
                                                            <Form.Control
                                                                defaultValue="Bld Mihail Kogalniceanu, nr. 8 Bl 1, Sc 1, Ap 09"
                                                                placeholder="Home Address"
                                                                type="text"
                                                            ></Form.Control>
                                                        </Form.Group>
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col className="pr-1" md="4">
                                                        <Form.Group>
                                                            <label>City</label>
                                                            <Form.Control
                                                                defaultValue="Mike"
                                                                placeholder="City"
                                                                type="text"
                                                            ></Form.Control>
                                                        </Form.Group>
                                                    </Col>
                                                    <Col className="px-1" md="4">
                                                        <Form.Group>
                                                            <label>Country</label>
                                                            <Form.Control
                                                                defaultValue="India"
                                                                placeholder="Country"
                                                                type="text"
                                                            ></Form.Control>
                                                        </Form.Group>
                                                    </Col>
                                                    <Col className="pl-1" md="4">
                                                        <Form.Group>
                                                            <label>Postal Code</label>
                                                            <Form.Control
                                                                placeholder="ZIP Code"
                                                                type="number"
                                                            ></Form.Control>
                                                        </Form.Group>
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col className="pr-1" md="6">
                                                        <Form.Group>
                                                            <label>GST No</label>
                                                            <Form.Control
                                                                defaultValue="Andrew"
                                                                placeholder="Country"
                                                                type="text"
                                                            ></Form.Control>
                                                        </Form.Group>
                                                    </Col>
                                                    <Col className="px-1" md="6">
                                                        <Form.Group>
                                                            <label>GST No</label>
                                                            <Form.Control
                                                                defaultValue="Andrew"
                                                                placeholder="Country"
                                                                type="text"
                                                            ></Form.Control>
                                                        </Form.Group>
                                                    </Col>
                                                </Row>

                                                <div class="form-group">
                                                    <div class="col-xs-12">
                                                        <br />
                                                        <button class="btn btn btn-success" type="submit"><i class="glyphicon glyphicon-ok-sign"></i> Save</button>&nbsp;
                                                        <button class="btn btn" type="reset"><i class="glyphicon glyphicon-repeat"></i> Reset</button>
                                                    </div>
                                                </div>
                                            </form>
                                        </Tab>
                                    </Tabs>
                                </Box>
                            </div>
                        </div> */}
                    </Card.Body>
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
                            <h5>Update Online Platform Account</h5>
                        </Modal.Header>
                        <Modal.Body>
                            <EditPlatformAccount theEditPlatformAccount={obj1} handleDialog={handleClose}></EditPlatformAccount>
                        </Modal.Body>
                        <Modal.Footer>
                            <button
                                type="submit"
                                className="btn btn-error"
                                style={{ marginTop: 5 + 'px' }}
                                onClick={handleClose}
                            >
                                Cancel
                            </button>

                        </Modal.Footer>
                    </Modal>
                </Card>
            </Container >
        </>
    );
}

export default ManageProfile;