import { styled } from '@mui/system';
import { Button, Row, Col, Modal, Form } from 'react-bootstrap';
import { toPng } from 'html-to-image';
import { jsPDF } from 'jspdf';
import {
  autocompleteClasses,
  Box,
  Icon,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@mui/material';
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
          pdf.save(`invoice-${invoiceInfo.invoiceNumber}.pdf`);
        };
      })
      .catch((error) => {
        console.error('oops, something went wrong!', error);
      });
  };
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
              <button type="button" className="btn btn-success" onClick={SaveAsPDFHandler}>
                Download
              </button>
              &nbsp;
              {/* <button type="button" className="btn btn-primary" onClick={addNextInvoiceHandler}> */}
              <button type="button" className="btn btn-primary" onClick={closeModal}>
                Edit
              </button>
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
                      <img
                        sizes="12px"
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjhVskpYXfF31NyGSjgoPfjnS6qH8TY8wWftKfux4&s"
                      ></img>
                    </Col>
                    <Col></Col>
                    <Col md="2">
                      <h5 className="text-center text-lg font-bold text-gray-900">
                        MENTOR PARTH LEAD CRM
                      </h5>
                      <span>Haware Fantasia Business Park</span>
                      <br />
                      <span>Vashi, Navi Mumbai-402107</span>
                      <br />
                      <span>Company Reg. No :-896522147</span>
                      <br />
                      <span className="font-bold">GST No: {invoiceInfo.companyGstNo}</span>
                      <br />
                      <span className="font-bold">State: {invoiceInfo.companyStateName}</span>
                      <br />
                      <span className="font-bold">Email: {invoiceInfo.companyEmail}</span>
                    </Col>
                    <Col></Col>
                  </Row>
                  <br />
                  <Row>
                    <Col></Col>
                    <Col md="12">
                      <h5 className="text-center text-lg font-bold text-gray-900">INVOICE</h5>
                    </Col>
                  </Row>
                  <hr />
                  <div className="mt-6">
                    <Row>
                      {/* <Col>
                      <b>
                        <span className="font-bold">From:</span>
                      </b>

                      <span>&nbsp;{invoiceInfo.cashierName}</span>
                      <br />
                      <span>Address: {invoiceInfo.companyAddress}</span>

                      <br />
                      <span className="font-bold">GST NO: {invoiceInfo.companyGstNo}</span>
                      <br />
                      <span className="font-bold">State: {invoiceInfo.companyStateName}</span>
                      <br />
                      <span className="font-bold">Email: {invoiceInfo.companyEmail}</span>
                    </Col> */}
                      <Col>
                        <b>
                          <span className="font-bold">Customer Info</span>
                        </b>
                        <br />
                        <span>Name:{invoiceInfo.customerName}</span>
                        <br />

                        <span>Address:{invoiceInfo.clientAddress}</span>
                        <br />
                        <span className="font-bold">GST NO: {invoiceInfo.clientGstNo}</span>
                        <br />
                        <span className="font-bold">PAN No: {invoiceInfo.panNo}</span>
                        <br />
                        <span className="font-bold">Contact: {invoiceInfo.clientContact}</span>
                        <br />
                        <span className="font-bold">Email: {invoiceInfo.clientEmail}</span>
                      </Col>
                      <Col></Col>
                      <Col>
                        <b>
                          <span className="font-bold">Invoice Details:</span>
                        </b>
                        <br />
                        <span>Invoice No:- {invoiceInfo.invoiceNumber}</span>
                        <br />
                        <span className="font-bold">Date: {invoiceInfo.invoiceDate}</span>
                        <br />
                        <span className="font-bold">Generated By: {invoiceInfo.cashierName}</span>
                        <br />
                        <span className="font-bold">Refrence No. & Date:</span>
                        <br />
                      </Col>
                    </Row>
                    <br />
                    <br />
                    <br />
                    <Row className="mt-2">
                      <Col></Col>
                      <Col md="auto">
                        <h4 style={{ color: 'green' }}>Product Invoice List</h4>
                      </Col>
                      <Col></Col>
                    </Row>
                    <Row>
                      <StyledTable
                        style={{ borderWidth: '1px', borderColor: '#aaaaaa', borderStyle: 'solid' }}
                      >
                        <TableHead>
                          <TableRow>
                            <TableCell align="center">Product Name</TableCell>
                            <TableCell align="center">Quatity</TableCell>
                            <TableCell align="center">Unit Price</TableCell>
                            <TableCell align="center">Total Price</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {items.map((item) => (
                            <tr key={item.id}>
                              <td className="min-w-[50px] text-center">{item.name}</td>
                              <td className="min-w-[50px] text-center">{item.qty}</td>
                              <td className="min-w-[80px] text-center">
                                ₹{Number(item.price).toFixed(2)}
                              </td>
                              <td className="min-w-[90px] text-center">
                                ₹{Number(item.price * item.qty).toFixed(2)}
                              </td>
                            </tr>
                          ))}
                        </TableBody>
                      </StyledTable>
                    </Row>
                    <br></br>
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
                      <Col>
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
                      </Col>

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
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>
            Close
          </Button>
          <Button variant="primary" onClick={closeModal}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
export default ReviewInvoice;
