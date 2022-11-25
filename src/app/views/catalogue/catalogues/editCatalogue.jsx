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
const EditCatalogue = ({ theEditCatalogue, handleDialog }) => {
  // console.log(theEditCatalogue)
  const [id, setId] = useState(theEditCatalogue.id);
  const [gsType, setGsType] = useState(theEditCatalogue.gsType);
  const [gsName, setGsName] = useState(theEditCatalogue.gsName);
  const [gsPrice, setGsPrice] = useState(theEditCatalogue.gsPrice);
  const [catStatus, setCatStatus] = useState(theEditCatalogue.status);
  const [gsDescription, setGsDescription] = useState(theEditCatalogue.gsDescription);

  const UpdateCatalogue = {
    catId: id,
    catType: gsType,
    gsName: gsName,
    price: gsPrice,
    description: gsDescription,
    catStatus: catStatus,
    actionBy: 1,
  };
  const updateCatalogue = (e) => {
    const items = localStorage.getItem('accessToken');
    console.log({ UpdateCatalogue });
    e.preventDefault();
    axios.post(`http://213.136.72.177/cms/api/upsertCatalogue`, UpdateCatalogue, { headers: { "x-access-token": items } }).then(() => useEffect);
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
          <Col md="6" className="ml-8">
            <Form.Label>Name</Form.Label>
            <Form.Control
              onChange={(e) => setGsName(e.target.value || '')}
              value={gsName == null ? '' : gsName}
              placeholder="Enter the Name"
            />
          </Col>
          <Col md="6">
            <FormControl sx={{ m: 0, minWidth: 330 }} size="small" >
              <Form.Label>Type</Form.Label>
              <Select value={gsType} label="Type" onChange={(e) => setGsType(e.target.value)}>
                <MenuItem value="">Select the Type</MenuItem>
                <MenuItem value="Service">Service</MenuItem>
                <MenuItem value="Product">Product</MenuItem>
              </Select>
            </FormControl>
          </Col>
        </Row>
        <Row>
          <Col className="mt-1">
            <Form.Label>Price</Form.Label>
            <Form.Control
              onChange={(e) => setGsPrice(e.target.value)}
              value={gsPrice}
              placeholder="Enter the Price"
            />
          </Col>
          <Col md="6">
            <FormControl sx={{ m: 0, minWidth: 330 }} size="small" >
              <Form.Label>Status</Form.Label>
              <Select value={catStatus} label="Type" onChange={(e) => setCatStatus(e.target.value)}>
                <MenuItem value="">Select the Type</MenuItem>
                <MenuItem value={0}>INACTIVE</MenuItem>
                <MenuItem value={1}>ACTIVE</MenuItem>
              </Select>
            </FormControl>
          </Col>
        </Row>
        <Row className="mt-1">
          <Col>
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                onChange={(e) => setGsDescription(e.target.value)}
                value={gsDescription}
                placeholder="Write Description"
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <button
              type="submit"
              className="btn btn-success"
              style={{ marginTop: 5 + 'px' }}
              onClick={updateCatalogue}
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

export default EditCatalogue;
