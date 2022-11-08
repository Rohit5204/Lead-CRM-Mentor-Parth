import { styled } from '@mui/system';
import { Breadcrumb, SimpleCard } from 'app/components';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { Form, Row, Col, Button } from 'react-bootstrap';
import { Box, Grid, Autocomplete, TextField } from '@mui/material';
import { InputLabel, MenuItem, FormControl, Select, Icon } from '@mui/material';
import { NavLink, useNavigate } from 'react-router-dom';

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
  const [name, setName] = useState('Fianl');
  const [mobileNo, setMobileNo] = useState('789654412235');
  const [emailId, setEmailId] = useState('demo@g.com');
  const [streetName, setStreetName] = useState('vashi');
  const [stateName, setStateName] = useState('mh');
  const [cityName, setCityName] = useState('nk');
  const [zipCode, setZipCode] = useState('422101');
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
  // const [sourceId, setSourceId] = useState([]);

  useEffect(() => {
    const items = localStorage.getItem('accessToken');
    axios.get(`http://35.89.6.16:4002/api/getMasterData?masterName=usermaster`, { headers: { "x-access-token": items } }).then((res) => {
      for (var i = 0; i < res.data.data.length; i++) {
        setAssignTo(current => [...current, res.data.data[i].firstName + " " + res.data.data[i].lastName]);
        setId1(current => [...current, res.data.data[i].userId, res.data.data[i].firstName + " " + res.data.data[i].lastName])
      }
    });
    axios.post(`http://35.89.6.16:4002/api/getCatalogue`, { catId: 0, }, { headers: { "x-access-token": items } }).then((res) => {
      for (var i = 0; i < res.data.data.length; i++) {
        setIntrestedIn(current => [...current, res.data.data[i].gsName]);
      }
    });
    axios.get(`http://35.89.6.16:4002/api/getMasterData?masterName=platformmaster`, { headers: { "x-access-token": items } }).then((res) => {
      for (var i = 0; i < res.data.data.length; i++) {
        setPlatformName(current => [...current, res.data.data[i].platformName]);
        // setSourceId(current => [...current, res.data.data[i].id, res.data.data[i].platformName])
      }
    });
    axios.get(`http://35.89.6.16:4002/api/getMasterData?masterName=labelmaster`, { headers: { "x-access-token": items } }).then((res) => {
      for (var i = 0; i < res.data.data.length; i++) {
        setLabelName(current => [...current, res.data.data[i].name]);
        setId2(current => [...current, res.data.data[i].id])
      }
    });
    axios.get(`http://35.89.6.16:4002/api/getMasterData?masterName=statusmaster`, { headers: { "x-access-token": items } }).then((res) => {
      for (var i = 0; i < res.data.data.length; i++) {
        setStatusName(current => [...current, res.data.data[i].name]);
        setId3(current => [...current, res.data.data[i].id])
      }
    });
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
    setIntrestedIn('');
  };
  //Add data in the table
  const postData = () => {
    var assignedid;
    for (var i = 0; i < id1.length; i++) {
      if (myOptions3 == id1[i]) {
        assignedid = id1[i - 1]
      }
    }
    console.log(id1)
    console.log(
      {
        name: name,
        mobileNo: mobileNo,
        emailId: emailId,
        streetName: streetName,
        cityName: cityName,
        stateName: stateName,
        zipCode: zipCode,
        countryName: countryName,

        intrestedIn: myOptions1,

        platformName: myOptions2,
        sourceId: myOptions3,

        assignId: assignedid,
        status: myOptions4,
        label: myOptions5,
        remarks: "",
        createdBy: 1,
      },
    )
    // const items = localStorage.getItem('accessToken');
    // axios.post(`http://35.89.6.16:4002/api/saveLeadGenerationData`, [
    //   {
    //     name: name,
    //     mobileNo: mobileNo,
    //     emailId: emailId,
    //     streetName: streetName,
    //     cityName: cityName,
    //     stateName: stateName,
    //     zipCode: zipCode,
    //     countryName: countryName,

    //     intrestedIn: myOptions1,
    //     platformName: myOptions2,

    //     sourceId: myOptions3.id,  
    //     assignId: myOptions4.id,
    //     status: status.id,
    //     label: labelName.id,

    //     remarks: "", 
    //     createdBy: 1,

    //     // intrestedIn: "test",
    //     // platformName: "Facebook",
    //     // sourceId: 2,
    //     // assignId: 3,
    //     // status: 2,
    //     // label: 3,


    //   },
    // ], { headers: { "x-access-token": items } });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    postData();
    blankForm();
    // alert('Lead Successfully Added');
  };
  return (
    <Container>
      <Box className="breadcrumb">
        <Breadcrumb
          routeSegments={[{ name: 'Lead', path: '/leads/addLeads' }, { name: 'Add Lead Page' }]}
        />
      </Box>
      <Row>
        <Col xs={12} md={6}>
          <SimpleCard title="Fill Lead Details">
            <Row>
              <Col>
                <Form.Label>Lead Name</Form.Label>
                <Form.Control height={2}
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                  placeholder="Enter the Lead Name"
                />

              </Col>
            </Row>
            <Row className="mt-1">
              <Col>
                <Form.Label>Mobile Number</Form.Label>
                <Form.Control
                  onChange={(e) => setMobileNo(e.target.value)}
                  value={mobileNo}
                  placeholder="Customer Mobile Number"
                />
              </Col>
            </Row>
            <Row className="mt-1">
              <Col>
                <Form.Label>Email</Form.Label>
                <Form.Control
                  onChange={(e) => setEmailId(e.target.value)}
                  value={emailId}
                  placeholder="Customer Email"
                />
              </Col>
            </Row>
            <Row className="mt-1">
              <Col>
                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                  <Form.Label>Street Name</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    onChange={(e) => setStreetName(e.target.value)}
                    value={streetName}
                    placeholder="Street"
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Label>City Name</Form.Label>
                <Form.Control
                  onChange={(e) => setCityName(e.target.value)}
                  value={cityName}
                  placeholder="Enter The City"
                />
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Label>State Name</Form.Label>
                <Form.Control
                  onChange={(e) => setStateName(e.target.value)}
                  value={stateName}
                  placeholder="Enter Sate Name"
                />
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Label>Pin Code</Form.Label>
                <Form.Control
                  onChange={(e) => setZipCode(e.target.value)}
                  value={zipCode}
                  placeholder="Enter Zip Code"
                />
              </Col>
            </Row>
            <Row>
              <Col xs={6}>
                <FormControl sx={{ m: 0, minWidth: 450 }} size="small" className="mt-1">
                  <Form.Label>Country</Form.Label>
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
                  </Select>
                </FormControl>
              </Col>
            </Row>
          </SimpleCard>
        </Col>
        <br />
        <Col xs={12} md={6}>
          <SimpleCard>
            <Row>
              <Col sm>
                <br />
                <Form.Label>Interested In</Form.Label>
                <FormControl>
                  <Autocomplete
                    style={{ width: 450 }}
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
                    options={platformName}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        onChange={(e) => setMyOptions2(e.target.value)}
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
                {/* <FormControl sx={{ m: 0, minWidth: 450 }} size="small" className="mt-1">
                  <Form.Label>Assigned To</Form.Label>
                  <Select
                    value={assignTo}
                    label="Assign To"
                    onChange={(e) => setAssignTo(e.target.value)}
                  >
                    <MenuItem value="assgin">Assign To Employee</MenuItem>
                    <MenuItem value="rohit">Rohit</MenuItem>
                    <MenuItem value="vikram">Vikram</MenuItem>
                    <MenuItem value="yogesh">Yogesh</MenuItem>
                  </Select>
                </FormControl> */}
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                  <Form.Label>Comment</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
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
                    options={status}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        onChange={(e) => setMyOptions4(e.target.value)}
                        variant="outlined"
                        label="Select the Status"
                        size="small"
                      />
                    )}
                  />
                </FormControl>
              </Col>
              <Col className="mt-1">
                <Form.Label>Label</Form.Label>
                <FormControl>
                  <Autocomplete
                    style={{ width: 450 }}
                    freeSolo
                    autoComplete
                    autoHighlight
                    options={labelName}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        onChange={(e) => setMyOptions5(e.target.value)}
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
