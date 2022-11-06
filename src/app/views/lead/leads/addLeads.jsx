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
  margin: '410px',
}));

const LeadForm = () => {
  const navigate = useNavigate();
  const changePage = () => {
    navigate('/leads/manageLeads');
  };
  const [name, setName] = useState('');
  const [mobileNo, setMobileNo] = useState('');
  const [emailId, setEmailId] = useState('');
  const [streetName, setStreetName] = useState('');
  const [stateName, setStateName] = useState('');
  const [cityName, setCityName] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [countryName, setCountryName] = useState('s');
  const [intrestedIn, setIntrestedIn] = useState([]);
  const [platformName, setPlatformName] = useState([]);
  const [labelName, setLabelName] = useState([]);
  const [status, setStatusName] = useState([]);
  const [assignTo, setAssignTo] = useState([]);

  // const [myOptions, setMyOptions] = useState([]);

  useEffect(() => {
    axios.get(`http://35.89.6.16:4002/api/getMasterData?masterName=usermaster`).then((res) => {
      for (var i = 0; i < res.data.data.length; i++) {
        setAssignTo(current => [...current, res.data.data[i].firstName + " " + res.data.data[i].lastName]);
      }
    });
    axios.post(`http://35.89.6.16:4002/api/getCatalogue`, { catId: 0, }).then((res) => {
      for (var i = 0; i < res.data.data.length; i++) {
        setIntrestedIn(current => [...current, res.data.data[i].gsName]);
      }
    });
    axios.get(`http://35.89.6.16:4002/api/getMasterData?masterName=platformmaster`).then((res) => {
      for (var i = 0; i < res.data.data.length; i++) {
        setPlatformName(current => [...current, res.data.data[i].platformName]);
      }
    });
    axios.get(`http://35.89.6.16:4002/api/getMasterData?masterName=labelmaster`).then((res) => {
      for (var i = 0; i < res.data.data.length; i++) {
        setLabelName(current => [...current, res.data.data[i].name]);
      }
    });
    axios.get(`http://35.89.6.16:4002/api/getMasterData?masterName=statusmaster`).then((res) => {
      for (var i = 0; i < res.data.data.length; i++) {
        setStatusName(current => [...current, res.data.data[i].name]);
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

    axios.post(`http://35.89.6.16:4002/api/saveLeadGenerationData`, [
      {
        name: name,
        mobileNo: mobileNo,
        emailId: emailId,
        streetName: streetName,
        cityName: cityName,
        stateName: stateName,
        zipCode: zipCode,
        countryName: countryName,
        intrestedIn: intrestedIn,
        sourceId: 1,
        assignId: null,
        label: 1,
        createdBy: 1,
      },
    ]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    postData();
    blankForm();
    alert('Lead Successfully Added');
  };
  return (
    <Container>
      <Box className="breadcrumb">
        <Breadcrumb
          routeSegments={[{ name: 'Lead', path: '/leads/addLeads' }, { name: 'Add Lead Page' }]}
        />
      </Box>
      <Row>
        <Col xs={6}>
          <SimpleCard title="Fill Lead Details">
            <Row>
              <Col>
                <Form.Label>Lead Name</Form.Label>
                <Form.Control
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
        <Col xs={6}>
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
                    options={intrestedIn}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        onChange={intrestedIn}
                        variant="outlined"
                        label="Select the Interested Catalogue"
                      />
                    )}
                  />
                </FormControl>
                {/* <Form.Label>Interested In</Form.Label>
                <Form.Control
                  // onChange={(e) => setMobileNo(e.target.value)}
                  // value={mobileNo} 
                  placeholder="Select the Source"
                /> */}
              </Col>
            </Row>
            <Row>
              <Col>
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
                        onChange={platformName}
                        variant="outlined"
                        label="Select the Platform Name"
                      />
                    )}
                  />
                </FormControl>
              </Col>
            </Row>
            <Row>
              <Col>
                <FormControl>
                  <Form.Label>Assigned To</Form.Label>
                  <Autocomplete
                    style={{ width: 450 }}
                    freeSolo
                    autoComplete
                    autoHighlight
                    options={assignTo}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        onChange={assignTo}
                        variant="outlined"
                        label="Select the Employee to Assign"
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
              <Col sm>
                <br />

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
                        onChange={status}
                        variant="outlined"
                        label="Select the Status"
                      />
                    )}
                  />
                </FormControl>
              </Col>
              <Col sm>
                <br />
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
                        onChange={labelName}
                        variant="outlined"
                        label="Select the Label"
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
