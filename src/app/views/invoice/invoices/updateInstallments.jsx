import React, { useState, useEffect } from "react";
import { Form, Row, Col, Button, InputGroup, Card, Modal } from 'react-bootstrap';
import { Breadcrumb } from 'app/components';
import { styled } from '@mui/system';
import InvoiceEMI from 'app/views/invoice/invoices/invoiceEMI';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import EditEMI from "./editEMI";
import axios from 'axios';
import {
    Box,
    Icon,
    Autocomplete,
    TextField,
    FormControl,
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
        '& tr': { '& th': { paddingLeft: 20, paddingRight: 0 } },
    },
    '& tbody': {
        '& tr': { '& td': { paddingLeft: 30 } },
    },
}));

const UpdateInstallments = () => {
    const location = useLocation();
    // console.log(location.state.id)
    const token = localStorage.getItem('accessToken');

    const [APIInstallment, setAPIInstallment] = useState([]);
    const [invoiceId, setInvoiceId] = useState(location.state.id);

    // const [instalmentId, setInstalmentId] = useState();
    // const [instalmentNumber, setInstalmentNumber] = useState("");
    // const [instalmentAmount, setInstalmentAmount] = useState("");
    // const [instalmentDate, setInstalmentDate] = useState("");
    // const [fineAmount, setFineAmount] = useState("");

    // const UpdateData = {
    //     instalmentId: instalmentId,
    //     instalmentNumber: instalmentNumber,
    //     instalmentAmount: instalmentAmount,
    //     instalmentDate: instalmentDate,
    //     fineAmount: fineAmount,
    //     hasPaid: 1,
    //     updatedBy: 1
    // };

    const [obj1, setObj1] = useState(null);
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);

    const handleShow = (emi) => {
        setObj1(emi);
        setShow(true);
    };

    const getInstallmentsData = () => {
        axios.post(`http://35.89.6.16:4002/api/getInvoiceData`, { invoiceid: invoiceId, empId: 0 },
            { headers: { "x-access-token": token } })
            .then((response) => {
                for (var i = 0; i < response.data.data.length; i++) {
                    setAPIInstallment(response.data.data[i].instalments);
                }
            });
    }

    useEffect(() => {
        getInstallmentsData()
    }, [APIInstallment]);

    return (
        <Container>
            <Box className="breadcrumb">
                <Breadcrumb
                    routeSegments={[
                        { name: 'Invoices', path: '/invoices/ManageInvoiceList' },
                        { name: 'Update Invoice Installments ' },
                    ]}
                />
            </Box>
            <Row>
                <Col>
                    <Form.Label>Invoice Number</Form.Label>
                    <Form.Control
                        disabled
                        value={location.state.invoiceNumber}
                    />
                    <br />
                </Col>
                <Col>
                    <Form.Label>Invoice Created Date</Form.Label>
                    <Form.Control
                        disabled
                        value={new Date(location.state.createdDate).toLocaleDateString()}
                    />
                    <br />
                </Col>
            </Row>
            {/* <Form.Label style={{ color: 'red' }}>
                Note :- Installment Will be In 3,6,9 Months EMI
            </Form.Label> */}
            <Row>
                <Col>
                    <Form.Label>Customer Name </Form.Label>
                    <InputGroup className="mb-3">
                        <Form.Control
                            disabled
                            value={location.state.billTo}
                        />
                    </InputGroup>
                </Col>
                <Col>
                    <Form.Label>Number of Installment</Form.Label>
                    <InputGroup className="mb-3">
                        <Form.Control
                            readOnly
                            value={Object.keys(location.state.instalments).length}
                        />
                    </InputGroup>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                        <Form.Label>Grand Total</Form.Label>
                        <Form.Control
                            disabled
                            value={location.state.grandTotal}
                            placeholder="Grand Total"
                        />
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                        <Form.Label>Inital Payment</Form.Label>
                        <Form.Control
                            // value={location.state.initalPayment}
                            placeholder="Inital Payment"
                        />
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                        <Form.Label>Pending Amount</Form.Label>
                        <Form.Control readOnly
                        // value={pending} 
                        />
                    </Form.Group>
                </Col>
            </Row>
            <br />
            <h5 className="text-center" style={{ color: 'green' }}>Installments Details</h5>
            <Row className="mt-1">
                <Col>
                    <StyledTable className="table table-striped table-bordered" style={{ 'borderRadius': '2px' }}>
                        <TableHead style={{ borderLeft: '1px solid red', borderRight: '1px solid red' }} className='text-center'>
                            <TableRow>
                                <TableCell align="center">Sr. No</TableCell>
                                <TableCell align="center">Installment No</TableCell>
                                <TableCell align="center">Date</TableCell>
                                <TableCell align="center">Amount</TableCell>
                                <TableCell align="center">Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {APIInstallment.map((emi, index) => {
                                return (
                                    <TableRow key={index}>
                                        <TableCell align="center">{emi.id}</TableCell>
                                        <TableCell align="center">{emi.instalmentNumber}</TableCell>
                                        <TableCell align="center">{new Date(emi.instalmentDate).toLocaleDateString()}</TableCell>
                                        <TableCell align="center">{emi.instalmentAmount}</TableCell>
                                        <TableCell align="center">
                                            <IconButton onClick={handleShow}>
                                                <Icon color="success">edit</Icon>
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </StyledTable>
                </Col>
            </Row>
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
                    <Modal.Title>Update Installment</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <EditEMI theEditEMI={obj1}></EditEMI>
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
                </Modal.Footer>
            </Modal>
        </Container>
    );
};

export default UpdateInstallments;
