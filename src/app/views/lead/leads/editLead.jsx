import * as React from 'react';
import { Box, Grid, TextField, Typography, MenuItem, FormControl, Select } from '@mui/material';
import { Form, Row, Col, Button, Modal, InputGroup } from 'react-bootstrap';
import { useState } from 'react';

const EditUser = ({ theEditLead }) => {
  const id = theEditLead.LeadId;
  const [name, setName] = useState(theEditLead.name);
  const [mobileNo, setMobileNo] = useState(theEditLead.mobileNo);
  const [emailId, setEmailId] = useState(theEditLead.emailId);
  const [streetName, setStreetName] = useState(theEditLead.streetName);
  const [stateName, setStateName] = useState(theEditLead.stateName);
  const [cityName, setCityName] = useState(theEditLead.cityName);
  const [zipCode, setZipCode] = useState(theEditLead.zipCode);
  //const [countryName, setCountryName] = useState(theEditLead.countryName);
  //const [intrestedIn, setIntrestedIn] = useState(theEditLead.intrestedIn);

  const UpdateUser = {
    name,
    mobileNo,
    emailId,
    streetName,
    stateName,
    cityName,
    zipCode,
    //countryName,
    //intrestedIn,
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    UpdateUser(id, UpdateUser);
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      {/* <Typography component="span">
        <Grid container spacing={2} onSubmit={handleSubmit}>
          <Grid item xs={6} md={5}>
            <FormControl sx={{ m: 1, minWidth: 100 }}>
              <TextField
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                type="fname"
                placeholder="Enter First Name"
              />
            </FormControl>
          </Grid>
          <Grid item xs={6} md={7}>
            <FormControl sx={{ m: 1, minWidth: 250 }}>
              <TextField
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                type="lname"
                placeholder="Enter Last Name"
              />
            </FormControl>
          </Grid>
          <Grid item xs={6} md={7}>
            <FormControl sx={{ m: 1, minWidth: 480 }}>
              <TextField
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="Enter the Email"
              />
            </FormControl>
          </Grid>
        </Grid>
      </Typography> */}
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col>
            <Form.Label>Lead Name</Form.Label>
            <Form.Control
              onChange={(e) => setName(e.target.value)}
              value={name}
              placeholder="Enter the Lead Name"
            />
          </Col>
          <Col sm>
            <FormControl sx={{ m: 0, minWidth: 370 }} size="small" className="mt-1">
              <Form.Label>Interested In</Form.Label>
              <Select
                //value={intrestedIn}
                label="Interested In"
                //onChange={(e) => setIntrestedIn(e.target.value)}
              >
                <MenuItem value="interest">Your Interest</MenuItem>
                <MenuItem value="facebook">Facebook</MenuItem>
                <MenuItem value="instagram">Instagram</MenuItem>
                <MenuItem value="twitter">Twitter</MenuItem>
              </Select>
            </FormControl>
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
          <Col>
            <Form.Label>Source</Form.Label>
            <Form.Control
              // onChange={(e) => setMobileNo(e.target.value)}
              //value={mobileNo}
              placeholder="Select the Source"
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
          <Col>
            <Form.Label>Assigned To</Form.Label>
            <Form.Control
              //onChange={(e) => setEmailId(e.target.value)}
              // value={emailId}
              placeholder="Select the Staff Member"
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
          <Col>
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
              <Form.Label>Comment</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                //onChange={(e) => setStreetName(e.target.value)}
                // value={streetName}
                placeholder="Comment"
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
          <Col>
            <Form.Label>Status</Form.Label>
            <Form.Control
              //onChange={(e) => setCityName(e.target.value)}
              //value={cityName}
              placeholder="New"
            />
          </Col>
        </Row>
        <Row>
          <Col xs={6}>
            <Form.Label>State Name</Form.Label>
            <Form.Control
              onChange={(e) => setStateName(e.target.value)}
              value={stateName}
              placeholder="Enter Sate Name"
            />
          </Col>
        </Row>
        <Row>
          <Col xs={6}>
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
            <FormControl sx={{ m: 0, minWidth: 370 }} size="small" className="mt-1">
              <Form.Label>Country</Form.Label>
              <Select
                // value={countryName}
                label="Country"
                //onChange={(e) => setCountryName(e.target.value)}
              >
                <MenuItem value="s">Select the Country</MenuItem>
                <MenuItem value="India">INDIA</MenuItem>
                <MenuItem value="USA">USA</MenuItem>
                <MenuItem value="Russia">RUSSIA</MenuItem>
                <MenuItem value="Australia">Australia</MenuItem>
              </Select>
            </FormControl>
          </Col>
        </Row>
      </Form>
    </Box>
  );
};

export default EditUser;
