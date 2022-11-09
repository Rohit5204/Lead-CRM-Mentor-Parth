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
  margin: '0px 0px 0px 441px',
}));
const AddCatalogue = () => {

  const navigate = useNavigate();
  const changePage = () => {
    navigate('/catalogues/manageCatalogue');
  };
  const [catType, setCatType] = useState('Service');
  const [price, setPrice] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  //empty the form Text
  const blankForm = () => {
    setCatType('');
    setPrice('');
    setDescription('');
  };
  //Add data in the table
  const postData = () => {
    const items = localStorage.getItem('accessToken');
    console.log({
      catType: catType,
      price: price,
      description: description,
    });
    axios.post('http://35.89.6.16:4002/api/upsertCatalogue',
      {
        catId: 0,
        catType: catType,
        price: price,
        gsName: name,
        description: description,
        catStatus: 1,
        actionBy: 1,
      }, { headers: { "x-access-token": items } }
    );
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
          <SimpleCard title="Fill Catalogue Detail's">
            <Row>
              <Col md="4">
                <FormControl sx={{ m: 0, minWidth: 300 }} size="small" className="mt-1">
                  <Form.Label>Type</Form.Label>
                  <Select value={catType} label="Type" onChange={(e) => setCatType(e.target.value)}>
                    <MenuItem value="">Select the Type</MenuItem>
                    <MenuItem value="Service">Service</MenuItem>
                    <MenuItem value="Product">Product</MenuItem>
                  </Select>
                </FormControl>
              </Col>
              <Col className="mt-1">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  required
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                  placeholder="Enter the Name"
                />
              </Col>
              <Col className="mt-1">
                <Form.Label>Price</Form.Label>
                <Form.Control
                  required
                  type="number"
                  min={500}
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
            {/* <Button variant="primary" onClick={handleSubmit}>
              Save
            </Button> */}
            <button type="button" className="btn btn-success" onClick={handleSubmit}>
              Save
            </button>
          </Col>
        </Row>
      </Div>
    </Container>
  );
};

export default AddCatalogue;
