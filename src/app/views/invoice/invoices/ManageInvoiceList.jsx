import { styled } from '@mui/system';
import { Breadcrumb, SimpleCard } from 'app/components';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Row, Col, Modal, InputGroup, Card, Button } from 'react-bootstrap';
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
                <Form.Control
                  placeholder="Search Box"
                  aria-label="Recipient's username"
                  aria-describedby="basic-addon2"
                />
                &nbsp;
                <button type="submit" className="btn btn-success" onClick={changePage}>
                  ADD
                </button>
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
                <TableCell align="center">
                  <button type="button" className=" btn-success">
                    Send
                  </button>
                </TableCell>
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
                <TableCell align="center">
                  <Form.Check type="switch" id="custom-switch" label="" />
                </TableCell>
                <TableCell align="justify">1200</TableCell>
                <TableCell align="justify">22-10-2022</TableCell>
                <TableCell align="justify">Yogesh Rithe</TableCell>
                <TableCell align="justify"> ABCR7826W</TableCell>
                <TableCell align="justify">Maharashtra</TableCell>
                <TableCell align="justify">52000</TableCell>
                <TableCell align="center">
                  <IconButton onClick={() => handleShow()}>
                    <Icon color="success">visibility</Icon>
                  </IconButton>
                  <IconButton onClick={() => handleShow()}>
                    <Icon color="success">edit</Icon>
                  </IconButton>

                  <IconButton
                  // onClick={(event) => deleteData(event, catalogue)}
                  >
                    <Icon color="warning">delete</Icon>
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
          aria-labelledby="example-modal-sizes-title-lg"
          size="lg"
          // aria-labelledby="contained-modal-title-vcenter"
          // centered
        >
          {/* <Modal.Header>
            <Modal.Title>Update Catalogue</Modal.Title>
          </Modal.Header> */}
          <Modal.Body>
            {/* <EditCatalogue theEditCatalogue={obj1} /> */}
            <Card style={{ width: '48rem', background: '#C3CFC9' }}>
              {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
              <Row>
                <Col md="8">
                  <SimpleCard title="Invoice Preview">
                    <Form>
                      <Row className="mt-5">
                        <Col></Col>
                        <Col className="col-sm-9">
                          <h4 className="text-center  font-bold">INVOICE</h4>
                        </Col>
                        {/* <Col className="col-sm-2">
                          <button
                            type="button"
                            className="btn btn-primary"
                            //onClick={reviewInvoiceHandler}
                          >
                            Review Invoice
                          </button>
                        </Col> */}
                      </Row>
                      <Row>
                        <Col>
                          <Form.Label>Invoice Number:</Form.Label>
                          <Form.Control
                            ///value={invoiceNumber}
                            //onChange={(event) => setInvoiceNumber(event.target.value)}
                            placeholder="Enter the Invoice Number"
                          />
                        </Col>
                        <Col>
                          <Form.Label>Current Date:</Form.Label>
                          <Form.Control
                            readOnly
                            //   type="date"
                            //   onChange={(e) => setQuotationDate(e.target.value)}
                            //value={today}
                          />
                        </Col>

                        <Col>
                          <Form.Label> Generated By:</Form.Label>
                          <Form.Control
                            required
                            className="flex-1"
                            placeholder="Cashier name"
                            type="text"
                            name="cashierName"
                            id="cashierName"
                            //value={cashierName}
                            //onChange={(event) => setCashierName(event.target.value)}
                          />
                        </Col>
                      </Row>
                      <div className="mt-2">
                        <b>
                          <h6 style={{ color: 'green' }}>Company Detail's</h6>
                        </b>
                        <Row className="mt-1">
                          <Col>
                            <Form.Label>Company Email:</Form.Label>
                            <Form.Control
                              required
                              // className="flex-1"
                              placeholder="Company Email"
                              // type="text"
                              // name="companyEmail"
                              // id="companyEmail"
                              //value={companyEmail}
                              //onChange={(event) => setCompanyEmail(event.target.value)}
                            />
                          </Col>
                          <Col>
                            <Form.Label>Company Contact:</Form.Label>
                            <Form.Control
                              required
                              className="flex-1"
                              placeholder="Company Contact"
                              type="text"
                              name="companyContact"
                              id="companyContact"
                              //value={companyContact}
                              //onChange={(event) => setCompanyContact(event.target.value)}
                            />
                          </Col>
                        </Row>
                        <Row className="mt-1">
                          <Col>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                              <Form.Label>Address</Form.Label>
                              <Form.Control
                                as="textarea"
                                rows={3}
                                // onChange={(event) => setCompanyAddress(event.target.value)}
                                // value={companyAddress}
                                placeholder="Company Address"
                              />
                            </Form.Group>
                          </Col>
                        </Row>
                        <Row className="mt-1">
                          <Col>
                            <Form.Label>Company GST NO:</Form.Label>
                            <Form.Control
                              required
                              className="flex-1"
                              placeholder="Enter GST Number"
                              type="text"
                              name="companyGstNo"
                              id="companyGstNo"
                              //value={companyGstNo}
                              //onChange={(event) => setCompanyGstNo(event.target.value)}
                            />
                          </Col>
                          <Col>
                            <Form.Label>State Name:</Form.Label>
                            <Form.Control
                              required
                              className="flex-1"
                              placeholder="Sate Name"
                              type="text"
                              name="companyStateName"
                              id="companyStateName"
                              //value={companyStateName}
                              //onChange={(event) => setCompanyStateName(event.target.value)}
                            />
                          </Col>
                        </Row>
                        <b>
                          <h6 className="mt-2" style={{ color: 'green' }}>
                            Client Detail's
                          </h6>
                        </b>
                        <Row className="mt-1">
                          <Col>
                            <Form.Label>Biller/Customer Name:</Form.Label>
                            <Form.Control
                              required
                              className="flex-1"
                              placeholder="Customer name"
                              type="text"
                              name="customerName"
                              id="customerName"
                              //value={customerName}
                              //onChange={(event) => setCustomerName(event.target.value)}
                            />
                          </Col>
                          <Col>
                            <Form.Label>Pan Number:</Form.Label>
                            <Form.Control
                              required
                              className="flex-1"
                              placeholder="Customer Pan No"
                              type="text"
                              name="panNo"
                              id="panNo"
                              //value={panNo}
                              //onChange={(event) => setPanNo(event.target.value)}
                            />
                          </Col>
                        </Row>
                        <Row className="mt-1">
                          <Col>
                            <Form.Label>Customer Email:</Form.Label>
                            <Form.Control
                              required
                              className="flex-1"
                              placeholder="Customer Email"
                              type="text"
                              name="clientEmail"
                              id="clientEmail"
                              //value={clientEmail}
                              //onChange={(event) => setClientEmail(event.target.value)}
                            />
                          </Col>
                          <Col>
                            <Form.Label>Customer Contact No:</Form.Label>
                            <Form.Control
                              required
                              className="flex-1"
                              placeholder="Customer Contact"
                              type="text"
                              name="clientContact"
                              id="clientContact"
                              //value={clientContact}
                              //onChange={(event) => setClientContact(event.target.value)}
                            />
                          </Col>
                        </Row>
                        <Row className="mt-1">
                          <Col>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                              <Form.Label>Address</Form.Label>
                              <Form.Control
                                as="textarea"
                                rows={3}
                                //onChange={(event) => setClientAddress(event.target.value)}
                                // value={clientAddress}
                                placeholder="Customer Address"
                              />
                            </Form.Group>
                          </Col>
                        </Row>
                        <Row className="mt-1">
                          <Col>
                            <Form.Label>Customer GST NO:</Form.Label>
                            <Form.Control
                              required
                              className="flex-1"
                              placeholder="Enter GST Number"
                              type="text"
                              name="clientGstNo"
                              id="clientGstNo"
                              // value={clientGstNo}
                              //onChange={(event) => setClientGstNo(event.target.value)}
                            />
                          </Col>
                          <Col>
                            <Form.Label>Tax rate:</Form.Label>
                            <InputGroup className="mb-3">
                              <br />
                              <Form.Control
                                required
                                type="number"
                                name="tax"
                                id="tax"
                                min="5"
                                step="1"
                                placeholder="Tax Rate"
                                //value={tax}
                                //onChange={(event) => setTax(event.target.value)}
                              />
                              <InputGroup.Text>%</InputGroup.Text>
                            </InputGroup>

                            <span className="rounded-r-md bg-gray-200 py-2 px-4 text-gray-500 shadow-sm"></span>
                          </Col>
                        </Row>

                        <Box className="text-center mt-2" width="100%" overflow="auto">
                          {/* Table Section */}
                          <Row>
                            <Col></Col>
                            <Col className="col-sm-9">
                              <h4 style={{ color: 'green' }}>Product Invoice List</h4>
                            </Col>
                            <Col>
                              <Col className="col-sm-1">
                                <button
                                  type="button"
                                  //onClick={addItemHandler}
                                  className="btn btn-success"
                                >
                                  Add Items
                                </button>
                              </Col>
                            </Col>
                          </Row>
                          <StyledTable>
                            <TableHead>
                              <TableRow>
                                <TableCell align="center">Product Name</TableCell>
                                <TableCell align="center">Quatity</TableCell>
                                <TableCell align="center">Unit Price</TableCell>
                                <TableCell align="center">Action</TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {/* {items.map((item) => (
                                <InvoiceItem
                                  align="justify"
                                  key={item.id}
                                  id={item.id}
                                  name={item.name}
                                  qty={item.qty}
                                  price={item.price}
                                  onDeleteItem={deleteItemHandler}
                                  onEdtiItem={edtiItemHandler}
                                />
                              ))} */}
                            </TableBody>
                          </StyledTable>
                        </Box>

                        <Row>
                          <Col></Col>
                          <Col></Col>
                          <Col>
                            <b>
                              <Form.Label>Subtotal:</Form.Label>
                            </b>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <Form.Label style={{ color: 'green' }} className="ml-5">
                              {/* ₹ {subtotal.toFixed(2)} */}
                            </Form.Label>
                          </Col>
                        </Row>

                        <Row>
                          <Col></Col>
                          <Col></Col>
                          <Col>
                            <b>{/* <Form.Label>Tax Rate({tax || '0'}%):</Form.Label> */}</b>
                            &nbsp;&nbsp;&nbsp;&nbsp;
                            <Form.Label style={{ color: 'green' }} className="ml-4">
                              {/* ₹{taxRate.toFixed(2)} */}
                            </Form.Label>
                          </Col>
                        </Row>
                        <Row>
                          <Col></Col>
                          <Col></Col>

                          <Col>
                            <hr />
                            <b>
                              <Form.Label>Grand Total:</Form.Label>
                            </b>
                            &nbsp;&nbsp;&nbsp;
                            <Form.Label style={{ color: 'green' }} className="ml-5">
                              {/* ₹{total % 1 === 0 ? total : total.toFixed(2)} */}
                            </Form.Label>
                          </Col>
                        </Row>
                      </div>
                    </Form>
                  </SimpleCard>
                </Col>
                <Col>
                  <Card.Body>
                    {/* <Card.Title>Card Title</Card.Title> */}

                    <Button variant="primary">Review Invoice</Button>
                    <br />
                    <Form.Label>Tax rate:</Form.Label>
                    <InputGroup className="mb-3">
                      <Form.Control
                        required
                        type="number"
                        name="tax"
                        id="tax"
                        min="5"
                        step="1"
                        placeholder="Tax Rate"
                        // value={tax}
                        // onChange={(event) => setTax(event.target.value)}
                      />
                      <InputGroup.Text>%</InputGroup.Text>
                    </InputGroup>

                    <span className="rounded-r-md bg-gray-200 py-2 px-4 text-gray-500 shadow-sm"></span>
                  </Card.Body>
                </Col>
              </Row>
            </Card>
          </Modal.Body>
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
