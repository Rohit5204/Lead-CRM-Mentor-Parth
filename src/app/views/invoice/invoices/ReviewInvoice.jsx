import { styled } from '@mui/system';
import { Button, Row, Col, Modal, Form } from 'react-bootstrap';
import { toPng } from 'html-to-image';
import { jsPDF } from 'jspdf';
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
          <StyledTable style={{ borderWidth: '1px', borderColor: '#aaaaaa', borderStyle: 'solid' }}>
            <div className=" my-8 inline-block w-full max-w-md transform overflow-hidden rounded-lg bg-white text-left align-middle shadow-xl transition-all">
              <div className="p-4" id="print">
                <Row>
                  <Col></Col>
                  <Col>
                    <h5 className="text-center text-lg font-bold text-gray-900">INVOICE</h5>
                  </Col>
                  <Col></Col>
                </Row>
                <hr />
                <div className="mt-6">
                  <Row>
                    <Col>
                      <b>
                        <span className="font-bold">From:</span>
                      </b>

                      <span>&nbsp;{invoiceInfo.cashierName}</span>
                      <br />
                      <span>Address: {invoiceInfo.companyAddress}</span>
                      {/* <br /> */}
                      {/* <span>Vashi,New Mumbai-400012</span> */}
                      <br />
                      <span className="font-bold">GST NO: {invoiceInfo.companyGstNo}</span>
                      <br />
                      <span className="font-bold">State: {invoiceInfo.companyStateName}</span>
                      <br />
                      <span className="font-bold">Email: {invoiceInfo.companyEmail}</span>
                    </Col>
                    <Col>
                      <b>
                        <span className="font-bold">To:</span>
                      </b>
                      <span>&nbsp;{invoiceInfo.customerName}</span>
                      <br />

                      <span>Address: {invoiceInfo.clientAddress}</span>
                      <br />
                      <span className="font-bold">GST NO: {invoiceInfo.clientGstNo}</span>
                      <br />
                      <span className="font-bold">PAN No: {invoiceInfo.panNo}</span>
                      <br />
                      <span className="font-bold">Email: {invoiceInfo.clientEmail}</span>
                    </Col>
                    <Col>
                      <b>
                        <span className="font-bold">Invoice Number:</span>
                      </b>
                      <span>&nbsp;{invoiceInfo.invoiceNumber}</span>
                      <br />
                      <span className="font-bold">Date: 30-10-2022</span>
                      <br />

                      <span className="font-bold">Refrence No. & Date:</span>
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
                            <td className="w-full">{item.name}</td>
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
                        <Form.Label>Tax Rate:</Form.Label>
                      </b>
                      &nbsp;&nbsp;&nbsp;&nbsp;
                      <Form.Label style={{ color: 'green' }} className="ml-4">
                        ₹ {invoiceInfo.taxRate.toFixed(2)}
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
