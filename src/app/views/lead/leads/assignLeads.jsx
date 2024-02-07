import { styled, alpha } from '@mui/material/styles';
import Menu from '@mui/material/Menu';
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
  Grid,
  Button,
  MenuItem,
} from '@mui/material';
import { BASE_URL } from 'app/utils/constant';

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';


const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    {...props}
  />
))(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color:
      theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
    boxShadow:
      'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
    '& .MuiMenu-list': {
      padding: '4px 0',
    },
    '& .MuiMenuItem-root': {
      '& .MuiSvgIcon-root': {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      '&:active': {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity,
        ),
      },
    },
  },
}));
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
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose5 = () => {
    setAnchorEl(null);
  };

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

  const getFetchLeadData = () => {
    axios
      .post(BASE_URL + `/api/getFilteredLeadData`, {
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
  }

  const getUserMaster = () => {
    axios.get(BASE_URL + `/api/getMasterData?masterName=usermaster`, { headers: headers }).then((res) => {
      for (var i = 0; i < res.data.status.length; i++) {
        setAssignTo(current => [...current, res.data.status[i].firstName + " " + res.data.status[i].lastName]);
        setId1(current => [...current, res.data.status[i].userId, res.data.status[i].firstName + " " + res.data.status[i].lastName])
      }
    });
  }

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
    axios.post(BASE_URL + `/api/assignBulkLeads`,
      bulkAssign, { headers: headers })
      .then(() => useEffect);
    blankForm();
  };
  const [selectedDate, setSelectedDate] = useState(defaultValue)
  const searchLeadByEmp = () => {
    const leadByEmp = {
      selectedDate: selectedDate
    }
    axios.post(BASE_URL + `/api/getLeadsByEmployee`,
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
    axios.post(BASE_URL + `/api/transferLeads`,
      emp, { headers: headers })
      .then((response) => {
        setAPIDataEmp(response.data.data);
      });
    setAssign(false)
  }

  const [count, setCount] = useState({})

  const getMasterCount = () => {
    axios.get(BASE_URL + `/api/getStageCount`,
      { headers: headers })
      .then((response) => {
        setCount(response.data);
      });
  }

  useEffect(() => {
    getUserMaster()
    getFetchLeadData()
    getMasterCount()
  }, [searchBox, locationkey, onType,]);

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
      <Grid container spacing={4} sx={{ mb: '24px' }}>

        <Grid item xs={12} md={4} >
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
        </Grid>
        <Grid item xs={12} md={6} >
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
        </Grid>
        <Grid item xs={12} md={2} style={{ marginTop: '30px' }}>
          <Button
            id="demo-customized-button"
            size='large'
            aria-controls={open ? 'demo-customized-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            variant="contained"
            disableElevation
            onClick={handleClick}
            endIcon={<KeyboardArrowDownIcon />}
          >
            Apply Filter
          </Button>
          <StyledMenu
            id="demo-customized-menu"
            MenuListProps={{
              'aria-labelledby': 'demo-customized-button',
            }}
            className="d-flex justify-content-end"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose5}
          >
            <MenuItem
              onClick={() => { setOnType('DEFAULT'); getFetchLeadData(); handleClose5() }} disableRipple>
              DEFAULT
            </MenuItem>
            <MenuItem
              onClick={() => { setOnType('LASTDAY'); getFetchLeadData(); handleClose5() }} disableRipple>
              LASTDAY
            </MenuItem>
            <MenuItem
              onClick={() => { setOnType('LASTWEEK'); getFetchLeadData(); handleClose5() }} disableRipple>
              LASTWEEK
            </MenuItem>
            <MenuItem
              onClick={() => { setOnType('LASTMONTH'); getFetchLeadData(); handleClose5() }} disableRipple>
              LASTMONTH
            </MenuItem>
          </StyledMenu>&nbsp;
        </Grid>
      </Grid>

      {/* Tab Section */}
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleCChange} variant="fullWidth" aria-label="basic tabs example">
          <Tab label={"Un-Assigned Leads" + " [" + (count.unassigned ? count.unassigned[0].unassigned_lead : null) + "]"}{...a11yProps(0)} />
          <Tab label={"Assigned Leads" + " [" + (count.assigned ? count.assigned[0].assigned_lead : null) + "]"}{...a11yProps(1)} />
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
