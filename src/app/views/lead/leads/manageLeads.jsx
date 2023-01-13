import { SimpleCard } from 'app/components';
import { styled } from '@mui/system';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import { Form, Row, Col, Button, Modal, InputGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  Box,
  Icon,
  IconButton,
  Table,
  TableBody,
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
  const getFetchLeadData = () => {
    axios.post(`https://43.204.38.243:3000/api/getFilteredLeadData`, {
      leadId: 0,
      userId: 0,
      statusId: 0,
    }, { headers: { "x-access-token": items } })
      .then((response) => {
        setAPIData(response.data.data);
      });
  }
  useEffect(() => {
    getFetchLeadData()
  }, [APIData]);

  return (
    <SimpleCard title="Lead Management">
      <Row>
        <Col>
          <form>
            <Row>
              <Col md="5">
                <Form.Label htmlFor="basic-url">Apply Filter Search</Form.Label>
                <br></br>
                <button type="button" className="btn btn-outline-primary">
                  Last Day
                </button>
                &nbsp;
                <button type="button" className="btn btn-outline-primary">
                  Last Week
                </button>
                &nbsp;
                <button type="button" className="btn btn-outline-primary">
                  Last Month
                </button>
                &nbsp;
              </Col>
              <Col md="5">
                <Form.Label htmlFor="basic-url">Search Lead</Form.Label>
                <br></br>
                <InputGroup className="mb-3">
                  <Form.Control
                    placeholder="Search Box"
                    aria-label="Recipient's username"
                    aria-describedby="basic-addon2"
                  />
                </InputGroup>
              </Col>
              <Col md="2">
                <Form.Label htmlFor="basic-url">Advanced Filter</Form.Label>
                <br></br>
                <button type="button" className="btn btn-outline-primary" onClick={showForm1}>
                  Advanced Search
                </button>
              </Col>
            </Row>
          </form>
          {showForm && (
            <form>
              <Row>
                <Col>
                  <div class="form-group">
                    <label for="exampleInputEmail1">Serach By Client Name</label>
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
                    <label for="exampleInputEmail1">Serach By Lead Name</label>
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
                    <label for="exampleInputPassword1">Serach By Mobile Number</label>
                    <input
                      type="password"
                      class="form-control"
                      id="exampleInputPassword1"
                      placeholder="Serach By Mobile Number"
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
                      placeholder="Serach By City"
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
              <button type="submit" class="btn btn-primary">
                Serach
              </button>
            </form>
          )}
        </Col>
      </Row>
      <Container className="my-2">
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value} onChange={handleCChange} variant="fullWidth" aria-label="basic tabs example">
            <Tab label="Lead" {...a11yProps(0)} />
            <Tab label="Followup" {...a11yProps(1)} />
            <Tab label="Meeting" {...a11yProps(2)} />
            <Tab label="Quotation" {...a11yProps(3)} />
            <Tab label="Ringing" {...a11yProps(4)} />
            <Tab label="Invoice" {...a11yProps(5)} />
            <Tab label="Drop" {...a11yProps(6)} />
            <Tab label="Closed" {...a11yProps(7)} />
            <Tab label="Closed" {...a11yProps(8)} />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <Box className="text-center" width="100%" overflow="auto">
            {/* Table Section */}
            <StyledTable>
              <TableHead>
                <TableRow>
                  <TableCell align="justify">Lead Id</TableCell>
                  <TableCell align="justify">Client Name</TableCell>
                  <TableCell align="justify">Lead Name</TableCell>
                  <TableCell align="justify">Email</TableCell>
                  <TableCell align="justify">Mobile Number</TableCell>
                  <TableCell align="center">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {APIData.map((subscriber, index) => {
                  if (subscriber.statusName == "Active Lead") {
                    return (
                      <TableRow key={index}>
                        <TableCell align="justify">{subscriber.leadId}</TableCell>
                        <TableCell align="justify">{subscriber.clientName}</TableCell>
                        <TableCell align="justify">{subscriber.name}</TableCell>
                        <TableCell align="justify">{subscriber.emailId}</TableCell>
                        <TableCell align="justify">{subscriber.mobileNo}</TableCell>
                        <TableCell align="center">
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
                        </TableCell>
                      </TableRow>
                    );
                  }
                })}
              </TableBody>
            </StyledTable>
          </Box>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Box className="text-center" width="100%" overflow="auto">
            {/* Table Section */}
            <StyledTable>
              <TableHead>
                <TableRow>
                  <TableCell align="justify">Lead Id</TableCell>
                  <TableCell align="justify">Client Name</TableCell>
                  <TableCell align="justify">Lead Name</TableCell>
                  <TableCell align="justify">Email</TableCell>
                  <TableCell align="justify">Mobile Number</TableCell>
                  <TableCell align="center">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {APIData.map((subscriber, index) => {
                  if (subscriber.statusName == "FollowUp") {
                    return (
                      <TableRow key={index}>
                        <TableCell align="justify">{subscriber.leadId}</TableCell>
                        <TableCell align="justify">{subscriber.clientName}</TableCell>
                        <TableCell align="justify">{subscriber.name}</TableCell>
                        <TableCell align="justify">{subscriber.emailId}</TableCell>
                        <TableCell align="justify">{subscriber.mobileNo}</TableCell>
                        <TableCell align="center">
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
            <StyledTable>
              <TableHead>
                <TableRow>
                  <TableCell align="justify">Lead Id</TableCell>
                  <TableCell align="justify">Client Name</TableCell>
                  <TableCell align="justify">Lead Name</TableCell>
                  <TableCell align="justify">Email</TableCell>
                  <TableCell align="justify">Mobile Number</TableCell>
                  <TableCell align="center">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {APIData.map((subscriber, index) => {
                  if (subscriber.statusName == "Meeting") {
                    return (
                      <TableRow key={index}>
                        <TableCell align="justify">{subscriber.leadId}</TableCell>
                        <TableCell align="justify">{subscriber.clientName}</TableCell>
                        <TableCell align="justify">{subscriber.name}</TableCell>
                        <TableCell align="justify">{subscriber.emailId}</TableCell>
                        <TableCell align="justify">{subscriber.mobileNo}</TableCell>
                        <TableCell align="center">
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
            <StyledTable>
              <TableHead>
                <TableRow>
                  <TableCell align="justify">Lead Id</TableCell>
                  <TableCell align="justify">Client Name</TableCell>
                  <TableCell align="justify">Lead Name</TableCell>
                  <TableCell align="justify">Email</TableCell>
                  <TableCell align="justify">Mobile Number</TableCell>
                  <TableCell align="center">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {APIData.map((subscriber, index) => {
                  if (subscriber.statusName == "Quotation") {
                    return (
                      <TableRow key={index}>
                        <TableCell align="justify">{subscriber.leadId}</TableCell>
                        <TableCell align="justify">{subscriber.clientName}</TableCell>
                        <TableCell align="justify">{subscriber.name}</TableCell>
                        <TableCell align="justify">{subscriber.emailId}</TableCell>
                        <TableCell align="justify">{subscriber.mobileNo}</TableCell>
                        <TableCell align="center">
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
            <StyledTable>
              <TableHead>
                <TableRow>
                  <TableCell align="justify">Lead Id</TableCell>
                  <TableCell align="justify">Client Name</TableCell>
                  <TableCell align="justify">Lead Name</TableCell>
                  <TableCell align="justify">Email</TableCell>
                  <TableCell align="justify">Mobile Number</TableCell>
                  <TableCell align="center">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {APIData.map((subscriber, index) => {
                  if (subscriber.statusName == "Ringing") {
                    return (
                      <TableRow key={index}>
                        <TableCell align="justify">{subscriber.leadId}</TableCell>
                        <TableCell align="justify">{subscriber.clientName}</TableCell>
                        <TableCell align="justify">{subscriber.name}</TableCell>
                        <TableCell align="justify">{subscriber.emailId}</TableCell>
                        <TableCell align="justify">{subscriber.mobileNo}</TableCell>
                        <TableCell align="center">
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
            <StyledTable>
              <TableHead>
                <TableRow>
                  <TableCell align="justify">Lead Id</TableCell>
                  <TableCell align="justify">Client Name</TableCell>
                  <TableCell align="justify">Lead Name</TableCell>
                  <TableCell align="justify">Email</TableCell>
                  <TableCell align="justify">Mobile Number</TableCell>
                  <TableCell align="center">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {APIData.map((subscriber, index) => {
                  if (subscriber.statusName == "Invoice") {
                    return (
                      <TableRow key={index}>
                        <TableCell align="justify">{subscriber.leadId}</TableCell>
                        <TableCell align="justify">{subscriber.clientName}</TableCell>
                        <TableCell align="justify">{subscriber.name}</TableCell>
                        <TableCell align="justify">{subscriber.emailId}</TableCell>
                        <TableCell align="justify">{subscriber.mobileNo}</TableCell>
                        <TableCell align="center">
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
            <StyledTable>
              <TableHead>
                <TableRow>
                  <TableCell align="justify">Lead Id</TableCell>
                  <TableCell align="justify">Client Name</TableCell>
                  <TableCell align="justify">Lead Name</TableCell>
                  <TableCell align="justify">Email</TableCell>
                  <TableCell align="justify">Mobile Number</TableCell>
                  <TableCell align="center">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {APIData.map((subscriber, index) => {
                  if (subscriber.statusName == "Invoice") {
                    return (
                      <TableRow key={index}>
                        <TableCell align="justify">{subscriber.leadId}</TableCell>
                        <TableCell align="justify">{subscriber.clientName}</TableCell>
                        <TableCell align="justify">{subscriber.name}</TableCell>
                        <TableCell align="justify">{subscriber.emailId}</TableCell>
                        <TableCell align="justify">{subscriber.mobileNo}</TableCell>
                        <TableCell align="center">
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
            <StyledTable>
              <TableHead>
                <TableRow>
                  <TableCell align="justify">Lead Id</TableCell>
                  <TableCell align="justify">Client Name</TableCell>
                  <TableCell align="justify">Lead Name</TableCell>
                  <TableCell align="justify">Email</TableCell>
                  <TableCell align="justify">Mobile Number</TableCell>
                  <TableCell align="center">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {APIData.map((subscriber, index) => {
                  if (subscriber.statusName == "Drop") {
                    return (
                      <TableRow key={index}>
                        <TableCell align="justify">{subscriber.leadId}</TableCell>
                        <TableCell align="justify">{subscriber.clientName}</TableCell>
                        <TableCell align="justify">{subscriber.name}</TableCell>
                        <TableCell align="justify">{subscriber.emailId}</TableCell>
                        <TableCell align="justify">{subscriber.mobileNo}</TableCell>
                        <TableCell align="center">
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
                        </TableCell>
                      </TableRow>
                    );
                  }
                })}
              </TableBody>
            </StyledTable>
          </Box>
        </TabPanel>
        <TabPanel value={value} index={8}>
          <Box className="text-center" width="100%" overflow="auto">
            {/* Table Section */}
            <StyledTable>
              <TableHead>
                <TableRow>
                  <TableCell align="justify">Lead Id</TableCell>
                  <TableCell align="justify">Client Name</TableCell>
                  <TableCell align="justify">Lead Name</TableCell>
                  <TableCell align="justify">Email</TableCell>
                  <TableCell align="justify">Mobile Number</TableCell>
                  <TableCell align="center">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {APIData.map((subscriber, index) => {
                  if (subscriber.statusName == "Closed") {
                    return (
                      <TableRow key={index}>
                        <TableCell align="justify">{subscriber.leadId}</TableCell>
                        <TableCell align="justify">{subscriber.clientName}</TableCell>
                        <TableCell align="justify">{subscriber.name}</TableCell>
                        <TableCell align="justify">{subscriber.emailId}</TableCell>
                        <TableCell align="justify">{subscriber.mobileNo}</TableCell>
                        <TableCell align="center">
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
                        </TableCell>
                      </TableRow>
                    );
                  }
                })}
              </TableBody>
            </StyledTable>
          </Box>
        </TabPanel>
        <Box>
          {/* Import Excel File Dialog Start */}
          <Box>
            <Row>
              <Col>

              </Col>
            </Row>
          </Box>
          {/* Import Excel File Dialog End */}

        </Box>
      </Container>
    </SimpleCard>
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
