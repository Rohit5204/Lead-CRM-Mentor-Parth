import { styled } from '@mui/system';
import { Breadcrumb } from 'app/components';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { Form, Row, Col, Modal, InputGroup } from 'react-bootstrap';
import ClearIcon from '@mui/icons-material/Clear';
import SendInvoiceMail from "./sendMail";
import UpdateInstallments from './updateInstallments';
import ViewInvoice from './viewInvoice';
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

const CompletedInvoiceList = () => {
    const navigate = useNavigate();
    const changePage = () => {
        navigate('/invoices/addInvoice');
    };
    const [showForm, setShowForm] = useState(false);

    const showForm1 = () => {
        setShowForm(!showForm);
    };
    const [obj1, setObj1] = useState(null);
    const [sendMailObj, setSendMailObj] = useState(null);
    const [APIData, setAPIData] = useState([]);

    const [show, setShow] = useState(false);
    const [showMail, setShowMail] = useState(false);
    //Dialog Form
    const handleClose = () => setShow(false);
    const handleCloseMail = () => setShowMail(false);

    const handleSendMail = (invoice) => {
        setSendMailObj(invoice);
        setShowMail(true);
    };
    const handleShow = (invoice) => {
        setObj1(invoice);
        setShow(true);
    };
    const items = localStorage.getItem('accessToken');
    const roleCode = localStorage.getItem('roleCode');
    const userId = localStorage.getItem('userId');
    const headers = {
        "x-access-token": items,
        "roleCode": roleCode,
        "userId": userId
    }
    //get method
    const [onType, setOnType] = useState('')
    const [searchBox, setSearchBox] = useState('')
    useEffect(() => {
        axios.post(`http://43.204.38.243:3001/api/getInvoiceData`,
            { invoiceid: 0, empId: 0, statusId: 2, searchKey: searchBox, opType: onType }, { headers: headers })
            .then((response) => {
                setAPIData(response.data.data);
            });
    }, [APIData]);
    return (
        <Container>
            <Box>
                <Box>
                    <Row>
                        <Col>
                            <Form.Label htmlFor="basic-url">Search Box</Form.Label>
                            <InputGroup className="mb-3">
                                <button type="button" className="btn btn-success" onClick={changePage}>
                                    ADD
                                </button>
                                &nbsp;
                                <Form.Control
                                    placeholder="Search By Quotation Number, Client Name, Product Name, Mobile Number & Amount"
                                    aria-label="Recipient's username"
                                    aria-describedby="basic-addon2"
                                    value={searchBox}
                                    onChange={(e) => setSearchBox(e.target.value)}
                                />&nbsp;
                            </InputGroup>
                        </Col>

                    </Row>
                    <Row>
                        <Col md="10">
                            <Form.Label htmlFor="basic-url">Apply Filter Search</Form.Label>
                            <br></br>
                            <button type="button" className="btn btn-outline-primary"
                                value={onType}
                                onClick={() => setOnType('DEFAULT')}>
                                ALL
                            </button>
                            &nbsp;
                            <button type="button" className="btn btn-outline-primary"
                                value={onType}
                                onClick={() => setOnType('LASTDAY')}>
                                Last Day
                            </button>
                            &nbsp;
                            <button type="button" className="btn btn-outline-primary"
                                value={onType}
                                onClick={() => setOnType('LASTWEEK')}>
                                Last Week
                            </button>
                            &nbsp;
                            <button type="button" className="btn btn-outline-primary"
                                value={onType}
                                onClick={() => setOnType('LASTMONTH')}>
                                Last Month
                            </button>
                        </Col>
                    </Row>
                </Box>
                <Box className="text-center" width="100%" overflow="auto">
                    {/* Table Section */}
                    <h4>Send Invoice List</h4>
                    <StyledTable className="table table-striped table-bordered" style={{ 'borderRadius': '1px' }}>
                        <TableHead style={{ borderLeft: '1px solid red', borderRight: '1px solid red' }} className='text-center'>

                            <TableRow>
                                <TableCell align="center">Invoice No</TableCell>
                                <TableCell align="center">Date</TableCell>
                                <TableCell align="center">Customer Name</TableCell>
                                <TableCell align="center">Product Name</TableCell>
                                <TableCell align="center">Mobile No</TableCell>
                                <TableCell align="center">Total Amount</TableCell>
                                <TableCell align="center">Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {APIData.map((invoice, index) => {
                                return (
                                    <TableRow key={index}>
                                        <TableCell align="center">{invoice.invoiceNumber}</TableCell>
                                        <TableCell align="center">{new Date(invoice.createdDate).toLocaleDateString('en-GB')}</TableCell>
                                        <TableCell align="center">{invoice.billTo}</TableCell>
                                        <TableCell align="center">{invoice.gsName}</TableCell>
                                        <TableCell align="center">{invoice.clientContact}</TableCell>
                                        <TableCell align="center">{invoice.grandTotal}</TableCell>
                                        <TableCell align="center">
                                            <IconButton onClick={() => handleSendMail(invoice)}>
                                                <Icon color="primary">send</Icon>
                                            </IconButton>
                                            <IconButton onClick={() => handleShow(invoice)}>
                                                <Icon color="warning">visibility</Icon>
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </StyledTable>
                </Box>
                <Modal
                    show={showMail}
                    onHide={handleCloseMail}
                    backdrop="static"
                    keyboard={false}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                >
                    <Modal.Header>
                        <Modal.Title>Send Invoice</Modal.Title>
                        <IconButton type="button" onClick={handleCloseMail}>
                            <ClearIcon />
                        </IconButton>
                    </Modal.Header>
                    <Modal.Body>
                        <SendInvoiceMail theClientMail={sendMailObj} handleDialog={handleCloseMail}></SendInvoiceMail>
                    </Modal.Body>
                    <Modal.Footer>
                        <button
                            type="submit"
                            className="btn btn-error"
                            style={{ marginTop: 5 + 'px' }}
                            onClick={handleCloseMail}
                        >
                            Cancel
                        </button>
                    </Modal.Footer>
                </Modal>
                <Modal
                    show={show}
                    onHide={handleClose}
                    backdrop="static"
                    keyboard={false}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                >
                    <Modal.Header>
                        <Modal.Title>Preview invoice</Modal.Title>
                        <IconButton type="button" onClick={handleClose}>
                            <ClearIcon />
                        </IconButton>
                    </Modal.Header>
                    <Modal.Body>
                        <ViewInvoice theViewInvoice={obj1}></ViewInvoice>
                    </Modal.Body>
                    <Modal.Footer>
                        {/* <button
              type="submit"
              className="btn btn-success"
              style={{ marginTop: 5 + 'px' }}
              onClick={handleClose}
            >
              Update
            </button> */}
                        <button
                            type="submit"
                            className="btn btn-error"
                            style={{ marginTop: 5 + 'px' }}
                            onClick={handleClose}
                        >
                            Cancel
                        </button>
                    </Modal.Footer>
                </Modal>
            </Box>
        </Container >
    );
};

export default CompletedInvoiceList;
