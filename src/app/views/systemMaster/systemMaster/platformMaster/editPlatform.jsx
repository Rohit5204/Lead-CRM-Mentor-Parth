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
const EditPlatform = ({ theEditPlatform, handleDialog }) => {
  console.log(theEditPlatform)
  const [id, setId] = useState(theEditPlatform.id);
  const [masterName, setMasterName] = useState('Platform');
  const [inputText, setInputText] = useState(theEditPlatform.platformName);
  const [platformIcon, setplatformIcon] = useState(theEditPlatform.platformIcon);
  const [platformColor, setplatformColor] = useState(theEditPlatform.platformColor);

  const UpdatePlatform = {
    id: id,
    masterName: 'platform',
    inputText: inputText,
    platformIcon: platformIcon,
    platformColor: platformColor,
    recodStatus: 1,
    addedBy: 1,
    updatedBy: 1,
  };
  const updatePlatform = (e) => {
    const items = localStorage.getItem('accessToken');
    console.log({ UpdatePlatform });
    e.preventDefault();
    axios.post(`https://43.204.38.243:3000/api/mastersUpsert`, UpdatePlatform, { headers: { "x-access-token": items } })
      .then(() => useEffect);
    setInputText('');
    setplatformIcon('');
    setplatformColor('');
    handleDialog();
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
        {/* <Row className='mt-2'>
          <Col>
            <Form.Label>Platform Icon</Form.Label>
            <FormControl sx={{ m: 0, minWidth: 330 }} size="small" className="mt-1">
             
              <Select
               
                onChange={(e) => setplatformIcon(e.target.value)}
                value={platformIcon}
                label="Age"
              >
                <MenuItem value='s'>Select from the List</MenuItem>
                <MenuItem value='facebook'>Facebook</MenuItem>
                <MenuItem value='Twitter'>Twitter</MenuItem>
                <MenuItem value='star'>Indiamart</MenuItem>
                <MenuItem value='telegram'>Telegram</MenuItem>
                <MenuItem value='WhatsApp'>Whatsapp</MenuItem>
                <MenuItem value='Instagram'>Instagram</MenuItem>
              </Select>
            </FormControl>
          </Col>

          <Col>
            <Form.Label>Platform Color</Form.Label>
            <FormControl sx={{ m: 0, minWidth: 330 }} size="small" className="mt-1">
             
              <Select
                
                onChange={(e) => setplatformColor(e.target.value)}
                value={platformColor}
                label="Age"
              >
                <MenuItem value='v'>Select from the List</MenuItem>
                <MenuItem value='#EB9694'>Light Pink</MenuItem>
                <MenuItem value='#F4BE65'>Light Orange</MenuItem>
                <MenuItem value='#19CABA'>Cyan</MenuItem>
                <MenuItem value='#282f4e'>Green</MenuItem>
              </Select>
            </FormControl>
          </Col>

        </Row> */}
        <Row className='mt-2'>
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
