import { styled } from '@mui/system';
import { Breadcrumb } from 'app/components';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Row, Col, Modal, InputGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import LeadCards from './cardLeads';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import AssignEmployee from './LeadAssign/EmployeeAssign';
import UnAssignEmployee from './LeadAssign/UnAssignEmployee';
import { FormControl, Autocomplete, TextField } from '@mui/material';
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

const Container = styled('div')(({ theme }) => ({
  margin: '30px',
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
const AssignLead = () => {
  const [obj1, setObj1] = useState(null);
  // const [obj2, setObj2] = useState(null);
  const [APIData, setAPIData] = useState([]);
  const [show, setShow] = useState(false);
  const [assign, setAssign] = useState(false);
  const [assignTo, setAssignTo] = useState([]);
  //Dialog Form
  const handleCloseAssign = () => setAssign(false);
  const handleShowAssign = (subscriber) => {
    setObj1(subscriber);
    setAssign(true);
  };
  const handleClose = () => setShow(false);
  const handleShow = (subscriber) => {
    setObj1(subscriber);
    setShow(true);
  };
  const [value, setValue] = useState(0);

  const handleCChange = (event, newValue) => {
    setValue(newValue);
  };

  //get method
  const items = localStorage.getItem('accessToken');
  useEffect(() => {
    axios
      .post(`http://35.89.6.16:4002/api/getFilteredLeadData`, {
        leadId: 0,
        userId: 0,
        statusId: 0,
      }, { headers: { "x-access-token": items } })
      .then((response) => {
        setAPIData(response.data.data);
      });
  }, [APIData]);

  useEffect(() => {
    axios.get(`http://35.89.6.16:4002/api/getMasterData?masterName=usermaster`, { headers: { "x-access-token": items } }).then((res) => {
      for (var i = 0; i < res.data.data.length; i++) {
        setAssignTo(current => [...current, res.data.data[i].firstName + " " + res.data.data[i].lastName]);
      }
    });
  }, [])

  return (
    <Container>
      {/* <Box> */}
      <Box className="breadcrumb">
        <Breadcrumb
          routeSegments={[
            { name: 'Manage Leads', path: '/leads/manageLeads' },
            { name: 'Assign Leads Detail Page' },
          ]}
        />
      </Box>
      <Box>
        <Row>
          <Col>
            <Form.Label htmlFor="basic-url">Apply Filter Search</Form.Label>
            <br></br>
            <button type="button" className="btn btn-outline-success">
              Last Day
            </button>
            &nbsp;
            <button type="button" className="btn btn-outline-success">
              Last Week
            </button>
            &nbsp;
            <button type="button" className="btn btn-outline-success">
              Last Month
            </button>
            &nbsp;
          </Col>
          <Col md="8">
            <Form.Label htmlFor="basic-url">Search Box</Form.Label>
            <InputGroup className="mb-3">
              <Form.Control
                placeholder="Search Box"
                aria-label="Recipient's username"
                aria-describedby="basic-addon2"
              />
              {/* &nbsp;
                <button type="button" className="btn btn-success">
                  ADD
                </button> */}
            </InputGroup>
          </Col>
        </Row>
        <Row>
          <Col>
            <LeadCards />
          </Col>
        </Row>
      </Box>

      {/* Tab Section */}
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleCChange} aria-label="basic tabs example">
          <Tab label="Assigned Leads" {...a11yProps(0)} />
          <Tab label="Un-Assigned Leads" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        {/* First Tab */}
        {/* <Box className="text-center" width="100%" overflow="auto"> */}
        {/* Table Section */}
        <StyledTable>
          <TableHead>
            <TableRow>
              <TableCell align="justify">Lead Id</TableCell>
              <TableCell align="justify">Lead Name</TableCell>
              <TableCell align="justify">Customer Name</TableCell>
              <TableCell align="justify">Assign Employee</TableCell>
              <TableCell align="justify">Mobile No</TableCell>
              <TableCell align="center">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {APIData.map((subscriber, index) => {
              if (subscriber.assignedUser) {
                return (
                  <TableRow key={index}>
                    <TableCell align="justify">{subscriber.leadId}</TableCell>
                    <TableCell align="justify">{subscriber.name}</TableCell>
                    <TableCell align="justify"></TableCell>
                    <TableCell align="justify">{subscriber.assignedUser}</TableCell>
                    <TableCell align="justify">{subscriber.mobileNo}</TableCell>
                    <TableCell align="center">
                      <IconButton onClick={() => handleShowAssign(subscriber)}>
                        <Icon color="success">edit</Icon>
                      </IconButton>
                    </TableCell>
                  </TableRow>
                );
              }
            })}
          </TableBody>
        </StyledTable>
        {/* </Box> */}
      </TabPanel>
      {/* Second Tab */}
      <TabPanel value={value} index={1}>
        {/* <Box className="text-center" width="100%" overflow="auto"> */}
        {/* Inactive Table Section */}
        <Row>
          <Col md="6">
            <InputGroup className="mb-3">
              <Form.Control aria-label="Starting Lead ID" placeholder="Starting Lead ID" />
              <InputGroup.Text>To</InputGroup.Text>

              <Form.Control aria-label="Last Lead ID" placeholder="Last Lead ID" />
            </InputGroup>
          </Col>
          <Col>
            <button type="button" className="btn btn-success">
              Select
            </button>
          </Col>
        </Row>
        <StyledTable>
          <TableHead>
            <TableRow>
              {/* <TableCell align="justify">Select</TableCell> */}
              <TableCell align="justify">Lead Id</TableCell>
              <TableCell align="justify">Lead Name</TableCell>
              <TableCell align="justify">Customer Name</TableCell>
              <TableCell align="justify">Created Date</TableCell>
              <TableCell align="center">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {APIData.map((subscriber, index) => {
              if (subscriber.assignedUser == null) {
                return (
                  <TableRow key={index}>
                    {/* <TableCell align="justify">
                    <Form.Check type="switch" id="custom-switch" label="" />
                  </TableCell> */}
                    <TableCell align="justify">{subscriber.leadId}</TableCell>
                    <TableCell align="justify">{subscriber.name}</TableCell>
                    <TableCell align="justify">{subscriber.emailId}</TableCell>
                    <TableCell align="justify">{subscriber.mobileNo}</TableCell>
                    <TableCell align="center">
                      <IconButton onClick={() => handleShow(subscriber)}>
                        <Icon color="success">edit</Icon>
                      </IconButton>
                    </TableCell>
                  </TableRow>
                );
              }
            })}
          </TableBody>
        </StyledTable>
        {/* </Box> */}
      </TabPanel>
      <Modal
        show={assign}
        onHide={handleCloseAssign}
        backdrop="static"
        keyboard={false}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header>
          <Modal.Title>Assigned Employee</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AssignEmployee theAssignedData={obj1}></AssignEmployee>
        </Modal.Body>
        <Modal.Footer>
          {/* <button
            type="submit"
            className="btn btn-success"
            style={{ marginTop: 5 + 'px' }}
            onClick={handleCloseAssign}
          >
            Re-Assign
          </button> */}
          <button
            type="submit"
            className="btn btn-error"
            style={{ marginTop: 5 + 'px' }}
            onClick={handleCloseAssign}
          >
            Cancel
          </button>
        </Modal.Footer>
      </Modal>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header>
          <Modal.Title>Unassigned Employee</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <UnAssignEmployee theUnAssignData={obj1}></UnAssignEmployee>
        </Modal.Body>
        <Modal.Footer>
          <button
            type="submit"
            className="btn btn-error"
            style={{ marginTop: 5 + 'px' }}
            onClick={handleClose}
          >
            Cancel
          </button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default AssignLead;
