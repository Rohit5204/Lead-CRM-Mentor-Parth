import { SimpleCard, Breadcrumb } from 'app/components';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ClearIcon from '@mui/icons-material/Clear';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import { Form, Modal, InputGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import PropTypes from 'prop-types';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import StatusChange from './statusChange';
import FollowupStatusChange from './followupStatus';
import MettingStatusChange from './meetingStatusChange';
import LeadStatus from './leadStatus';
import {
  Box,
  Icon,
  IconButton,
  Table,
  TableBody,
  Chip,
  Button,
  TableCell,
  TableHead,
  TableRow,
  MenuItem,
  Grid,
} from '@mui/material';
import { BASE_URL } from 'app/utils/constant';
import { styled, alpha } from '@mui/material/styles';
import Menu from '@mui/material/Menu';
import ImportLead from './importLead';
import LeadForm from './addLeads';
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
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose5 = () => {
    setAnchorEl(null);
  };

  // Add Form Dailog
  const [showAdd, setShowAdd] = useState(false);

  const closeAdd = () => setShowAdd(false);
  const openAdd = () => setShowAdd(true);


  // Import Dailog
  const [show1, setShow1] = useState(false);

  const closeImport = () => setShow1(false);
  const showImport = () => setShow1(true);

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
    axios.post(BASE_URL + `/api/getFilteredLeadData`, {
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

  const [leadStatus, setLeadStatus] = useState(null);
  const [showLeadSatus, setLeadSatus] = useState(false);

  const handleShowLead = (subscriber) => {
    setLeadStatus(subscriber);
    setLeadSatus(true);
  };
  const handleCloseLead = () => { setLeadSatus(false); }


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

  const [abc, setABC] = useState({})
  const getMasterCount = () => {
    axios.get(BASE_URL + `/api/getManageLeadCount?userId=` + userId,
      { headers: { "x-access-token": items, "roleCode": roleCode, "userId": userId } })
      .then((response) => {
        setABC(response.data);
      });
  }
  useEffect(() => {
    getMasterCount()
    getFetchLeadData()
  }, [APIData]);

  return (
    <>
      <SimpleCard>
        <Box className="breadcrumb">

          <Breadcrumb
            routeSegments={[{ name: 'Dashboard', path: '/dashboard/default' }, { name: 'Manage Leads' }]}
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
          <Grid item xs={12} md={4} >
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
          <Grid item xs={12} md={4} style={{ marginTop: '30px' }}>
            <div className="d-flex justify-content-end">
              <Button
                id="demo-customized-button"
                size='small'
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
              <Button
                id="demo-customized-button"
                size='small'
                color="success"
                variant="contained"
                disableElevation
                onClick={showImport}

              >
                Import Leads
              </Button>&nbsp;
              <Button
                id="demo-customized-button"
                size='small'
                color="success"
                variant="contained"
                disableElevation
                onClick={openAdd}
              >
                Add Lead
              </Button>
            </div>
          </Grid>
        </Grid>

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
              <Tab label={"Lead" + " [" + (abc.lead ? abc.lead[0].lead_count : 0) + "]"}{...a11yProps(0)} />
              <Tab label={"Followup" + " [" + (abc.followup ? abc.followup[0].followup_count : 0) + "]"} {...a11yProps(1)} />
              <Tab label={"FT (Meeting)" + " [" + (abc.meeting ? abc.meeting[0].meeting_count : 0) + "]"} {...a11yProps(2)} />
              <Tab label={"Ringing" + " [" + (abc.ringing ? abc.ringing[0].ringing_count : 0) + "]"} {...a11yProps(3)} />
              <Tab label={"AT (Quotation)" + " [0" + "]"} {...a11yProps(4)} />
              <Tab label={"Invoice" + " [0" + "]"} {...a11yProps(5)} />
              <Tab label={"Closed (Paid)" + " [" + (abc.closed ? abc.closed[0].closed_lead : 0) + "]"} {...a11yProps(6)} />
              <Tab label={"Drop" + " [0" + "]"}{...a11yProps(7)} />
              {/* <Tab label={"Drop" + " [" + (abc.drop ? abc.drop[0].drop_count : 0) + "]"}{...a11yProps(8)} /> */}
              {/* <Tab label={"Invoice" + " [" + (abc.invoice ? abc.invoice[0].invoice : 0) + "]"} {...a11yProps(5)} /> */}

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
                    <TableCell align="center">Amount</TableCell>
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
                          <TableCell align="center">₹ {subscriber.expectedAmount}</TableCell>
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
                                    <Icon color="primary">visibility</Icon>
                                  </IconButton>
                                  <IconButton onClick={() => handleShowLead(subscriber)}>
                                    <WhatsAppIcon color='success' />
                                  </IconButton>
                                </Link>

                                </>
                              }
                              else {
                                return <>
                                  <Link to="/leads/viewLeads" state={subscriber}>
                                    <IconButton>
                                      <Icon color="primary">visibility</Icon>
                                    </IconButton>
                                  </Link>
                                  <Link to="/leads/editLead" state={subscriber}>
                                    <IconButton>
                                      <Icon>edit</Icon>
                                    </IconButton>
                                  </Link>
                                  <IconButton onClick={() => handleShowLead(subscriber)}>
                                    <WhatsAppIcon color='success' />
                                  </IconButton>
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
                    <TableCell align="center">Amount</TableCell>
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
                          <TableCell align="center">₹ {subscriber.expectedAmount}</TableCell>
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
                    <TableCell align="center">Amount</TableCell>
                    <TableCell align="center">Status</TableCell>
                    <TableCell align="center">Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {APIData.map((subscriber, index) => {
                    if (subscriber.statusName == "FT (Meeting)") {
                      return (
                        <TableRow key={index}>
                          <TableCell align="center">{subscriber.leadId}</TableCell>
                          <TableCell align="center">{subscriber.name}</TableCell>
                          <TableCell align="center">{subscriber.emailId}</TableCell>
                          <TableCell align="center">{subscriber.mobileNo}</TableCell>
                          <TableCell align="center">₹ {subscriber.expectedAmount}</TableCell>
                          <TableCell align="center">
                            {(function () {
                              if (subscriber.statusName == "FT (Meeting)") {
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
                    <TableCell align="center">Amount</TableCell>
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
                          <TableCell align="center">₹ {subscriber.expectedAmount}</TableCell>
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
                    <TableCell align="center">Amount</TableCell>
                    <TableCell align="center">Status</TableCell>
                    <TableCell align="center">Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {APIData.map((subscriber, index) => {
                    if (subscriber.statusName == "AT (Quotation)") {
                      return (
                        <TableRow key={index}>
                          <TableCell align="center">{subscriber.leadId}</TableCell>
                          <TableCell align="center">{subscriber.name}</TableCell>
                          <TableCell align="center">{subscriber.emailId}</TableCell>
                          <TableCell align="center">{subscriber.mobileNo}</TableCell>
                          <TableCell align="center">₹ {subscriber.expectedAmount}</TableCell>
                          <TableCell align="center">
                            {(function () {
                              if (subscriber.statusName == "AT (Quotation)") {
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
                    <TableCell align="center">Amount</TableCell>
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
                          <TableCell align="center">₹ {subscriber.expectedAmount}</TableCell>
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
                                  <Link to="/leads/transaction/addTransaction" state={subscriber}>
                                    <IconButton>
                                      <CurrencyRupeeIcon color='primary' />
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
                                  <Link to="/leads/transaction/addTransaction" state={subscriber}>
                                    <IconButton>
                                      <CurrencyRupeeIcon color='primary' />
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
                    <TableCell align="center">Amount</TableCell>
                    <TableCell align="center">Status</TableCell>
                    <TableCell align="center">Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {APIData.map((subscriber, index) => {
                    if (subscriber.statusName == "Closed (Paid)") {
                      return (
                        <TableRow key={index}>
                          <TableCell align="center">{subscriber.leadId}</TableCell>
                          <TableCell align="center">{subscriber.name}</TableCell>
                          <TableCell align="center">{subscriber.emailId}</TableCell>
                          <TableCell align="center">{subscriber.mobileNo}</TableCell>
                          <TableCell align="center">₹ {subscriber.expectedAmount}</TableCell>
                          <TableCell align="center">
                            {(function () {
                              if (subscriber.statusName == "Closed (Paid)") {
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
                                  <Link to="/leads/transaction/addTransaction" state={subscriber}>
                                    <IconButton>
                                      <CurrencyRupeeIcon color='primary' />
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
                    <TableCell align="center">Amount</TableCell>
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
                          <TableCell align="center">₹ {subscriber.expectedAmount}</TableCell>
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

          <Modal
            show={showLeadSatus}
            onHide={handleCloseLead}
            backdrop="static"
            keyboard={false}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"

          >
            <Modal.Header>
              <Modal.Title>Share Company Detail's</Modal.Title>
              <IconButton type="button" onClick={handleCloseLead}>
                <ClearIcon />
              </IconButton>
            </Modal.Header>
            <Modal.Body>
              <LeadStatus theLeadStatus={leadStatus} handleDialog={handleCloseLead}></LeadStatus>
            </Modal.Body>
          </Modal>

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
        {/* Import Dialog */}
        <Modal
          backdrop="static"
          keyboard={false}
          show={show1}
          onHide={closeImport}
          animation={false}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header>
            <Modal.Title>Upload Excel File</Modal.Title>
            <IconButton type="button" onClick={closeImport}>
              <ClearIcon />
            </IconButton>
          </Modal.Header>
          <Modal.Body>
            <ImportLead handleDialog={closeImport}></ImportLead>
          </Modal.Body>
        </Modal>
        {/* Add Dialog */}
        <Modal
          backdrop="static"
          keyboard={false}
          show={showAdd}
          onHide={closeAdd}
          animation={false}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header>
            <Modal.Title>Add Lead </Modal.Title>
            <IconButton type="button" onClick={closeAdd}>
              <ClearIcon />
            </IconButton>
          </Modal.Header>
          <Modal.Body>
            <LeadForm handleDialog={closeAdd}></LeadForm>
          </Modal.Body>
        </Modal>

      </SimpleCard>
    </>
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
