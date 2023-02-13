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
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import {
  Box,
  Icon,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  FormControl,
  TextField,
  Autocomplete,
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
  const today = new Date();
  const numberOfDaysToAdd = 0;
  const date = today.setDate(today.getDate() + numberOfDaysToAdd);
  const defaultValue = new Date(date).toISOString().split('T')[0]; // yyyy-mm-dd

  const [APIData, setAPIData] = useState([]);
  const [APIDataEmp, setAPIDataEmp] = useState([]);
  const [show, setShow] = useState(false);
  const [assign, setAssign] = useState(false);
  const [assignTo, setAssignTo] = useState([]);
  const [id1, setId1] = useState([]);
  const [myOptions3, setMyOptions3] = useState(null);

  const [idFrom, setIdFrom] = useState('');
  const [idTo, setIdTo] = useState('');
  const [userId, setUserId] = useState('');


  //Dialog Form
  const handleCloseAssign = () => setAssign(false);
  const handleShowAssign = () => {
    setAssign(true);
  };
  const handleClose = () => setShow(false);
  const handleShow = (subscriber) => {
    setShow(true);
  };
  const [value, setValue] = useState(0);

  const handleCChange = (event, newValue) => {
    setValue(newValue);
  };

  //get method
  const items = localStorage.getItem('accessToken');
  const roleCode = localStorage.getItem('roleCode');
  const userId1 = localStorage.getItem('userId');
  const headers = {
    "x-access-token": items,
    "roleCode": roleCode,
    "userId": userId1
  }
  const [onType, setOnType] = useState('')
  const [searchBox, setSearchBox] = useState('')
  const [locationkey, setLocationkey] = useState('')
  useEffect(() => {
    axios
      .post(`http://43.204.38.243:3001/api/getFilteredLeadData`, {
        leadId: 0,
        userId: 0,
        statusId: 0,
        searchKey: searchBox,
        locationkey: locationkey,
        platformId: 0,
        opType: onType
      }, { headers: headers })
      .then((response) => {
        setAPIData(response.data.data);
      });
  }, [APIData])

  useEffect(() => {
    axios.get(`http://43.204.38.243:3001/api/getMasterData?masterName=usermaster`, { headers: headers }).then((res) => {
      for (var i = 0; i < res.data.data.length; i++) {
        setAssignTo(current => [...current, res.data.data[i].firstName + " " + res.data.data[i].lastName]);
        setId1(current => [...current, res.data.data[i].userId, res.data.data[i].firstName + " " + res.data.data[i].lastName])
      }
    });
  }, []);

  const blankForm = () => {
    setIdFrom('');
    setIdTo('');
    setMyOptions3('');
  };

  const assignBulkLead = (e) => {
    var assignedid
    for (var i = 0; i < id1.length; i++) {
      if (myOptions3 == id1[i]) {
        assignedid = id1[i - 1]
      }
    }
    const bulkAssign = {
      idFrom: idFrom,
      idTo: idTo,
      userId: assignedid
    };
    e.preventDefault();
    axios.post(`http://43.204.38.243:3001/api/assignBulkLeads`,
      bulkAssign, { headers: headers })
      .then(() => useEffect);
    blankForm();
  };
  const [selectedDate, setSelectedDate] = useState(defaultValue)
  const searchLeadByEmp = () => {
    const leadByEmp = {
      selectedDate: selectedDate
    }
    axios.post(`http://43.204.38.243:3001/api/getLeadsByEmployee`,
      leadByEmp, { headers: headers })
      .then((response) => {
        setAPIDataEmp(response.data.data);
      });
  }
  const [fromEmp, setFromEmp] = useState('')
  const [toEmp, setToEmp] = useState('')
  const [remark, setRemark] = useState('')
  const [transferDate, setTransferDate] = useState('')

  const transferEmp = () => {
    const emp = {
      fromEmp: fromEmp,
      toEmp: toEmp,
      transferRemarks: remark,
      transferDate: transferDate,
    }
    axios.post(`http://43.204.38.243:3001/api/transferLeads`,
      emp, { headers: headers })
      .then((response) => {
        setAPIDataEmp(response.data.data);
      });
    setAssign(false)
  }

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
        <Row>
          {/* <Col>
            <LeadCards />
          </Col> */}
        </Row>
      </Box>

      {/* Tab Section */}
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleCChange} variant="fullWidth" aria-label="basic tabs example">
          <Tab label="Un-Assigned Leads" {...a11yProps(0)} />
          <Tab label="Assigned Leads" {...a11yProps(1)} />
          <Tab label="Employee Wise Leads" {...a11yProps(2)} />
        </Tabs>
      </Box>

      {/* First Tab */}
      <TabPanel value={value} index={0}>
        <Row>
          <Col md="8">
            <InputGroup className="mb-3">
              <Form.Control
                onChange={(e) => setIdFrom(e.target.value)}
                value={idFrom}
                placeholder="Starting Lead ID" />
              <InputGroup.Text>To</InputGroup.Text>

              <Form.Control
                placeholder="Last Lead ID"
                onChange={(e) => setIdTo(e.target.value)}
                value={idTo}
              />
              <InputGroup.Text><Icon>person</Icon></InputGroup.Text>
              <FormControl>
                {/* <Form.Label>Re-Assign</Form.Label> */}
                <Autocomplete
                  style={{ width: 330 }}
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
            </InputGroup>
          </Col>

          <Col>
            <button type="submit"
              onClick={assignBulkLead}
              className="btn btn-success">
              Assign
            </button>
          </Col>
        </Row>
        <StyledTable className="table table-striped table-bordered" style={{ 'borderRadius': '1px' }}>
          <TableHead style={{ borderLeft: '1px solid red', borderRight: '1px solid red' }} className='text-center'>
            <TableRow>
              <TableCell align="center">Lead Id</TableCell>
              <TableCell align="center">Lead Name</TableCell>
              <TableCell align="center">Platform Name</TableCell>
              <TableCell align="center">Interested In</TableCell>
              <TableCell align="center">Mobile No</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {APIData?.map((subscriber, index) => {
              if (subscriber.assignedUser == null) {
                return (
                  <TableRow key={index}>
                    <TableCell align="center">{subscriber.leadId}</TableCell>
                    <TableCell align="center">{subscriber.name}</TableCell>
                    <TableCell align="center">{subscriber.platformName}</TableCell>
                    <TableCell align="center">{subscriber.intrestedIn}</TableCell>
                    <TableCell align="center">{subscriber.mobileNo}</TableCell>
                  </TableRow>
                );
              }
            })}
          </TableBody>
        </StyledTable>
      </TabPanel>
      {/* Second Tab */}
      <TabPanel value={value} index={1}>
        <StyledTable className="table table-striped table-bordered" style={{ 'borderRadius': '1px' }}>
          <TableHead style={{ borderLeft: '1px solid red', borderRight: '1px solid red' }} className='text-center'>
            <TableRow>
              <TableCell align="center">Lead Id</TableCell>
              <TableCell align="center">Lead Name</TableCell>
              <TableCell align="center">Label Name</TableCell>
              <TableCell align="center">Assign Employee</TableCell>
              <TableCell align="center">Mobile No</TableCell>
              {/* <TableCell align="center">Action</TableCell> */}
            </TableRow>
          </TableHead>
          <TableBody>
            {APIData?.map((subscriber, index) => {
              if (subscriber.assignedUser) {
                return (
                  <TableRow key={index}>
                    <TableCell align="center">{subscriber.leadId}</TableCell>
                    <TableCell align="center">{subscriber.name}</TableCell>
                    <TableCell align="center">{subscriber.labelName}</TableCell>
                    <TableCell align="center">{subscriber.assignedUser}</TableCell>
                    <TableCell align="center">{subscriber.mobileNo}</TableCell>
                    {/* <TableCell align="center">
                      <IconButton onClick={() => handleShowAssign(subscriber)}>
                        <Icon color="success">edit</Icon>
                      </IconButton>
                    </TableCell> */}
                  </TableRow>
                );
              }
            })}
          </TableBody>
        </StyledTable>
      </TabPanel>
      {/* Third Tab */}
      <TabPanel value={value} index={2}>
        <Row>
          <Col>
            <span>Note : Please Select the Date and Search to view the record</span>
          </Col>
        </Row>
        <Row>
          <Col md="8">
            <InputGroup className="mb-3">
              <Form.Control
                onChange={(e) => setSelectedDate(e.target.value)}
                value={selectedDate}
                type='date'
              />
            </InputGroup>
          </Col>
          {/* <Col>
            </Col> */}
          <Col>
            <button type="button"
              onClick={searchLeadByEmp}
              className="btn btn-success">
              Search
            </button>&nbsp;
            <button
              type="button"
              className="btn btn-outline-primary"
              onClick={handleShowAssign}
            >
              Transfer Leads
            </button>
          </Col>

        </Row>
        <StyledTable className="table table-striped table-bordered" style={{ 'borderRadius': '1px' }}>
          <TableHead style={{ borderLeft: '1px solid red', borderRight: '1px solid red' }} className='text-center'>
            <TableRow>
              <TableCell align="center">Employee Id</TableCell>
              <TableCell align="center">Employee Name</TableCell>
              <TableCell align="center">Total Count</TableCell>
              {/* <TableCell align="center">Action</TableCell> */}
            </TableRow>
          </TableHead>
          <TableBody>
            {APIDataEmp?.map((subscriber, index) => {
              // if (subscriber.assignedUser) {
              return (
                <TableRow key={index}>
                  <TableCell align="center">{subscriber.empId}</TableCell>
                  <TableCell align="center">{subscriber.employeeName}</TableCell>
                  <TableCell align="center">{subscriber.assignedLeads}</TableCell>
                  {/* <TableCell align="center">
                    <IconButton onClick={() => handleShowAssign(subscriber)}>
                      <Icon color="success">edit</Icon>
                    </IconButton>
                  </TableCell> */}
                </TableRow>
              );
            })}
          </TableBody>
        </StyledTable>

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
          <Modal.Title>Transfer Lead</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col>
              <Form.Label>Current Employee ID</Form.Label>
              <Form.Control
                onChange={(e) => setFromEmp(e.target.value)}
                value={fromEmp}
                placeholder="Enter the Current Employee ID"
              />
            </Col>
            <Col>
              <Form.Label>New Employee ID</Form.Label>
              <Form.Control
                onChange={(e) => setToEmp(e.target.value)}
                value={toEmp}
                placeholder="Enter the New Employee Id"
              />
            </Col>
          </Row>
          <Row className='mt-2'>
            <Col>
              <Form.Label>Select the Date (For Which you have to Transfer Lead)</Form.Label>
              <Form.Control
                onChange={(e) => setTransferDate(e.target.value)}
                value={transferDate}
                type='date'
              />
            </Col>
          </Row>
          <Row className='mt-2'>
            <Col>
              <Form.Label>Remark</Form.Label>
              <Form.Control
                as="textarea"
                rows={1}
                onChange={(e) => setRemark(e.target.value)}
                value={remark}
                placeholder="Remark"
              />
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <button type="submit"
            onClick={transferEmp}
            className="btn btn-success">
            Transfer Employee
          </button>&nbsp;
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
    </Container>
  );
};

export default AssignLead;
