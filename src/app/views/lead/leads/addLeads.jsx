import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Row, Col, InputGroup } from 'react-bootstrap';
import { Icon } from '@mui/material';
import { BASE_URL } from 'app/utils/constant';

const LeadForm = ({ handleDialog }) => {

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
  const [expectedAmount, setExpectedAmount] = useState(10000);

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
    axios.get(BASE_URL + `/api/getMasterData?masterName=usermaster`, { headers: headers }).then((res) => {
      for (var i = 0; i < res.data.data.length; i++) {
        setAssignTo(current => [...current, res.data.data[i].firstName + " " + res.data.data[i].lastName]);
        setId1(current => [...current, res.data.data[i].userId, res.data.data[i].firstName + " " + res.data.data[i].lastName])
      }
    });
    axios.post(BASE_URL + `/api/getCatalogue`, { catId: 0, }, { headers: headers }).then((res) => {
      for (var i = 0; i < res.data.data.length; i++) {
        setIntrestedIn(current => [...current, res.data.data[i].gsName]);
      }
    });
    axios.get(BASE_URL + `/api/getMasterData?masterName=platformmaster`, { headers: headers }).then((res) => {
      for (var i = 0; i < res.data.data.length; i++) {
        setPlatformName(current => [...current, res.data.data[i].platformName]);
        setSourceId(current => [...current, res.data.data[i].id, res.data.data[i].platformName])
      }
    });
    axios.get(BASE_URL + `/api/getMasterData?masterName=labelmaster`, { headers: headers }).then((res) => {
      for (var i = 0; i < res.data.data.length; i++) {
        setLabelName(current => [...current, res.data.data[i].name]);
        setId2(current => [...current, res.data.data[i].id, res.data.data[i].name])
      }
    });
    axios.get(BASE_URL + `/api/getMasterData?masterName=statusmaster`, { headers: headers }).then((res) => {
      for (var i = 0; i < res.data.data.length; i++) {
        setStatusName(current => [...current, res.data.data[i].name]);
        setId3(current => [...current, res.data.data[i].id, res.data.data[i].name])
      }
    });
  }
  useEffect(() => {
    getAllLeadData()
  }, []);

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
    axios.post(BASE_URL + `/api/saveLeadGenerationData`,
      [AddLead], { headers: headers }).then((res) => {
        alert(res.data.message)
        handleDialog();
      }).catch(error => {
        alert(error.response.data.message)
      });

  };
  const changePage = () => {
    handleDialog()
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    postData();
  };
  return (
    <>
      <Form onSubmit={handleSubmit}>

        <Row>
          <Col>
            <h6 className="mt-1">Lead Name&nbsp; </h6>
            <InputGroup className="mb-2">

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
          <Col>
            <h6 className="mt-1">Mobile 1&nbsp;&nbsp;&nbsp;  &nbsp;</h6>
            <InputGroup className="mb-2">

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
            <h6 className="mt-1">Email&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  &nbsp;</h6>
            <InputGroup className="mb-2">

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
          <Col>
            <h6 className="mt-1">Amount&nbsp;&nbsp;&nbsp;  &nbsp;</h6>
            <InputGroup className="mb-2">

              <InputGroup.Text id="basic-addon1">
                <Icon>₹</Icon>
              </InputGroup.Text>
              <Form.Control
                disabled
                type='number'
                onChange={(e) => setExpectedAmount(e.target.value)}
                value={expectedAmount}
                placeholder="Client Expected Amount"
              /></InputGroup>
          </Col>
        </Row>


        <br />
        <Row>
          <Col className="d-flex justify-content-end">
            <button className="btn btn-secondary" type='button' onClick={changePage}>
              Cancel
            </button>
            &nbsp;
            <button type='submit' className="btn btn-success">
              Save
            </button>
          </Col>
        </Row>
      </Form>
    </ >
  );
};

export default LeadForm;
