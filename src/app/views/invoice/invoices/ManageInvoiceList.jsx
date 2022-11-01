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

const ManageInvoiceList = () => {
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
    navigate('/invoices/invoiceForm');
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
              { name: 'Manage Invoice List', path: '/invoices/ManageInvoiceList' },
              { name: 'Invoice Detail Page' },
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
          <h4>Invoice List</h4>
          <StyledTable>
            <TableHead>
              <TableRow>
                <TableCell align="justify">Invoice No</TableCell>
                <TableCell align="justify">Invoice Date</TableCell>
                <TableCell align="justify">Customer Name</TableCell>
                <TableCell align="justify">Customer Pan No</TableCell>
                <TableCell align="justify">State Name</TableCell>
                <TableCell align="justify">Total Amount</TableCell>
                <TableCell align="center">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell align="justify">1200</TableCell>
                <TableCell align="justify">22-10-2022</TableCell>
                <TableCell align="justify">Yogesh Rithe</TableCell>
                <TableCell align="justify"> ABCR7826W</TableCell>
                <TableCell align="justify">Maharashtra</TableCell>
                <TableCell align="justify">52000</TableCell>
                <TableCell align="center">
                  <IconButton onClick={() => handleShow()}>
                    <Icon color="success">edit</Icon>
                  </IconButton>

                  <IconButton
                  // onClick={(event) => deleteData(event, catalogue)}
                  >
                    <Icon color="warning">delete</Icon>
                  </IconButton>
                  <IconButton onClick={() => handleShow()}>
                    <Icon color="success">send</Icon>
                  </IconButton>
                </TableCell>
              </TableRow>
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

export default ManageInvoiceList;
