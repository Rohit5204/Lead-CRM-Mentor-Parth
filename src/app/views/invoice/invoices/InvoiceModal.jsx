import React, { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { toPng } from 'html-to-image';
import { jsPDF } from 'jspdf';
import { styled } from '@mui/system';
import { Button, Row, Col, Modal, Form } from 'react-bootstrap';
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
const InvoiceModal = ({ isOpen, setIsOpen, invoiceInfo, items, onAddNextInvoice }) => {
  function closeModal() {
    setIsOpen(false);
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
    <Container>
      <Box>
        <Transition appear show={isOpen} as={Fragment}>
          <Dialog as="div" className="fixed inset-0 z-10 overflow-y-auto" onClose={closeModal}>
            <div className="min-h-screen px-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Dialog.Overlay className="fixed inset-0 bg-black/50" />
              </Transition.Child>

              {/* This element is to trick the browser into centering the modal contents. */}
              <span className="inline-block h-screen align-middle" aria-hidden="true">
                &#8203;
              </span>
              <Transition.Child
                className="text-center"
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <div className=" my-8 inline-block w-full max-w-md transform overflow-hidden rounded-lg bg-white text-left align-middle shadow-xl transition-all">
                  <div className="p-4" id="print">
                    <Row>
                      <Col></Col>
                      <Col>
                        <h5 className="text-center text-lg font-bold text-gray-900">TAX INVOICE</h5>
                      </Col>

                      <Col className="ml-5">
                        <button
                          type="button"
                          className="btn btn-success"
                          onClick={SaveAsPDFHandler}
                        >
                          Download
                        </button>
                        &nbsp;
                        <button
                          type="button"
                          className="btn btn-primary"
                          onClick={addNextInvoiceHandler}
                        >
                          Next
                        </button>
                      </Col>
                    </Row>
                    <hr />
                    <div className="mt-6">
                      <Row>
                        <Col>
                          <b>
                            <span className="font-bold">From:</span>
                          </b>
                          {/* <span className="font-bold">Cashier:</span> */}
                          <span>&nbsp;{invoiceInfo.cashierName}</span>
                          <br />
                          <span>Haware Fantatsia Buisness Park</span>
                          <br />
                          <span>Vashi,New Mumbai-400012</span>
                          <br />
                          <span className="font-bold">GST NO: ABC0154266C</span>
                          <br />
                          <span className="font-bold">State: Maharashtra</span>
                          <br />
                          <span className="font-bold">Email: demo@gmail.com</span>
                        </Col>
                        <Col>
                          <b>
                            <span className="font-bold">To:</span>
                          </b>
                          <span>&nbsp;{invoiceInfo.customerName}</span>
                          <br />
                          <span>Haware Fantatsia Buisness Park</span>
                          <br />
                          <span>New Mumbai-400086</span>
                          <br />
                          <span className="font-bold">GST NO: ABC0154266C</span>
                          <br />
                          <span className="font-bold">State: Maharashtra</span>
                          <br />
                          <span className="font-bold">Email: admin@gmail.com</span>
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
                      <Row className="mt-2">
                        <Col></Col>
                        <Col className="col-sm-9">
                          <h4 style={{ color: 'green' }}>Product Invoice List</h4>
                        </Col>
                        <Col></Col>
                      </Row>
                      <Row>
                        <StyledTable>
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
                      {/* <div className="mt-4 flex flex-col items-end space-y-2">
                      <div className="flex w-full justify-between border-t border-black/10 pt-2">
                        <span className="font-bold">Subtotal:</span>
                        <span>₹{invoiceInfo.subtotal.toFixed(2)}</span>
                      </div>
                      <div className="flex w-full justify-between">
                        <span className="font-bold">Discount:</span>
                        <span>₹{invoiceInfo.discountRate.toFixed(2)}</span>
                      </div>
                      <div className="flex w-full justify-between">
                        <span className="font-bold">Tax:</span>
                        <span>₹{invoiceInfo.taxRate.toFixed(2)}</span>
                      </div>
                      <div className="flex w-full justify-between border-t border-black/10 py-2">
                        <span className="font-bold">Total:</span>
                        <span className="font-bold">
                          ₹
                          {invoiceInfo.total % 1 === 0
                            ? invoiceInfo.total
                            : invoiceInfo.total.toFixed(2)}
                        </span>
                      </div>
                    </div> */}
                    </div>
                  </div>
                  {/* <div className="mt-4 flex space-x-2 px-4 pb-6">
                  <button
                    className="flex w-full items-center justify-center space-x-1 rounded-md border border-blue-500 py-2 text-sm text-blue-500 shadow-sm hover:bg-blue-500 hover:text-white"
                    onClick={SaveAsPDFHandler}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                      />
                    </svg>
                    <span>Download</span>
                  </button>
                  <button
                    onClick={addNextInvoiceHandler}
                    className="flex w-full items-center justify-center space-x-1 rounded-md bg-blue-500 py-2 text-sm text-white shadow-sm hover:bg-blue-600"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 5l7 7-7 7M5 5l7 7-7 7"
                      />
                    </svg>
                    <span>Next</span>
                  </button>
                </div> */}
                </div>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition>
      </Box>
    </Container>
  );
};

export default InvoiceModal;
