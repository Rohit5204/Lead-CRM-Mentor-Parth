import { styled } from '@mui/system';
import { Breadcrumb } from 'app/components';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Data } from 'app/components/Data';
import { NavLink, useNavigate } from 'react-router-dom';
import { Form, Row, Col, Modal, InputGroup } from 'react-bootstrap';
// import EditCatalogue from './editCatalogue';
import {
  Box,
  Chip,
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

const ManageQuotation = () => {
  const navigate = useNavigate();
  const changePage = () => {
    navigate('/quotations/addQuotation');
  };
  const [showForm, setShowForm] = useState(false);

  const showForm1 = () => {
    setShowForm(!showForm);
  };
  const [obj1, setObj1] = useState(null);
  const [APIData, setAPIData] = useState([]);
  const [show, setShow] = useState(false);
  //Dialog Form
  const handleClose = () => setShow(false);
  const handleShow = (catalogue) => {
    setObj1(catalogue);
    setShow(true);
  };

  //get method
  useEffect(() => {
    axios
      .post(`http://35.89.6.16:4002/api/getQuotationData`, {
        quotationId: 0,
        empId: 0,
      })
      .then((response) => {
        setAPIData(response.data.data);
      });
  }, [APIData]);
  //   useEffect(() => {
  //     axios
  //       .post(`http://35.89.6.16:4002/api/upsertCatalogue`, {
  //         catId: 0,
  //       })
  //       .then((response) => {
  //         setAPIData(response.data.data);
  //       });
  //   }, [APIData]);
  return (
    <Container>
      <Box>
        <Box className="breadcrumb">
          <Breadcrumb
            routeSegments={[
              { name: 'Manage Quotation', path: '/quotations/manageQuotation' },
              { name: 'Quotation Detail Page' },
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
                {/* <button type="button" className="btn btn-success" onClick={changePage}>
                  ADD
                </button>
                &nbsp; */}
                <Form.Control
                  placeholder="Search Box"
                  aria-label="Recipient's username"
                  aria-describedby="basic-addon2"
                />
              </InputGroup>
            </Col>
            <Col md="4">
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

            <Col md={2}>
              <Form.Label htmlFor="basic-url"> Advanced Search</Form.Label>
              <br />
              <button type="button" className="btn btn-outline-success" onClick={showForm1}>
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
          <h4>Quotation Table</h4>
          <StyledTable>
            <TableHead>
              <TableRow>
                <TableCell align="justify">Quotation No</TableCell>
                <TableCell align="justify">Date</TableCell>
                <TableCell align="justify">Customer Name</TableCell>
                <TableCell align="justify">Product Name</TableCell>
                <TableCell align="justify">Amount</TableCell>
                <TableCell align="justify">Status</TableCell>
                <TableCell align="center">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {APIData.map((catalogue, index) => {
                return (
                  <TableRow key={index}>
                    <TableCell align="justify">{catalogue.quotationNumber}</TableCell>
                    <TableCell align="justify">{catalogue.createdDate}</TableCell>
                    <TableCell align="justify">{catalogue.billTo}</TableCell>
                    <TableCell align="justify">{catalogue.gsCatalogueId}</TableCell>
                    <TableCell align="justify">{catalogue.amount}</TableCell>

                    <TableCell align="justify">{catalogue.status}</TableCell>
                    <TableCell align="center">
                      <IconButton onClick={() => handleShow(catalogue)}>
                        <Icon color="success">edit</Icon>
                      </IconButton>
                      <IconButton>
                        <Icon color="warning">delete</Icon>
                      </IconButton>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
            {/* <TableBody>
              <TableRow>
                <TableCell align="justify">101</TableCell>
                <TableCell align="justify">24-10-2022</TableCell>
                <TableCell align="justify">Nisha Kumari</TableCell>
                <TableCell align="justify">INDEX OPTION</TableCell>
                <TableCell align="justify">25</TableCell>
                <TableCell align="justify">
                  <Chip label="Draft" />
                </TableCell>
                <TableCell align="center">
                  <IconButton onClick={() => handleShow()}>
                    <Icon color="success">edit</Icon>
                  </IconButton>
                  <IconButton>
                    <Icon color="warning">delete</Icon>
                  </IconButton>
                </TableCell>
              </TableRow>
            </TableBody> */}
          </StyledTable>
        </Box>
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
            <Modal.Title>Update Quotation</Modal.Title>
          </Modal.Header>
          <Modal.Body>{/* <EditCatalogue theEditCatalogue={obj1} /> */}</Modal.Body>
          <Modal.Footer>
            <button
              type="submit"
              className="btn btn-success"
              style={{ marginTop: 5 + 'px' }}
              onClick={handleClose}
            >
              Update
            </button>
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

export default ManageQuotation;
