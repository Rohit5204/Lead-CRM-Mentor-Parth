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
  const [catId, setCatId] = useState(theEditCatalogue.catId);
  const [catType, setCatType] = useState(theEditCatalogue.catType);
  const [price, setPrice] = useState(theEditCatalogue.price);
  const [description, setDescription] = useState(theEditCatalogue.description);

  const UpdateCatalogue = {
    catId: catId,
    catType: catType,
    price: price,
    description: description,
    catStatus: 1,
    actionBy: 1,
  };
  const updateCatalogue = (e) => {
    console.log({ UpdateCatalogue });
    e.preventDefault();
    axios.post(`http://35.89.6.16:4002/api/upsertCatalogue`, UpdateCatalogue).then(() => useEffect);
  };
  const blankForm = () => {
    setCatType('');
    setPrice('');
    setDescription('');
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    updateCatalogue();
    blankForm();
  };
  return (
    <Container>
      <SimpleCard title="Fill Catalogue Details">
        <Form onClick={handleSubmit}>
          <Row>
            <Col xs={6}>
              <FormControl sx={{ m: 0, minWidth: 300 }} size="small" className="mt-1">
                <Form.Label>Catalogue Type</Form.Label>
                <Select value={catType} label="Type" onChange={(e) => setCatType(e.target.value)}>
                  <MenuItem value="">Select the Type</MenuItem>
                  <MenuItem value="Service">Service</MenuItem>
                  <MenuItem value="Product">Product</MenuItem>
                </Select>
              </FormControl>
            </Col>

            <Col className="mt-1">
              <Form.Label>Catalogue Price</Form.Label>
              <Form.Control
                onChange={(e) => setPrice(e.target.value)}
                value={price}
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
                  onChange={(e) => setDescription(e.target.value)}
                  value={description}
                  placeholder="Write Description"
                />
              </Form.Group>
            </Col>
          </Row>
          {/* <Row className="mt-1">
          <Col>
            <Button variant="success" onClick={handleSubmit}>
              Add Lead
            </Button>
            &nbsp;
            <Button variant="primary">Cancel</Button>
          </Col>
        </Row> */}
        </Form>
      </SimpleCard>
    </Container>
  );
};

export default EditCatalogue;
