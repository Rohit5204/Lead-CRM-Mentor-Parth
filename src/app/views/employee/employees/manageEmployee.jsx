import { styled } from '@mui/system';
import { Breadcrumb } from 'app/components';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Row, Col, Modal, InputGroup } from 'react-bootstrap';
// import EditCatalogue from './editCatalogue';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  Box,
  Icon,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@mui/material';

const Container = styled('div')(({ theme }) => ({
  margin: '30px',
  [theme.breakpoints.down('sm')]: { margin: '16px' },
  '& .breadcrumb': {
    marginBottom: '30px',
    [theme.breakpoints.down('sm')]: { marginBottom: '16px' },
  },
}));
const StyledTable = styled(Table)(() => ({
  whiteSpace: 'pre',
  '& thead': {
    '& tr': { '& th': { paddingLeft: 0, paddingRight: 0 } },
  },
  '& tbody': {
    '& tr': { '& td': { paddingLeft: 0 } },
  },
}));

const ManageEmployee = () => {
  const [obj1, setObj1] = useState(null);
  const [APIData, setAPIData] = useState([]);
  const [show, setShow] = useState(false);
  //Dialog Form
  const handleClose = () => setShow(false);
  const handleShow = (catalogue) => {
    setObj1(catalogue);
    setShow(true);
  };
  const navigate = useNavigate();
  const changePage = () => {
    navigate('/employees/addEmployee');
  };
  const [userData, setUserData] = useState([]);
  //get method
  useEffect(() => {
    axios.get(`http://35.89.6.16:4002/api/getMasterData?masterName=usermaster`).then((response) => {
      setUserData(response.data.data);
    });
  }, [userData]);

  return (
    <Container>
      <Box>
        <Box className="breadcrumb">
          <Breadcrumb
            routeSegments={[
              { name: 'Manage Employee', path: '/employees/manageEmployee' },
              { name: 'Employee Detail Page' },
            ]}
          />
        </Box>
        <Box>
          <Row>
            <Col>
              <InputGroup className="mb-3">
                <button type="submit" className="btn btn-success" onClick={changePage}>
                  ADD
                </button>
                &nbsp;
                <Form.Control
                  placeholder="Search Box"
                  aria-label="Recipient's username"
                  aria-describedby="basic-addon2"
                />
              </InputGroup>
            </Col>
          </Row>
        </Box>
        <Box className="text-center" width="100%" overflow="auto">
          {/* Table Section */}
          <h4>Employee List </h4>
          <StyledTable>
            <TableHead>
              <TableRow>
                <TableCell align="justify">User Id</TableCell>
                <TableCell align="justify">Name</TableCell>
                <TableCell align="justify">Email</TableCell>
                <TableCell align="center">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {userData.map((subscriber, index) => (
                <TableRow key={index}>
                  <TableCell align="justify">{subscriber.userId}</TableCell>
                  <TableCell align="justify">
                    {subscriber.firstName} {subscriber.lastName}
                  </TableCell>
                  <TableCell align="justify">{subscriber.email}</TableCell>
                  <TableCell align="center">
                    <IconButton
                    // onClick={(event) => updateData(event, subscriber)}
                    >
                      <Icon color="success">edit</Icon>
                    </IconButton>
                    <IconButton
                    //  onClick={(event) => deleteData(event, subscriber)}
                    >
                      <Icon color="warning">delete</Icon>
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </StyledTable>
        </Box>
        <Modal
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header>
            <Modal.Title>Update Catalogue</Modal.Title>
          </Modal.Header>
          <Modal.Body>{/* <EditCatalogue theEditCatalogue={obj1} /> */}</Modal.Body>
          <Modal.Footer>
            <button
              type="submit"
              className="btn btn-error"
              style={{ marginTop: 5 + 'px' }}
              onClick={handleClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-success"
              style={{ marginTop: 5 + 'px' }}
              onClick={handleClose}
            >
              Update
            </button>
          </Modal.Footer>
        </Modal>
      </Box>
    </Container>
  );
};

export default ManageEmployee;
