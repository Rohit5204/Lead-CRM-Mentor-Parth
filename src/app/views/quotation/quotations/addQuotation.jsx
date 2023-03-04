import React, { useState, useEffect } from 'react';
import { uid } from 'uid';
import { styled } from '@mui/system';
import { Breadcrumb, SimpleCard } from 'app/components';
import ReviewInvoice from 'app/views/invoice/invoices/ReviewInvoice';
import incrementString from 'app/views/invoice/helpers/incrementString';
import { Form, Row, Col, Button, InputGroup, Card, Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import QuotationEMI from './quotationItems';
import axios from 'axios';
import {
  Box,
  MenuItem,
  Autocomplete,
  TextField,
  FormControl,
  Select,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@mui/material';
import { resetWarningCache } from 'prop-types';
import { BASE_URL } from 'app/utils/constant';

// const date = new Date();
// const today = date.toLocaleDateString('en-GB', {
//   month: 'numeric',
//   day: 'numeric',
//   year: 'numeric',
// });
const today = new Date();
const numberOfDaysToAdd = 0;
const date = today.setDate(today.getDate() + numberOfDaysToAdd);
const defaultValue = new Date(date).toISOString().split('T')[0]; // yyyy-mm-dd

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
    '& tr': { '& th': { paddingLeft: 20, paddingRight: 0 } },
  },
  '& tbody': {
    '& tr': { '& td': { paddingLeft: 30 } },
  },
}));

const AddQuotation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [discount, setDiscount] = useState(0);
  const [tax, setTax] = useState(18);
  const [invoiceDate, setInvoiceDate] = useState(defaultValue);
  const [quotationNumber, setQuotationNumber] = useState(1201);
  const [cashierName, setCashierName] = useState('');
  const [companyEmail, setCompanyEmail] = useState();
  const [companyContact, setCompanyContact] = useState('');
  const [companyAddress, setCompanyAddress] = useState('');
  const [companyGstNo, setCompanyGstNo] = useState('');
  const [companyStateName, setCompanyStateName] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [panNo, setPanNo] = useState('');
  const [gsQuantity, setGsQuantity] = useState(1);
  const [clientEmail, setClientEmail] = useState('');
  const [clientContact, setClientContact] = useState('');
  const [clientAddress, setClientAddress] = useState('');
  const [clientGstNo, setClientGstNo] = useState('');
  // const [initalPayment, setInitalPayment] = useState(0);
  const [remarks, setRemarks] = useState('');
  const [installments, setInstallments] = useState([]);
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

  // const addNextInvoiceHandler = () => {
  //   setQuotationNumber((prevNumber) => incrementString(prevNumber));
  //   setItems([
  //     {
  //       id: uid(6),
  //       name: '',
  //       qty: 1,
  //       price: '1.00',
  //     },
  //   ]);
  // };
  const addInstallment = () => {
    const id = uid(6);
    setInstallments((prevItem) => [
      ...prevItem,
      {
        // id: id,
        instalmentNumber: '',
        instalmentDate: '',
        instalmentAmount: '',
        createdBy: 1
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
  const deleteInstallment = (id) => {
    setInstallments((prevItem) => prevItem.filter((item) => item.instalmentNumber !== id));
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
        if (key === editedItem.name && items.instalmentNumber === editedItem.id) {
          items[key] = editedItem.value;
        }
      }
      return items;
    });

    setItems(newItems);
  };
  const editInstallment = (event) => {
    const editedItem1 = {
      id: event.target.id,
      name: event.target.name,
      value: event.target.value,
    };

    const newInstallments = installments.map((installments) => {
      for (const key in installments) {
        if (key === editedItem1.name && installments.instalmentNumber === editedItem1.id) {
          installments[key] = editedItem1.value;
        }
      }
      return installments;
    });

    setInstallments(newInstallments);
  };

  // Calculation Part

  // const subtotal = items.reduce((prev, curr) => {
  //   if (curr.name.trim().length > 0) return prev + Number(curr.price * Math.floor(curr.qty));
  //   else return prev;
  // }, 0);
  // const taxRate = (tax * subtotal) / 100;
  // const discountRate = (discount * subtotal) / 100;
  // const total = subtotal - discountRate + taxRate;
  // const pending = total - initalPayment;
  // const emiAmount = pending / Object.keys(installments).length;

  const [leadData, setLeadData] = useState([]);
  const [catalogueData, setCatalogueData] = useState([]);
  const [myOptions5, setMyOptions5] = useState("");
  const [myOptions6, setMyOptions6] = useState("");
  const [id2, setId2] = useState([]);
  const [id3, setId3] = useState([]);
  const [productPrice, setProductPrice] = useState([]);
  const [listamt, setlistamt] = useState("");
  const [taxRate, setTaxRate] = useState(0);
  const [subtotal, setsubtotal] = useState(0);
  const [discountRate, setdiscountRate] = useState(0);
  const [total, settotal] = useState(0);
  const [leadID1, setLeadID1] = useState('')
  const [aPIDataForLead, setAPIDataForLead] = useState([]);


  const token = localStorage.getItem('accessToken');
  const roleCode = localStorage.getItem('roleCode');
  const userId = localStorage.getItem('userId');
  const headers = {
    "x-access-token": token,
    "roleCode": roleCode,
    "userId": userId
  }

  // Fetching the Catalogue Name & Price
  const getPrice = (value) => {
    setMyOptions6(value)
    // console.log(productPrice)
    for (var i = 0; i < productPrice.length; i++) {
      if (productPrice[i] == value) {
        // console.log(productPrice[i] + " " + myOptions6)
        setlistamt(productPrice[i + 1])
        const unitAmt = parseInt(productPrice[i + 1])
        const unitQty = parseInt(gsQuantity)
        const amtQty = (Number(unitAmt * unitQty))
        const amtTax = (tax * amtQty) / 100
        const off = (discount * amtQty) / 100
        setsubtotal(Number(unitAmt * unitQty))
        setTaxRate((tax * amtQty / 100))
        setdiscountRate((discount * amtQty) / 100)
        settotal(amtQty - off + amtTax)
      }
    }
  }
  const [leadID2, setLeadId2] = useState([])
  const getLeadByID = () => {
    axios.post(BASE_URL + `/api/getFilteredLeadData`,
      {
        leadId: leadID1, userId: 0, statusId: 0, searchKey: "",
        locationkey: "", platformId: 0, opType: ""
      }, { headers: headers }).
      then((res) => {
        setLeadId2(res.data.data)
      });
  }
  const getFetchData = () => {
    axios.post(BASE_URL + `/api/getFilteredLeadData`, {
      leadId: 0, userId: 0, statusId: 0, searchKey: "",
      locationkey: "", platformId: 0, opType: ""
    },
      { headers: headers }).then((res) => {
        for (var i = 0; i < res.data.data.length; i++) {
          setLeadData(current => [...current, res.data.data[i].name]);
          setId2(current => [...current, res.data.data[i].leadId, res.data.data[i].name])
        }
      });
    axios.post(BASE_URL + `/api/getCatalogue`, { catId: 0 },
      { headers: headers }).then((res) => {
        for (var i = 0; i < res.data.data.length; i++) {
          setCatalogueData(current => [...current, res.data.data[i].gsName]);
          setId3(current => [...current, res.data.data[i].id, res.data.data[i].gsName])
          setProductPrice(current => [...current, res.data.data[i].id, res.data.data[i].gsName, res.data.data[i].gsPrice])
        }
      });
  }
  const [compnayData, setCompanyData] = useState([])
  const getCompanyData = () => {
    axios
      .post(BASE_URL +
        `/api/getCompanyMaster`,
        { id: 0 },
        { headers: headers }
      )
      .then((response) => {
        setCompanyData(response.data.data[0]);
      });
  }
  useEffect(() => {
    getFetchData()
    getCompanyData()
  }, []);

  var leadid, catalogueid
  // var catalogueAmt = productAmt;
  //Add data in the table
  const postData = () => {

    for (var i = 0; i < id2.length; i++) {
      if (myOptions5 == id2[i]) {
        leadid = id2[i - 1]
      }
    }
    for (var i = 0; i < id3.length; i++) {
      if (myOptions6 == id3[i]) {
        catalogueid = id3[i - 1]
      }
    }


    const AddQuotation = {
      leadId: leadID1,
      quotationNumber: quotationNumber,
      quotationDate: invoiceDate,
      comapnyAddress: compnayData.address,
      companyEmail: compnayData.email,
      companyContact: compnayData.contactNo,
      billTo: customerName,
      clientAddress: clientAddress,
      clientEmail: clientEmail,
      clientContact: clientContact,
      gsQuantity: gsQuantity,
      gsCatalogueId: catalogueid,
      amount: listamt,
      discount: discount,
      grandTotal: total,
      gstNo: clientGstNo,
      gst: tax,
      remarks: remarks,
      bankDetails: "test",
      isDraft: 1,
      createdBy: 1,
      clientPan: panNo,
      instalments: installments
    }
    console.log({ AddQuotation });
    axios.post(BASE_URL + '/api/saveQuotation', AddQuotation,
      { headers: headers }
    );
  };
  const navigate = useNavigate();
  const changePage = () => {
    navigate('/quotations/manageQuotation');
  };
  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   postData();
  //   changePage();
  //   // blankForm();
  //   // alert('Lead Successfully Added');
  // };
  const [validated, setValidated] = useState(false);
  const handleSubmit1 = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
      // alert("Please Provide appropriate Data")
    }
    else if (form.checkValidity() != false) {
      postData();
      changePage();
    }
    setValidated(true);
  };
  return (
    <Container>
      <Card style={{ width: '100%', background: '#C3CFC9' }}>
        <Form noValidate validated={validated} onSubmit={handleSubmit1}>
          <Row>
            <Col md="9">
              <SimpleCard title="New Quotation">

                <Row className="mt-2">
                  <Col></Col>
                  <Col className="col-sm-12">
                    <h4 className="text-center  font-bold">QUOTATION</h4>
                  </Col>
                </Row>
                <Row>
                  {/* <Col>
                    <Form.Label>Quotation Number:</Form.Label>
                    <Form.Control
                      disabled
                      value={quotationNumber}
                      onChange={(event) => setQuotationNumber(event.target.value)}
                      placeholder="Enter the Invoice Number"
                    />
                  </Col> */}
                  <Col>
                    <Form.Label>Lead Id:</Form.Label>
                    <InputGroup className="mb-3">
                      <Form.Control
                        required
                        value={leadID1}
                        onChange={(event) => setLeadID1(event.target.value)}
                        placeholder="Enter the Invoice Number"
                      />
                      <Button variant="success" id="button-addon2" onClick={() => getLeadByID()}>
                        Fetch Lead
                      </Button>
                      <Form.Control.Feedback type="invalid">
                        Lead Id is Required
                      </Form.Control.Feedback>
                    </InputGroup>
                  </Col>
                  <Col>
                    <Form.Label>Date:</Form.Label>
                    {/* <Form.Control
                      type="date"
                      // onChange={(e) => setQuotationDate(e.target.value)}
                      value={today}
                    /> */}
                    <Form.Control
                      id="dateRequired"
                      type="date"
                      name="dateRequired"
                      value={invoiceDate}
                      onChange={(event) => setInvoiceDate(event.target.value)}
                    />
                  </Col>


                </Row>

                <StyledTable className="table table-striped table-bordered" style={{ 'borderRadius': '2px' }}>
                  <TableHead style={{ borderLeft: '1px solid red', borderRight: '1px solid red' }} className='text-center'>

                    <TableRow>
                      <TableCell align="center">Lead ID</TableCell>
                      {/* <TableCell align="justify">Date</TableCell> */}
                      <TableCell align="center">Lead Name</TableCell>
                      <TableCell align="center">Platform Name</TableCell>
                      <TableCell align="center">Label</TableCell>

                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {leadID2.map((data, index) => {
                      return (
                        <TableRow key={index}>
                          <TableCell align="center">{data.leadId}</TableCell>
                          {/* <TableCell align="justify">{quotation.createdDate}</TableCell> */}
                          <TableCell align="center">{data.name}</TableCell>
                          <TableCell align="center">{data.platformName}</TableCell>
                          <TableCell align="center">{data.labelName}</TableCell>

                        </TableRow>
                      );
                    })}

                  </TableBody>
                </StyledTable>
                <div className="mt-2">
                  <b>
                    <h6 style={{ color: 'green' }}>Company Detail's</h6>
                  </b>
                  <Row className="mt-1">
                    <Col>
                      <Form.Label>Company Email:</Form.Label>
                      <Form.Control
                        disabled
                        placeholder="Company Email"
                        value={compnayData.email}
                        onChange={(event) => setCompanyEmail(event.target.value)}
                      />
                    </Col>
                    <Col>
                      <Form.Label>Company Contact:</Form.Label>
                      <Form.Control
                        disabled
                        required
                        className="flex-1"
                        placeholder="Company Contact"
                        type="text"
                        name="companyContact"
                        id="companyContact"
                        value={compnayData.contactNo}
                        onChange={(event) => setCompanyContact(event.target.value)}
                      />
                    </Col>
                  </Row>
                  <Row className="mt-1">
                    <Col>
                      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                        <Form.Label>Address</Form.Label>
                        <Form.Control
                          disabled
                          as="textarea"
                          rows={2}
                          onChange={(event) => setCompanyAddress(event.target.value)}
                          value={compnayData.address}
                          placeholder="Company Address"
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row className="mt-1">
                    <Col>
                      <Form.Label>Company GST NO:</Form.Label>
                      <Form.Control
                        disabled
                        required
                        className="flex-1"
                        placeholder="Enter GST Number"
                        type="text"
                        name="companyGstNo"
                        id="companyGstNo"
                        value={compnayData.gstNo}
                        onChange={(event) => setCompanyGstNo(event.target.value)}
                      />
                    </Col>
                    <Col>
                      <Form.Label>State Name:</Form.Label>
                      <Form.Control
                        required
                        disabled
                        className="flex-1"
                        placeholder="Sate Name"
                        type="text"
                        name="companyStateName"
                        id="companyStateName"
                        value={compnayData.stateName}
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
                        value={leadID2.name}
                        onChange={(event) => setCustomerName(event.target.value)}
                      /> <Form.Control.Feedback type="invalid">
                        Client Name is Required
                      </Form.Control.Feedback>
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
                      /><Form.Control.Feedback type="invalid">
                        Client Pan is Required
                      </Form.Control.Feedback>
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
                      /><Form.Control.Feedback type="invalid">
                        Client Email is Required
                      </Form.Control.Feedback>
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
                      /><Form.Control.Feedback type="invalid">
                        Client Mobile Number is Required
                      </Form.Control.Feedback>
                    </Col>
                  </Row>
                  <Row className="mt-1">
                    <Col>
                      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                        <Form.Label>Address</Form.Label>
                        <Form.Control
                          required
                          as="textarea"
                          rows={3}
                          onChange={(event) => setClientAddress(event.target.value)}
                          value={clientAddress}
                          placeholder="Customer Address"
                        /><Form.Control.Feedback type="invalid">
                          Client Address is Required
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row className="mt-1">
                    <Col md="6">
                      <Form.Label>Customer GST NO:</Form.Label>
                      <Form.Control
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
                  <br />
                  <Row>
                    <Col>
                      <Form.Label style={{ color: 'red' }}>
                        Note :- Please add Tax Rate, Discount & Quantity before selecting the Product Catalgoue.
                      </Form.Label></Col>
                  </Row>
                  <Box className="mt-2" width="100%" >
                    {/* Table Section */}
                    <Row>
                      <Col></Col>
                      <Col className="col-sm-12 text-center">
                        <h4 style={{ color: 'green' }}>Product Quotation List</h4>
                      </Col>
                      {/* <Col>
                        <Col className="col-sm-1">
                          <button
                            type="button"
                            onClick={addItemHandler}
                            className="btn btn-success"
                          >
                            Add Items
                          </button>
                        </Col>
                      </Col> */}
                    </Row>
                    <Row>
                      {/* <Col>
                        <Form.Label>Quantity</Form.Label>
                        <Form.Control
                          // style={{ width: 180 }}
                          type='number'
                          min='1'
                          max='1000'
                          onChange={(event) => setGsQuantity(event.target.value)}
                          value={gsQuantity}
                          placeholder="Product/Service Quantity"
                        />
                      </Col> */}
                      <Col md="6">
                        <Form.Label>Select the Catalogue</Form.Label><br />
                        <FormControl>
                          <Autocomplete
                            style={{ width: 350 }}
                            freeSolo
                            autoComplete
                            autoHighlight
                            options={catalogueData}
                            value={myOptions6}
                            onChange={(e) => getPrice(e.currentTarget.innerHTML)}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                variant="outlined"
                                label="Product/Service"
                                size="small"
                              />
                            )}
                          />
                        </FormControl>
                      </Col>
                      <Col md="6">
                        <Form.Label className='mr-5'>Price</Form.Label>
                        <Form.Control
                          disabled
                          // style={{ width: 180 }}
                          onChange={(e) => console.log(e)}
                          value={listamt}
                          placeholder="Product/Service Price"
                        />
                      </Col>
                    </Row>
                    {/* <StyledTable>
                      <TableHead>
                        <TableRow>
                          <TableCell align="center">Product Name</TableCell>
                          <TableCell align="center">Quantity</TableCell>
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
                    </StyledTable> */}
                  </Box>
                  <br />
                  <br />
                  <Row>
                    <Col></Col>
                    <Col></Col>
                    <Col>
                      <b>
                        <Form.Label>Subtotal:</Form.Label>
                      </b>
                      &nbsp;&nbsp;
                      <Form.Label style={{ color: 'green' }} className="ml-5">
                        ₹ {subtotal}
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
                  <br />
                  <Row>
                    <Col>
                      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                        <Form.Label>Note/Remarks</Form.Label>
                        <Form.Control as="textarea" rows={3} onChange={(event) => setRemarks(event.target.value)}
                          value={remarks}
                          placeholder="Write a Note or Remarks with max 500 words....." />
                      </Form.Group>
                    </Col>
                  </Row>
                </div>

              </SimpleCard>
            </Col>
            <Col>
              <Card.Body>
                <button type="button" className="btn btn-primary" onClick={reviewInvoiceHandler}>
                  Preview
                </button>&nbsp;
                <button type="submit" className="btn btn-success">
                  Add Quotation
                </button>
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

                <Row className="ml-1">
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
                      <Col>
                        <Form.Label style={{ color: 'red' }}>
                          Note :- Installment Will be In 3,6,9 Months EMI
                        </Form.Label>
                        <br />
                        <Form.Label>Number of Installment:</Form.Label>
                        <InputGroup className="mb-3">
                          <Form.Control
                            readOnly
                            value={Object.keys(installments).length}
                          //onChange={(event) => setDiscount(event.target.value)}
                          />
                          {/* <InputGroup.Text>%</InputGroup.Text> */}
                        </InputGroup>
                      </Col>
                    </Row>
                    <Row>
                      {/* <Col>
                      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                        <Form.Label>Inital Payment</Form.Label>
                        <Form.Control
                          onChange={(event) => setInitalPayment(event.target.value)}
                          value={initalPayment}
                          placeholder="Inital Payment"
                        />
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                        <Form.Label>Pending Amount</Form.Label>
                        <Form.Control readOnly value={pending} />
                      </Form.Group>
                    </Col> */}
                      <Col md="3" className="mt-4">
                        <button
                          type="button"
                          onClick={addInstallment}
                          className="btn btn-success mt-1"
                        >
                          Add New Installments
                        </button>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <StyledTable>
                          <TableHead>
                            <TableRow>
                              <TableCell align="center">Installment No</TableCell>
                              <TableCell align="center">Date</TableCell>
                              <TableCell align="center">Amount</TableCell>
                              <TableCell align="center">Action</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {installments.map((item) => (
                              <QuotationEMI
                                key={item.instalmentNumber}
                                // id={item.instalmentNumber}
                                instalmentNumber={item.instalmentNumber}
                                instalmentDate={item.instalmentDate}
                                instalmentAmount={item.instalmentAmount}
                                onDeleteItem={deleteInstallment}
                                onEdtiItem={editInstallment}
                              />
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
        </Form>
      </Card>

      <ReviewInvoice
        show={isOpen}
        setIsOpen={setIsOpen}
        invoiceInfo={{
          invoiceDate,
          quotationNumber,
          companyEmail,
          companyAddress,
          companyContact,
          installments,
          panNo,
          clientGstNo,

          // initalPayment,
          // pending,
          // emiAmount,
          catalogueid,
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
      // onAddNextInvoice={addNextInvoiceHandler}
      />
      {/* <InvoiceModal
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          invoiceInfo={{
            quotationNumber,
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
    </Container >
  );
};

export default AddQuotation;
