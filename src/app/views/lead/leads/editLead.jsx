import * as React from 'react';
import { Box, Grid, TextField, Autocomplete, MenuItem, FormControl, Select } from '@mui/material';
import { Form, Row, Col, Button, Modal, InputGroup } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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
  //const [intrestedIn, setIntrestedIn] = useState(theEditLead.intrestedIn);
  //const [platformName, setPlatformName] = useState(theEditLead.platformName);
  // const [assignId, setAssignId] = useState(theEditLead.countryName);
  // const [assignedUser, setAssignedUser] = useState(theEditLead.assignedUser);
  // const [statusName, setStatusName] = useState(theEditLead.statusName);
  // const [labelName, setLabelName] = useState(theEditLead.labelName);
  const [intrestedIn, setIntrestedIn] = useState([]);
  const [platformName, setPlatformName] = useState([]);
  const [labelName, setLabelName] = useState([]);
  const [statusName, setStatusName] = useState([]);
  const [assignTo, setAssignTo] = useState([]);

  const [myOptions1, setMyOptions1] = useState(theEditLead.intrestedIn);
  const [myOptions2, setMyOptions2] = useState(theEditLead.platformName);
  const [myOptions3, setMyOptions3] = useState(theEditLead.assignedUser);
  const [myOptions4, setMyOptions4] = useState(theEditLead.statusName);
  const [myOptions5, setMyOptions5] = useState(theEditLead.labelName);

  const [id1, setId1] = useState([]);
  const [id2, setId2] = useState([]);
  const [id3, setId3] = useState([]);
  const [sourceId, setSourceId] = useState([]);
  const [remarks, setRemarks] = useState(theEditLead.remarks);

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
        setSourceId(current => [...current, res.data.data[i].id, res.data.data[i].platformName])
      }
    });
    axios.get(`http://35.89.6.16:4002/api/getMasterData?masterName=labelmaster`, { headers: { "x-access-token": items } }).then((res) => {
      for (var i = 0; i < res.data.data.length; i++) {
        setLabelName(current => [...current, res.data.data[i].name]);
        setId2(current => [...current, res.data.data[i].id, res.data.data[i].name])
      }
    });
    axios.get(`http://35.89.6.16:4002/api/getMasterData?masterName=statusmaster`, { headers: { "x-access-token": items } }).then((res) => {
      for (var i = 0; i < res.data.data.length; i++) {
        setStatusName(current => [...current, res.data.data[i].name]);
        setId3(current => [...current, res.data.data[i].id, res.data.data[i].name])
      }
    });
  }, []);



  const updateLead = (e) => {
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
    const UpdateUser = {
      leadId: leadId,
      remarks: remarks,
      statusId: statusid,
      actionBy: 1,
      isMeeting: 1,
      name: name,
      mobileNo: mobileNo,
      streetName: streetName,
      cityName: cityName,
      stateName: stateName,
      zipCode: zipCode,
      countryName: countryName,
      intrestedIn: myOptions1,
      // platformName: myOptions2,
      sourceId: platformid,
      assignId: assignedid,
      // status: statusid,
      label: labelid,
      alternateMobile: mobileNo
    };
    console.log({ UpdateUser });
    const items = localStorage.getItem('accessToken');
    e.preventDefault();
    axios.post(`http://35.89.6.16:4002/api/updateLeadData`, UpdateUser, { headers: { "x-access-token": items } })
      .then(() => useEffect);
  };
  const navigate = useNavigate();
  const changePage = () => {
    navigate('/catalogues/manageCatalogue');
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    changePage()
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
            {/* <FormControl sx={{ m: 0, minWidth: 370 }} size="small" className="mt-1">
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
            </FormControl> */}
            <Form.Label>Interested In</Form.Label>
            <FormControl>
              <Autocomplete
                style={{ width: 370 }}
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
        <Row className="mt-1">
          <Col>
            <Form.Label>Mobile Number</Form.Label>
            <Form.Control
              disabled
              onChange={(e) => setMobileNo(e.target.value)}
              value={mobileNo}
              placeholder="Customer Mobile Number"
            />
          </Col>
          <Col>
            {/* <Form.Label>Source/Platform Name</Form.Label>
            <Form.Control
              onChange={(e) => setPlatformName(e.target.value)}
              value={platformName}
              placeholder="Select the Source"
            /> */}
            <Form.Label>Source(Platform Name)</Form.Label>
            <FormControl>
              <Autocomplete
                style={{ width: 370 }}
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
            {/* <Form.Label>Assigned To</Form.Label>
            <Form.Control
              // onChange={(e) => setAssignedUser(e.target.value)}
              // value={assignedUser}
              placeholder="Select the Staff Member"
            /> */}
            <FormControl>
              <Form.Label>Assigned To</Form.Label>
              <Autocomplete
                style={{ width: 370 }}
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
            {/* <FormControl sx={{ m: 0, minWidth: 360 }} size="small" className="mt-1">
              <Form.Label>Status</Form.Label>
              <Select
                //value={statusName}
                label="Status"
              //onChange={(e) => setStatusName(e.target.value)}
              >
                <MenuItem value="active">Active Lead</MenuItem>
                <MenuItem value="Follow Up">Follow Up</MenuItem>
                <MenuItem value="Meeting">Meeting</MenuItem>
                <MenuItem value="Quotation">Quotation</MenuItem>
              </Select>
            </FormControl> */}
            <Form.Label>Status</Form.Label>
            <FormControl>
              <Autocomplete
                style={{ width: 370 }}
                freeSolo
                autoComplete
                autoHighlight
                value={myOptions4}
                options={statusName}
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
        </Row>
        <Row>
          <Col >
            <Form.Label>State Name</Form.Label>
            <Form.Control
              onChange={(e) => setStateName(e.target.value)}
              value={stateName}
              placeholder="Enter Sate Name"
            />
          </Col>
          <Col>
            {/* <FormControl sx={{ m: 0, minWidth: 360 }} size="small" className="mt-1">
              <Form.Label>Label</Form.Label>
              <Select
                // value={labelName}
                label="Label"
              //  onChange={(e) => setLabelName(e.target.value)}
              >
                <MenuItem value="cold">Cold</MenuItem>
                <MenuItem value="warm">Warm</MenuItem>
                <MenuItem value="hot">Hot</MenuItem>
              </Select>
            </FormControl> */}
            <Form.Label>Label</Form.Label>
            <FormControl>
              <Autocomplete
                style={{ width: 370 }}
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
