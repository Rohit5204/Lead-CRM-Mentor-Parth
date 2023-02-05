import * as React from 'react';
import { styled } from '@mui/system';
import { Box, TextField, Autocomplete, MenuItem, FormControl, Select } from '@mui/material';
import { Form, Row, Col, Button } from 'react-bootstrap';
import { Breadcrumb } from 'app/components';
import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

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

const EditUser = () => {
  const location = useLocation();
  const [leadId, setLeadId] = useState(location.state.leadId);
  const [name, setName] = useState(location.state.name);
  const [mobileNo, setMobileNo] = useState(location.state.mobileNo);
  const [alternateMobile, setAlternateMobile] = useState(location.state.alternateMobile);
  const [clientName, setClientName] = useState(location.state.clientName);
  const [emailId, setEmailId] = useState(location.state.emailId);
  const [streetName, setStreetName] = useState(location.state.streetName);
  const [stateName, setStateName] = useState(location.state.stateName);
  const [cityName, setCityName] = useState(location.state.cityName);
  const [zipCode, setZipCode] = useState(location.state.zipCode);
  const [countryName, setCountryName] = useState(location.state.countryName);
  const [expectedAmount, setExpectedAmount] = useState(location.state.expectedAmount);
  const [intrestedIn, setIntrestedIn] = useState([]);
  const [platformName, setPlatformName] = useState([]);
  const [labelName, setLabelName] = useState([]);
  const [statusName, setStatusName] = useState([]);
  const [assignTo, setAssignTo] = useState([]);

  const [myOptions1, setMyOptions1] = useState(location.state.intrestedIn);
  const [myOptions2, setMyOptions2] = useState(location.state.platformName);
  const [myOptions3, setMyOptions3] = useState(location.state.assignedUser);
  const [myOptions4, setMyOptions4] = useState(location.state.statusName);
  const [myOptions5, setMyOptions5] = useState(location.state.labelName);

  const [id1, setId1] = useState([]);
  const [id2, setId2] = useState([]);
  const [id3, setId3] = useState([]);
  const [sourceId, setSourceId] = useState([]);
  const [remarks, setRemarks] = useState(location.state.remarks);

  const items = localStorage.getItem('accessToken');
  const roleCode = localStorage.getItem('roleCode');
  const userId = localStorage.getItem('userId');
  const headers = {
    "x-access-token": items,
    "roleCode": roleCode,
    "userId": userId
  }
  useEffect(() => {

    axios.get(`https://43.204.38.243:3001/api/getMasterData?masterName=usermaster`, { headers: headers }).then((res) => {
      for (var i = 0; i < res.data.data.length; i++) {
        setAssignTo(current => [...current, res.data.data[i].firstName + " " + res.data.data[i].lastName]);
        setId1(current => [...current, res.data.data[i].userId, res.data.data[i].firstName + " " + res.data.data[i].lastName])
      }
    });
    axios.post(`https://43.204.38.243:3001/api/getCatalogue`, { catId: 0, }, { headers: headers }).then((res) => {
      for (var i = 0; i < res.data.data.length; i++) {
        setIntrestedIn(current => [...current, res.data.data[i].gsName]);
      }
    });
    axios.get(`https://43.204.38.243:3001/api/getMasterData?masterName=platformmaster`, { headers: headers }).then((res) => {
      for (var i = 0; i < res.data.data.length; i++) {
        setPlatformName(current => [...current, res.data.data[i].platformName]);
        setSourceId(current => [...current, res.data.data[i].id, res.data.data[i].platformName])
      }
    });
    axios.get(`https://43.204.38.243:3001/api/getMasterData?masterName=labelmaster`, { headers: headers }).then((res) => {
      for (var i = 0; i < res.data.data.length; i++) {
        setLabelName(current => [...current, res.data.data[i].name]);
        setId2(current => [...current, res.data.data[i].id, res.data.data[i].name])
      }
    });
    axios.get(`https://43.204.38.243:3001/api/getMasterData?masterName=statusmaster`, { headers: headers }).then((res) => {
      for (var i = 0; i < res.data.data.length; i++) {
        setStatusName(current => [...current, res.data.data[i].name]);
        setId3(current => [...current, res.data.data[i].id, res.data.data[i].name])
      }
    });
  }, []);

  const [APIData, setAPIData] = useState([]);
  const getFetchLeadData = () => {
    axios.post(`https://43.204.38.243:3001/api/getFilteredLeadData`, {
      leadId: 0,
      userId: 0,
      statusId: 0,
      searchKey: "",
      locationkey: "",
      platformId: 0,
      opType: ""
    }, { headers: { "x-access-token": items, "roleCode": roleCode, "userId": userId } })
      .then((response) => {
        setAPIData(response.data.data);
      });
  }

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
      sourceId: platformid,
      assignId: assignedid,
      label: labelid,
      alternateMobile: alternateMobile,
      clientName: clientName,
      expectedAmount: expectedAmount
    };
    console.log({ UpdateUser });
    e.preventDefault();
    axios.post(`https://43.204.38.243:3001/api/updateLeadData`, UpdateUser,
      { headers: headers });
    getFetchLeadData()
    changePage()
  };
  const navigate = useNavigate();
  const changePage = () => {
    navigate('/leads/manageLeads');
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    changePage()
  };
  return (
    <Container>
      <Box className="breadcrumb">
        <Breadcrumb
          routeSegments={[{ name: 'Managed Lead', path: '/leads/manageLeads' }, { name: 'Update Lead Page' }]}
        />
      </Box>
      <Box sx={{ flexGrow: 1 }}>
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col>
              <Form.Label>Lead Name</Form.Label>
              <Form.Control
                disabled
                onChange={(e) => setName(e.target.value)}
                value={name}
                placeholder="Enter the Lead Name"
              />
            </Col>
            <Col >
              <Form.Label>Expected Amount</Form.Label>
              <Form.Control

                onChange={(e) => setExpectedAmount(e.target.value)}
                value={expectedAmount}
                placeholder="Enter the Client Expected Amount"
              />
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
              <Form.Label>Alternate Number</Form.Label>
              <Form.Control
                onChange={(e) => setAlternateMobile(e.target.value)}
                value={alternateMobile}
                placeholder="Customer Alternate Number"
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
              <Form.Label>Interested In</Form.Label>
              <FormControl>
                <Autocomplete
                  style={{ width: 580 }}
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
                  required
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
              {/* <Form.Label>Source/Platform Name</Form.Label>
            <Form.Control
              onChange={(e) => setPlatformName(e.target.value)}
              value={platformName}
              placeholder="Select the Source"
            /> */}
              <Form.Label>Source(Platform Name)</Form.Label>
              <FormControl>
                <Autocomplete
                  style={{ width: 580 }}
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
            <Col >
              <Form.Label>State Name</Form.Label>
              <Form.Control
                onChange={(e) => setStateName(e.target.value)}
                value={stateName}
                placeholder="Enter Sate Name"
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
                  style={{ width: 580 }}
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
            <Col xs={6}>
              <Form.Label>Pin Code</Form.Label>
              <Form.Control
                onChange={(e) => setZipCode(e.target.value)}
                value={zipCode}
                placeholder="Enter Zip Code"
              />
            </Col>
            <Col xs={6}>
              <Form.Label>Status</Form.Label>
              <FormControl>
                <Autocomplete
                  style={{ width: 580 }}
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
            <Col xs={6}>
              <FormControl sx={{ m: 0, minWidth: 580 }} size="small" className="mt-1">
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
                  <MenuItem value="Australia">Australia</MenuItem>
                </Select>
              </FormControl>
            </Col>
            <Col xs={6}>
              <Form.Label>Label</Form.Label>
              <FormControl>
                <Autocomplete
                  style={{ width: 580 }}
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
        </Form>
      </Box>
      <Div className="mt-2">
        <Row>
          <Col>
            <Button variant="secondary" onClick={changePage}>
              Cancel
            </Button>
            &nbsp;
            <Button variant="success" onClick={updateLead}>
              Update
            </Button>
          </Col>
        </Row>
      </Div>
    </Container>
  );
};

export default EditUser;
