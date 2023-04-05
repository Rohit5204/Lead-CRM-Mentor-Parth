import { styled } from '@mui/system';
import { Breadcrumb } from 'app/components';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';
import CompletedManageQuotation from './completedQuotationList';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import { useNavigate } from 'react-router-dom';
import { Form, Row, Col, Modal, InputGroup } from 'react-bootstrap';
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
  Chip,
  Icon,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@mui/material';
import { BASE_URL } from 'app/utils/constant';

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
  return (
    <Container>
      <Box>
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
            <Col md="6">
              <Form.Label htmlFor="basic-url">Search Box</Form.Label>
              <InputGroup className="mb-3">

                <Form.Control
                  placeholder="Search By Quotation Number, Client Name, Product Name, Mobile Number & Amount"
                  aria-label="Recipient's username"
                  aria-describedby="basic-addon2"
                  value={searchBox}
                  onChange={(e) => setSearchBox(e.target.value)}
                />&nbsp;

              </InputGroup>
            </Col>
            <Col md="2" className='mt-4'>
              <button type="button" className="btn btn-success mt-2" onClick={changePage}>
                ADD
              </button>
            </Col>
          </Row>
        </Box>
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
              <Tab label="Draft Quotation" {...a11yProps(1)} />
              <Tab label="Send Quotation" {...a11yProps(2)} />
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
