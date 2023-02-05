import { SimpleCard } from 'app/components';
import { styled } from '@mui/system';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ClearIcon from '@mui/icons-material/Clear';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import { Form, Row, Col, Button, Modal, InputGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import PhoneIcon from '@mui/icons-material/Phone';
import PropTypes from 'prop-types';
import { DataGrid } from '@mui/x-data-grid';
import StatusChange from './statusChange';
import FollowupStatusChange from './followupStatus';
import MettingStatusChange from './meetingStatusChange';
import {
  Box,
  Icon,
  IconButton,
  Table,
  TableBody,
  Chip,
  TableCell,
  TableHead,
  TableRow,
} from '@mui/material';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}
TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const ManageLead = () => {
  const [showForm, setShowForm] = useState(false);
  const showForm1 = () => {
    setShowForm(!showForm);
  };

  const [APIData, setAPIData] = useState([]);
  const [value, setValue] = useState(0);

  const handleCChange = (event, newValue) => {
    setValue(newValue);
  };

  //get method
  const items = localStorage.getItem('accessToken');
  const roleCode = localStorage.getItem('roleCode');
  const userId = localStorage.getItem('userId');

  const [onType, setOnType] = useState('')
  const [searchBox, setSearchBox] = useState('')
  const [locationkey, setLocationkey] = useState('')

  const columns = [
    { field: 'leadId', headerName: 'Lead No', width: 180 },
    { field: 'name', headerName: 'Client Name', width: 240 },
    { field: 'intrestedIn', headerName: 'Product Name', width: 240 },
    { field: 'mobileNo', headerName: 'Mobile Number', width: 200 },
    {
      field: 'expectedAmount',
      headerName: 'Expected Amount',
      // description: 'This column has a value getter and is not sortable.',
      width: 190,
    },
    {
      field: 'action',
      headerName: 'Action',
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Link to="/leads/viewLeads" state={params.APIData}>
              <IconButton>
                <Icon color="red">visibility</Icon>
              </IconButton>
            </Link>
            <Link to="/leads/editLead" state={params.APIData}>
              <IconButton>
                <Icon color="success">edit</Icon>
              </IconButton>
            </Link>
            {/* <Icon color="success" onClick={(e) => handleShow(e, params.row)}>edit</Icon> */}
          </>
        );
      }
    },
  ];
  const getFetchLeadData = () => {
    axios.post(`https://43.204.38.243:3001/api/getFilteredLeadData`, {
      leadId: 0,
      userId: 0,
      statusId: 0,
      searchKey: searchBox,
      locationkey: locationkey,
      platformId: 0,
      opType: onType
    }, { headers: { "x-access-token": items, "roleCode": roleCode, "userId": userId } })
      .then((response) => {
        setAPIData(response.data.data);
      });
  }

  // const [fetchLeadRow, setFetchLeadRow] = useState([])
  // const filerTabsData = () => {
  //   var j = APIData.filter(x => x.statusName == "Lead")
  //   setFetchLeadRow(j)
  // }+
  const [obj1, setObj1] = useState(null);
  const [showSatusForm, setSatusForm] = useState(false);
  const handleShow = (subscriber) => {
    setObj1(subscriber);
    setSatusForm(true);
  };
  const handleClose = () => { setSatusForm(false); }
  useEffect(() => {
    getFetchLeadData()
  }, [APIData]);
  const roleName = window.localStorage.getItem('roleName');

  const [obj2, setObj2] = useState(null);
  const [showFollowForm, setShowFollowForm] = useState(false);
  const handleFollowUp = (subscriber) => {
    setObj2(subscriber);
    setShowFollowForm(true);
  };
  const closeFollowUp = () => { setShowFollowForm(false); }


  const [obj3, setObj3] = useState(null);
  const [showMeetingForm, setShowMeetingForm] = useState(false);
  const handleMetting = (subscriber) => {
    setObj3(subscriber);
    setShowMeetingForm(true);
  };
  const closeMetting = () => { setShowMeetingForm(false); }

  return (
    <SimpleCard title="Lead Management">
      <Row>
        <Col md="4">
          <Form.Label htmlFor="basic-url">Apply Filter Search</Form.Label>
          <br></br>
          <button type="button" className="btn btn-outline-primary"
            value={onType}
            onClick={() => setOnType('DEFAULT')}>
            ALL
          </button>
          &nbsp;
          <button type="button" className="btn btn-outline-primary"
            value={onType}
            onClick={() => setOnType('LASTDAY')}>
            Last Day
          </button>
          &nbsp;
          <button type="button" className="btn btn-outline-primary"
            value={onType}
            onClick={() => setOnType('LASTWEEK')}>
            Last Week
          </button>
          &nbsp;
          <button type="button" className="btn btn-outline-primary"
            value={onType}
            onClick={() => setOnType('LASTMONTH')}>
            Last Month
          </button>

        </Col>
        <Col md="4">
          <Form.Label htmlFor="basic-url">Search Lead</Form.Label>
          <br></br>
          <InputGroup className="mb-3">
            <Form.Control
              placeholder="Search By Lead ID, Name, Mobile Number"
              aria-label="Recipient's username"
              aria-describedby="basic-addon2"
              value={searchBox}
              onChange={(e) => setSearchBox(e.target.value)}
            />
          </InputGroup>
        </Col>
        <Col md="4">
          <Form.Label htmlFor="basic-url">Search Advanced Lead</Form.Label>
          <br></br>
          <InputGroup className="mb-3">
            <Form.Control
              placeholder="Search By Street, City, State, Country"
              aria-label="Recipient's username"
              aria-describedby="basic-addon2"
              value={locationkey}
              onChange={(e) => setLocationkey(e.target.value)}
            />
          </InputGroup>
        </Col>
      </Row>

      {/* {showForm && (
        <form>
          <Row>
            <Col>
              <div class="form-group">
                <label for="exampleInputEmail1">Search By Client Name</label>
                <input
                  type="email"
                  class="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  placeholder="Enter Lead Name"
                />
              </div>
            </Col>
            <Col>
              <div class="form-group">
                <label for="exampleInputPassword1">Search By Mobile Number</label>
                <input
                  type="password"
                  class="form-control"
                  id="exampleInputPassword1"
                  placeholder="Search By Mobile Number"
                />
              </div>
            </Col>
          </Row>
          <Row>
            <Col>
              <div class="form-group">
                <label for="exampleInputPassword1">Search By City</label>
                <input
                  type="password"
                  class="form-control"
                  id="exampleInputPassword1"
                  placeholder="Search By City"
                />
              </div>
            </Col>
            <Col>
              <div class="form-group">
                <label for="exampleInputPassword1">Select State</label>
                <input
                  type="password"
                  class="form-control"
                  id="exampleInputPassword1"
                  placeholder="Select State"
                />
              </div>
            </Col>
            <Col>
              <div class="form-group">
                <label for="exampleInputPassword1">Search By Country</label>
                <input
                  type="password"
                  class="form-control"
                  id="exampleInputPassword1"
                  placeholder="Search By Country"
                />
              </div>
            </Col>
          </Row>
          <Row>
            <Col>
              <div class="form-group">
                <label for="exampleInputPassword1">Select Assign To</label>
                <input
                  type="password"
                  class="form-control"
                  id="exampleInputPassword1"
                  placeholder="Select Assign To"
                />
              </div>
            </Col>
            <Col>
              <div class="form-group">
                <label for="exampleInputPassword1">Select Generated By</label>
                <input
                  type="password"
                  class="form-control"
                  id="exampleInputPassword1"
                  placeholder="Select Generated By"
                />
              </div>
            </Col>
            <Col>
              <div class="form-group">
                <label for="exampleInputPassword1">Select Monitor By</label>
                <input
                  type="password"
                  class="form-control"
                  id="exampleInputPassword1"
                  placeholder="Select Monitor By"
                />
              </div>
            </Col>
          </Row>
        </form>
      )} */}

      <Container className="my-2">
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs
            value={value}
            onChange={handleCChange}
            variant="fullWidth"
            aria-label="basic tabs example"
            scrollButtons="auto"
          // aria-label="scrollable auto tabs example"
          >
            <Tab label="Lead" {...a11yProps(0)} />
            <Tab label="Followup" {...a11yProps(1)} />
            <Tab label="Meeting" {...a11yProps(2)} />
            <Tab label="Ringing" {...a11yProps(3)} />
            <Tab label="Quotation" {...a11yProps(4)} />
            <Tab label="Invoice" {...a11yProps(5)} />
            <Tab label="Drop" {...a11yProps(6)} />
            <Tab label="Closed" {...a11yProps(7)} />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <Box className="text-center" width="100%" overflow="auto">
            {/* Table Section */}
            <StyledTable className="table table-striped table-bordered" style={{ 'borderRadius': '1px' }}>
              <TableHead style={{ borderLeft: '1px solid red', borderRight: '1px solid red' }} className='text-center'>
                <TableRow>
                  <TableCell align="center">Lead Id</TableCell>
                  <TableCell align="center">Lead Name</TableCell>
                  <TableCell align="center">Email</TableCell>
                  <TableCell align="center">Mobile Number</TableCell>
                  <TableCell align="center">Intersted In</TableCell>
                  <TableCell align="center">Status</TableCell>
                  <TableCell align="center">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {APIData.map((subscriber, index) => {
                  if (subscriber.statusName == "Lead") {
                    return (
                      <TableRow key={index}>
                        <TableCell align="center">{subscriber.leadId}</TableCell>
                        <TableCell align="center">{subscriber.name}</TableCell>
                        <TableCell align="center">{subscriber.emailId}</TableCell>
                        <TableCell align="center">{subscriber.mobileNo}</TableCell>
                        <TableCell align="center">{subscriber.intrestedIn}</TableCell>
                        <TableCell align="center">
                          {(function () {
                            if (subscriber.statusName == "Lead") {
                              return <Chip label="Lead" color="warning" onClick={(e) => handleShow(subscriber)} />;
                            }
                            else {
                              return <Chip label="Not Listed" color="error" />
                            }
                          })()}
                        </TableCell>
                        <TableCell align="center">
                          {(function () {
                            if (roleName == "Employee") {

                              return <><Link to="/leads/viewLeads" state={subscriber}>
                                <IconButton>
                                  <Icon color="red">visibility</Icon>
                                </IconButton>
                              </Link>

                              </>
                            }
                            else {
                              return <>
                                <Link to="/leads/viewLeads" state={subscriber}>
                                  <IconButton>
                                    <Icon color="red">visibility</Icon>
                                  </IconButton>
                                </Link>
                                <Link to="/leads/editLead" state={subscriber}>
                                  <IconButton>
                                    <Icon color="success">edit</Icon>
                                  </IconButton>
                                </Link>
                              </>
                            }
                          })()}
                        </TableCell>
                      </TableRow>
                    );
                  }
                })}
              </TableBody>
            </StyledTable>
            {/* <div style={{ height: 570, width: '100%' }}>
              <DataGrid
                rows={APIData}
                columns={columns}
                pageSize={10}
                rowsPerPageOptions={[10]}
                getRowId={(row) => row.leadId}
              // checkboxSelection
              />
            </div> */}
          </Box>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Box className="text-center" width="100%" overflow="auto">
            {/* Table Section */}
            <StyledTable className="table table-striped table-bordered" style={{ 'borderRadius': '1px' }}>
              <TableHead style={{ borderLeft: '1px solid red', borderRight: '1px solid red' }} className='text-center'>
                <TableRow>
                  <TableCell align="center">Lead Id</TableCell>
                  <TableCell align="center">Lead Name</TableCell>
                  <TableCell align="center">Email</TableCell>
                  <TableCell align="center">Mobile Number</TableCell>
                  <TableCell align="center">Intersted In</TableCell>
                  <TableCell align="center">Status</TableCell>
                  <TableCell align="center">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {APIData.map((subscriber, index) => {
                  if (subscriber.statusName == "FollowUp") {
                    return (
                      <TableRow key={index}>
                        <TableCell align="center">{subscriber.leadId}</TableCell>
                        <TableCell align="center">{subscriber.name}</TableCell>
                        <TableCell align="center">{subscriber.emailId}</TableCell>
                        <TableCell align="center">{subscriber.mobileNo}</TableCell>
                        <TableCell align="center">{subscriber.intrestedIn}</TableCell>
                        <TableCell align="center">
                          {(function () {
                            if (subscriber.statusName == "FollowUp") {
                              return <Chip label="FollowUp" color="success" onClick={(e) => handleShow(subscriber)} />;
                            }
                            else {
                              return <Chip label="Not Listed" color="error" />
                            }
                          })()}
                        </TableCell>
                        <TableCell align="center">
                          {(function () {
                            if (roleName == "Employee") {

                              return <><Link to="/leads/viewLeads" state={subscriber}>
                                <IconButton>
                                  <Icon color="red">visibility</Icon>
                                </IconButton>
                              </Link>

                              </>
                            }
                            else {
                              return <>
                                <Link to="/leads/viewLeads" state={subscriber}>
                                  <IconButton>
                                    <Icon color="red">visibility</Icon>
                                  </IconButton>
                                </Link>
                                <Link to="/leads/editLead" state={subscriber}>
                                  <IconButton>
                                    <Icon color="success">edit</Icon>
                                  </IconButton>
                                </Link>
                              </>
                            }
                          })()}
                        </TableCell>
                      </TableRow>
                    );
                  }
                })}
              </TableBody>
            </StyledTable>
          </Box>
        </TabPanel>
        <TabPanel value={value} index={2}>
          <Box className="text-center" width="100%" overflow="auto">
            {/* Table Section */}
            <StyledTable className="table table-striped table-bordered" style={{ 'borderRadius': '1px' }}>
              <TableHead style={{ borderLeft: '1px solid red', borderRight: '1px solid red' }} className='text-center'>
                <TableRow>
                  <TableCell align="center">Lead Id</TableCell>
                  <TableCell align="center">Lead Name</TableCell>
                  <TableCell align="center">Email</TableCell>
                  <TableCell align="center">Mobile Number</TableCell>
                  <TableCell align="center">Intersted In</TableCell>
                  <TableCell align="center">Status</TableCell>
                  <TableCell align="center">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {APIData.map((subscriber, index) => {
                  if (subscriber.statusName == "Meeting") {
                    return (
                      <TableRow key={index}>
                        <TableCell align="center">{subscriber.leadId}</TableCell>
                        <TableCell align="center">{subscriber.name}</TableCell>
                        <TableCell align="center">{subscriber.emailId}</TableCell>
                        <TableCell align="center">{subscriber.mobileNo}</TableCell>
                        <TableCell align="center">{subscriber.intrestedIn}</TableCell>
                        <TableCell align="center">
                          {(function () {
                            if (subscriber.statusName == "Meeting") {
                              return <Chip label="Meeting" color="success" onClick={(e) => handleShow(subscriber)} />;
                            }
                            else {
                              return <Chip label="Not Listed" color="error" />
                            }
                          })()}
                        </TableCell>
                        <TableCell align="center">
                          {(function () {
                            if (roleName == "Employee") {

                              return <><Link to="/leads/viewLeads" state={subscriber}>
                                <IconButton>
                                  <Icon color="red">visibility</Icon>
                                </IconButton>
                              </Link>

                              </>
                            }
                            else {
                              return <>
                                <Link to="/leads/viewLeads" state={subscriber}>
                                  <IconButton>
                                    <Icon color="red">visibility</Icon>
                                  </IconButton>
                                </Link>
                                <Link to="/leads/editLead" state={subscriber}>
                                  <IconButton>
                                    <Icon color="success">edit</Icon>
                                  </IconButton>
                                </Link>
                              </>
                            }
                          })()}
                        </TableCell>
                      </TableRow>
                    );
                  }
                })}
              </TableBody>
            </StyledTable>
          </Box>
        </TabPanel>
        <TabPanel value={value} index={3}>
          <Box className="text-center" width="100%" overflow="auto">
            {/* Table Section */}
            <StyledTable className="table table-striped table-bordered" style={{ 'borderRadius': '1px' }}>
              <TableHead style={{ borderLeft: '1px solid red', borderRight: '1px solid red' }} className='text-center'>
                <TableRow>
                  <TableCell align="center">Lead Id</TableCell>
                  <TableCell align="center">Lead Name</TableCell>
                  <TableCell align="center">Email</TableCell>
                  <TableCell align="center">Mobile Number</TableCell>
                  <TableCell align="center">Intersted In</TableCell>
                  <TableCell align="center">Status</TableCell>
                  <TableCell align="center">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {APIData.map((subscriber, index) => {
                  if (subscriber.statusName == "Ringing") {
                    return (
                      <TableRow key={index}>
                        <TableCell align="center">{subscriber.leadId}</TableCell>
                        <TableCell align="center">{subscriber.name}</TableCell>
                        <TableCell align="center">{subscriber.emailId}</TableCell>
                        <TableCell align="center">{subscriber.mobileNo}</TableCell>
                        <TableCell align="center">{subscriber.intrestedIn}</TableCell>
                        <TableCell align="center">
                          {(function () {
                            if (subscriber.statusName == "Ringing") {
                              return <Chip label="Ringing" color="warning" onClick={(e) => handleShow(subscriber)} />;
                            }
                            else {
                              return <Chip label="Not Listed" color="error" />
                            }
                          })()}
                        </TableCell>
                        <TableCell align="center">
                          {(function () {
                            if (roleName == "Employee") {

                              return <><Link to="/leads/viewLeads" state={subscriber}>
                                <IconButton>
                                  <Icon color="red">visibility</Icon>
                                </IconButton>
                              </Link>

                              </>
                            }
                            else {
                              return <>
                                <Link to="/leads/viewLeads" state={subscriber}>
                                  <IconButton>
                                    <Icon color="red">visibility</Icon>
                                  </IconButton>
                                </Link>
                                <Link to="/leads/editLead" state={subscriber}>
                                  <IconButton>
                                    <Icon color="success">edit</Icon>
                                  </IconButton>
                                </Link>
                              </>
                            }
                          })()}
                        </TableCell>
                      </TableRow>
                    );
                  }
                })}
              </TableBody>
            </StyledTable>
          </Box>
        </TabPanel>
        <TabPanel value={value} index={4}>
          <Box className="text-center" width="100%" overflow="auto">
            {/* Table Section */}
            <StyledTable className="table table-striped table-bordered" style={{ 'borderRadius': '1px' }}>
              <TableHead style={{ borderLeft: '1px solid red', borderRight: '1px solid red' }} className='text-center'>
                <TableRow>
                  <TableCell align="center">Lead Id</TableCell>
                  <TableCell align="center">Lead Name</TableCell>
                  <TableCell align="center">Email</TableCell>
                  <TableCell align="center">Mobile Number</TableCell>
                  <TableCell align="center">Intersted In</TableCell>
                  <TableCell align="center">Status</TableCell>
                  <TableCell align="center">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {APIData.map((subscriber, index) => {
                  if (subscriber.statusName == "Quotation") {
                    return (
                      <TableRow key={index}>
                        <TableCell align="center">{subscriber.leadId}</TableCell>
                        <TableCell align="center">{subscriber.name}</TableCell>
                        <TableCell align="center">{subscriber.emailId}</TableCell>
                        <TableCell align="center">{subscriber.mobileNo}</TableCell>
                        <TableCell align="center">{subscriber.intrestedIn}</TableCell>
                        <TableCell align="center">
                          {(function () {
                            if (subscriber.statusName == "Quotation") {
                              return <Chip label="Quotation" color="primary" onClick={(e) => handleShow(subscriber)} />;
                            }
                            else {
                              return <Chip label="Not Listed" color="error" />
                            }
                          })()}
                        </TableCell>
                        <TableCell align="center">
                          {(function () {
                            if (roleName == "Employee") {

                              return <><Link to="/leads/viewLeads" state={subscriber}>
                                <IconButton>
                                  <Icon color="red">visibility</Icon>
                                </IconButton>
                              </Link>

                              </>
                            }
                            else {
                              return <>
                                <Link to="/leads/viewLeads" state={subscriber}>
                                  <IconButton>
                                    <Icon color="red">visibility</Icon>
                                  </IconButton>
                                </Link>
                                <Link to="/leads/editLead" state={subscriber}>
                                  <IconButton>
                                    <Icon color="success">edit</Icon>
                                  </IconButton>
                                </Link>
                              </>
                            }
                          })()}
                        </TableCell>
                      </TableRow>
                    );
                  }
                })}
              </TableBody>
            </StyledTable>
          </Box>
        </TabPanel>

        <TabPanel value={value} index={5}>
          <Box className="text-center" width="100%" overflow="auto">
            {/* Table Section */}
            <StyledTable className="table table-striped table-bordered" style={{ 'borderRadius': '1px' }}>
              <TableHead style={{ borderLeft: '1px solid red', borderRight: '1px solid red' }} className='text-center'>
                <TableRow>
                  <TableCell align="center">Lead Id</TableCell>
                  <TableCell align="center">Lead Name</TableCell>
                  <TableCell align="center">Email</TableCell>
                  <TableCell align="center">Mobile Number</TableCell>
                  <TableCell align="center">Intersted In</TableCell>
                  <TableCell align="center">Status</TableCell>
                  <TableCell align="center">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {APIData.map((subscriber, index) => {
                  if (subscriber.statusName == "Invoice") {
                    return (
                      <TableRow key={index}>
                        <TableCell align="center">{subscriber.leadId}</TableCell>
                        <TableCell align="center">{subscriber.name}</TableCell>
                        <TableCell align="center">{subscriber.emailId}</TableCell>
                        <TableCell align="center">{subscriber.mobileNo}</TableCell>
                        <TableCell align="center">{subscriber.intrestedIn}</TableCell>
                        <TableCell align="center">
                          {(function () {
                            if (subscriber.statusName == "Invoice") {
                              return <Chip label="Invoice" color="primary" onClick={(e) => handleShow(subscriber)} />;
                            }
                            else {
                              return <Chip label="Not Listed" color="error" />
                            }
                          })()}
                        </TableCell>
                        <TableCell align="center">
                          {(function () {
                            if (roleName == "Employee") {

                              return <><Link to="/leads/viewLeads" state={subscriber}>
                                <IconButton>
                                  <Icon color="red">visibility</Icon>
                                </IconButton>
                              </Link>

                              </>
                            }
                            else {
                              return <>
                                <Link to="/leads/viewLeads" state={subscriber}>
                                  <IconButton>
                                    <Icon color="red">visibility</Icon>
                                  </IconButton>
                                </Link>
                                <Link to="/leads/editLead" state={subscriber}>
                                  <IconButton>
                                    <Icon color="success">edit</Icon>
                                  </IconButton>
                                </Link>
                              </>
                            }
                          })()}
                        </TableCell>
                      </TableRow>
                    );
                  }
                })}
              </TableBody>
            </StyledTable>
          </Box>
        </TabPanel>
        <TabPanel value={value} index={6}>
          <Box className="text-center" width="100%" overflow="auto">
            {/* Table Section */}
            <StyledTable className="table table-striped table-bordered" style={{ 'borderRadius': '1px' }}>
              <TableHead style={{ borderLeft: '1px solid red', borderRight: '1px solid red' }} className='text-center'>
                <TableRow>
                  <TableCell align="center">Lead Id</TableCell>
                  <TableCell align="center">Lead Name</TableCell>
                  <TableCell align="center">Email</TableCell>
                  <TableCell align="center">Mobile Number</TableCell>
                  <TableCell align="center">Intersted In</TableCell>
                  <TableCell align="center">Status</TableCell>
                  <TableCell align="center">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {APIData.map((subscriber, index) => {
                  if (subscriber.statusName == "Drop") {
                    return (
                      <TableRow key={index}>
                        <TableCell align="center">{subscriber.leadId}</TableCell>
                        <TableCell align="center">{subscriber.name}</TableCell>
                        <TableCell align="center">{subscriber.emailId}</TableCell>
                        <TableCell align="center">{subscriber.mobileNo}</TableCell>
                        <TableCell align="center">{subscriber.intrestedIn}</TableCell>
                        <TableCell align="center">
                          {(function () {
                            if (subscriber.statusName == "Drop") {
                              return <Chip label="Drop" color="error" onClick={(e) => handleShow(subscriber)} />;
                            }
                            else {
                              return <Chip label="Not Listed" color="error" />
                            }
                          })()}
                        </TableCell>
                        <TableCell align="center">
                          {(function () {
                            if (roleName == "Employee") {

                              return <><Link to="/leads/viewLeads" state={subscriber}>
                                <IconButton>
                                  <Icon color="red">visibility</Icon>
                                </IconButton>
                              </Link>

                              </>
                            }
                            else {
                              return <>
                                <Link to="/leads/viewLeads" state={subscriber}>
                                  <IconButton>
                                    <Icon color="red">visibility</Icon>
                                  </IconButton>
                                </Link>
                                <Link to="/leads/editLead" state={subscriber}>
                                  <IconButton>
                                    <Icon color="success">edit</Icon>
                                  </IconButton>
                                </Link>
                              </>
                            }
                          })()}
                        </TableCell>
                      </TableRow>
                    );
                  }
                })}
              </TableBody>
            </StyledTable>
          </Box>
        </TabPanel>
        <TabPanel value={value} index={7}>
          <Box className="text-center" width="100%" overflow="auto">
            {/* Table Section */}
            <StyledTable className="table table-striped table-bordered" style={{ 'borderRadius': '1px' }}>
              <TableHead style={{ borderLeft: '1px solid red', borderRight: '1px solid red' }} className='text-center'>
                <TableRow>
                  <TableCell align="center">Lead Id</TableCell>
                  <TableCell align="center">Lead Name</TableCell>
                  <TableCell align="center">Email</TableCell>
                  <TableCell align="center">Mobile Number</TableCell>
                  <TableCell align="center">Intersted In</TableCell>
                  <TableCell align="center">Status</TableCell>
                  <TableCell align="center">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {APIData.map((subscriber, index) => {
                  if (subscriber.statusName == "Closed") {
                    return (
                      <TableRow key={index}>
                        <TableCell align="center">{subscriber.leadId}</TableCell>
                        <TableCell align="center">{subscriber.name}</TableCell>
                        <TableCell align="center">{subscriber.emailId}</TableCell>
                        <TableCell align="center">{subscriber.mobileNo}</TableCell>
                        <TableCell align="center">{subscriber.intrestedIn}</TableCell>
                        <TableCell align="center">
                          {(function () {
                            if (subscriber.statusName == "Closed") {
                              return <Chip label="Closed" onClick={(e) => handleShow(subscriber)} />;
                            }
                            else {
                              return <Chip label="Not Listed" color="error" />
                            }
                          })()}
                        </TableCell>
                        <TableCell align="center">
                          {(function () {
                            if (roleName == "Employee") {

                              return <><Link to="/leads/viewLeads" state={subscriber}>
                                <IconButton>
                                  <Icon color="red">visibility</Icon>
                                </IconButton>
                              </Link>

                              </>
                            }
                            else {
                              return <>
                                <Link to="/leads/viewLeads" state={subscriber}>
                                  <IconButton>
                                    <Icon color="red">visibility</Icon>
                                  </IconButton>
                                </Link>
                                <Link to="/leads/editLead" state={subscriber}>
                                  <IconButton>
                                    <Icon color="success">edit</Icon>
                                  </IconButton>
                                </Link>
                              </>
                            }
                          })()}
                        </TableCell>
                      </TableRow>
                    );
                  }
                })}
              </TableBody>
            </StyledTable>
          </Box>
        </TabPanel>
        <Modal
          show={showSatusForm}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header>
            <Modal.Title>Change Status</Modal.Title>
            <IconButton type="button" onClick={handleClose}>
              <ClearIcon />
            </IconButton>
          </Modal.Header>
          <Modal.Body>
            <StatusChange theStatusChange={obj1} handleDialog={handleClose}></StatusChange>
          </Modal.Body>

        </Modal>
        {/* Followup */}
        <Modal
          show={showFollowForm}
          onHide={closeFollowUp}
          backdrop="static"
          keyboard={false}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header>
            <Modal.Title>Change Status</Modal.Title>
            <IconButton type="button" onClick={closeFollowUp}>
              <ClearIcon />
            </IconButton>
          </Modal.Header>
          <Modal.Body>
            <FollowupStatusChange theFollowupStatusChange={obj2} handleDialog={closeFollowUp}></FollowupStatusChange>
          </Modal.Body>

        </Modal>
        {/* Meeting */}
        <Modal
          show={showMeetingForm}
          onHide={closeMetting}
          backdrop="static"
          keyboard={false}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header>
            <Modal.Title>Change Status</Modal.Title>
            <IconButton type="button" onClick={closeMetting}>
              <ClearIcon />
            </IconButton>
          </Modal.Header>
          <Modal.Body>
            <MettingStatusChange theMettingStatusChange={obj3} handleDialog={closeMetting}></MettingStatusChange>
          </Modal.Body>

        </Modal>
      </Container>
    </SimpleCard >
  );
};
// Custom Style Section
const Container = styled('div')(({ theme }) => ({
  margin: '2.9px',
  [theme.breakpoints.down('sm')]: { margin: '16px' },
  '& .breadcrumb': {
    marginBottom: '30px',
    [theme.breakpoints.down('sm')]: { marginBottom: '16px' },
  },
}));
const StyledTable = styled(Table)(() => ({
  whiteSpace: 'pre',
  '& thead': {
    '& tr': { '& th': { paddingLeft: 0, paddingRight: 0 } },
  },
  '& tbody': {
    '& tr': { '& td': { paddingLeft: 0 } },
  },
}));

export default ManageLead;
