import * as React from 'react';
import { styled } from '@mui/system';
import { Box, IconButton, Tooltip, Table } from '@mui/material';
import { Form, Row, Col, } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { toPng } from 'html-to-image';
import { jsPDF } from 'jspdf';
import { format } from 'date-fns'
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
const ViewInvoice = ({ theViewInvoice }) => {
    const [discount] = useState(theViewInvoice.discount);
    const [tax] = useState(theViewInvoice.gst);
    const [gsQuantity] = useState(theViewInvoice.gsQuantity);
    const [installments] = useState(theViewInvoice.instalments);
    const [amount] = useState(theViewInvoice.amount);
    const [remarks] = useState(theViewInvoice.remarks);
    const [bankDetails] = useState(theViewInvoice.bankDetails);
    const subtotal = (gsQuantity * amount);
    const taxRate = (tax * subtotal) / 100;
    const discountRate = (discount * subtotal) / 100;
    const total = (subtotal - discountRate + taxRate)
    // const quotationDate = format(new Date(theViewInvoice.quotationDate), 'mm/dd/yyyy')
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
                        format: [5.5, 7.5],
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
                        //console.log(imgData)
                        pdf.addImage(imgData, imageType, 0, 0, pdfWidth, pageHeight);
                        // console.log(pdf)
                    }
                    // Output / Save
                    pdf.save(`invoice-${theViewInvoice.billTo}.pdf`);
                    localStorage.setItem('invoiceDocument', pdf.output('blob'))
                };
            })
            .catch((error) => {
                console.error('oops, something went wrong!', error);
            });
    };
    const [APIData, setAPIData] = useState([]);
    const items = localStorage.getItem('accessToken');
    const roleCode = localStorage.getItem('roleCode');
    const userId = localStorage.getItem('userId');
    const headers = {
        "x-access-token": items,
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
        <Box sx={{ flexGrow: 1 }} style={{ 'borderRadius': '5px' }}>
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

                        <Form className='ml-1 mr-1'>
                            <Row>
                                <Col>
                                    <h5 className='text-center'>INVOICE</h5>
                                </Col>
                            </Row>
                            <Row>
                                <Col md="7">
                                    {/* <img
                                        sizes="10px"
                                        width={220}
                                        height={220}                                       
                                    // src="https://boostock.in/img/boostock-info-04.png"
                                    // "/assets/images/payment-card/boostock-logo.jpg"
                                    ></img> */}

                                    <img width="140" src="/assets/images/illustrations/new-boostock-logo.png" alt="" />
                                </Col>
                                <Col className='mt-2'>
                                    <h5 style={{ "color": "MidnightBlue" }}>
                                        {APIData.name}
                                    </h5>
                                    <span>{APIData.address}</span>
                                    <br />
                                    <span>{APIData.stateName} - {APIData.pincode} </span>
                                    <br />
                                    <span>Contact No :- {APIData.contactNo}</span>
                                    <br />
                                    <span className="font-bold">Email :- {APIData.email}</span>
                                </Col>q
                            </Row>
                            <br />
                            <table className="table table-striped table-bordered" style={{ 'borderRadius': '2px' }}>
                                <thead style={{ borderLeft: '1px solid red', "color": "MidnightBlue", borderRight: '1px solid red' }} className='text-left'>
                                    <tr>
                                        <th> Billing Information </th>
                                        <th> Invoice Details </th>
                                    </tr>
                                </thead>
                                <tbody >
                                    <tr>
                                        <td width="60%" className='text-left'> <span> Name   &nbsp;&nbsp;&nbsp;:   {theViewInvoice.billTo}</span>
                                            <br />
                                            <span className="font-bold"> GST NO  &nbsp;&nbsp;:   {theViewInvoice.gstNo}</span>
                                            <br />
                                            <span className="font-bold"> PAN No  &nbsp;&nbsp;:   {theViewInvoice.clientPan}</span>
                                            <br />
                                            <span className="font-bold"> Contact &nbsp;&nbsp;&nbsp;:   {theViewInvoice.clientContact}</span>
                                            <br />
                                            <span className="font-bold"> Email  &nbsp;&nbsp;&nbsp;&nbsp;  :   {theViewInvoice.clientEmail}</span>
                                        </td>
                                        <td className='text-left'>
                                            <span> Invoice No  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:    </span>
                                            <b style={{ "color": "MidnightBlue" }}> 00052018</b>
                                            <br />
                                            <span className="font-bold"> Date    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:   {new Date(theViewInvoice.createdDate).toLocaleDateString('en-GB')}</span>
                                            <br />
                                            <span className="font-bold"> Generated By    : {theViewInvoice.cashierName}</span>
                                            <br />
                                            <span className="font-bold"> Refrence No. & Date :</span>
                                        </td>
                                    </tr>
                                    {/* <tr>
                                        <td><span> Address   :   {theViewInvoice.clientAddress}</span></td>
                                    </tr> */}

                                </tbody>
                            </table>
                            <h5 className='text-center'> PRODUCT INFORMATION </h5>
                            <table className="table table-striped table-bordered" style={{ 'borderRadius': '2px' }}>
                                <thead style={{ borderLeft: '1px solid red', "color": "MidnightBlue", borderRight: '1px solid red' }} className='text-center'>
                                    <tr>
                                        <th> Product Name </th>
                                        <th> Duration </th>
                                        <th> Unit Price </th>
                                        <th> Total </th>
                                    </tr>
                                </thead>

                                <tbody className='text-center'>
                                    <tr>
                                        <td>{theViewInvoice.gsName} </td>
                                        <td>{theViewInvoice.duration}</td>
                                        <td>{theViewInvoice.amount}</td>
                                        <td>{subtotal}</td>
                                    </tr>
                                </tbody>

                            </table>
                            <Row>
                                <Col md="8">
                                    {/* <b><Form.Label> Inital Payment :</Form.Label></b>
                                    <Form.Label style={{ color: 'green' }} className="ml-2">
                                        ₹ 45,000
                                    </Form.Label> */}
                                </Col>
                                <Col>
                                    <b><Form.Label> Subtotal :</Form.Label></b>
                                    <Form.Label style={{ color: 'green' }} className="ml-2">
                                        ₹ {subtotal}
                                    </Form.Label>
                                </Col>
                            </Row>
                            <Row>
                                <Col md="8">
                                </Col>
                                <Col>
                                    <b><Form.Label> GST ({tax}%) :</Form.Label></b>
                                    <Form.Label style={{ color: 'green' }} className="ml-2">
                                        ₹ {taxRate}
                                    </Form.Label>
                                </Col>
                            </Row>
                            <Row>
                                <Col md="8">
                                </Col>
                                <Col>
                                    <b><Form.Label> Discount ({discount}%) :</Form.Label></b>
                                    <Form.Label style={{ color: 'green' }} className="ml-2">
                                        ₹ {discountRate}
                                    </Form.Label>
                                </Col>
                            </Row>
                            <Row>
                                <Col md="8">
                                </Col>
                                <Col>
                                    <hr />
                                    <b><Form.Label> Grand Total :</Form.Label></b>
                                    <Form.Label style={{ color: 'green' }} className="ml-2">
                                        ₹ {total}
                                    </Form.Label>
                                </Col>
                            </Row>

                            {/* hide amd show condition */}
                            {Object.keys(installments).length > 0 ? (
                                <div>
                                    <h5 style={{ "color": "MidnightBlue" }}> Installment Information</h5>
                                    <Row>
                                        <Col>
                                            <b><Form.Label> No. of Installment : </Form.Label></b>
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
                                    <thead style={{ borderLeft: '1px solid red', "color": "MidnightBlue", borderRight: '1px solid red' }}>
                                        <tr >
                                            <th>Sr.No</th>
                                            <th>Amount</th>
                                            <th>Due Date
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody >
                                        {installments.map((emi, index) => {
                                            return (
                                                <tr key={index}>
                                                    <td>{emi.instalmentNumber} </td>
                                                    <td>{emi.instalmentAmount}</td>
                                                    {/* <td>{new Date(emi.instalmentDate).toLocaleDateString('en-GB')} </td> */}
                                                    <td>Pending</td>

                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            ) : (
                                <div></div>
                            )}
                            {/* hide amd show condition */}
                            {remarks != '' ? (
                                <div>
                                    <h5 style={{ "color": "MidnightBlue" }}>Remarks</h5>
                                    <Row>
                                        <Col md={12}>
                                            <p>{remarks}</p>
                                        </Col>
                                    </Row>
                                </div>
                            ) : (
                                <div></div>
                            )}
                            <div>
                                <Row>
                                    <Col style={{ "color": "MidnightBlue" }}>
                                        <h5>Term & Condition</h5>
                                    </Col>
                                </Row>
                                <Row className='ml-2'>
                                    <label>
                                        We agree the terms and conditions which is mentioned in www.boostock.in
                                    </label>
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

export default ViewInvoice;
