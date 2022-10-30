import { styled } from '@mui/system';
import { Breadcrumb, SimpleCard } from 'app/components';
import React, { useState } from 'react';
import axios from 'axios';
import { Form, Row, Col, Button } from 'react-bootstrap';
import { Box, Grid } from '@mui/material';
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
  const [intrestedIn, setIntrestedIn] = useState('interest');
  const [labelName, setLabelName] = useState('cold');
  const [status, setStatus] = useState('active');
  //const [assignId, setAssignId] = useState('');

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
                <FormControl sx={{ m: 0, minWidth: 450 }} size="small" className="mt-1">
                  <Form.Label>Interested In</Form.Label>
                  <Select
                    value={intrestedIn}
                    label="Interested In"
                    onChange={(e) => setIntrestedIn(e.target.value)}
                  >
                    <MenuItem value="interest">Your Interest</MenuItem>
                    <MenuItem value="facebook">Facebook</MenuItem>
                    <MenuItem value="instagram">Instagram</MenuItem>
                    <MenuItem value="twitter">Twitter</MenuItem>
                  </Select>
                </FormControl>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Label>Source</Form.Label>
                <Form.Control
                  // onChange={(e) => setMobileNo(e.target.value)}
                  // value={mobileNo}
                  placeholder="Select the Source"
                />
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Label>Assigned To</Form.Label>
                <Form.Control
                  // onChange={(e) => setEmailId(e.target.value)}
                  // value={emailId}
                  placeholder="Select the Staff Member"
                />
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
                <FormControl sx={{ m: 0, minWidth: 450 }} size="small" className="mt-1">
                  <Form.Label>Status</Form.Label>
                  <Select value={status} label="Status" onChange={(e) => setStatus(e.target.value)}>
                    <MenuItem value="active">Active Lead</MenuItem>
                    <MenuItem value="Follow Up">Follow Up</MenuItem>
                    <MenuItem value="Meeting">Meeting</MenuItem>
                    <MenuItem value="Quotation">Quotation</MenuItem>
                  </Select>
                </FormControl>
              </Col>
              <Col sm>
                <br />
                <FormControl sx={{ m: 0, minWidth: 450 }} size="small" className="mt-1">
                  <Form.Label>Label</Form.Label>
                  <Select
                    value={labelName}
                    label="Label"
                    onChange={(e) => setLabelName(e.target.value)}
                  >
                    <MenuItem value="cold">Cold</MenuItem>
                    <MenuItem value="warm">Warm</MenuItem>
                    <MenuItem value="hot">Hot</MenuItem>
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
