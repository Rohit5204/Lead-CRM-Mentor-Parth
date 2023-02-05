import { styled } from '@mui/system';
import { Breadcrumb, SimpleCard } from 'app/components';
import { Form, Row, Col, Button, InputGroup } from 'react-bootstrap';
import { Box, MenuItem, Autocomplete, TextField, FormControl, Select } from '@mui/material';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
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
  const [duration, setDuration] = useState(0);

  const [assignTo, setAssignTo] = useState([]);
  const [id1, setId1] = useState([]);
  const [myOptions3, setMyOptions3] = useState(null);

  //empty the form Text
  const blankForm = () => {
    setCatType('');
    setPrice('');
    setDescription('');
  };
  const items = localStorage.getItem('accessToken');
  const roleCode = localStorage.getItem('roleCode');
  const userId = localStorage.getItem('userId');
  const headers = {
    "x-access-token": items,
    "roleCode": roleCode,
    "userId": userId
  }
  useEffect(() => {
    axios.get(`https://43.204.38.243:3001/api/getMasterData?masterName=durationmaster`,
      { headers: headers }).then((res) => {
        for (var i = 0; i < res.data.data.length; i++) {
          setAssignTo(current => [...current, res.data.data[i].name]);
          setId1(current => [...current, res.data.data[i].id, res.data.data[i].name])
        }
      });
  }, []);

  //Add data in the table
  const postData = () => {
    var catdurationid
    for (var i = 0; i < id1.length; i++) {
      if (myOptions3 == id1[i]) {
        catdurationid = id1[i - 1]
      }
    }
    axios.post('https://43.204.38.243:3001/api/upsertCatalogue',
      {
        catId: 0,
        catType: catType,
        price: price,
        gsName: name,
        description: description,
        catStatus: 1,
        actionBy: 1,
        durationId: catdurationid
      }, { headers: headers }
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    postData();
    blankForm();
    changePage();
    // alert('Catalogue Successfully Created');
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
              <Col md="6">
                <FormControl sx={{ m: 0, minWidth: 480 }} size="small" className="mt-1">
                  <Form.Label>Type</Form.Label>
                  <Select value={catType} label="Type" onChange={(e) => setCatType(e.target.value)}>
                    <MenuItem value="">Select the Type</MenuItem>
                    <MenuItem value="Service">Service</MenuItem>
                    <MenuItem value="Product">Product</MenuItem>
                  </Select>
                </FormControl>
              </Col>
              <Col className="mt-1" md="6">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                  placeholder="Enter the Name"
                />
              </Col>
            </Row>
            <Row>
              <Col md="6">
                <InputGroup>
                  <Form.Label className="mt-1">Duration</Form.Label>
                </InputGroup>
                <Autocomplete
                  style={{ width: 480 }}
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
                      label="Select the Calalogue Duration"
                      size="small"
                    />
                  )}
                />
              </Col>
              <Col md="6" className="mt-1">
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
