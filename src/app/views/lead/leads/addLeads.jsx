import { styled } from '@mui/system';
import { Breadcrumb, SimpleCard } from 'app/components';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { Form, Row, Col, Button, InputGroup } from 'react-bootstrap';
import { Box, Autocomplete, TextField } from '@mui/material';
import { MenuItem, FormControl, Select, Icon } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Container = styled('div')(({ theme }) => ({
  margin: '30px',
  [theme.breakpoints.down('sm')]: { margin: '16px' },
  '& .breadcrumb': {
    marginBottom: '30px',
    [theme.breakpoints.down('sm')]: { marginBottom: '16px' },
  },
}));

const Div = styled('div')(({ theme }) => ({
  margin: '0px 0px 0px 441px',
}));

const LeadForm = () => {
  const navigate = useNavigate();
  const changePage = () => {
    navigate('/leads/manageLeads');
  };
  const [name, setName] = useState('');
  const [mobileNo, setMobileNo] = useState('');
  const [alternateMobile, setAlternateMobile] = useState('');
  const [clientName, setClientName] = useState('');
  const [emailId, setEmailId] = useState('');
  const [streetName, setStreetName] = useState('');
  const [stateName, setStateName] = useState('');
  const [cityName, setCityName] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [countryName, setCountryName] = useState('India');

  const [intrestedIn, setIntrestedIn] = useState([]);
  const [platformName, setPlatformName] = useState([]);
  const [labelName, setLabelName] = useState([]);
  const [status, setStatusName] = useState([]);
  const [assignTo, setAssignTo] = useState([]);

  const [myOptions1, setMyOptions1] = useState("");
  const [myOptions2, setMyOptions2] = useState("");
  const [myOptions3, setMyOptions3] = useState("");
  const [myOptions4, setMyOptions4] = useState("");
  const [myOptions5, setMyOptions5] = useState("");

  const [id1, setId1] = useState([]);
  const [id2, setId2] = useState([]);
  const [id3, setId3] = useState([]);
  const [sourceId, setSourceId] = useState([]);

  const getAllLeadData = () => {
    const items = localStorage.getItem('accessToken');
    axios.get(`http://213.136.72.177/cms/api/getMasterData?masterName=usermaster`, { headers: { "x-access-token": items } }).then((res) => {
      for (var i = 0; i < res.data.data.length; i++) {
        setAssignTo(current => [...current, res.data.data[i].firstName + " " + res.data.data[i].lastName]);
        setId1(current => [...current, res.data.data[i].userId, res.data.data[i].firstName + " " + res.data.data[i].lastName])
      }
    });
    axios.post(`http://213.136.72.177/cms/api/getCatalogue`, { catId: 0, }, { headers: { "x-access-token": items } }).then((res) => {
      for (var i = 0; i < res.data.data.length; i++) {
        setIntrestedIn(current => [...current, res.data.data[i].gsName]);
      }
    });
    axios.get(`http://213.136.72.177/cms/api/getMasterData?masterName=platformmaster`, { headers: { "x-access-token": items } }).then((res) => {
      for (var i = 0; i < res.data.data.length; i++) {
        setPlatformName(current => [...current, res.data.data[i].platformName]);
        setSourceId(current => [...current, res.data.data[i].id, res.data.data[i].platformName])
      }
    });
    axios.get(`http://213.136.72.177/cms/api/getMasterData?masterName=labelmaster`, { headers: { "x-access-token": items } }).then((res) => {
      for (var i = 0; i < res.data.data.length; i++) {
        setLabelName(current => [...current, res.data.data[i].name]);
        setId2(current => [...current, res.data.data[i].id, res.data.data[i].name])
      }
    });
    axios.get(`http://213.136.72.177/cms/api/getMasterData?masterName=statusmaster`, { headers: { "x-access-token": items } }).then((res) => {
      for (var i = 0; i < res.data.data.length; i++) {
        setStatusName(current => [...current, res.data.data[i].name]);
        setId3(current => [...current, res.data.data[i].id, res.data.data[i].name])
      }
    });
  }
  useEffect(() => {
    getAllLeadData()
  }, []);

  //empty the form Text
  const blankForm = () => {
    setName('');
    setMobileNo('');
    setEmailId('');
    setStreetName('');
    setStateName('');
    setCityName('');
    setZipCode('');
    setCountryName('');
    setMyOptions1('');
    setMyOptions2('');
    setMyOptions3('');
    setMyOptions4('')
    setMyOptions5('')
  };
  //Add data in the table
  const postData = () => {
    var assignedid, platformid, labelid, statusid;
    for (var i = 0; i < id1.length; i++) {
      if (myOptions3 == id1[i]) {
        assignedid = id1[i - 1]
      }
    }
    for (var i = 0; i < sourceId.length; i++) {
      if (myOptions2 == sourceId[i]) {
        platformid = sourceId[i - 1]
      }
    }
    for (var i = 0; i < id2.length; i++) {
      if (myOptions5 == id2[i]) {
        labelid = id2[i - 1]
      }
    }
    for (var i = 0; i < id3.length; i++) {
      if (myOptions4 == id3[i]) {
        statusid = id3[i - 1]
      }
    }
    const AddLead = {
      name: "Enquiry For" + " " + name,
      mobileNo: mobileNo,
      emailId: emailId,
      streetName: streetName,
      cityName: cityName,
      stateName: stateName,
      zipCode: zipCode,
      countryName: countryName,
      intrestedIn: myOptions1,
      platformName: myOptions2,
      sourceId: platformid,
      assignId: assignedid,
      status: statusid,
      label: labelid,
      remarks: "",
      createdBy: 1,
      alternateMobile: alternateMobile,
      clientName: clientName
    }
    console.log({ AddLead })
    const items = localStorage.getItem('accessToken');
    axios.post(`http://213.136.72.177/cms/api/saveLeadGenerationData`, [AddLead], { headers: { "x-access-token": items } });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    postData();
    blankForm();
    changePage();
    // alert('Lead Successfully Added');
  };
  return (
    <Container>
      <Box className="breadcrumb">
        <Breadcrumb
          routeSegments={[{ name: 'Manage Lead', path: '/leads/manageLeads' }, { name: 'Add Lead Page' }]}
        />
      </Box>
      <Row>
        <Col xs={12} md={6}>
          <SimpleCard title="Fill Lead Details">
            <Row>
              <Col>
                <InputGroup className="mb-2">
                  <h6 className="mt-1">Lead Name :&nbsp; </h6>
                  <InputGroup.Text id="basic-addon1">
                    <Icon>work</Icon>
                  </InputGroup.Text>
                  <Form.Control height={2} sx={{ m: 0, minWidth: 100 }}
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                    placeholder="Enter the Lead Name"
                  /></InputGroup>

              </Col>
            </Row>
            <Row>
              <Col>
                <InputGroup className="mb-2">
                  <h6 className="mt-1">Client&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  :&nbsp; </h6>
                  <InputGroup.Text id="basic-addon1">
                    <Icon>person</Icon>
                  </InputGroup.Text>
                  <Form.Control height={2} sx={{ m: 0, minWidth: 100 }}
                    onChange={(e) => setClientName(e.target.value)}
                    value={clientName}
                    placeholder="Enter the Client Name"
                  /></InputGroup>

              </Col>
            </Row>
            <Row>
              <Col>
                <InputGroup className="mb-2">
                  <h6 className="mt-1">Mobile 1&nbsp;&nbsp;&nbsp;  :&nbsp;</h6>
                  <InputGroup.Text id="basic-addon1">
                    <Icon>phone</Icon>
                  </InputGroup.Text>
                  <Form.Control
                    onChange={(e) => setMobileNo(e.target.value)}
                    value={mobileNo}
                    placeholder="Customer Mobile Number"
                  /></InputGroup>
              </Col>
            </Row>
            <Row>
              <Col>
                <InputGroup className="mb-2">
                  <h6 className="mt-1">Mobile 2&nbsp;&nbsp;&nbsp;  :&nbsp; </h6>
                  <InputGroup.Text id="basic-addon1">
                    <Icon>phone</Icon>
                  </InputGroup.Text>
                  <Form.Control height={2} sx={{ m: 0, minWidth: 100 }}
                    onChange={(e) => setAlternateMobile(e.target.value)}
                    value={alternateMobile}
                    placeholder="Customer Alternate Mobile Numbe"
                  /></InputGroup>
              </Col>
            </Row>
            <Row>
              <Col>
                <InputGroup className="mb-2">
                  <h6 className="mt-1">Email&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  :&nbsp;</h6>
                  <InputGroup.Text id="basic-addon1">
                    <Icon>email</Icon>
                  </InputGroup.Text>
                  <Form.Control
                    onChange={(e) => setEmailId(e.target.value)}
                    value={emailId}
                    placeholder="Customer Email"
                  /></InputGroup>
              </Col>
            </Row>
            <Row className="mt-1">
              <Col>
                <Form.Group className="mb-2" controlId="exampleForm.ControlTextarea1">

                  <InputGroup className="mb-2">
                    <h6 className="mt-1">Street&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;   :&nbsp;</h6>
                    <InputGroup.Text id="basic-addon1">
                      <Icon>house</Icon>
                    </InputGroup.Text>
                    <Form.Control
                      as="textarea"
                      rows={1}
                      onChange={(e) => setStreetName(e.target.value)}
                      value={streetName}
                      placeholder="Street"
                    /></InputGroup>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>

                {/* <Form.Label>City Name</Form.Label> */}
                <InputGroup className="mb-2">
                  <h6 className="mt-1">City&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;   :&nbsp;</h6>
                  <InputGroup.Text id="basic-addon1">
                    <Icon>village</Icon>
                  </InputGroup.Text>
                  <Form.Control
                    onChange={(e) => setCityName(e.target.value)}
                    value={cityName}
                    placeholder="Enter The City"
                  /></InputGroup>
              </Col>
            </Row>
            <Row>
              <Col>
                {/* <Form.Label>State Name</Form.Label> */}
                <InputGroup className="mb-2">
                  <h6 className="mt-1">State&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;   :&nbsp;</h6>
                  <InputGroup.Text id="basic-addon1">
                    <Icon>village</Icon>
                  </InputGroup.Text>
                  <Form.Control
                    onChange={(e) => setStateName(e.target.value)}
                    value={stateName}
                    placeholder="Enter Sate Name"
                  /></InputGroup>
              </Col>
            </Row>
            <Row>
              <Col>
                <InputGroup className="mb-2">
                  <h6 className="mt-1">Zip Code&nbsp;   :&nbsp;</h6>
                  <InputGroup.Text id="basic-addon1">
                    <Icon>subway</Icon>
                  </InputGroup.Text>
                  {/* <Form.Label>Pin Code</Form.Label> */}
                  <Form.Control
                    onChange={(e) => setZipCode(e.target.value)}
                    value={zipCode}
                    placeholder="Enter Zip Code"
                  /></InputGroup>
              </Col>
            </Row>
            <Row>
              <Col xs={6}>
                <FormControl sx={{ m: 0, minWidth: 750 }} size="small" className="mt-1">
                  {/* <Form.Label>Country</Form.Label> */}
                  <InputGroup className="mb-2">
                    <h6 className="mt-1">Country&nbsp;&nbsp;  :&nbsp;</h6>
                    <Select
                      value={countryName}
                      label="Country"
                      onChange={(e) => setCountryName(e.target.value)}
                    >
                      <MenuItem value="s">Select the Country</MenuItem>
                      <MenuItem value="India">INDIA</MenuItem>
                      <MenuItem value="USA">USA</MenuItem>
                      <MenuItem value="Russia">RUSSIA</MenuItem>
                      <MenuItem value="Australia">RUSSIA</MenuItem>
                    </Select></InputGroup>
                </FormControl>
              </Col>
            </Row>
          </SimpleCard>
        </Col>
        <br />
        <Col xs={12} md={6}>
          <SimpleCard>
            <Row>
              <Col>
                {/* <Form.Label>Interested In</Form.Label> */}
                <InputGroup>
                  <Form.Label className="mt-1">Interested In</Form.Label>
                </InputGroup>
                <FormControl>
                  <Autocomplete
                    style={{ width: 650 }}
                    freeSolo
                    autoComplete
                    autoHighlight
                    value={myOptions1}
                    options={intrestedIn}
                    onChange={(e) => setMyOptions1(e.currentTarget.innerHTML)}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        variant="outlined"
                        label="Select the Interested Catalogue"
                        size="small"
                      />
                    )}
                  />
                </FormControl>
              </Col>
            </Row>
            <Row>
              <Col className="mt-1">
                <Form.Label>Source(Platform Name)</Form.Label>
                <FormControl>
                  <Autocomplete
                    style={{ width: 450 }}
                    freeSolo
                    autoComplete
                    autoHighlight
                    value={myOptions2}
                    options={platformName}
                    onChange={(e) => setMyOptions2(e.currentTarget.innerHTML)}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        variant="outlined"
                        label="Select the Platform Name"
                        size="small"
                      />
                    )}
                  />
                </FormControl>
              </Col>
            </Row>
            <Row>
              <Col className="mt-1">
                <FormControl>
                  <Form.Label>Assigned To</Form.Label>
                  <Autocomplete
                    style={{ width: 450 }}
                    freeSolo
                    autoComplete
                    autoHighlight
                    options={assignTo}
                    value={myOptions3}
                    onChange={(e) => setMyOptions3(e.currentTarget.innerHTML)}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        variant="outlined"
                        label="Select the Employee to Assign"
                        size="small"
                      />
                    )}
                  />
                </FormControl>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                  <Form.Label>Comment</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={1}
                    // onChange={(e) => setRemarks(e.target.value)}
                    // value={remarks}
                    placeholder="Comment"
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Label>Status</Form.Label>
                <FormControl>
                  <Autocomplete
                    style={{ width: 450 }}
                    freeSolo
                    autoComplete
                    autoHighlight
                    value={myOptions4}
                    options={status}
                    onChange={(e) => setMyOptions4(e.currentTarget.innerHTML)}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        variant="outlined"
                        label="Select the Status"
                        size="small"
                      />
                    )}
                  />
                </FormControl>
              </Col>
              <Col >
                <Form.Label>Label</Form.Label>
                <FormControl>
                  <Autocomplete
                    style={{ width: 450 }}
                    freeSolo
                    autoComplete
                    autoHighlight
                    options={labelName}
                    value={myOptions5}
                    onChange={(e) => setMyOptions5(e.currentTarget.innerHTML)}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        variant="outlined"
                        label="Select the Label"
                        size="small"
                      />
                    )}
                  />
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
            <Button variant="primary" onClick={handleSubmit}>
              Save
            </Button>
          </Col>
        </Row>
      </Div>
    </Container>
  );
};

export default LeadForm;
