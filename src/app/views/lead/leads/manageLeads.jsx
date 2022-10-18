import { styled } from '@mui/system';
import { Breadcrumb, SimpleCard } from 'app/components';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Data } from 'app/components/Data';
import { Form, Row, Col, Button, Modal, InputGroup } from 'react-bootstrap';
import * as XLSX from 'xlsx';
import {
  Box,
  Icon,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  MenuItem,
  FormControl,
  Select,
  Grid,
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

const ManageLead = () => {
  const [APIData, setAPIData] = useState([]);
  const [show, setShow] = useState(false);
  const [show1, setShow1] = useState(false);
  //Dialog Form
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  // Import Dailog
  const closeImport = () => setShow1(false);
  const showImport = () => setShow1(true);
  //get method
  useEffect(() => {
    axios
      .post(`http://35.89.6.16:4002/api/getFilteredLeadData`, {
        leadId: 0,
        userId: 0,
        statusId: 0,
      })
      .then((response) => {
        setAPIData(response.data.data);
      });
  }, [APIData]);

  // on change states
  const [excelFile, setExcelFile] = useState(null);
  const [excelFileError, setExcelFileError] = useState(null);

  // submit
  const [excelData, setExcelData] = useState(null);
  // it will contain array of objects

  // handle File
  const fileType = ['application/vnd.ms-excel'];
  const handleFile = (e) => {
    let selectedFile = e.target.files[0];
    if (selectedFile) {
      // console.log(selectedFile.type);
      if (selectedFile && fileType.includes(selectedFile.type)) {
        let reader = new FileReader();
        reader.readAsArrayBuffer(selectedFile);
        reader.onload = (e) => {
          setExcelFileError(null);
          setExcelFile(e.target.result);
        };
      } else {
        setExcelFileError('Please select only excel file types');
        setExcelFile(null);
      }
    } else {
      console.log('plz select your file');
    }
  };

  // submit function
  const handleSubmit = (e) => {
    e.preventDefault();
    if (excelFile !== null) {
      const workbook = XLSX.read(excelFile, { type: 'buffer' });
      const worksheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[worksheetName];
      const data = XLSX.utils.sheet_to_json(worksheet);
      setExcelData(data);
    } else {
      setExcelData(null);
    }
  };
  // add data in the table from Import
  const postData = () => {
    console.log(excelData);
    for (var i = 0; i < excelData.length; i++) {
      excelData[i].sourceId = 1;
      excelData[i].assignId = null;
      excelData[i].label = 1;
      excelData[i].createdBy = 1;
    }
    axios.post(`http://35.89.6.16:4002/api/saveLeadGenerationData`, excelData);
  };

  return (
    <Container>
      <Box>
        <Box className="breadcrumb">
          <Breadcrumb
            routeSegments={[{ name: 'Manage Lead', path: '/lead' }, { name: 'Lead Detail Page' }]}
          />
        </Box>
        <Box>
          {/* <Button variant="contained">Import Lead</Button> */}
          <Row>
            <Col>
              <InputGroup className="mb-3">
                <Form.Control
                  placeholder="Search Box"
                  aria-label="Recipient's username"
                  aria-describedby="basic-addon2"
                />
                &nbsp;
                <button type="submit" className="btn btn-success" onClick={showImport}>
                  Import Lead
                </button>
              </InputGroup>
            </Col>
          </Row>

          <div className="container"></div>
        </Box>
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
          </Modal.Header>
          <Modal.Body>
            {/* upload file section */}
            <div className="form">
              <form
                className="form-group"
                width="1200px"
                autoComplete="off"
                onSubmit={handleSubmit}
              >
                <Row>
                  <Col lg="10">
                    <input
                      type="file"
                      className="form-control"
                      onChange={handleFile}
                      required
                    ></input>
                    {excelFileError && (
                      <div className="text-danger" style={{ marginTop: 5 + 'px' }}>
                        {excelFileError}
                      </div>
                    )}
                  </Col>
                  <Col>
                    <button
                      type="submit"
                      className="btn btn-success"
                      style={{ marginTop: 5 + 'px' }}
                    >
                      Submit
                    </button>
                  </Col>
                </Row>
              </form>
            </div>
            {/* view file section */}
            <div>
              <h5>View Excel file</h5>
              <div className="viewer">
                {excelData === null && <>No file selected</>}
                {excelData !== null && (
                  <div className="table-responsive">
                    <table className="table">
                      <thead>
                        <tr>
                          <th scope="col">Email Id</th>
                          <th scope="col">Lead Name</th>
                          <th scope="col">Mobile No</th>
                          <th scope="col">Street</th>
                          <th scope="col">City</th>
                          <th scope="col">State</th>
                          <th scope="col">Pin Code</th>
                          <th scope="col">Country</th>
                          <th scope="col">Intersted</th>
                        </tr>
                      </thead>
                      <tbody>
                        <Data excelData={excelData} />
                      </tbody>
                      <button
                        type="submit"
                        className="btn btn-success"
                        style={{ marginTop: 5 + 'px' }}
                        onClick={postData}
                      >
                        Add Lead
                      </button>
                    </table>
                  </div>
                )}
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={closeImport}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
        <Box className="text-center" width="100%" overflow="auto">
          {/* Table Section */}
          <h4>Lead Table</h4>
          <StyledTable>
            <TableHead>
              <TableRow>
                <TableCell align="justify">Lead Id</TableCell>
                <TableCell align="justify">Lead Name</TableCell>
                <TableCell align="justify">Email</TableCell>
                <TableCell align="justify">Mobile Number</TableCell>
                <TableCell align="center">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {APIData.map((subscriber, index) => {
                // if (subscriber.status == 1) {
                return (
                  <TableRow key={index}>
                    <TableCell align="justify">{subscriber.leadId}</TableCell>
                    <TableCell align="justify">{subscriber.name}</TableCell>
                    <TableCell align="justify">{subscriber.emailId}</TableCell>
                    <TableCell align="justify">{subscriber.mobileNo}</TableCell>
                    <TableCell align="center">
                      <IconButton
                        // onClick={(event) => updateData(event, subscriber)}
                        onClick={handleShow}
                      >
                        <Icon color="success">edit</Icon>
                      </IconButton>
                      <IconButton
                      // onClick={(event) => deleteData(event, subscriber)}
                      >
                        <Icon color="warning">delete</Icon>
                      </IconButton>
                    </TableCell>
                  </TableRow>
                );
                // }
              })}
            </TableBody>
          </StyledTable>
        </Box>
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
            <Modal.Title>Update Lead Page</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Row>
                <Col>
                  <Form.Label>Lead Name</Form.Label>
                  <Form.Control
                    // onChange={(e) => setName(e.target.value)}
                    // value={name}
                    placeholder="Enter the Lead Name"
                  />
                </Col>
                <Col sm>
                  <FormControl sx={{ m: 0, minWidth: 370 }} size="small" className="mt-1">
                    <Form.Label>Interested In</Form.Label>
                    <Select
                      // value={intrestedIn}
                      label="Interested In"
                      // onChange={(e) => setIntrestedIn(e.target.value)}
                    >
                      <MenuItem value="interest">Your Interest</MenuItem>
                      <MenuItem value="facebook">Facebook</MenuItem>
                      <MenuItem value="instagram">Instagram</MenuItem>
                      <MenuItem value="twitter">Twitter</MenuItem>
                    </Select>
                  </FormControl>
                </Col>
              </Row>
              <Row className="mt-1">
                <Col>
                  <Form.Label>Mobile Number</Form.Label>
                  <Form.Control
                    // onChange={(e) => setMobileNo(e.target.value)}
                    // value={mobileNo}
                    placeholder="Customer Mobile Number"
                  />
                </Col>
                <Col>
                  <Form.Label>Source</Form.Label>
                  <Form.Control
                    // onChange={(e) => setMobileNo(e.target.value)}
                    // value={mobileNo}
                    placeholder="Select the Source"
                  />
                </Col>
              </Row>
              <Row className="mt-1">
                <Col>
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    // onChange={(e) => setEmailId(e.target.value)}
                    // value={emailId}
                    placeholder="Customer Email"
                  />
                </Col>
                <Col>
                  <Form.Label>Assigned To</Form.Label>
                  <Form.Control
                    // onChange={(e) => setEmailId(e.target.value)}
                    // value={emailId}
                    placeholder="Select the Staff Member"
                  />
                </Col>
              </Row>
              <Row className="mt-1">
                <Col>
                  <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Street Name</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      // onChange={(e) => setStreetName(e.target.value)}
                      // value={streetName}
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
                      // onChange={(e) => setStreetName(e.target.value)}
                      // value={streetName}
                      placeholder="Comment"
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Label>City Name</Form.Label>
                  <Form.Control
                    // onChange={(e) => setCityName(e.target.value)}
                    // value={cityName}
                    placeholder="Enter The City"
                  />
                </Col>
                <Col>
                  <Form.Label>Status</Form.Label>
                  <Form.Control
                    // onChange={(e) => setCityName(e.target.value)}
                    // value={cityName}
                    placeholder="New"
                  />
                </Col>
              </Row>
              <Row>
                <Col xs={6}>
                  <Form.Label>State Name</Form.Label>
                  <Form.Control
                    // onChange={(e) => setStateName(e.target.value)}
                    // value={stateName}
                    placeholder="Enter Sate Name"
                  />
                </Col>
              </Row>
              <Row>
                <Col xs={6}>
                  <Form.Label>Pin Code</Form.Label>
                  <Form.Control
                    // onChange={(e) => setZipCode(e.target.value)}
                    // value={zipCode}
                    placeholder="Enter Zip Code"
                  />
                </Col>
              </Row>
              <Row>
                <Col xs={6}>
                  <FormControl sx={{ m: 0, minWidth: 370 }} size="small" className="mt-1">
                    <Form.Label>Country</Form.Label>
                    <Select
                      // value={countryName}
                      label="Country"
                      // onChange={(e) => setCountryName(e.target.value)}
                    >
                      <MenuItem value="s">Select the Country</MenuItem>
                      <MenuItem value="India">INDIA</MenuItem>
                      <MenuItem value="USA">USA</MenuItem>
                      <MenuItem value="Russia">RUSSIA</MenuItem>
                      <MenuItem value="Australia">Australia</MenuItem>
                    </Select>
                  </FormControl>
                </Col>
              </Row>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <button
              type="submit"
              className="btn btn-success"
              style={{ marginTop: 5 + 'px' }}
              onClick={handleClose}
            >
              Update
            </button>
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
    </Container>
  );
};

export default ManageLead;
