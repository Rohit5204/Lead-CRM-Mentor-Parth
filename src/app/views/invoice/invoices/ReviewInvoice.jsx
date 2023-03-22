import { styled } from '@mui/system';
import { Button, Row, Col, Modal, Form } from 'react-bootstrap';
import { toPng } from 'html-to-image';
import { jsPDF } from 'jspdf';
import axios from 'axios';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import ClearIcon from '@mui/icons-material/Clear';

import { useState, useEffect } from 'react';
import {
  Tooltip,
  Box,
  Icon,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@mui/material';
import { BASE_URL } from 'app/utils/constant';
const StyledTable = styled(Table)(() => ({
  whiteSpace: 'pre',
  '& thead': {
    '& tr': { '& th': { paddingLeft: 0, paddingRight: 0 } },
  },
  '& tbody': {
    '& tr': { '& td': { paddingLeft: 0 } },
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
// const ReviewInvoice = () => {
const ReviewInvoice = ({ show, setIsOpen, invoiceInfo, items, onAddNextInvoice }) => {
  function closeModal() {
    setIsOpen(false);
    console.log(invoiceInfo);
  }

  const addNextInvoiceHandler = () => {
    setIsOpen(false);
    onAddNextInvoice();
  };

  const SaveAsPDFHandler = () => {
    const dom = document.getElementById('print');
    toPng(dom)
      .then((dataUrl) => {
        const img = new Image();
        img.crossOrigin = 'annoymous';
        img.src = dataUrl;
        img.onload = () => {
          // Initialize the PDF.
          const pdf = new jsPDF({
            orientation: 'portrait',
            unit: 'in',
            format: [5.5, 8.5],
          });

          // Define reused data
          const imgProps = pdf.getImageProperties(img);
          const imageType = imgProps.fileType;
          const pdfWidth = pdf.internal.pageSize.getWidth();

          // Calculate the number of pages.
          const pxFullHeight = imgProps.height;
          const pxPageHeight = Math.floor((imgProps.width * 8.5) / 5.5);
          const nPages = Math.ceil(pxFullHeight / pxPageHeight);

          // Define pageHeight separately so it can be trimmed on the final page.
          let pageHeight = pdf.internal.pageSize.getHeight();

          // Create a one-page canvas to split up the full image.
          const pageCanvas = document.createElement('canvas');
          const pageCtx = pageCanvas.getContext('2d');
          pageCanvas.width = imgProps.width;
          pageCanvas.height = pxPageHeight;

          for (let page = 0; page < nPages; page++) {
            // Trim the final page to reduce file size.
            if (page === nPages - 1 && pxFullHeight % pxPageHeight !== 0) {
              pageCanvas.height = pxFullHeight % pxPageHeight;
              pageHeight = (pageCanvas.height * pdfWidth) / pageCanvas.width;
            }
            // Display the page.
            const w = pageCanvas.width;
            const h = pageCanvas.height;
            pageCtx.fillStyle = 'white';
            pageCtx.fillRect(0, 0, w, h);
            pageCtx.drawImage(img, 0, page * pxPageHeight, w, h, 0, 0, w, h);

            // Add the page to the PDF.
            if (page) pdf.addPage();

            const imgData = pageCanvas.toDataURL(`image/${imageType}`, 1);
            pdf.addImage(imgData, imageType, 0, 0, pdfWidth, pageHeight);
          }
          // Output / Save
          pdf.save(`invoice-${invoiceInfo.customerName}.pdf`);
        };
      })
      .catch((error) => {
        console.error('oops, something went wrong!', error);
      });
  };
  const [APIData, setAPIData] = useState([]);
  const token = localStorage.getItem('accessToken');
  const roleCode = localStorage.getItem('roleCode');
  const userId = localStorage.getItem('userId');
  const headers = {
    "x-access-token": token,
    "roleCode": roleCode,
    "userId": userId
  }
  const getCatalogueData = () => {
    axios.post(BASE_URL +
      `/api/getCompanyMaster`,
      { id: 0 },
      { headers: headers }
    )
      .then((response) => {
        console.log(response)
        setAPIData(response.data.data[0]);
      });
  };
  useEffect(() => {
    getCatalogueData();
  }, []);
  return (
    <div>
      <Modal
        backdrop="static"
        keyboard={false}
        onHide={closeModal}
        show={show}
        animation={false}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header>
          <Modal.Title> Invoice Preview</Modal.Title>
          <Row>
            <Col>
              {/* <Tooltip title="Download File in PDF" placement="bottom">
                <IconButton type="button" className="btn-success" onClick={SaveAsPDFHandler}>
                  < CloudDownloadIcon></CloudDownloadIcon>
                </IconButton>
              </Tooltip>
              &nbsp; */}
              {/* <button type="button" className="btn btn-primary" onClick={addNextInvoiceHandler}> */}
              <Tooltip title="Close" placement="bottom">
                <IconButton type="button" onClick={closeModal}>
                  <ClearIcon />
                </IconButton>
              </Tooltip>
            </Col>
          </Row>

        </Modal.Header>
        <Modal.Body>
          <div id="print">
            <StyledTable
              style={{
                paddingLeft: '2px',
                borderWidth: '2px',
                borderColor: '#aaaaaa',
                borderStyle: 'solid',
              }}
            >
              <div className=" paddingTop: '180px' my-8 inline-block w-full max-w-md transform overflow-hidden rounded-lg bg-white text-left align-middle shadow-xl transition-all">
                <div className="p-4">
                  <Row>
                    <Col>
                      <img width="200" src="/assets/images/illustrations/boostock-info-04.svg" alt="" />
                    </Col>
                    <Col></Col>
                    <Col className='mt-4'>
                      <h5 style={{ "color": "MidnightBlue" }}>
                        {APIData.name}
                      </h5>
                      <span>{APIData.address}</span>
                      <br />
                      <span>{APIData.stateName}-{APIData.pincode} </span>
                      <br />
                      <span>Contact No :- {APIData.contactNo}</span>
                      <br />
                      <span className="font-bold">Email :- {APIData.email}</span>
                    </Col>

                  </Row>

                  <br />
                  <table className="table table-striped table-bordered" style={{ 'borderRadius': '2px', overflowX: 'auto' }}>
                    <thead style={{ borderLeft: '1px solid red', "color": "MidnightBlue", borderRight: '1px solid red' }} className='text-left'>
                      <tr>
                        <th> Billing Information</th>
                        <th> Invoice Detail's</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td width="60%" className='text-left'> <span>Name   &nbsp;&nbsp;&nbsp;:   {invoiceInfo.customerName}</span>
                          <br />
                          <span className="font-bold"> GST NO  &nbsp;:   {invoiceInfo.clientGstNo}</span>
                          <br />
                          <span className="font-bold"> PAN No  &nbsp;:   {invoiceInfo.panNo}</span>
                          <br />
                          <span className="font-bold"> Contact &nbsp;&nbsp;:   {invoiceInfo.clientContact}</span>
                          <br />
                          <span className="font-bold"> Email &nbsp;&nbsp;&nbsp;&nbsp;  :   {invoiceInfo.clientEmail}</span></td>
                        <td className='text-left'>
                          <span> Quotation No  :    </span>
                          <b style={{ "color": "MidnightBlue" }}>{invoiceInfo.quotationNumber}</b>
                          <br />
                          <span className="font-bold"> Date    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:   {new Date(invoiceInfo.invoiceDate).toLocaleDateString('en-GB')}</span>
                          <br />
                          <span className="font-bold"> Generated By  :  {invoiceInfo.cashierName}</span>
                          <br />
                          <span className="font-bold"> Refrence No. & Date:</span>
                        </td>
                      </tr>
                      <tr>
                        <td><span> Address   :   {invoiceInfo.clientAddress}</span></td>
                      </tr>
                    </tbody>
                  </table>
                  <h5 className='text-center'> PRODUCT INFORMATION </h5>
                  <div className="mt-6">

                    <table className="table table-striped table-bordered" style={{ 'borderRadius': '2px' }}>
                      <thead style={{ borderLeft: '1px solid red', "color": "MidnightBlue", borderRight: '1px solid red' }} className='text-center'>
                        <tr>
                          <th>Product Name</th>
                          <th>Unit Price</th>
                          <th>Total</th>
                        </tr>
                      </thead>
                      {/* {APIData.map((quotation, index) => { */}
                      <tbody className='text-center'>
                        <tr>
                          {/* <td>{theViewQuotation.gsCatalogueId}</td> */}
                          <td>{invoiceInfo.myOptions6}</td>
                          <td>{invoiceInfo.subtotal}</td>
                          <td>{invoiceInfo.total}</td>
                        </tr>
                      </tbody>
                      {/* })} */}
                    </table>
                    <br />
                    <Row>
                      <Col></Col>
                      <Col></Col>
                      <Col>
                        <b>
                          <Form.Label>Subtotal:</Form.Label>
                        </b>

                        <Form.Label style={{ color: 'green' }} className="ml-5">
                          ₹ {invoiceInfo.subtotal.toFixed(2)}
                        </Form.Label>
                      </Col>
                    </Row>
                    <Row>
                      <Col></Col>
                      <Col></Col>
                      <Col>
                        <b>
                          <Form.Label>Discount:</Form.Label>
                        </b>

                        <Form.Label style={{ color: 'green' }} className="ml-5">
                          ₹ {invoiceInfo.discountRate.toFixed(2)}
                        </Form.Label>
                      </Col>
                    </Row>

                    <Row>
                      <Col></Col>
                      <Col></Col>
                      <Col>
                        <b>
                          <Form.Label>Tax Rate:</Form.Label>
                        </b>
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        <Form.Label style={{ color: 'green' }} className="ml-4">
                          ₹ {invoiceInfo.taxRate.toFixed(2)}
                        </Form.Label>
                      </Col>
                    </Row>
                    <Row>
                      {/* <Col>
                        {Object.keys(invoiceInfo.installments).length > 0 ? (
                          <StyledTable
                            style={{
                              borderWidth: '1px',
                              borderColor: '#aaaaaa',
                              borderStyle: 'solid',
                            }}
                          >
                            <b className="ml-2">
                              <Form.Label>
                                Paid
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;
                              </Form.Label>
                            </b>

                            <Form.Label style={{ color: 'green' }}>
                              ₹ {invoiceInfo.initalPayment}
                            </Form.Label>
                            <br />
                            <b className="ml-2">
                              <Form.Label>No of EMI &nbsp;&nbsp;&nbsp;&nbsp;: </Form.Label>
                            </b>

                            <Form.Label style={{ color: 'green' }}>
                              {Object.keys(invoiceInfo.installments).length} * ₹
                              {invoiceInfo.emiAmount}
                            </Form.Label>
                            <br />
                            <b className="ml-2">
                              <Form.Label>EMI Amount : </Form.Label>
                            </b>
                            <Form.Label style={{ color: 'green' }}>
                              ₹ {invoiceInfo.emiAmount}
                            </Form.Label>
                            <br />
                            <b className="ml-2">
                              <Form.Label>Total Amount : </Form.Label>
                            </b>
                            <Form.Label style={{ color: 'green' }}>
                              ₹
                              {invoiceInfo.total % 1 === 0
                                ? invoiceInfo.total
                                : invoiceInfo.total.toFixed(2)}
                            </Form.Label>
                          </StyledTable>
                        ) : (
                          <div></div>
                        )}
                      </Col> */}
                      <Col></Col>
                      <Col></Col>
                      <Col>
                        <hr />
                        <b>
                          <Form.Label>Grand Total:</Form.Label>
                        </b>
                        <Form.Label style={{ color: 'green' }} className="ml-3">
                          ₹
                          {invoiceInfo.total % 1 === 0
                            ? invoiceInfo.total
                            : invoiceInfo.total.toFixed(2)}
                        </Form.Label>
                      </Col>
                    </Row>
                  </div>
                </div>
              </div>
            </StyledTable>
            <h6 className="text-center mt-3">This is a Computer Generated Invoice</h6>
          </div>
        </Modal.Body>
        {/* <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>
            Close
          </Button>
          <Button variant="primary" onClick={closeModal}>
            Save
          </Button>
        </Modal.Footer> */}
      </Modal>
    </div>
  );
};
export default ReviewInvoice;
