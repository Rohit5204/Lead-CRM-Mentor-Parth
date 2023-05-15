import { styled, alpha } from '@mui/system';
import { Breadcrumb } from 'app/components';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CompletedManageQuotation from './completedQuotationList';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import { useNavigate } from 'react-router-dom';
import { Form, Modal, InputGroup } from 'react-bootstrap';
import ViewQuotation from './viewQuotation';
import SendQuotationMail from './sendMail';
import ClearIcon from '@mui/icons-material/Clear';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import StatusChange from './statusChange';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import {
  Box,
  Button,
  Chip,
  Grid,
  Menu,
  Icon,
  IconButton,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
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

const ManageQuotation = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose5 = () => {
    setAnchorEl(null);
  };

  const navigate = useNavigate();
  const changePage = () => {
    navigate('/quotations/addQuotation');
  };
  const [showForm, setShowForm] = useState(false);
  const [value, setValue] = useState(0);

  const handleCChange = (event, newValue) => {
    setValue(newValue);
  };

  const showForm1 = () => {
    setShowForm(!showForm);
  };
  const [obj1, setObj1] = useState(null);
  const [sendMailObj, setSendMailObj] = useState(null);
  const [APIData, setAPIData] = useState([]);
  const [show, setShow] = useState(false);
  const [showMail, setShowMail] = useState(false);
  //Dialog Form
  const handleClose = () => setShow(false);
  const handleCloseMail = () => setShowMail(false);

  const handleSendMail = (quotation) => {
    setSendMailObj(quotation);
    setShowMail(true);
  };
  const handleShow = (quotation) => {
    setObj1(quotation);
    setShow(true);
  };
  const items = localStorage.getItem('accessToken');
  const roleCode = localStorage.getItem('roleCode');
  const userId = localStorage.getItem('userId');
  const headers = {
    "x-access-token": items,
    "roleCode": roleCode,
    "userId": userId
  }

  const columns = [
    { field: 'quotationNumber', headerName: 'Quotation No', width: 180 },
    { field: 'billTo', headerName: 'Client Name', width: 240 },
    { field: 'gsName', headerName: 'Product Name', width: 240 },
    { field: 'clientContact', headerName: 'Mobile Number', width: 240 },
    {
      field: 'grandTotal',
      headerName: 'Total Amount',
      description: 'This column has a value getter and is not sortable.',
      width: 180,
    },
    {
      field: 'action',
      headerName: 'Action',
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <IconButton onClick={(e) => handleSendMail(e, params.row)}>
              <Icon color="primary">send</Icon>
            </IconButton>
            <IconButton onClick={(e) => handleShow(e, params.row)}>
              <Icon color="success">visibility</Icon>
            </IconButton>
          </>
          // <Icon color="success" onClick={(e) => handleShow(e, params.row)}>edit</Icon>

        );
      }
    },
  ];
  const [onType, setOnType] = useState('')
  //get method  http://35.89.6.16:4002/api
  const [searchBox, setSearchBox] = useState('')
  // const searchData = (value) => {
  //   if (value != '') {
  //     var j = APIData.filter(x => x.quotationNumber == value || x.gsName == value || x.quotationDate == value || x.billTo == value || x.clientContact == value || x.grandTotal == value)
  //     setAPIData(j)
  //   }
  // }
  const fetchAllLead = () => {
    axios.post(BASE_URL + `/api/getQuotationData`,
      {
        quotationId: 0, empId: 0, statusId: 1, searchKey: searchBox, opType: onType
      }, { headers: headers })
      .then((response) => {
        setAPIData(response.data.data);
      });
  }
  const [sendListData, setSendListData] = useState([])
  const fetchSendList = () => {
    axios.post(BASE_URL + `/api/getQuotationData`,
      {
        quotationId: 0, empId: 0, statusId: 2, searchKey: searchBox, opType: onType
      }, { headers: headers })
      .then((response) => {
        setSendListData(response.data.data);
      });
  }
  const [QuotationStatusData, setQuotationStatusData] = useState([])

  useEffect(() => {
    fetchAllLead()
  }, [APIData]);
  useEffect(() => {
    fetchSendList()
  }, [sendListData]);
  useEffect(() => {
    axios.post(BASE_URL + `/api/getFilteredLeadData`, {
      leadId: 0,
      userId: 0,
      statusId: 4,
      searchKey: searchBox,
      locationkey: "",
      platformId: 0,
      opType: onType
    }, { headers: { "x-access-token": items, "roleCode": roleCode, "userId": userId } })
      .then((response) => {
        setQuotationStatusData(response.data.data);
      });
  }, [QuotationStatusData]);
  const [obj2, setObj2] = useState(null);
  const [showSatusForm, setSatusForm] = useState(false);
  const handleShowStatus = (subscriber) => {
    setObj2(subscriber);
    setSatusForm(true);
  };
  const handleCloseStatus = () => {
    setSatusForm(false);
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
    getMasterCount()
  }, []);
  return (
    <Container>
      <Box>
        <Box className="breadcrumb">

          <Breadcrumb
            routeSegments={[{ name: 'Dashboard', path: '/dashboard/default' }, { name: 'Quotation', path: '/quotations/manageQuotation' }, { name: 'Manage Quoation List' }]}
          />
        </Box>

        <Grid container spacing={4} sx={{ mb: '24px' }}>

          <Grid item xs={12} md={9} >
            <Form.Label htmlFor="basic-url">Search Box</Form.Label>
            <br></br>
            <InputGroup className="mb-3">
              <Form.Control
                placeholder="Search By Quotation Number, Client Name, Product Name, Mobile Number & Amount"
                aria-label="Recipient's username"
                aria-describedby="basic-addon2"
                value={searchBox}
                onChange={(e) => setSearchBox(e.target.value)}
              />
            </InputGroup>
          </Grid>
          <Grid item xs={12} md={3} style={{ marginTop: '30px' }}>

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
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose5}
            >
              <MenuItem
                onClick={() => { setOnType('DEFAULT'); fetchAllLead(); handleClose5() }} disableRipple>
                DEFAULT
              </MenuItem>
              <MenuItem
                onClick={() => { setOnType('LASTDAY'); fetchAllLead(); handleClose5() }} disableRipple>
                LASTDAY
              </MenuItem>
              <MenuItem
                onClick={() => { setOnType('LASTWEEK'); fetchAllLead(); handleClose5() }} disableRipple>
                LASTWEEK
              </MenuItem>
              <MenuItem
                onClick={() => { setOnType('LASTMONTH'); fetchAllLead(); handleClose5() }} disableRipple>
                LASTMONTH
              </MenuItem>
            </StyledMenu>
            &nbsp;
            <Button
              id="demo-customized-button"
              size='large'
              color="success"
              variant="contained"
              disableElevation
              onClick={changePage}
            >
              Quotation
            </Button>

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
              <Tab label="Request For Quotation" {...a11yProps(0)} />
              <Tab label={"Draft Quotation" + " [" + (count.draftQuotation ? count.draftQuotation[0].draft_quotation : 0) + "]"} {...a11yProps(1)} />
              <Tab label={"Send Quotation" + " [" + (count.sentQuotation ? count.sentQuotation[0].sent_quotation : 0) + "]"} {...a11yProps(2)} />
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
                  {QuotationStatusData.map((subscriber, index) => {
                    if (subscriber.statusName == "AT (Quotation)") {
                      return (
                        <TableRow key={index}>
                          <TableCell align="center">{subscriber.leadId}</TableCell>
                          <TableCell align="center">{subscriber.name}</TableCell>
                          <TableCell align="center">{subscriber.emailId}</TableCell>
                          <TableCell align="center">{subscriber.mobileNo}</TableCell>
                          <TableCell align="center">{subscriber.intrestedIn}</TableCell>
                          <TableCell align="center">
                            {(function () {
                              if (subscriber.statusName == "AT (Quotation)") {
                                return <Chip label="Quotation" color="primary" onClick={(e) => handleShowStatus(subscriber)} />;
                              }
                              else {
                                return <Chip label="Not Listed" color="error" />
                              }
                            })()}
                          </TableCell>
                          <TableCell align="center">
                            <Link to="/quotations/viewQuotationLead" state={subscriber}>
                              <IconButton>
                                <Icon style={{ color: 'orange' }}>visibility</Icon>
                              </IconButton>
                            </Link>
                            <Link to="/quotations/addleadQuotation" state={subscriber}>
                              <IconButton>
                                <NoteAddIcon color="success"></NoteAddIcon>
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
              {/* <h4>Draft Quotation Table</h4> */}
              {/* <div style={{ height: 570, width: '100%' }}>
                <DataGrid
                  rows={APIData}
                  columns={columns}
                  pageSize={10}
                  rowsPerPageOptions={[10]}
                />
              </div> */}
              <StyledTable className="table table-striped table-bordered" style={{ 'borderRadius': '2px' }}>
                <TableHead style={{ borderLeft: '1px solid red', borderRight: '1px solid red' }} className='text-center'>

                  <TableRow>
                    <TableCell align="center">Quotation No</TableCell>

                    <TableCell align="center">Quotation Date</TableCell>
                    <TableCell align="center">Customer Name</TableCell>
                    <TableCell align="center">Product Name</TableCell>
                    <TableCell align="center">Mobile No</TableCell>
                    <TableCell align="center">Total Amount</TableCell>

                    <TableCell align="center">Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {APIData.map((quotation, index) => {
                    return (
                      <TableRow key={index}>
                        <TableCell align="center">{quotation.quotationNumber}</TableCell>

                        <TableCell align="center">{new Date(quotation.quotationDate).toLocaleDateString('en-GB')}</TableCell>
                        <TableCell align="center">{quotation.billTo}</TableCell>
                        <TableCell align="center">{quotation.gsName}</TableCell>

                        <TableCell align="center">{quotation.clientContact}</TableCell>
                        <TableCell align="center">{quotation.grandTotal}</TableCell>
                        <TableCell align="center">
                          <IconButton onClick={() => handleSendMail(quotation)}>
                            <Icon color="primary">send</Icon>
                          </IconButton>
                          <IconButton onClick={() => handleShow(quotation)}>
                            <Icon color="success">visibility</Icon>
                          </IconButton>

                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </StyledTable>
            </Box>
          </TabPanel>
          <TabPanel value={value} index={2}>
            <Box className="text-center" width="100%" overflow="auto">
              {/* Table Section */}

              <StyledTable className="table table-striped table-bordered" style={{ 'borderRadius': '2px' }}>
                <TableHead style={{ borderLeft: '1px solid red', borderRight: '1px solid red' }} className='text-center'>

                  <TableRow>
                    <TableCell align="center">Quotation No</TableCell>

                    <TableCell align="center">Quotation Date</TableCell>
                    <TableCell align="center">Customer Name</TableCell>
                    <TableCell align="center">Product Name</TableCell>
                    <TableCell align="center">Mobile No</TableCell>
                    <TableCell align="center">Total Amount</TableCell>

                    <TableCell align="center">Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {sendListData.map((quotation, index) => {
                    return (
                      <TableRow key={index}>
                        <TableCell align="center">{quotation.quotationNumber}</TableCell>

                        <TableCell align="center">{new Date(quotation.quotationDate).toLocaleDateString('en-GB')}</TableCell>
                        <TableCell align="center">{quotation.billTo}</TableCell>
                        <TableCell align="center">{quotation.gsName}</TableCell>

                        <TableCell align="center">{quotation.clientContact}</TableCell>
                        <TableCell align="center">{quotation.grandTotal}</TableCell>
                        <TableCell align="center">

                          <IconButton onClick={() => handleShow(quotation)}>
                            <Icon color="success">visibility</Icon>
                          </IconButton>

                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </StyledTable>
              {/* <div style={{ height: 570, width: '100%' }}>
                        <DataGrid
                            rows={APIData}
                            columns={columns}
                            pageSize={10}
                            rowsPerPageOptions={[10]}
                        />
                    </div> */}
            </Box>
          </TabPanel>
        </Container>

        <Modal
          show={showSatusForm}
          onHide={handleCloseStatus}
          backdrop="static"
          keyboard={false}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header>
            <Modal.Title>Change Status</Modal.Title>
            <IconButton type="button" onClick={handleCloseStatus}>
              <ClearIcon />
            </IconButton>
          </Modal.Header>
          <Modal.Body>
            <StatusChange theStatusChange={obj2} handleDialog={handleCloseStatus}></StatusChange>
          </Modal.Body>

        </Modal>
        <Modal
          show={showMail}
          onHide={handleCloseMail}
          backdrop="static"
          keyboard={false}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header>
            <Modal.Title>Send Quotation To Client</Modal.Title>
            <IconButton type="button" onClick={handleCloseMail}>
              <ClearIcon />
            </IconButton>
          </Modal.Header>
          <Modal.Body>
            <SendQuotationMail theClientMail={sendMailObj} handleDialog={handleCloseMail}></SendQuotationMail>
          </Modal.Body>

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
            <Modal.Title>Preview Quotation</Modal.Title>
            <IconButton type="button" onClick={handleClose}>
              <ClearIcon />
            </IconButton>
          </Modal.Header>
          <Modal.Body>
            <ViewQuotation theViewQuotation={obj1}></ViewQuotation>
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
      </Box>
    </Container >
  );
};

export default ManageQuotation;
