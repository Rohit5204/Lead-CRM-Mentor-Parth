import * as React from 'react';
import { Box, Grid, TextField, Typography, MenuItem, FormControl, Select } from '@mui/material';
import { Form, Row, Col, Button, Modal, InputGroup } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import axios from 'axios';

const EditUser = ({ theEditLead }) => {
  const [leadId, setLeadId] = useState(theEditLead.leadId);
  const [name, setName] = useState(theEditLead.name);
  const [mobileNo, setMobileNo] = useState(theEditLead.mobileNo);
  const [emailId, setEmailId] = useState(theEditLead.emailId);
  const [streetName, setStreetName] = useState(theEditLead.streetName);
  const [stateName, setStateName] = useState(theEditLead.stateName);
  const [cityName, setCityName] = useState(theEditLead.cityName);
  const [zipCode, setZipCode] = useState(theEditLead.zipCode);
  const [countryName, setCountryName] = useState(theEditLead.countryName);
  const [intrestedIn, setIntrestedIn] = useState(theEditLead.intrestedIn);
  const [platformName, setPlatformName] = useState(theEditLead.platformName);
  //const [assignId, setAssignId] = useState(theEditLead.countryName);
  const [assignedUser, setAssignedUser] = useState(theEditLead.assignedUser);
  const [statusName, setStatusName] = useState(theEditLead.statusName);
  const [labelName, setLabelName] = useState(theEditLead.labelName);
  const [remarks, setRemarks] = useState(theEditLead.remarks);

  const UpdateUser = {
    leadId: leadId,
    remarks: remarks,
    statusId: 2,
    actionBy: 1,
    isMeeting: 1,
    name: name,
    mobileNo: mobileNo,
    streetName: streetName,
    cityName: cityName,
    stateName: stateName,
    zipCode: zipCode,
    countryName: countryName,
    intrestedIn: intrestedIn,
    sourceId: 1,
    assignId: 123,
    label: 1,
  };
  const updateLead = (e) => {
    console.log({ UpdateUser });
    e.preventDefault();
    axios.post(`http://35.89.6.16:4002/api/updateLeadData`, UpdateUser).then(() => useEffect);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
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
                value={intrestedIn}
                label="Interested In"
                onChange={(e) => setIntrestedIn(e.target.value)}
              >
                <MenuItem value="interest">Your Interest</MenuItem>
                <MenuItem value="test">Facebook</MenuItem>
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
            <Form.Label>Source/Platform Name</Form.Label>
            <Form.Control
              onChange={(e) => setPlatformName(e.target.value)}
              value={platformName}
              placeholder="Select the Source"
            />
          </Col>
        </Row>
        <Row className="mt-1">
          <Col>
            <Form.Label>Email</Form.Label>
            <Form.Control
              readOnly
              onChange={(e) => setEmailId(e.target.value)}
              value={emailId}
              placeholder="Customer Email"
            />
          </Col>
          <Col>
            <Form.Label>Assigned To</Form.Label>
            <Form.Control
              onChange={(e) => setAssignedUser(e.target.value)}
              value={assignedUser}
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
                onChange={(e) => setRemarks(e.target.value)}
                value={remarks}
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
            <FormControl sx={{ m: 0, minWidth: 360 }} size="small" className="mt-1">
              <Form.Label>Status</Form.Label>
              <Select
                value={statusName}
                label="Status"
                onChange={(e) => setStateName(e.target.value)}
              >
                <MenuItem value="active">Active Lead</MenuItem>
                <MenuItem value="Follow Up">Follow Up</MenuItem>
                <MenuItem value="Meeting">Meeting</MenuItem>
                <MenuItem value="Quotation">Quotation</MenuItem>
              </Select>
            </FormControl>
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
          <Col>
            <FormControl sx={{ m: 0, minWidth: 360 }} size="small" className="mt-1">
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
                value={countryName}
                label="Country"
                onChange={(e) => setCountryName(e.target.value)}
              >
                <MenuItem value="s">Select the Country</MenuItem>
                <MenuItem value="test">INDIA</MenuItem>
                <MenuItem value="USA">USA</MenuItem>
                <MenuItem value="Russia">RUSSIA</MenuItem>
                <MenuItem value="Australia">Australia</MenuItem>
              </Select>
            </FormControl>
          </Col>
        </Row>
        <Row>
          <Col>
            <button
              type="submit"
              className="btn btn-success"
              style={{ marginTop: 5 + 'px' }}
              onClick={updateLead}
            >
              Update
            </button>
          </Col>
        </Row>
      </Form>
    </Box>
  );
};

export default EditUser;
