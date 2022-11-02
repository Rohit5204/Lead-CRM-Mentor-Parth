import { styled } from '@mui/system';
import { Breadcrumb, SimpleCard } from 'app/components';
import { Form, Row, Col, Button } from 'react-bootstrap';
import { Box, MenuItem, FormControl, Select, InputLabel } from '@mui/material';
import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';

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

const AddQuotation = () => {
  const navigate = useNavigate();
  const changePage = () => {
    navigate('/quotations/manageQuotation');
  };
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
  const [amount, setAmount] = useState('');
  const [discount, setDiscount] = useState('');
  const [grandTotal, setGrandTotal] = useState('');
  const [gsQuantity, setGsQuantity] = useState('');
  const [gstNo, setGstNo] = useState('');
  const [remarks, setRemarks] = useState('');
  const [bankDetails, setBankDetails] = useState('');
  const [instalments, setInstalments] = useState([]);

  const [selected, setSelected] = useState('');

  const addQuotation = {
    leadId: 1,
    quotationNumber: quotationNumber,
    quotationDate: quotationDate,
    comapnyAddress: comapnyAddress,
    companyEmail: companyEmail,
    companyContact: companyContact,
    billTo: billTo,
    clientAddress: clientAddress,
    clientEmail: clientEmail,
    clientContact: clientContact,
    amount: amount,
    discount: discount,
    grandTotal: grandTotal,
    gsQuantity: gsQuantity,
    gstNo: gstNo,
    remarks: remarks,
    bankDetails: bankDetails,
    // instalments: {
    //   instalmentNumber: instalmentNumber,
    //   instalmentAmount: instalmentAmount,
    //   instalmentDate: instalmentDate,
    //   createdBy: createdBy,
    // },
    gst: 0,
    gsCatalogueId: 1,
    isDraft: 1,
    createdBy: 1,
  };
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
        <Row>
          <Col>
            <Form.Label>Quotation No</Form.Label>
            <Form.Control
              onChange={(e) => setQuotationNumber(e.target.value)}
              value={quotationNumber}
              placeholder="Enter the Quotation No"
            />
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
        <br />
        <h6>Company Detail's</h6>
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
            <Form.Control
              onChange={(e) => setCompanyEmail(e.target.value)}
              value={companyEmail}
              placeholder="Company Email"
            />
          </Col>
          <Col>
            <Form.Label>Contact</Form.Label>
            <Form.Control
              onChange={(e) => setCompanyContact(e.target.value)}
              value={companyContact}
              placeholder="Company Contact"
            />
          </Col>
        </Row>
        <br />
        <h6>Client Detail's</h6>

        <Row>
          <Col>
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
              <Form.Label>Bill To / Customer Name</Form.Label>
              <Form.Control
                // as="textarea"
                // rows={3}
                onChange={(e) => setBillTo(e.target.value)}
                value={billTo}
                placeholder="Billing Person Name"
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Label>Client Email</Form.Label>
            <Form.Control
              onChange={(e) => setClientEmail(e.target.value)}
              value={clientEmail}
              placeholder="demo@gmail.com"
            />
          </Col>
          <Col>
            <Form.Label>Client Contact</Form.Label>
            <Form.Control
              onChange={(e) => setClientContact(e.target.value)}
              value={clientContact}
              placeholder="demo@gmail.com"
            />
          </Col>
        </Row>
        <Row className="mt-2">
          <Col>
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
              <Form.Label>Client Address</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                onChange={(e) => setComapnyAddress(e.target.value)}
                value={comapnyAddress}
                placeholder="Customer  Address"
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Label>GST NO</Form.Label>
            <Form.Control
              onChange={(e) => setGstNo(e.target.value)}
              value={gstNo}
              placeholder="Enter the GST Number"
            />
          </Col>
        </Row>
        <br />
        <h6>Please Fill Detail's Properly</h6>
        <Row>
          <Col>
            <Form.Label>Select the Product </Form.Label>
            <Form.Control placeholder="Select the Product" />
          </Col>
          <Col>
            <Form.Label>Quatity </Form.Label>
            <Form.Control placeholder="Enter the Quatity of Product" />
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Label>Amount</Form.Label>
            <Form.Control
              placeholder="Sub Total Amount"
              onChange={(e) => setAmount(e.target.value)}
              value={amount}
            />
          </Col>
          {/* <Col>
                <Form.Label>Discount</Form.Label>
                <Form.Control
                  placeholder="Discount Amount"
                  onChange={(e) => setDiscount(e.target.value)}
                  value={discount}
                />
              </Col> */}
          <Col>
            <Form.Label>Grand Total</Form.Label>
            <Form.Control
              placeholder="Total Amount"
              onChange={(e) => setGrandTotal(e.target.value)}
              value={grandTotal}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Label>Note or Remark</Form.Label>
            <Form.Control
              placeholder="Write a Remark"
              onChange={(e) => setGrandTotal(e.target.value)}
              value={grandTotal}
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
                  <Box sx={{ minWidth: 120 }} className="mt-1">
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
                  </Box>
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
                    // onChange={(e) => setGrandTotal(e.target.value)}
                    // value={grandTotal}
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

export default AddQuotation;
