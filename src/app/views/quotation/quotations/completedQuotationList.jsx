import { styled } from '@mui/system';
import { Breadcrumb } from 'app/components';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Form, Row, Col, Modal, InputGroup } from 'react-bootstrap';
import ViewQuotation from './viewQuotation';
import { DataGrid } from '@mui/x-data-grid';
import SendQuotationMail from './sendMail';
import ClearIcon from '@mui/icons-material/Clear';
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

const CompletedManageQuotation = () => {
    const navigate = useNavigate();
    const changePage = () => {
        navigate('/quotations/addQuotation');
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

    const handleSendMail = (e, row) => {
        setSendMailObj(row);
        setShowMail(true);
    };
    const handleShow = (e, row) => {
        setObj1(row);
        setShow(true);
    };
    const [onType, setOnType] = useState('')
    const [searchBox, setSearchBox] = useState('')

    const items = localStorage.getItem('accessToken');
    const roleCode = localStorage.getItem('roleCode');
    const userId = localStorage.getItem('userId');
    const headers = {
        "x-access-token": items,
        "roleCode": roleCode,
        "userId": userId
    }
    const columns = [
        { field: 'quotationNumber', headerName: 'Quotation No', width: 180 },
        { field: 'billTo', headerName: 'Client Name', width: 240 },
        { field: 'gsName', headerName: 'Product Name', width: 240 },
        { field: 'clientContact', headerName: 'Mobile Number', width: 240 },
        {
            field: 'grandTotal',
            headerName: 'Total Amount',
            description: 'This column has a value getter and is not sortable.',
            width: 180,
        },
        {
            field: 'action',
            headerName: 'Action',
            sortable: false,
            renderCell: (params) => {
                return (
                    <>
                        <IconButton onClick={(e) => handleShow(e, params.row)}>
                            <Icon color="success">visibility</Icon>
                        </IconButton>
                    </>
                );
            }
        },
    ];
    //get method  http://35.89.6.16:4002/api
    useEffect(() => {
        axios.post(`http://43.204.38.243:3001/api/getQuotationData`,
            { quotationId: 0, empId: 0, statusId: 2, searchKey: searchBox, opType: onType }, { headers: headers })
            .then((response) => {
                setAPIData(response.data.data);
            });
    }, [APIData]);
    return (
        <Container>
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
                <br />
                <Box className="text-center" width="100%" overflow="auto">
                    {/* Table Section */}
                    <h4>Quotation Mail Send List</h4>
                    <StyledTable className="table table-striped table-bordered" style={{ 'borderRadius': '2px' }}>
                        <TableHead style={{ borderLeft: '1px solid red', borderRight: '1px solid red' }} className='text-center'>

                            <TableRow>
                                <TableCell align="center">Quotation No</TableCell>

                                <TableCell align="center">Quotation Date</TableCell>
                                <TableCell align="center">Customer Name</TableCell>
                                <TableCell align="center">Product Name</TableCell>
                                <TableCell align="center">Mobile No</TableCell>
                                <TableCell align="center">Total Amount</TableCell>

                                <TableCell align="center">Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {APIData.map((quotation, index) => {
                                return (
                                    <TableRow key={index}>
                                        <TableCell align="center">{quotation.quotationNumber}</TableCell>

                                        <TableCell align="center">{new Date(quotation.quotationDate).toLocaleDateString('en-GB')}</TableCell>
                                        <TableCell align="center">{quotation.billTo}</TableCell>
                                        <TableCell align="center">{quotation.gsName}</TableCell>

                                        <TableCell align="center">{quotation.clientContact}</TableCell>
                                        <TableCell align="center">{quotation.grandTotal}</TableCell>
                                        <TableCell align="center">

                                            <IconButton onClick={() => handleShow(quotation)}>
                                                <Icon color="success">visibility</Icon>
                                            </IconButton>

                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </StyledTable>
                    {/* <div style={{ height: 570, width: '100%' }}>
                        <DataGrid
                            rows={APIData}
                            columns={columns}
                            pageSize={10}
                            rowsPerPageOptions={[10]}
                        />
                    </div> */}
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
                        <Modal.Title>Send Quotation To Client</Modal.Title>
                        <IconButton type="button" onClick={handleCloseMail}>
                            <ClearIcon />
                        </IconButton>
                    </Modal.Header>
                    <Modal.Body>
                        <SendQuotationMail theClientMail={sendMailObj} handleDialog={handleCloseMail}></SendQuotationMail>
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
                        <Modal.Title>Preview Quotation</Modal.Title>
                        <IconButton type="button" onClick={handleClose}>
                            <ClearIcon />
                        </IconButton>
                    </Modal.Header>
                    <Modal.Body>
                        <ViewQuotation theViewQuotation={obj1}></ViewQuotation>
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
            </Box>
        </Container>
    );
};

export default CompletedManageQuotation;
