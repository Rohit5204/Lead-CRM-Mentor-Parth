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
const EditCatalogue = ({ theEditCatalogue }) => {
  // console.log(theEditCatalogue)
  const [id, setId] = useState(theEditCatalogue.id);
  const [gsType, setGsType] = useState(theEditCatalogue.gsType);
  const [gsName, setGsName] = useState(theEditCatalogue.gsName);
  const [gsPrice, setGsPrice] = useState(theEditCatalogue.gsPrice);
  const [gsDescription, setGsDescription] = useState(theEditCatalogue.gsDescription);

  const UpdateCatalogue = {
    catId: id,
    catType: gsType,
    gsName: gsName,
    price: gsPrice,
    description: gsDescription,
    catStatus: 1,
    actionBy: 1,
  };
  const updateCatalogue = (e) => {
    const items = localStorage.getItem('accessToken');
    console.log({ UpdateCatalogue });
    e.preventDefault();
    axios.post(`http://35.89.6.16:4002/api/upsertCatalogue`, UpdateCatalogue, { headers: { "x-access-token": items } }).then(() => useEffect);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <Container>
      {/* <SimpleCard title="Update Catalogue Detail's"> */}
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col md="4">
            <FormControl sx={{ m: 0, minWidth: 200 }} size="small" className="mt-1">
              <Form.Label>Type</Form.Label>
              <Select value={gsType} label="Type" onChange={(e) => setGsType(e.target.value)}>
                <MenuItem value="">Select the Type</MenuItem>
                <MenuItem value="Service">Service</MenuItem>
                <MenuItem value="Product">Product</MenuItem>
              </Select>
            </FormControl>
          </Col>
          <Col className="mt-1">
            <Form.Label>Name</Form.Label>
            <Form.Control
              onChange={(e) => setGsName(e.target.value || '')}
              value={gsName == null ? '' : gsName}
              placeholder="Enter the Name"
            />
          </Col>
          <Col className="mt-1">
            <Form.Label>Price</Form.Label>
            <Form.Control
              onChange={(e) => setGsPrice(e.target.value)}
              value={gsPrice}
              placeholder="Enter the Price"
            />
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
