import * as React from 'react';
import { styled } from '@mui/system';
import { Breadcrumb, SimpleCard } from 'app/components';
import { Box, MenuItem, FormControl, Select, Autocomplete, TextField, } from '@mui/material';
import { Form, Row, Col, InputGroup } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { BASE_URL } from 'app/utils/constant';

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
const EditCatalogue = ({ theEditCatalogue, handleDialog, onTableRefresh }) => {
  const [id, setId] = useState(theEditCatalogue.id);
  const [gsType, setGsType] = useState(theEditCatalogue.gsType);
  const [gsName, setGsName] = useState(theEditCatalogue.gsName);
  const [gsPrice, setGsPrice] = useState(theEditCatalogue.gsPrice);
  const [catStatus, setCatStatus] = useState(theEditCatalogue.status);
  const [gsDescription, setGsDescription] = useState(theEditCatalogue.gsDescription);
  const [duration, setDuration] = useState(0);
  const [assignTo, setAssignTo] = useState([]);
  const [id1, setId1] = useState([]);
  const [myOptions3, setMyOptions3] = useState(theEditCatalogue.durationName);

  useEffect(() => {
    axios.get(BASE_URL + `/api/getMasterData?masterName=durationmaster`, { headers: headers })
      .then((res) => {
        if (Array.isArray(res.data.status)) {
          for (var i = 0; i < res.data.status.length; i++) {
            setAssignTo(current => [...current, res.data.status[i].name]);
            setId1(current => {
              const newId1 = [...current, res.data.status[i].id, res.data.status[i].name];
              return newId1;
            });
          }
        }
      });
  }, []);

  const items = localStorage.getItem('accessToken');
  const roleCode = localStorage.getItem('roleCode');
  const userId = localStorage.getItem('userId');
  const headers = {
    "x-access-token": items,
    "roleCode": roleCode,
    "userId": userId
  };

  const updateCatalogue = () => {
    var catdurationid;
    for (var i = 0; i < id1.length; i++) {
      if (myOptions3 === id1[i + 1]) { // Modify this line to check the correct index
        catdurationid = id1[i];
      }
    }
    const UpdateCatalogue = {
      catId: id,
      catType: gsType,
      gsName: gsName,
      price: gsPrice,
      description: gsDescription,
      catStatus: catStatus,
      actionBy: 1,
      durationId: catdurationid,
    };

    axios.post(BASE_URL + `/api/upsertCatalogue`, UpdateCatalogue, { headers: headers })
      .then(() => {
        handleDialog();
        onTableRefresh();
      })
      .catch(error => {
        console.error("Error updating catalogue:", error);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const changePage = () => {
    handleDialog();
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
            <FormControl sx={{ m: 0, width: '100%' }} size="small" >
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
            <FormControl sx={{ m: 0, width: '100%' }} size="small" >
              <Form.Label>Status</Form.Label>
              <Select value={catStatus} label="Type" onChange={(e) => setCatStatus(e.target.value)}>
                <MenuItem value="">Select the Type</MenuItem>
                <MenuItem value={0}>INACTIVE</MenuItem>
                <MenuItem value={1}>ACTIVE</MenuItem>
              </Select>
            </FormControl>
          </Col>
        </Row>
        <Row>
          <Col >

            <InputGroup>
              <Form.Label className="mt-1">Duration</Form.Label>
            </InputGroup>
            <Autocomplete
              style={{ width: '100%' }}
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
          <Col className="d-flex justify-content-end">
            <button
              type="submit"
              className="btn btn-secondary"
              style={{ marginTop: 5 + 'px' }}
              onClick={changePage}
            >Cancel
            </button>
            &nbsp;
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
