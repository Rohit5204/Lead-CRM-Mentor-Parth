import { styled } from '@mui/system';
import { Breadcrumb } from 'app/components';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Row, Col, Modal, InputGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';
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

const ManageAllProfile = () => {
  const [APIData, setAPIData] = useState([]);

  //get method
  const items = localStorage.getItem('accessToken');
  const getCatalogueData = () => {
    axios
      .post(
        `https://43.204.38.243:3000/api/getCompanyMaster`,
        { id: 0 },
        { headers: { 'x-access-token': items } }
      )
      .then((response) => {
        setAPIData(response.data.data);
      });
  };
  useEffect(() => {
    getCatalogueData();
  }, []);
  return (
    <Container>
      <Box>
        <Box className="breadcrumb">
          <Breadcrumb
            routeSegments={[
              { name: 'Manage Organization' },

            ]}
          />
        </Box>
        <Box>
          <Row>
            <Col>
              <InputGroup className="mb-3">
                {/* <button type="submit" className="btn btn-success" onClick={changePage}>
                  ADD
                </button>
                &nbsp; */}
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
          <h4>Organization Details</h4>
          <StyledTable>
            <TableHead>
              <TableRow>
                <TableCell align="center">Company Id</TableCell>
                <TableCell align="center">Name</TableCell>
                <TableCell align="center">Admin</TableCell>
                <TableCell align="center">State</TableCell>
                <TableCell align="center">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {APIData.map((catalogue, index) => {
                if (catalogue.recordStatus == 1) {
                  return (
                    <TableRow key={index}>
                      {catalogue.recordStatus == 0 ? <></> : <></>}
                      <TableCell align="center">{catalogue.id}</TableCell>
                      <TableCell align="center">{catalogue.name}</TableCell>
                      <TableCell align="center">Vikram Jadhav</TableCell>
                      <TableCell align="center">{catalogue.stateName}</TableCell>
                      <TableCell align="center">
                        <Link to="/profile" state={catalogue}>
                          <IconButton>
                            <Icon color="success">edit</Icon>
                          </IconButton>
                        </Link>
                      </TableCell>
                    </TableRow>
                  );
                }
              })}
            </TableBody>
          </StyledTable>
        </Box>
      </Box>
    </Container>
  );
};

export default ManageAllProfile;
