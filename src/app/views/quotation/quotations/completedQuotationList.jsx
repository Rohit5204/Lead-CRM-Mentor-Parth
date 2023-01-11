import { styled } from '@mui/system';
import { Breadcrumb } from 'app/components';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Form, Row, Col, Modal, InputGroup } from 'react-bootstrap';
import ViewQuotation from './viewQuotation';
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

    const handleSendMail = (quotation) => {
        setSendMailObj(quotation);
        setShowMail(true);
    };
    const handleShow = (quotation) => {
        setObj1(quotation);
        setShow(true);
    };
    const items = localStorage.getItem('accessToken');
    //get method  http://35.89.6.16:4002/api
    useEffect(() => {
        axios.post(`https://43.204.38.243:3000/api/getQuotationData`,
            { quotationId: 0, empId: 0, statusId: 2 }, { headers: { "x-access-token": items } })
            .then((response) => {
                setAPIData(response.data.data);
            });
    }, []);
    return (
        <Container>
            <Box>
                <Box className="breadcrumb">
                    <Breadcrumb
                        routeSegments={[
                            { name: 'Send Quotation List', path: '/quotations/completedQuotationList' },
                            // { name: 'Quotation List Page' },
                        ]}
                    />
                </Box>
                {/* Search option */}
                <Box>
                    {/* <Row>
            <Col>
              <Form.Label htmlFor="basic-url">Apply Filter Search</Form.Label>
              <br></br>
              <button type="button" className="btn btn-outline-success">
                Last Day
              </button>
              &nbsp;
              <button type="button" className="btn btn-outline-success">
                Last Week
              </button>
              &nbsp;
              <button type="button" className="btn btn-outline-success">
                Last Month
              </button>
              &nbsp;
            </Col>
          </Row> */}
                    <br />
                    <Row>
                        <Col>
                            <Form.Label htmlFor="basic-url">Serach Box</Form.Label>
                            <InputGroup className="mb-3">
                                <button type="button" className="btn btn-success" onClick={changePage}>
                                    ADD
                                </button>
                                &nbsp;
                                <Form.Control
                                    placeholder="Search Box"
                                    aria-label="Recipient's username"
                                    aria-describedby="basic-addon2"
                                />
                                {/* &nbsp;
                <button type="submit" className="btn btn-success" onClick={changePage}>
                  ADD
                </button> */}
                            </InputGroup>
                        </Col>

                    </Row>
                    <Row>
                        <Col md="10">
                            <Form.Label htmlFor="basic-url">Apply Filter Search</Form.Label>
                            <br></br>
                            <button type="button" className="btn btn-outline-primary ">
                                Last Day
                            </button>
                            &nbsp;
                            <button type="button" className="btn btn-outline-primary">
                                Last Week
                            </button>
                            &nbsp;
                            <button type="button" className="btn btn-outline-primary">
                                Last Month
                            </button>
                            &nbsp;
                        </Col>

                        <Col md="2">
                            <Form.Label htmlFor="basic-url"> Advanced Search</Form.Label>
                            <br />
                            <button type="button" className="btn btn-outline-primary" onClick={showForm1}>
                                Apply Filter
                            </button>
                        </Col>
                    </Row>
                    <br />
                    {showForm && (
                        <form>
                            <Row>
                                <Col>
                                    <div class="form-group">
                                        <label for="exampleInputEmail1">Serach By Customer Name</label>
                                        <input
                                            type="email"
                                            class="form-control"
                                            id="exampleInputEmail1"
                                            aria-describedby="emailHelp"
                                            placeholder="Enter Customer Name"
                                        />
                                    </div>
                                </Col>
                                <Col>
                                    <div class="form-group">
                                        <label for="exampleInputEmail1">Serach By Product Name</label>
                                        <input
                                            type="email"
                                            class="form-control"
                                            id="exampleInputEmail1"
                                            aria-describedby="emailHelp"
                                            placeholder="Enter Product Name"
                                        />
                                    </div>
                                </Col>
                                <Col>
                                    <div class="form-group">
                                        <label for="exampleInputPassword1">Serach By Quantity</label>
                                        <input
                                            type="password"
                                            class="form-control"
                                            id="exampleInputPassword1"
                                            placeholder="Serach By Quantity"
                                        />
                                    </div>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <div class="form-group">
                                        <label for="exampleInputPassword1">Search By Contact Number</label>
                                        <input
                                            type="password"
                                            class="form-control"
                                            id="exampleInputPassword1"
                                            placeholder="Serach By Contact Number"
                                        />
                                    </div>
                                </Col>
                                <Col>
                                    <div class="form-group">
                                        <label for="exampleInputPassword1">Search By Amount</label>
                                        <input
                                            type="password"
                                            class="form-control"
                                            id="exampleInputPassword1"
                                            placeholder="Search By Amount"
                                        />
                                    </div>
                                </Col>
                                <Col>
                                    <div class="form-group">
                                        <label for="exampleInputPassword1">Search By Date</label>
                                        <input
                                            type="date"
                                            class="form-control"
                                            id="exampleInputPassword1"
                                            placeholder="Search By Date"
                                        />
                                    </div>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <div class="form-group">
                                        <label for="exampleInputPassword1">Select Assign To</label>
                                        <input
                                            type="password"
                                            class="form-control"
                                            id="exampleInputPassword1"
                                            placeholder="Select Assign To"
                                        />
                                    </div>
                                </Col>
                                <Col>
                                    <div class="form-group">
                                        <label for="exampleInputPassword1">Select Generated By</label>
                                        <input
                                            type="password"
                                            class="form-control"
                                            id="exampleInputPassword1"
                                            placeholder="Select Generated By"
                                        />
                                    </div>
                                </Col>
                                <Col>
                                    <div class="form-group">
                                        <label for="exampleInputPassword1">Select Monitor By</label>
                                        <input
                                            type="password"
                                            class="form-control"
                                            id="exampleInputPassword1"
                                            placeholder="Select Monitor By"
                                        />
                                    </div>
                                </Col>
                            </Row>
                            <button type="submit" class="btn btn-primary">
                                Serach
                            </button>
                        </form>
                    )}
                </Box>
                <Box className="text-center" width="100%" overflow="auto">
                    {/* Table Section */}
                    <h4>Quotation Mail Send List</h4>
                    <StyledTable className="table table-striped table-bordered" style={{ 'borderRadius': '2px' }}>
                        <TableHead style={{ borderLeft: '1px solid red', borderRight: '1px solid red' }} className='text-center'>

                            <TableRow>
                                <TableCell align="center">Quotation No</TableCell>
                                {/* <TableCell align="justify">Date</TableCell> */}
                                <TableCell align="center">Customer Name</TableCell>
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
                                        {/* <TableCell align="justify">{quotation.createdDate}</TableCell> */}
                                        <TableCell align="center">{quotation.billTo}</TableCell>
                                        <TableCell align="center">{quotation.clientContact}</TableCell>
                                        <TableCell align="center">{quotation.grandTotal}</TableCell>
                                        <TableCell align="center">
                                            {/* <IconButton onClick={() => handleSendMail(quotation)}>
                                                <Icon color="primary">send</Icon>
                                            </IconButton> */}
                                            <IconButton onClick={() => handleShow(quotation)}>
                                                <Icon color="success">visibility</Icon>
                                            </IconButton>
                                            {/* <IconButton>
                        <Icon color="warning">delete</Icon>
                      </IconButton> */}
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
        </Container>
    );
};

export default CompletedManageQuotation;
