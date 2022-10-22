import { styled } from '@mui/system';
import { Breadcrumb } from 'app/components';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Data } from 'app/components/Data';
import { Form, Row, Col, Modal, InputGroup } from 'react-bootstrap';
// import EditCatalogue from './editCatalogue';
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

const ManageQuotation = () => {
  const [obj1, setObj1] = useState(null);
  const [APIData, setAPIData] = useState([]);
  const [show, setShow] = useState(false);
  //Dialog Form
  const handleClose = () => setShow(false);
  const handleShow = (catalogue) => {
    setObj1(catalogue);
    setShow(true);
  };

  //get method
  useEffect(() => {
    axios
      .post(`http://35.89.6.16:4002/api/getFilteredLeadData`, {
        leadId: 0,
        userId: 0,
        statusId: 0,
      })
      .then((response) => {
        setAPIData(response.data.data);
      });
  }, [APIData]);
  //   useEffect(() => {
  //     axios
  //       .post(`http://35.89.6.16:4002/api/upsertCatalogue`, {
  //         catId: 0,
  //       })
  //       .then((response) => {
  //         setAPIData(response.data.data);
  //       });
  //   }, [APIData]);
  return (
    <Container>
      <Box>
        <Box className="breadcrumb">
          <Breadcrumb
            routeSegments={[
              { name: 'Manage Quotation', path: '/quotations/manageQuotation' },
              { name: 'Quotation Detail Page' },
            ]}
          />
        </Box>
        <Box>
          <Row>
            <Col>
              <InputGroup className="mb-3">
                <Form.Control
                  placeholder="Search Box"
                  aria-label="Recipient's username"
                  aria-describedby="basic-addon2"
                />
                &nbsp;
                <button type="submit" className="btn btn-success">
                  ADD
                </button>
              </InputGroup>
            </Col>
          </Row>
        </Box>
        <Box className="text-center" width="100%" overflow="auto">
          {/* Table Section */}
          <h4>Quotation Table</h4>
          <StyledTable>
            <TableHead>
              <TableRow>
                <TableCell align="justify">Quotation Id</TableCell>
                <TableCell align="justify">Catalogue Type</TableCell>
                {/* <TableCell align="justify">Price</TableCell> */}
                <TableCell align="justify">Status</TableCell>
                <TableCell align="center">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {APIData.map((catalogue, index) => {
                // if (catalogue.status == 1) {
                return (
                  <TableRow key={index}>
                    <TableCell align="justify">{catalogue.leadId}</TableCell>
                    <TableCell align="justify">{catalogue.name}</TableCell>
                    <TableCell align="justify">{catalogue.emailId}</TableCell>
                    {/* <TableCell align="justify">{catalogue.catId}</TableCell>
                    <TableCell align="justify">{catalogue.catType}</TableCell>
                    <TableCell align="justify">{catalogue.price}</TableCell>
                    <TableCell align="justify">{catalogue.catStatus}</TableCell> */}
                    <TableCell align="center">
                      <IconButton onClick={() => handleShow(catalogue)}>
                        <Icon color="success">edit</Icon>
                      </IconButton>
                      <IconButton
                      // onClick={(event) => deleteData(event, catalogue)}
                      >
                        <Icon color="warning">delete</Icon>
                      </IconButton>
                    </TableCell>
                  </TableRow>
                );
                // }
              })}
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
            <Modal.Title>Update Quotation</Modal.Title>
          </Modal.Header>
          <Modal.Body>{/* <EditCatalogue theEditCatalogue={obj1} /> */}</Modal.Body>
          <Modal.Footer>
            <button
              type="submit"
              className="btn btn-success"
              style={{ marginTop: 5 + 'px' }}
              onClick={handleClose}
            >
              Update
            </button>
            <button
              type="submit"
              className="btn btn-error"
              style={{ marginTop: 5 + 'px' }}
              onClick={handleClose}
            >
              Cancel
            </button>
          </Modal.Footer>
        </Modal>
      </Box>
    </Container>
  );
};

export default ManageQuotation;
