import React, { useState } from 'react';
import { uid } from 'uid';
import { styled } from '@mui/system';
import { Breadcrumb, SimpleCard } from 'app/components';
import InvoiceItem from './InvoiceItem';
import InvoiceModal from './InvoiceModal';
import InvoiceEMI from './invoiceEMI';
import ReviewInvoice from './ReviewInvoice';
import incrementString from '../helpers/incrementString';
import { Form, Row, Col, Button, InputGroup, Card, Modal } from 'react-bootstrap';
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

const date = new Date();
const today = date.toLocaleDateString('en-GB', {
  month: 'numeric',
  day: 'numeric',
  year: 'numeric',
});
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

const InvoiceForm = () => {
  const [isOpen, setIsOpen] = useState(false);

  const [discount, setDiscount] = useState('');
  const [tax, setTax] = useState('');
  const [invoiceNumber, setInvoiceNumber] = useState(1201);
  const [cashierName, setCashierName] = useState('');
  const [companyEmail, setCompanyEmail] = useState('');
  const [companyContact, setCompanyContact] = useState('');
  const [companyAddress, setCompanyAddress] = useState('');
  const [companyGstNo, setCompanyGstNo] = useState('');
  const [companyStateName, setCompanyStateName] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [panNo, setPanNo] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [clientContact, setClientContact] = useState('');
  const [clientAddress, setClientAddress] = useState('');
  const [clientGstNo, setClientGstNo] = useState('');
  const [installments, setInstallments] = useState([
    {
      id: uid(6),
      date: '',
      amount: '',
    },
  ]);
  const [items, setItems] = useState([
    {
      id: uid(6),
      name: '',
      qty: 1,
      price: '1.00',
    },
  ]);

  const [show, setShow] = useState(false);
  //Dialog Form
  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true);
  };
  const reviewInvoiceHandler = (event) => {
    event.preventDefault();
    setIsOpen(true);
  };

  const addNextInvoiceHandler = () => {
    setInvoiceNumber((prevNumber) => incrementString(prevNumber));
    setItems([
      {
        id: uid(6),
        name: '',
        qty: 1,
        price: '1.00',
      },
    ]);
  };
  const addItemHandler1 = () => {
    const id = uid(6);
    setInstallments((prevItem) => [
      ...prevItem,
      {
        id: id,
        date: '',
        amount: '',
      },
    ]);
  };

  const addItemHandler = () => {
    const id = uid(6);
    setItems((prevItem) => [
      ...prevItem,
      {
        id: id,
        name: '',
        qty: 1,
        price: '1.00',
      },
    ]);
  };
  const deleteItemHandler1 = (id) => {
    setInstallments((prevItem) => prevItem.filter((item) => item.id !== id));
  };
  const deleteItemHandler = (id) => {
    setItems((prevItem) => prevItem.filter((item) => item.id !== id));
  };

  const edtiItemHandler = (event) => {
    const editedItem = {
      id: event.target.id,
      name: event.target.name,
      value: event.target.value,
    };

    const newItems = items.map((items) => {
      for (const key in items) {
        if (key === editedItem.name && items.id === editedItem.id) {
          items[key] = editedItem.value;
        }
      }
      return items;
    });

    setItems(newItems);
  };
  const edtiItemHandler1 = (event) => {
    const editedItem1 = {
      id: event.target.id,
      name: event.target.name,
      value: event.target.value,
    };

    const newInstallments = installments.map((installments) => {
      for (const key in installments) {
        if (key === editedItem1.name && installments.id === editedItem1.id) {
          installments[key] = editedItem1.value;
        }
      }
      return installments;
    });

    setInstallments(newInstallments);
  };

  const subtotal = items.reduce((prev, curr) => {
    if (curr.name.trim().length > 0) return prev + Number(curr.price * Math.floor(curr.qty));
    else return prev;
  }, 0);
  const taxRate = (tax * subtotal) / 100;
  const discountRate = (discount * subtotal) / 100;
  const total = subtotal - discountRate + taxRate;

  return (
    <Container>
      <Card style={{ width: '65rem', background: '#C3CFC9' }}>
        <Row>
          <Col md="9">
            <SimpleCard title="Invoice Preview">
              <Form>
                <Row className="mt-2">
                  <Col></Col>
                  <Col className="col-sm-12">
                    <h4 className="text-center  font-bold">INVOICE</h4>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Form.Label>Invoice Number:</Form.Label>
                    <Form.Control
                      value={invoiceNumber}
                      onChange={(event) => setInvoiceNumber(event.target.value)}
                      placeholder="Enter the Invoice Number"
                    />
                  </Col>
                  <Col>
                    <Form.Label>Current Date:</Form.Label>
                    <Form.Control
                      readOnly
                      // type="date"
                      // onChange={(e) => setQuotationDate(e.target.value)}
                      value={today}
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
                      value={cashierName}
                      onChange={(event) => setCashierName(event.target.value)}
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
                        value={companyEmail}
                        onChange={(event) => setCompanyEmail(event.target.value)}
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
                        value={companyContact}
                        onChange={(event) => setCompanyContact(event.target.value)}
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
                          onChange={(event) => setCompanyAddress(event.target.value)}
                          value={companyAddress}
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
                        value={companyGstNo}
                        onChange={(event) => setCompanyGstNo(event.target.value)}
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
                        value={companyStateName}
                        onChange={(event) => setCompanyStateName(event.target.value)}
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
                        value={customerName}
                        onChange={(event) => setCustomerName(event.target.value)}
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
                        value={panNo}
                        onChange={(event) => setPanNo(event.target.value)}
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
                        value={clientEmail}
                        onChange={(event) => setClientEmail(event.target.value)}
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
                        value={clientContact}
                        onChange={(event) => setClientContact(event.target.value)}
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
                          onChange={(event) => setClientAddress(event.target.value)}
                          value={clientAddress}
                          placeholder="Customer Address"
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row className="mt-1">
                    <Col md="6">
                      <Form.Label>Customer GST NO:</Form.Label>
                      <Form.Control
                        required
                        className="flex-1"
                        placeholder="Enter GST Number"
                        type="text"
                        name="clientGstNo"
                        id="clientGstNo"
                        value={clientGstNo}
                        onChange={(event) => setClientGstNo(event.target.value)}
                      />
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
                            onClick={addItemHandler}
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
                        {items.map((item) => (
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
                        ))}
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
                      &nbsp;&nbsp;
                      <Form.Label style={{ color: 'green' }} className="ml-5">
                        ₹ {subtotal.toFixed(2)}
                      </Form.Label>
                    </Col>
                  </Row>

                  <Row>
                    <Col></Col>
                    <Col></Col>
                    <Col>
                      <b>
                        <Form.Label>Tax Rate({tax || '0'}%):</Form.Label>
                      </b>

                      <Form.Label style={{ color: 'green' }} className="ml-4">
                        ₹{taxRate.toFixed(2)}
                      </Form.Label>
                    </Col>
                  </Row>
                  <Row>
                    <Col></Col>
                    <Col></Col>
                    <Col>
                      <b>
                        <Form.Label>Discount({discount || '0'}%) :</Form.Label>
                      </b>

                      <Form.Label style={{ color: 'green' }} className="ml-4">
                        ₹{discountRate.toFixed(2)}
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

                      <Form.Label style={{ color: 'green' }} className="ml-5">
                        ₹{total % 1 === 0 ? total : total.toFixed(2)}
                      </Form.Label>
                    </Col>
                  </Row>
                </div>
              </Form>
            </SimpleCard>
          </Col>
          <Col>
            <Card.Body>
              <Button variant="primary" onClick={reviewInvoiceHandler}>
                Review Invoice
              </Button>
              <hr />

              <Row>
                <Col>
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
                      value={tax}
                      onChange={(event) => setTax(event.target.value)}
                    />
                    <InputGroup.Text>%</InputGroup.Text>
                  </InputGroup>

                  <span className="rounded-r-md bg-gray-200 py-2 px-4 text-gray-500 shadow-sm"></span>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Label>Discount rate:</Form.Label>
                  <InputGroup className="mb-3">
                    <Form.Control
                      required
                      type="number"
                      name="tax"
                      id="tax"
                      // min="5"
                      // step="1"
                      placeholder="Discount Rate"
                      value={discount}
                      onChange={(event) => setDiscount(event.target.value)}
                    />
                    <InputGroup.Text>%</InputGroup.Text>
                  </InputGroup>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Label>Number Of Installemnt:</Form.Label>
                  <InputGroup className="mb-3">
                    <Form.Control
                      required
                      type="number"
                      name="tax"
                      id="tax"
                      min="3"
                      max="9"
                      step="3"
                      placeholder="Select Period"
                      //value={discount}
                      //onChange={(event) => setDiscount(event.target.value)}
                    />
                    {/* <InputGroup.Text>%</InputGroup.Text> */}
                  </InputGroup>
                </Col>
              </Row>
              <Row>
                <button type="button" onClick={() => handleShow()} className="btn btn-success">
                  Add Installments
                </button>
              </Row>
              <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                aria-labelledby="example-modal-sizes-title-lg"
                size="lg"
                centered
              >
                <Modal.Header>
                  <Modal.Title>Create EMI Installemnt</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <Row>
                    <Col className="col-sm-1">
                      <button type="button" onClick={addItemHandler1} className="btn btn-success">
                        Add New Installments
                      </button>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <StyledTable>
                        <TableHead>
                          <TableRow>
                            <TableCell align="justify">Date</TableCell>
                            <TableCell align="justify">Amount</TableCell>

                            <TableCell align="justify">Action</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {installments.map((item) => (
                            <InvoiceEMI
                              align="justify"
                              key={item.id}
                              id={item.id}
                              date={item.date}
                              amount={item.amount}
                              onDeleteItem={deleteItemHandler1}
                              onEdtiItem={edtiItemHandler1}
                            />
                            // <InvoiceItem
                            //   align="justify"
                            //   key={item.id}
                            //   id={item.id}
                            //   name={item.name}
                            //   price={item.price}
                            //   onDeleteItem={deleteItemHandler1}
                            //   onEdtiItem={edtiItemHandler}
                            // />
                          ))}
                        </TableBody>
                      </StyledTable>
                    </Col>
                  </Row>
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
                    ADD
                  </button>
                </Modal.Footer>
              </Modal>
            </Card.Body>
          </Col>
        </Row>
      </Card>

      <ReviewInvoice
        show={isOpen}
        setIsOpen={setIsOpen}
        invoiceInfo={{
          invoiceNumber,
          companyEmail,
          companyAddress,
          companyContact,
          companyGstNo,
          companyStateName,
          clientEmail,
          clientContact,
          clientAddress,
          clientGstNo,
          panNo,
          cashierName,
          customerName,
          subtotal,
          taxRate,
          discountRate,
          total,
        }}
        items={items}
        onAddNextInvoice={addNextInvoiceHandler}
      />
      {/* <InvoiceModal
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          invoiceInfo={{
            invoiceNumber,
            cashierName,
            customerName,
            subtotal,
            taxRate,
            discountRate,
            total,
          }}
          items={items}
          onAddNextInvoice={addNextInvoiceHandler}
        /> */}
    </Container>
  );
};

export default InvoiceForm;
