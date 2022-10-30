import { styled } from '@mui/system';
import { Breadcrumb, SimpleCard } from 'app/components';
import { Form, Row, Col, Button } from 'react-bootstrap';
import { Box, MenuItem, FormControl, Select } from '@mui/material';
import React, { useState } from 'react';
import axios from 'axios';
import { NavLink, useNavigate } from 'react-router-dom';
const Container = styled('div')(({ theme }) => ({
  margin: '30px',
  [theme.breakpoints.down('sm')]: { margin: '16px' },
  '& .breadcrumb': {
    marginBottom: '30px',
    [theme.breakpoints.down('sm')]: { marginBottom: '16px' },
  },
}));
const Div = styled('div')(() => ({
  margin: '430px',
}));
const AddCatalogue = () => {
  const navigate = useNavigate();
  const changePage = () => {
    navigate('/catalogues/manageCatalogue');
  };
  const [catType, setCatType] = useState('Service');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');

  //empty the form Text
  const blankForm = () => {
    setCatType('');
    setPrice('');
    setDescription('');
  };
  //Add data in the table
  const postData = () => {
    console.log({
      catType: catType,
      price: price,
      description: description,
    });
    axios.post(`http://35.89.6.16:4002/api/upsertCatalogue`, [
      {
        catId: null,
        catType: catType,
        price: price,
        description: description,
        catStatus: 1,
        actionBy: 1,
      },
    ]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    postData();
    blankForm();
    alert('Catalogue Successfully Created');
  };
  return (
    <Container>
      <Box className="breadcrumb">
        <Breadcrumb
          routeSegments={[
            { name: 'Catalogue', path: '/catalogues/manageCatalogue' },
            { name: 'Add Catalogue Page' },
          ]}
        />
      </Box>
      <Row>
        <Col>
          <SimpleCard title="Fill Catalogue Details">
            <Row>
              <Col xs={6}>
                <FormControl sx={{ m: 0, minWidth: 450 }} size="small" className="mt-1">
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
          </SimpleCard>
        </Col>
      </Row>
      <Div className="mt-2">
        <Row>
          <Col>
            <Button variant="secondary" onClick={changePage}>
              Cancel
            </Button>
            &nbsp;
            <Button variant="primary" onClick={handleSubmit}>
              Save
            </Button>
          </Col>
        </Row>
      </Div>
    </Container>
  );
};

export default AddCatalogue;
