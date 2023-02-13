import { styled } from '@mui/system';
import { Breadcrumb, SimpleCard } from 'app/components';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Data } from 'app/components/Data';
import { Form, Row, Col, Button, Modal, InputGroup } from 'react-bootstrap';
import { Box, Autocomplete, TextField } from '@mui/material';
import { MenuItem, FormControl, Select, Icon } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import * as XLSX from 'xlsx';
import { EXCEL_FILE_BASE64 } from './constant'
import FileSaver from 'file-saver';

const Container = styled('div')(({ theme }) => ({
  margin: '30px',
  [theme.breakpoints.down('sm')]: { margin: '16px' },
  '& .breadcrumb': {
    marginBottom: '30px',
    [theme.breakpoints.down('sm')]: { marginBottom: '16px' },
  },
}));

const Div = styled('div')(({ theme }) => ({
  margin: '0px 0px 0px 441px',
}));

const LeadForm = () => {
  const navigate = useNavigate();
  const changePage = () => {
    navigate('/leads/manageLeads');
  };
  const [show1, setShow1] = useState(false);

  // Import Dailog
  const closeImport = () => setShow1(false);
  const showImport = () => setShow1(true);

  const [name, setName] = useState('');
  const [mobileNo, setMobileNo] = useState('');
  const [alternateMobile, setAlternateMobile] = useState('');
  const [clientName, setClientName] = useState('');
  const [emailId, setEmailId] = useState('');
  const [streetName, setStreetName] = useState('');
  const [stateName, setStateName] = useState('');
  const [cityName, setCityName] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [countryName, setCountryName] = useState('India');
  const [expectedAmount, setExpectedAmount] = useState('');

  const [intrestedIn, setIntrestedIn] = useState([]);
  const [platformName, setPlatformName] = useState([]);
  const [labelName, setLabelName] = useState([]);
  const [status, setStatusName] = useState([]);
  const [assignTo, setAssignTo] = useState([]);

  const [myOptions1, setMyOptions1] = useState(null);
  const [myOptions2, setMyOptions2] = useState(null);
  const [myOptions3, setMyOptions3] = useState(null);
  const [myOptions4, setMyOptions4] = useState("Lead");
  const [myOptions5, setMyOptions5] = useState("Warm");

  const [id1, setId1] = useState([]);
  const [id2, setId2] = useState([]);
  const [id3, setId3] = useState([]);
  const [sourceId, setSourceId] = useState([]);

  const items = localStorage.getItem('accessToken');
  const roleCode = localStorage.getItem('roleCode');
  const userId = localStorage.getItem('userId');
  const headers = {
    "x-access-token": items,
    "roleCode": roleCode,
    "userId": userId
  }

  const getAllLeadData = () => {
    axios.get(`http://43.204.38.243:3001/api/getMasterData?masterName=usermaster`, { headers: headers }).then((res) => {
      for (var i = 0; i < res.data.data.length; i++) {
        setAssignTo(current => [...current, res.data.data[i].firstName + " " + res.data.data[i].lastName]);
        setId1(current => [...current, res.data.data[i].userId, res.data.data[i].firstName + " " + res.data.data[i].lastName])
      }
    });
    axios.post(`http://43.204.38.243:3001/api/getCatalogue`, { catId: 0, }, { headers: headers }).then((res) => {
      for (var i = 0; i < res.data.data.length; i++) {
        setIntrestedIn(current => [...current, res.data.data[i].gsName]);
      }
    });
    axios.get(`http://43.204.38.243:3001/api/getMasterData?masterName=platformmaster`, { headers: headers }).then((res) => {
      for (var i = 0; i < res.data.data.length; i++) {
        setPlatformName(current => [...current, res.data.data[i].platformName]);
        setSourceId(current => [...current, res.data.data[i].id, res.data.data[i].platformName])
      }
    });
    axios.get(`http://43.204.38.243:3001/api/getMasterData?masterName=labelmaster`, { headers: headers }).then((res) => {
      for (var i = 0; i < res.data.data.length; i++) {
        setLabelName(current => [...current, res.data.data[i].name]);
        setId2(current => [...current, res.data.data[i].id, res.data.data[i].name])
      }
    });
    axios.get(`http://43.204.38.243:3001/api/getMasterData?masterName=statusmaster`, { headers: headers }).then((res) => {
      for (var i = 0; i < res.data.data.length; i++) {
        setStatusName(current => [...current, res.data.data[i].name]);
        setId3(current => [...current, res.data.data[i].id, res.data.data[i].name])
      }
    });
  }
  useEffect(() => {
    getAllLeadData()
  }, []);
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
  const handleSubmitFile = (e) => {
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
  const postData1 = () => {
    for (var i = 0; i < excelData.length; i++) {
      if (excelData[i].platformName == "Facebook" || excelData[i].platformName == "FB") {
        excelData[i].sourceId = 1;
      }
      else if (excelData[i].platformName == "Whatsapp") {
        excelData[i].sourceId = 2;
      }
      else if (excelData[i].platformName == "Indiamart") {
        excelData[i].sourceId = 3;
      }
      else if (excelData[i].platformName == "Justdial") {
        excelData[i].sourceId = 4;
      }
      else if (excelData[i].platformName == "99acress") {
        excelData[i].sourceId = 5;
      }
      else if (excelData[i].platformName == "magikbrics") {
        excelData[i].sourceId = 6;
      }
      else if (excelData[i].platformName == "Instagram") {
        excelData[i].sourceId = 7;
      }
      else if (excelData[i].platformName == "Google Ads") {
        excelData[i].sourceId = 8;
      }
      else if (excelData[i].platformName == "" || null) {
        excelData[i].sourceId = 1;
      }
      else {
        excelData[i].sourceId = 1
      }
      excelData[i].status = 1
      excelData[i].assignId = null;
      excelData[i].label = 1;       //Label
      excelData[i].createdBy = 1;
    }
    // console.log(excelData);
    axios.post(`http://43.204.38.243:3001/api/saveLeadGenerationData`, excelData,
      { headers: headers });
    changePage();
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

  //empty the form Text
  const blankForm = () => {
    setName('');
    setMobileNo('');
    setEmailId('');
    setStreetName('');
    setStateName('');
    setCityName('');
    setZipCode('');
    setCountryName('');
    setMyOptions1('');
    setMyOptions2('');
    setMyOptions3('');
    setMyOptions4('')
    setMyOptions5('')
  };
  //Add data in the table
  const [APIData, setAPIData] = useState([]);
  const getFetchLeadData = () => {
    axios.post(`http://43.204.38.243:3001/api/getFilteredLeadData`, {
      leadId: 0,
      userId: 0,
      statusId: 0,
      searchKey: "",
      locationkey: "",
      platformId: 0,
      opType: ""
    }, { headers: { "x-access-token": items, "roleCode": roleCode, "userId": userId } })
      .then((response) => {
        setAPIData(response.data.data);
      });
  }

  const postData = () => {
    var assignedid, platformid, labelid, statusid;
    for (var i = 0; i < id1.length; i++) {
      if (myOptions3 == id1[i]) {
        assignedid = id1[i - 1]
      }
    }
    for (var i = 0; i < sourceId.length; i++) {
      if (myOptions2 == sourceId[i]) {
        platformid = sourceId[i - 1]
      }
    }
    for (var i = 0; i < id2.length; i++) {
      if (myOptions5 == id2[i]) {
        labelid = id2[i - 1]
      }
    }
    for (var i = 0; i < id3.length; i++) {
      if (myOptions4 == id3[i]) {
        statusid = id3[i - 1]
      }
    }
    const AddLead = {
      name: name,
      mobileNo: mobileNo,
      emailId: emailId,
      streetName: streetName,
      cityName: cityName,
      stateName: stateName,
      zipCode: zipCode,
      countryName: countryName,
      intrestedIn: myOptions1,
      platformName: myOptions2,
      sourceId: platformid,
      assignId: assignedid,
      status: statusid,
      label: labelid,
      createdBy: 1,
      alternateMobile: alternateMobile,
      clientName: clientName,
      expectedAmount: expectedAmount
    }
    console.log({ AddLead })
    axios.post(`http://43.204.38.243:3001/api/saveLeadGenerationData`,
      [AddLead], { headers: headers });
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   postData();
  //   blankForm();
  //   getFetchLeadData();
  //   changePage();
  // };

  const [validated, setValidated] = useState(false);
  const handleSubmit1 = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
      // alert("Please Provide appropriate Data")
    }
    else if (form.checkValidity() != false) {
      postData();
      changePage();
    }
    setValidated(true);
  };
  return (
    <Container>
      <Box className="breadcrumb">
        <Breadcrumb
          routeSegments={[{ name: 'Manage Lead', path: '/leads/manageLeads' }, { name: 'Add Lead Page' }]}
        />
      </Box>
      <Row className='mb-1'>
        <Col>
          <button type="submit" className="btn btn-success" onClick={showImport}>
            Import Lead
          </button>
        </Col>
      </Row>
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
              onSubmit={handleSubmitFile}
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
                        <th scope="col">Lead Name</th>
                        <th scope="col">Mobile No</th>
                        <th scope="col">Email Id</th>
                        <th scope="col">Street</th>
                        <th scope="col">City</th>
                        <th scope="col">State</th>
                        <th scope="col">Pin Code</th>
                        <th scope="col">Country</th>
                        <th scope="col">Intersted In</th>
                        <th scope="col">Platform Name</th>
                        <th scope="col">Alternate No</th>
                        <th scope="col">Expected Amount</th>
                        <th scope="col"></th>
                      </tr>
                    </thead>
                    <tbody>
                      <Data excelData={excelData} />
                    </tbody>
                  </table>
                  <button
                    type="submit"
                    className="btn btn-success"
                    style={{ marginTop: 5 + 'px' }}
                    onClick={postData1}
                  >
                    Add Lead
                  </button>
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
      <Form noValidate validated={validated} onSubmit={handleSubmit1}>
        <Row>
          <Col xs={12} md={6}>
            <SimpleCard title="Fill Lead Details">
              <Row>
                <Col>
                  <InputGroup className="mb-2">
                    <h6 className="mt-1">Lead Name&nbsp; </h6>
                    <InputGroup.Text id="basic-addon1">
                      <Icon>person</Icon>
                    </InputGroup.Text>
                    <Form.Control height={2} sx={{ m: 0, minWidth: 110 }}
                      onChange={(e) => setName(e.target.value)}
                      value={name}
                      required
                      placeholder="Enter the Lead Name"
                    /> <Form.Control.Feedback type="invalid">
                      Lead Name is Required
                    </Form.Control.Feedback>
                  </InputGroup>
                </Col>
              </Row>
              {/* <Row>
              <Col>
                <InputGroup className="mb-2">
                  <h6 className="mt-1">Client&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  :&nbsp; </h6>
                  <InputGroup.Text id="basic-addon1">
                    <Icon>person</Icon>
                  </InputGroup.Text>
                  <Form.Control height={2} sx={{ m: 0, minWidth: 100 }}
                    onChange={(e) => setClientName(e.target.value)}
                    value={clientName}
                    placeholder="Enter the Client Name"
                  /></InputGroup>

              </Col>
            </Row> */}
              <Row>
                <Col>
                  <InputGroup className="mb-2">
                    <h6 className="mt-1">Mobile 1&nbsp;&nbsp;&nbsp;  &nbsp;</h6>
                    <InputGroup.Text id="basic-addon1">
                      <Icon>phone</Icon>
                    </InputGroup.Text>
                    <Form.Control
                      required
                      onChange={(e) => setMobileNo(e.target.value)}
                      value={mobileNo}
                      placeholder="Customer Mobile Number"
                    />
                    <Form.Control.Feedback type="invalid">
                      Primary Mobile Number is Required
                    </Form.Control.Feedback></InputGroup>
                </Col>
              </Row>
              <Row>
                <Col>
                  <InputGroup className="mb-2">
                    <h6 className="mt-1">Email&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  &nbsp;</h6>
                    <InputGroup.Text id="basic-addon1">
                      <Icon>email</Icon>
                    </InputGroup.Text>
                    <Form.Control
                      required
                      type='email'
                      onChange={(e) => setEmailId(e.target.value)}
                      value={emailId}
                      placeholder="Customer Email"
                    />
                    <Form.Control.Feedback type="invalid">
                      Email is Required
                    </Form.Control.Feedback></InputGroup>
                </Col>
              </Row>
              <Row>
                <Col>
                  <InputGroup className="mb-2">
                    <h6 className="mt-1">Mobile 2&nbsp;&nbsp;  &nbsp; </h6>
                    <InputGroup.Text id="basic-addon1">
                      <Icon>phone</Icon>
                    </InputGroup.Text>
                    <Form.Control height={2} sx={{ m: 0, minWidth: 100 }}
                      onChange={(e) => setAlternateMobile(e.target.value)}
                      value={alternateMobile}
                      placeholder="Customer Alternate Mobile Numbe"
                    /></InputGroup>
                </Col>
              </Row>
              <Row className="mt-1">
                <Col>
                  <Form.Group className="mb-2" controlId="exampleForm.ControlTextarea1">
                    <InputGroup className="mb-2">
                      <h6 className="mt-1">Street&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;   &nbsp;</h6>
                      <InputGroup.Text id="basic-addon1">
                        <Icon>house</Icon>
                      </InputGroup.Text>
                      <Form.Control
                        as="textarea"
                        rows={1}
                        onChange={(e) => setStreetName(e.target.value)}
                        value={streetName}
                        placeholder="Street"
                      /></InputGroup>
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col>

                  {/* <Form.Label>City Name</Form.Label> */}
                  <InputGroup className="mb-2">
                    <h6 className="mt-1">City&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;</h6>
                    <InputGroup.Text id="basic-addon1">
                      <Icon>village</Icon>
                    </InputGroup.Text>
                    <Form.Control
                      onChange={(e) => setCityName(e.target.value)}
                      value={cityName}
                      placeholder="Enter The City"
                    /></InputGroup>
                </Col>
              </Row>
              <Row>
                <Col>
                  {/* <Form.Label>State Name</Form.Label> */}
                  <InputGroup className="mb-2">
                    <h6 className="mt-1">State&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  &nbsp;</h6>
                    <InputGroup.Text id="basic-addon1">
                      <Icon>village</Icon>
                    </InputGroup.Text>
                    <Form.Control
                      onChange={(e) => setStateName(e.target.value)}
                      value={stateName}
                      placeholder="Enter Sate Name"
                    /></InputGroup>
                </Col>
              </Row>
              <Row>
                <Col>
                  <InputGroup className="mb-2">
                    <h6 className="mt-1">Zip Code&nbsp;  &nbsp;</h6>
                    <InputGroup.Text id="basic-addon1">
                      <Icon>subway</Icon>
                    </InputGroup.Text>
                    {/* <Form.Label>Pin Code</Form.Label> */}
                    <Form.Control
                      onChange={(e) => setZipCode(e.target.value)}
                      value={zipCode}
                      placeholder="Enter Zip Code"
                    /></InputGroup>
                </Col>
              </Row>
              <Row>
                <Col>
                  <InputGroup className="mb-2">
                    <h6 className="mt-1">Amount&nbsp;&nbsp;&nbsp;  &nbsp;</h6>
                    <InputGroup.Text id="basic-addon1">
                      <Icon>₹</Icon>
                    </InputGroup.Text>
                    <Form.Control
                      onChange={(e) => setExpectedAmount(e.target.value)}
                      value={expectedAmount}
                      placeholder="Client Expected Amount"
                    /></InputGroup>
                </Col>
              </Row>
            </SimpleCard>
          </Col>
          <br />
          <Col xs={12} md={6}>
            <SimpleCard>
              <Row>
                <Col xs={6}>
                  <InputGroup>
                    <Form.Label className="mt-1">Country</Form.Label>
                  </InputGroup>
                  <Select
                    size='small'
                    style={{ width: '210%' }}
                    value={countryName}
                    label="Country"
                    onChange={(e) => setCountryName(e.target.value)}
                  >
                    <MenuItem value="s">Select the Country</MenuItem>
                    <MenuItem value="India">INDIA</MenuItem>
                    <MenuItem value="Dubai">Dubai</MenuItem>
                    <MenuItem value="USA">USA</MenuItem>
                    <MenuItem value="London">London</MenuItem>
                    <MenuItem value="Italy">Italy</MenuItem>
                    <MenuItem value="China">China</MenuItem>
                    <MenuItem value="Russia">RUSSIA</MenuItem>
                    <MenuItem value="Australia">Australia</MenuItem>
                  </Select>
                </Col>
              </Row>
              <Row>
                <Col>
                  {/* <Form.Label>Interested In</Form.Label> */}
                  <InputGroup>
                    <Form.Label className="mt-1">Interested In</Form.Label>
                  </InputGroup>
                  <Autocomplete
                    style={{ minWidth: '100%' }}
                    freeSolo
                    autoComplete
                    autoHighlight
                    value={myOptions1}
                    options={intrestedIn}
                    onChange={(e) => setMyOptions1(e.currentTarget.innerHTML)}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        variant="outlined"
                        label="Select the Interested Catalogue"
                        size="small"
                      />
                    )}
                  />
                </Col>
              </Row>
              <Row>
                <Col className="mt-1">
                  <Form.Label>Source(Platform Name)</Form.Label>

                  <Autocomplete
                    style={{ minWidth: '100%' }}
                    freeSolo
                    autoComplete
                    autoHighlight
                    value={myOptions2}
                    options={platformName}
                    onChange={(e) => setMyOptions2(e.currentTarget.innerHTML)}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        variant="outlined"
                        label="Select the Platform Name"
                        size="small"
                      />
                    )}
                  />

                </Col>
              </Row>
              <Row>
                <Col className="mt-1">

                  <Form.Label>Assigned To</Form.Label>
                  <Autocomplete
                    style={{ minWidth: '100%' }}
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

                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Label>Status</Form.Label>

                  <Autocomplete
                    style={{ minWidth: '100%' }}
                    freeSolo
                    autoComplete
                    autoHighlight
                    value={myOptions4}
                    options={status}
                    onChange={(e) => setMyOptions4(e.currentTarget.innerHTML)}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        variant="outlined"
                        label="Select the Status"
                        size="small"
                      />
                    )}
                  />

                </Col>
              </Row>
              <Row>
                <Col >
                  <Form.Label>Label</Form.Label>

                  <Autocomplete
                    style={{ minWidth: '100%' }}
                    freeSolo
                    autoComplete
                    autoHighlight
                    options={labelName}
                    value={myOptions5}
                    onChange={(e) => setMyOptions5(e.currentTarget.innerHTML)}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        variant="outlined"
                        label="Select the Label"
                        size="small"
                      />
                    )}
                  />

                </Col>
              </Row>
            </SimpleCard>
          </Col>
        </Row>
        <Div className="mt-2">
          <Row>
            <Col>
              <button className="btn btn-secondary" type='button' onClick={changePage}>
                Cancel
              </button>
              &nbsp;
              <button type='submit' className="btn btn-success">
                Save
              </button>
            </Col>
          </Row>
        </Div>
      </Form>
    </Container >
  );
};

export default LeadForm;
