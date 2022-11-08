import { styled } from '@mui/system';
import { Breadcrumb, SimpleCard } from 'app/components';
import { Form, Row, Col, Button, InputGroup } from 'react-bootstrap';
import QuotationItem from './quotationItems';
import { uid } from 'uid';
import {
  Box, MenuItem, FormControl, Select, Autocomplete, TextField,
  Table,
  Icon,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@mui/material';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AddQuotation = () => {
  const [selected, setSelected] = useState('');
  const [checked, setChecked] = useState(false);

  const [quotationNumber, setQuotationNumber] = useState('');
  const [quotationDate, setQuotationDate] = useState('');
  const [comapnyAddress, setComapnyAddress] = useState('');
  const [companyEmail, setCompanyEmail] = useState('');
  const [companyContact, setCompanyContact] = useState('');
  const [billTo, setBillTo] = useState('');
  const [clientAddress, setClientAddress] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [clientContact, setClientContact] = useState('');
  const [gstNo, setGstNo] = useState('');
  const [gst, setGst] = useState(18);
  const [discount, setDiscount] = useState(0);

  const [gsQuantity, setGsQuantity] = useState('');

  const [remarks, setRemarks] = useState('');
  const [bankDetails, setBankDetails] = useState('');
  const [leadData, setLeadData] = useState([]);
  const [catalogueData, setCatalogueData] = useState([]);
  const [items, setItems] = useState([
    {
      id: uid(6),
      name: '',
      qty: 0,
      price: 0,
    },
  ]);
  const [instalments, setInstalments] = useState([
    {
      instalmentNumber: uid(1),
      instalmentAmount: 0,
      instalmentDate: '',
      createdBy: '',
    }
  ]);

  useEffect(() => {
    axios.post(`http://35.89.6.16:4002/api/getFilteredLeadData`, {
      leadId: 0, userId: 0, statusId: 0,
    }).then((res) => {
      for (var i = 0; i < res.data.data.length; i++) {
        setLeadData(current => [...current, res.data.data[i].name]);
      }
    });
    axios.post(`http://35.89.6.16:4002/api/getCatalogue`, { catId: 0 }).then((res) => {
      for (var i = 0; i < res.data.data.length; i++) {
        setCatalogueData(current => [...current, res.data.data[i].gsName]);
      }
    });
  }, []);

  const navigate = useNavigate();
  const changePage = () => {
    navigate('/quotations/manageQuotation');
  };

  const addQuotation = {
    leadId: leadData.leadId,
    quotationNumber: "Q00001",
    quotationDate: quotationDate,
    comapnyAddress: comapnyAddress,
    companyEmail: companyEmail,
    companyContact: companyContact,
    billTo: billTo,
    clientAddress: clientAddress,
    clientEmail: clientEmail,
    clientContact: clientContact,
    gstNo: gstNo,
    gsCatalogueId: catalogueData.id,
    amount: amount,
    gsQuantity: gsQuantity,
    gst: gst,
    discount: discount,
    grandTotal: grandTotal,
    remarks: remarks,
    bankDetails: bankDetails,
    instalments: instalments,
    isDraft: 1,
    createdBy: 1,
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
  const amount = items.reduce((prev, curr) => {
    if (curr.name.trim().length > 0) return prev + Number(curr.price * Math.floor(curr.qty));
    else return prev;
  }, 0);
  const taxRate = (gst * amount) / 100;
  const discountRate = (discount * amount) / 100;
  const grandTotal = amount - discountRate + taxRate;
  //empty the form Text
  const blankForm = () => {
    setQuotationNumber('');
    setQuotationDate('');
    setComapnyAddress('');
  };
  //Add data in the table
  const postData = () => {
    console.log({ addQuotation });
    axios.post(`http://35.89.6.16:4002/api/saveQuotation`, addQuotation);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    postData();
    blankForm();
    alert('Catalogue Successfully Created');
  };

  const handleChange = (event) => {
    setSelected(event.target.value);
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
  const deleteItemHandler = (id) => {
    setItems((prevItem) => prevItem.filter((item) => item.id !== id));
  };
  return (
    <Container>
      <Box className="breadcrumb">
        <Breadcrumb
          routeSegments={[
            { name: 'Quotation', path: '/quotations/addQuotation' },
            { name: 'Add Quotation Page' },
          ]}
        />
      </Box>
      <SimpleCard title="Request Quotation">
        <h6 style={{ color: 'green' }}>Company Detail's</h6>
        <Row>
          <Col>
            <Form.Label>Lead</Form.Label>
            <FormControl>
              <Autocomplete
                style={{ width: 450 }}
                freeSolo
                autoComplete
                autoHighlight
                options={leadData}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    onChange={(e) => setLeadData(e.target.value)}
                    variant="outlined"
                    label="Select the Lead"
                    size="small"
                  />
                )}
              />
            </FormControl>
          </Col>
          <Col>
            <Form.Label>Quotation Date</Form.Label>
            <Form.Control
              type="date"
              onChange={(e) => setQuotationDate(e.target.value)}
              value={quotationDate}
            />
          </Col>
        </Row>
        <Row className="mt-3">
          <Col>
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
              <Form.Label>Address</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                onChange={(e) => setComapnyAddress(e.target.value)}
                value={comapnyAddress}
                placeholder="Comapny Address"
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Label>Email</Form.Label>
            <InputGroup className="mb-3">
              <InputGroup.Text id="basic-addon1">
                <Icon>email</Icon>
              </InputGroup.Text>
              <Form.Control
                onChange={(e) => setCompanyEmail(e.target.value)}
                value={companyEmail}
                placeholder="Company Email"
              /></InputGroup>
          </Col>
          <Col>
            <Form.Label>Contact</Form.Label>
            <InputGroup className="mb-1">
              <InputGroup.Text id="basic-addon1">
                <Icon>phone</Icon>
              </InputGroup.Text>
              <Form.Control
                onChange={(e) => setCompanyContact(e.target.value)}
                value={companyContact}
                placeholder="Company Contact"
              /></InputGroup>
          </Col>
        </Row>
        <br />
        <h6 style={{ color: 'green' }}>Client Detail's</h6>
        <Row>
          <Col>
            <Form.Label>Bill To / Customer Name</Form.Label>
            <InputGroup className="mb-3">
              <InputGroup.Text id="basic-addon1">
                <Icon>person</Icon>
              </InputGroup.Text>
              <Form.Control
                onChange={(e) => setBillTo(e.target.value)}
                value={billTo}
                placeholder="Billing Person Name"
              /></InputGroup>
          </Col>
          <Col>
            <Form.Label>GST NO</Form.Label>
            <InputGroup className="mb-3">
              <InputGroup.Text id="basic-addon1">
                GST
              </InputGroup.Text>
              <Form.Control
                onChange={(e) => setGstNo(e.target.value)}
                value={gstNo}
                placeholder="Enter the GST Number"
              /></InputGroup>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Label>Client Email</Form.Label>
            <InputGroup className="mb-3">
              <InputGroup.Text id="basic-addon1">
                <Icon>email</Icon>
              </InputGroup.Text>
              <Form.Control
                onChange={(e) => setClientEmail(e.target.value)}
                value={clientEmail}
                placeholder="demo@gmail.com"
              /></InputGroup>
          </Col>
          <Col>
            <Form.Label>Client Contact</Form.Label>
            <InputGroup className="mb-3">
              <InputGroup.Text id="basic-addon1">
                <Icon>phone</Icon>
              </InputGroup.Text>
              <Form.Control
                onChange={(e) => setClientContact(e.target.value)}
                value={clientContact}
                placeholder="demo@gmail.com"
              /></InputGroup>
          </Col>
        </Row>
        <Row className="mt-2">
          <Col>
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
              <Form.Label>Client Address</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                onChange={(e) => setClientAddress(e.target.value)}
                value={clientAddress}
                placeholder="Customer  Address"
              />
            </Form.Group>
          </Col>
        </Row>

        <br />
        {/* <h6>Please Fill Detail's Properly</h6> */}
        <Box className="text-center mt-2" width="100%" overflow="auto">
          {/* Table Section */}
          <Row>
            <Col></Col>
            <Col className="col-sm-9">
              <h4 style={{ color: 'green' }}>Product Quotation List</h4>
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
                <TableCell align="center">Quantity</TableCell>
                <TableCell align="center">Unit Price</TableCell>
                <TableCell align="center">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((item) => (
                <QuotationItem
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
          {/* <Col>
            <Form.Label>Catalogue</Form.Label>
            <FormControl>
              <Autocomplete
                style={{ width: 470 }}
                freeSolo
                autoComplete
                autoHighlight
                options={catalogueData}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    onChange={(e) => setCatalogueData(e.target.value)}
                    variant="outlined"
                    label="Select the Product or Service"
                    size="small"
                  />
                )}
              />
            </FormControl>
          </Col> */}
          <Col>
            <Form.Label>Tax Rate </Form.Label>
            <InputGroup className="mb-3">
              <Form.Control
                value={gst}
                onChange={(e) => setGst(e.target.value)}
                placeholder="Enter the Tax Rate"
              /> <InputGroup.Text>%</InputGroup.Text>
            </InputGroup>
          </Col>
          <Col>
            <Form.Label>Discount rate:</Form.Label>
            <InputGroup className="mb-3">
              <Form.Control
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
            <Form.Label>Amount</Form.Label>
            <InputGroup className="mb-3">
              <InputGroup.Text id="basic-addon1" style={{ color: 'green' }}>
                <b> ₹</b>
              </InputGroup.Text>
              <Form.Control
                disabled
                placeholder="Sub Total Amount"
                // onChange={(e) => setAmount(e.target.value)}
                value={amount}
              /></InputGroup>
          </Col>

          <Col>
            <Form.Label>Grand Total</Form.Label>
            <InputGroup className="mb-3">
              <InputGroup.Text id="basic-addon1" style={{ color: 'green' }}>
                <b> ₹</b>
              </InputGroup.Text>
              <Form.Control
                disabled
                placeholder="Total Amount"
                // onChange={(e) => setGrandTotal(e.target.value)}
                value={grandTotal}
              /></InputGroup>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Label>Note or Remark</Form.Label>
            <Form.Control
              placeholder="Write a Remark"
              onChange={(e) => setRemarks(e.target.value)}
              value={remarks}
            />
          </Col>
          <Col className="mt-2">
            <Form.Label>Bank Details</Form.Label>
            {/* <input type="checkbox" /> */}
            <Form.Check
              type="switch"
              onChange={() => setChecked(!checked)}
              checked={checked}
              id="custom-switch"
              label="If you have Payment Detail's,Please Check the Box"
            />
          </Col>
        </Row>
        <Row>
          <Col>
            {checked ? (
              <Row>
                <Col>
                  {/* <Box sx={{ minWidth: 120 }} className="mt-1"> */}
                  <FormControl fullWidth>
                    <label>Choose Payment Option</label>
                    <Select value={selected} label="Age" onChange={handleChange}>
                      <MenuItem value="">Choose Payment Option</MenuItem>
                      <MenuItem value="netBanking">Net Banking</MenuItem>
                      <MenuItem value="bank">Bank Transfer</MenuItem>
                      <MenuItem value="gPay">G-Pay</MenuItem>
                      <MenuItem value="amazonPay">Amazon Pay</MenuItem>
                    </Select>
                  </FormControl>
                  {/* </Box> */}
                  {/* <FormControl sx={{ m: 0, minWidth: 450 }} size="small" className="mt-1">
                    <Form.Label>Choose Payment Option</Form.Label>
                    <Select
                      value={selected}
                      // label="selected"
                      onChange={(e) => setSelected(!selected)}
                    >
                      <MenuItem value="">Choose Payment Option</MenuItem>
                      <MenuItem value="Net Banking">Net Banking</MenuItem>
                      <MenuItem value="Bank Transfer">Bank Transfer</MenuItem>
                      <MenuItem value="G-Pay">G-Pay</MenuItem>
                      <MenuItem value="Amazon Pay">Amazon Pay</MenuItem>
                    </Select>
                  </FormControl> */}
                </Col>
                <Col>
                  <Form.Label>Transaction Refrence Number</Form.Label>
                  <Form.Control
                    fullWidth
                    placeholder="Enter the Refrence Number of Transaction"
                    onChange={(e) => setBankDetails(e.target.value)}
                    value={bankDetails}
                  />
                </Col>
              </Row>
            ) : (
              <div></div>
            )}
          </Col>
        </Row>
        <Row>
          <Col>
            {selected ? (
              <>
                <br />
                <h6>Please Fill Detail's Only For Bank Transfer</h6>
                <Row>
                  <Col>
                    <Form.Label>Bank Name</Form.Label>
                    <Form.Control placeholder="Enter the Bank Name" />
                  </Col>
                  <Col>
                    <Form.Label>IFSC CODE</Form.Label>
                    <Form.Control placeholder="Enter the IFSC CODE" />
                  </Col>
                </Row>
              </>
            ) : (
              <div></div>
            )}
          </Col>
        </Row>
      </SimpleCard>
      <Div className="mt-2">
        <Row>
          <Col>
            <Button variant="contained" onClick={changePage}>
              Cancel
            </Button>
            &nbsp;
            <Button variant="success" onClick={handleSubmit}>
              Add
            </Button>
          </Col>
        </Row>
      </Div>
    </Container>
  );
};
const StyledTable = styled(Table)(() => ({
  whiteSpace: 'pre',
  '& thead': {
    '& tr': { '& th': { paddingLeft: 20, paddingRight: 0 } },
  },
  '& tbody': {
    '& tr': { '& td': { paddingLeft: 30 } },
  },
}));
const Container = styled('div')(({ theme }) => ({
  margin: '30px',
  [theme.breakpoints.down('sm')]: { margin: '16px' },
  '& .breadcrumb': {
    marginBottom: '30px',
    [theme.breakpoints.down('sm')]: { marginBottom: '16px' },
  },
}));
const Div = styled('div')(() => ({
  margin: '0px 0px 0px 430px',
}));

export default AddQuotation;
