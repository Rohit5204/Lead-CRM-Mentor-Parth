import * as React from 'react';
import { styled } from '@mui/system';
import { Box, Table, IconButton, Tooltip } from '@mui/material';
import { Form, Row, Col, } from 'react-bootstrap';
import { useState } from 'react';
import { toPng } from 'html-to-image';
import { jsPDF } from 'jspdf';
import { format } from 'date-fns'
import FileDownloadIcon from '@mui/icons-material/FileDownload';

const StyledTable = styled(Table)(() => ({
    whiteSpace: 'pre',
    '& thead': {
        '& tr': { '& th': { paddingLeft: 0, paddingRight: 0 } },
    },
    '& tbody': {
        '& tr': { '& td': { paddingLeft: 0 } },
    },
}));
const ViewQuotation = ({ theViewQuotation }) => {
    const [discount] = useState(theViewQuotation.discount);
    const [tax] = useState(theViewQuotation.gst);
    const [gsQuantity] = useState(theViewQuotation.gsQuantity);
    const [installments] = useState(theViewQuotation.instalments);
    const [amount] = useState(theViewQuotation.amount);
    const [remarks] = useState(theViewQuotation.remarks);
    const [bankDetails] = useState(theViewQuotation.bankDetails);
    const subtotal = (gsQuantity * amount);
    const taxRate = (tax * subtotal) / 100;
    const discountRate = (discount * subtotal) / 100;
    const total = (subtotal - discountRate + taxRate)
    const quotationDate = new Date(theViewQuotation.quotationDate).toLocaleDateString()

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
                    pdf.save(`invoice-${theViewQuotation.quotationNumber}.pdf`);
                };
            })
            .catch((error) => {
                console.error('oops, something went wrong!', error);
            });
    };

    return (
        <Box sx={{ flexGrow: 1 }} style={{ 'borderRadius': '5px' }}>
            {/* <button type="button" className="btn btn-success" >
                IconButton
            </button> */}
            <div style={{ float: "right" }}>
                <Tooltip title="Download File in PDF" placement="top">
                    <IconButton className="btn btn-success" onClick={SaveAsPDFHandler}>
                        Download
                    </IconButton>
                </Tooltip>
            </div>

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
                        <div className="p-2"></div>
                        <Form className='mt-1 ml-1 mr-1'>
                            <Row>
                                <Col>
                                    <h5 className='text-center'>QUOTATION</h5>
                                </Col>
                            </Row>
                            <Row className='mt-2'>
                                <Col md="7">
                                    <img

                                        sizes="10px"
                                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjhVskpYXfF31NyGSjgoPfjnS6qH8TY8wWftKfux4&s"
                                    // "/assets/images/payment-card/boostock-logo.jpg"
                                    ></img>
                                </Col>
                                <Col>
                                    <h5 style={{ "color": "MidnightBlue" }}>
                                        Company Name
                                    </h5>
                                    <span>Street Addrees</span>
                                    <br />
                                    <span>City Name, State Name-Pincode </span>
                                    <br />
                                    <span>Company Reg. No :-896522147</span>
                                    {/* <br />
                        <span className="font-bold">GST No: {theViewQuotation.gstNo}</span> */}
                                    {/* <br /> */}
                                    {/* <span className="font-bold">State: {theViewQuotation.companyStateName}</span> */}
                                    <br />
                                    <span className="font-bold">Email: company@email.com</span>
                                </Col>
                            </Row>
                            <br />
                            <table className="table table-striped table-bordered" style={{ 'borderRadius': '2px' }}>
                                <thead style={{ borderLeft: '1px solid red', "color": "MidnightBlue", borderRight: '1px solid red' }} className='text-left'>
                                    <tr>
                                        <th> Billing Information</th>
                                        <th> Quotation Details</th>
                                    </tr>
                                </thead>
                                <tbody >
                                    <tr>
                                        <td width="60%" className='text-left'> <span>Name   &nbsp;&nbsp;&nbsp;:   {theViewQuotation.billTo}</span>
                                            <br />
                                            <span className="font-bold"> GST NO  &nbsp;:   {theViewQuotation.gstNo}</span>
                                            <br />
                                            <span className="font-bold"> PAN No  &nbsp;:   {theViewQuotation.panNo}</span>
                                            <br />
                                            <span className="font-bold"> Contact &nbsp;&nbsp;:   {theViewQuotation.clientContact}</span>
                                            <br />
                                            <span className="font-bold"> Email &nbsp;&nbsp;&nbsp;&nbsp;  :   {theViewQuotation.clientEmail}</span></td>
                                        <td className='text-left'>
                                            <span> Quotation No  :    </span>
                                            <b style={{ "color": "MidnightBlue" }}>{theViewQuotation.quotationNumber}</b>
                                            <br />
                                            <span className="font-bold"> Date    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:   {quotationDate}</span>
                                            <br />
                                            <span className="font-bold"> Generated By  : {theViewQuotation.cashierName}</span>
                                            <br />
                                            <span className="font-bold"> Refrence No. & Date:</span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td><span> Address   :   {theViewQuotation.clientAddress}</span></td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <span> Bank Details  :  NA</span><br />
                                            <span> Account No   :  NA</span><br />
                                            <span> IFSC Code   &nbsp;&nbsp;:  NA</span>
                                        </td>
                                        <td>
                                            <span> Payment Mode   :   Paid</span><br />
                                            <span> No. of EMI  :   {Object.keys(installments).length}</span>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <h5 className='text-center'> PRODUCT INFORMATION </h5>
                            <table className="table table-striped table-bordered" style={{ 'borderRadius': '2px' }}>
                                <thead style={{ borderLeft: '1px solid red', "color": "MidnightBlue", borderRight: '1px solid red' }} className='text-center'>
                                    <tr>
                                        <th>Discription</th>
                                        <th>Quantity</th>
                                        <th>Unit Price</th>
                                        <th>Total</th>
                                    </tr>
                                </thead>
                                {/* {APIData.map((quotation, index) => { */}
                                <tbody className='text-center'>
                                    <tr>
                                        {/* <td>{theViewQuotation.gsCatalogueId}</td> */}
                                        <td>Stocks</td>
                                        <td>{theViewQuotation.gsQuantity}</td>
                                        <td>{theViewQuotation.amount}</td>
                                        <td>{subtotal}</td>
                                    </tr>
                                </tbody>
                                {/* })} */}
                            </table>
                            <Row>
                                <Col md="8">
                                </Col>
                                <Col>
                                    <b><Form.Label>Subtotal :</Form.Label></b>
                                    <Form.Label style={{ color: 'green' }} className="ml-2">
                                        ₹ {subtotal}
                                    </Form.Label>
                                </Col>
                            </Row>
                            <Row>
                                <Col md="8">
                                </Col>
                                <Col>
                                    <b><Form.Label>GST ({tax}%) :</Form.Label></b>
                                    <Form.Label style={{ color: 'green' }} className="ml-2">
                                        ₹ {taxRate}
                                    </Form.Label>
                                </Col>
                            </Row>
                            <Row>
                                <Col md="8">
                                </Col>
                                <Col>
                                    <b><Form.Label>Discount ({discount}%) :</Form.Label></b>
                                    <Form.Label style={{ color: 'green' }} className="ml-2">
                                        ₹ {discountRate}
                                    </Form.Label>
                                </Col>
                            </Row>
                            <Row>
                                <Col md="8">
                                    {remarks != '' ? (
                                        <div>
                                            <h5 style={{ "color": "MidnightBlue" }}>Remarks</h5>
                                            <Row>
                                                <Col> <span style={{ "color": "red" }}>{remarks}</span></Col>
                                            </Row>
                                        </div>
                                    ) : (
                                        <div></div>
                                    )}
                                </Col>
                                <Col>
                                    <hr />
                                    <b><Form.Label>Grand Total :</Form.Label></b>
                                    <Form.Label style={{ color: 'green' }} className="ml-2">
                                        ₹ {total}
                                    </Form.Label>
                                </Col>
                            </Row>
                            <br />
                            {/* hide amd show condition */}
                            {Object.keys(installments).length > 0 ? (
                                <div>
                                    < h5 style={{ "color": "MidnightBlue" }}>Installment Information</h5>
                                    <Row>
                                        <Col>
                                            <b><Form.Label>No. of Installment : </Form.Label></b>
                                            <Form.Label style={{ color: 'green' }} className="ml-2">
                                                {Object.keys(installments).length}
                                            </Form.Label>
                                        </Col>
                                        <Col>
                                        </Col>
                                    </Row></div>

                            ) : (
                                <div></div>
                            )}
                            {/* hide amd show condition */}
                            {Object.keys(installments).length > 0 ? (
                                <table className="table table-striped table-bordered text-center" style={{ 'borderRadius': '2px' }}>
                                    <thead style={{ 'border - left': '1px solid red', "color": "MidnightBlue", 'border-right': '1px solid red' }}>
                                        <tr >
                                            <th>Sr.No</th>
                                            <th>Amount</th>
                                            <th>Date</th>
                                        </tr>
                                    </thead>
                                    <tbody >
                                        {installments.map((emi, index) => {
                                            return (
                                                <tr key={index}>
                                                    <td>{emi.instalmentNumber} </td>
                                                    <td>{emi.instalmentAmount}</td>
                                                    <td>{format(new Date(emi.instalmentDate), 'mm/dd/yyyy')} </td>

                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            ) : (
                                <div></div>
                            )}
                            {/* hide amd show condition */}

                            <div >
                                <Row>
                                    <Col style={{ "color": "MidnightBlue" }}>
                                        <h5>Term & Condition</h5>
                                    </Col>
                                </Row>
                                <Row className='ml-2'>
                                    <p>
                                        We agree the terms and conditions which is mentioned in companywebsite.com
                                    </p>
                                </Row>
                            </div>

                        </Form>
                    </div>
                </StyledTable>
                <h6 className='text-center'>This is the Computer Generated Invoice</h6>
            </div>
        </Box >
    );
};

export default ViewQuotation;
