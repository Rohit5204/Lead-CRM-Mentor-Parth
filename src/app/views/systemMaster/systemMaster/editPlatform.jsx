import * as React from 'react';
import { styled } from '@mui/system';
import { Breadcrumb, SimpleCard } from 'app/components';
import { Box, MenuItem, FormControl, Select } from '@mui/material';
import { Form, Row, Col, Button } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import axios from 'axios';

const Container = styled('div')(({ theme }) => ({
  margin: '30px',
  [theme.breakpoints.down('sm')]: { margin: '16px' },
  '& .breadcrumb': {
    marginBottom: '30px',
    [theme.breakpoints.down('sm')]: { marginBottom: '16px' },
  },
}));
const Div = styled('div')(() => ({
  margin: '410px',
}));
const EditPlatform = ({ theEditPlatform }) => {
  console.log(theEditPlatform)
  const [id, setId] = useState(theEditPlatform.id);
  const [masterName, setMasterName] = useState('Platform');
  const [inputText, setInputText] = useState(theEditPlatform.platformName);

  const UpdatePlatform = {
    id: id,
    masterName: 'platform',
    inputText: inputText,
    recodStatus: 1,
    addedBy: 1,
    updatedBy: 1,
  };
  const updatePlatform = (e) => {
    const items = localStorage.getItem('accessToken');
    console.log({ UpdatePlatform });
    e.preventDefault();
    axios.post(`http://35.89.6.16:4002/api/mastersUpsert`, UpdatePlatform, { headers: { "x-access-token": items } })
      .then(() => useEffect);
    setInputText('');
  };
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <Container>
      {/* <SimpleCard title="Update Catalogue Detail's"> */}
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col md="6">
            <Form.Label>Platform Name</Form.Label>
            <Form.Control
              disabled
              value={masterName}
              onChange={(e) => setMasterName(e.target.value)}
              placeholder="Enter the Platform Name"
            />
          </Col>
          <Col md="6">
            <Form.Label>Input Text</Form.Label>
            <Form.Control
              onChange={(e) => setInputText(e.target.value)}
              value={inputText}
              placeholder="Enter the Input Text"
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <button
              type="submit"
              className="btn btn-success"
              style={{ marginTop: 5 + 'px' }}
              onClick={updatePlatform}
            >
              Update
            </button>
          </Col>
        </Row>
      </Form>
      {/* </SimpleCard> */}
    </Container>
  );
};

export default EditPlatform;
