import { SimpleCard } from 'app/components';
import { styled } from '@mui/system';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Data } from 'app/components/Data';
import { Form, Row, Col, Button, Modal, InputGroup } from 'react-bootstrap';
import * as XLSX from 'xlsx';
import EditLead from './editLead';
import { Link } from 'react-router-dom';
import { EXCEL_FILE_BASE64 } from './constant'
import FileSaver from 'file-saver';
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

const ManageLead = () => {
  const [showForm, setShowForm] = useState(false);
  const showForm1 = () => {
    setShowForm(!showForm);
  };

  const [APIData, setAPIData] = useState([]);
  const [show1, setShow1] = useState(false);

  // Import Dailog
  const closeImport = () => setShow1(false);
  const showImport = () => setShow1(true);
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
    axios.post(`https://43.204.38.243:3000/api/saveLeadGenerationData`, excelData,
      { headers: { "x-access-token": items } });
  };


  const handleDownload = () => {
    let sliceSize = 1024;
    let byteCharacters = atob(EXCEL_FILE_BASE64);
    let bytesLength = byteCharacters.length;
    let slicesCount = Math.ceil(bytesLength / sliceSize);
    let byteArrays = new Array(slicesCount);
    for (let sliceIndex = 0; sliceIndex < slicesCount; ++sliceIndex) {
      let begin = sliceIndex * sliceSize;
      let end = Math.min(begin + sliceSize, bytesLength);
      let bytes = new Array(end - begin);
      for (var offset = begin, i = 0; offset < end; ++i, ++offset) {
        bytes[i] = byteCharacters[offset].charCodeAt(0);
      }
      byteArrays[sliceIndex] = new Uint8Array(bytes);
    }
    FileSaver.saveAs(new Blob(byteArrays, { type: "application/vnd.ms-excel" }),
      "multiple-Lead-ADD.xls"
    );
  };

  return (
    <SimpleCard title="Lead Management">
      <Row>
        <Col>
          <form>
            <Row>
              <Col>
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
              <Col></Col>
              <Col>
                <Form.Label htmlFor="basic-url">Apply Advanced Filter</Form.Label>
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
        <Box>
          {/* Import Excel File Dialog Start */}
          <Box>
            <Row>
              <Col>
                <InputGroup className="mb-3">
                  <button type="submit" className="btn btn-success" onClick={showImport}>
                    Import Lead
                  </button>
                  &nbsp;
                  <Form.Control
                    placeholder="Search Box"
                    aria-label="Recipient's username"
                    aria-describedby="basic-addon2"
                  />
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
              <button
                type="submit"
                className="btn btn-primary"
                style={{ marginTop: 5 + 'px' }}
                onClick={handleDownload}>
                Download Sample File
              </button>
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
          {/* Import Excel File Dialog End */}
          <Box className="text-center" width="100%" overflow="auto">
            {/* Table Section */}
            <h4>View Lead Data</h4>
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
                  // if (subscriber.status == 1) {
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
                  // }
                })}
              </TableBody>
            </StyledTable>
          </Box>
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
