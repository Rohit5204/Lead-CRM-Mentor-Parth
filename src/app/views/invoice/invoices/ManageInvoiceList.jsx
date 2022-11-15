import { styled } from '@mui/system';
import { Breadcrumb } from 'app/components';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Form, Row, Col, Modal, InputGroup } from 'react-bootstrap';
import ViewInvoice from './viewInvoice';
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
  const navigate = useNavigate();
  const changePage = () => {
    navigate('/invoices/addInvoice');
  };
  const [showForm, setShowForm] = useState(false);

  const showForm1 = () => {
    setShowForm(!showForm);
  };
  const [obj1, setObj1] = useState(null);
  const [APIData, setAPIData] = useState([]);
  const [show, setShow] = useState(false);
  //Dialog Form
  const handleClose = () => setShow(false);

  const handleShow = (invoice) => {
    setObj1(invoice);
    setShow(true);
  };
  const items = localStorage.getItem('accessToken');
  //get method
  useEffect(() => {
    axios.post(`http://35.89.6.16:4002/api/getInvoiceData`, { invoiceid: 0, empId: 0 }, { headers: { "x-access-token": items } })
      .then((response) => {
        setAPIData(response.data.data);
      });
  }, [APIData]);
  return (
    <Container>
      <Box>
        <Box className="breadcrumb">
          <Breadcrumb
            routeSegments={[
              { name: 'Manage Invoice', path: '/invoices/ManageInvoiceList' }
            ]}
          />
        </Box>
        {/* Search option */}
        <Box>
          {/* <Row>
            <Col>
              <Form.Label htmlFor="basic-url">Apply Filter Search</Form.Label>
              <br></br>
              <button type="button" className="btn btn-outline-success">
                Last Day
              </button>
              &nbsp;
              <button type="button" className="btn btn-outline-success">
                Last Week
              </button>
              &nbsp;
              <button type="button" className="btn btn-outline-success">
                Last Month
              </button>
              &nbsp;
            </Col>
          </Row> */}
          <br />
          <Row>
            <Col>
              <Form.Label htmlFor="basic-url">Serach Box</Form.Label>
              <InputGroup className="mb-3">
                <button type="button" className="btn btn-success" onClick={changePage}>
                  ADD
                </button>
                &nbsp;
                <Form.Control
                  placeholder="Search Box"
                  aria-label="Recipient's username"
                  aria-describedby="basic-addon2"
                />
                {/* &nbsp;
                <button type="submit" className="btn btn-success" onClick={changePage}>
                  ADD
                </button> */}
              </InputGroup>
            </Col>

          </Row>
          <Row>
            <Col md="10">
              <Form.Label htmlFor="basic-url">Apply Filter Search</Form.Label>
              <br></br>
              <button type="button" className="btn btn-outline-primary ">
                Last Day
              </button>
              &nbsp;
              <button type="button" className="btn btn-outline-primary">
                Last Week
              </button>
              &nbsp;
              <button type="button" className="btn btn-outline-primary">
                Last Month
              </button>
              &nbsp;
            </Col>

            <Col md="2">
              <Form.Label htmlFor="basic-url"> Advanced Search</Form.Label>
              <br />
              <button type="button" className="btn btn-outline-primary" onClick={showForm1}>
                Apply Filter
              </button>
            </Col>
          </Row>
          <br />
          {showForm && (
            <form>
              <Row>
                <Col>
                  <div class="form-group">
                    <label for="exampleInputEmail1">Serach By Customer Name</label>
                    <input
                      type="email"
                      class="form-control"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                      placeholder="Enter Customer Name"
                    />
                  </div>
                </Col>
                <Col>
                  <div class="form-group">
                    <label for="exampleInputEmail1">Serach By Product Name</label>
                    <input
                      type="email"
                      class="form-control"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                      placeholder="Enter Product Name"
                    />
                  </div>
                </Col>
                <Col>
                  <div class="form-group">
                    <label for="exampleInputPassword1">Serach By Quantity</label>
                    <input
                      type="password"
                      class="form-control"
                      id="exampleInputPassword1"
                      placeholder="Serach By Quantity"
                    />
                  </div>
                </Col>
              </Row>
              <Row>
                <Col>
                  <div class="form-group">
                    <label for="exampleInputPassword1">Search By Contact Number</label>
                    <input
                      type="password"
                      class="form-control"
                      id="exampleInputPassword1"
                      placeholder="Serach By Contact Number"
                    />
                  </div>
                </Col>
                <Col>
                  <div class="form-group">
                    <label for="exampleInputPassword1">Search By Amount</label>
                    <input
                      type="password"
                      class="form-control"
                      id="exampleInputPassword1"
                      placeholder="Search By Amount"
                    />
                  </div>
                </Col>
                <Col>
                  <div class="form-group">
                    <label for="exampleInputPassword1">Search By Date</label>
                    <input
                      type="date"
                      class="form-control"
                      id="exampleInputPassword1"
                      placeholder="Search By Date"
                    />
                  </div>
                </Col>
              </Row>
              <Row>
                <Col>
                  <div class="form-group">
                    <label for="exampleInputPassword1">Select Assign To</label>
                    <input
                      type="password"
                      class="form-control"
                      id="exampleInputPassword1"
                      placeholder="Select Assign To"
                    />
                  </div>
                </Col>
                <Col>
                  <div class="form-group">
                    <label for="exampleInputPassword1">Select Generated By</label>
                    <input
                      type="password"
                      class="form-control"
                      id="exampleInputPassword1"
                      placeholder="Select Generated By"
                    />
                  </div>
                </Col>
                <Col>
                  <div class="form-group">
                    <label for="exampleInputPassword1">Select Monitor By</label>
                    <input
                      type="password"
                      class="form-control"
                      id="exampleInputPassword1"
                      placeholder="Select Monitor By"
                    />
                  </div>
                </Col>
              </Row>
              <button type="submit" class="btn btn-primary">
                Serach
              </button>
            </form>
          )}
        </Box>
        <Box className="text-center" width="100%" overflow="auto">
          {/* Table Section */}
          <h4>Invoice Table</h4>
          <StyledTable className="table table-striped table-bordered" style={{ 'borderRadius': '2px' }}>
            <TableHead style={{ 'border - left': '1px solid red', 'border-right': '1px solid red' }} className='text-center'>

              <TableRow>
                <TableCell align="center">Invoice No</TableCell>
                <TableCell align="center">Date</TableCell>
                <TableCell align="center">Customer Name</TableCell>
                <TableCell align="center">Mobile No</TableCell>
                <TableCell align="center">Total Amount</TableCell>

                <TableCell align="center">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {APIData.map((invoice, index) => {
                return (
                  <TableRow key={index}>
                    <TableCell align="center">{invoice.invoiceNumber}</TableCell>
                    <TableCell align="center">{new Date(invoice.createdDate).toLocaleDateString()}</TableCell>
                    <TableCell align="center">{invoice.billTo}</TableCell>
                    <TableCell align="center">{invoice.clientContact}</TableCell>
                    <TableCell align="center">{invoice.grandTotal}</TableCell>
                    <TableCell align="center">
                      <IconButton onClick={() => handleShow(invoice)}>
                        <Icon color="warning">visibility</Icon>
                      </IconButton>
                      <IconButton>
                        <Icon color="success">edit</Icon>
                      </IconButton>
                    </TableCell>
                  </TableRow>
                );
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
            <Modal.Title>Preview invoice</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <ViewInvoice theViewInvoice={obj1}></ViewInvoice>
          </Modal.Body>
          <Modal.Footer>
            {/* <button
              type="submit"
              className="btn btn-success"
              style={{ marginTop: 5 + 'px' }}
              onClick={handleClose}
            >
              Update
            </button> */}
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

export default ManageInvoiceList;
