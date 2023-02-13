import { styled } from '@mui/system';
import { Breadcrumb } from 'app/components';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Row, Col, Modal, InputGroup } from 'react-bootstrap';
import EditCatalogue from './editCatalogue';
import { useNavigate } from 'react-router-dom';
import { DataGrid } from '@mui/x-data-grid';
import {
  Box,
  Icon,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  Chip,
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

const ManageCatalogue = () => {
  const [obj1, setObj1] = useState(null);
  const [APIData, setAPIData] = useState([]);
  const [show, setShow] = useState(false);
  //Dialog Form
  const handleClose = () => setShow(false);
  const handleShow = (catalogue) => {
    setObj1(catalogue);
    setShow(true);
  };
  const navigate = useNavigate();
  const changePage = () => {
    navigate('/catalogues/addCatalogue');
  };

  //get method
  const items = localStorage.getItem('accessToken');
  const roleCode = localStorage.getItem('roleCode');
  const userId = localStorage.getItem('userId');
  const headers = {
    "x-access-token": items,
    "roleCode": roleCode,
    "userId": userId
  }
  const columns = [
    { field: 'id', headerName: 'Sr. No', width: 120 },
    { field: 'gsType', headerName: 'Catalogue Type', width: 240 },
    { field: 'gsName', headerName: 'Catalogue Name', width: 240 },
    { field: 'gsPrice', headerName: 'Product Price', width: 240 },
    {
      field: 'durationName',
      headerName: 'Duration',
      description: 'This column has a value getter and is not sortable.',
      // sortable: false,
      width: 240,
      // valueGetter: (params) =>
      //   `${params.row.firstName || ''} ${params.row.lastName || ''}`,
    },
    {
      field: 'action',
      headerName: 'Action',
      sortable: false,
      renderCell: (params) => {
        return (

          <Icon color="success" onClick={(e) => handleShow(e, params.row)}>edit</Icon>

        );
      }
    },
  ];
  const [searchBox, setSearchBox] = useState('')
  const getCatalogueData = async () => {
    await axios.post(`http://43.204.38.243:3001/api/getCatalogue`, { catId: 0, searchKey: searchBox, },
      { headers: headers })
      .then((response) => {
        setAPIData(response.data.data);
      });
  }
  useEffect(() => {
    getCatalogueData()
  }, [APIData]);
  const roleName = window.localStorage.getItem('roleName');
  return (
    <Container>
      <Box>
        <Box className="breadcrumb">
          <Breadcrumb
            routeSegments={[
              { name: 'Manage Catalogue', path: '/catalogues/manageCatalogue' },
              { name: 'Catalogue Detail Page' },
            ]}
          />
        </Box>
        <Box>
          <Row>
            <Col>
              <InputGroup className="mb-3">
                <button type="submit" className="btn btn-success" onClick={changePage}>
                  ADD
                </button>
                &nbsp;
                <Form.Control
                  placeholder="Search By Catalogue Name"
                  aria-label="Recipient's username"
                  aria-describedby="basic-addon2"
                  value={searchBox}
                  onChange={(e) => setSearchBox(e.target.value)}
                />
              </InputGroup>
            </Col>
          </Row>
        </Box>
        <Box className="text-center" width="100%" overflow="auto">
          {/* Table Section */}
          <h4>Catalogue Table</h4>
          <StyledTable className="table table-striped table-bordered" style={{ 'borderRadius': '1px' }}>
            <TableHead style={{ borderLeft: '1px solid red', borderRight: '1px solid red' }} className='text-center'>
              <TableRow>
                <TableCell align="center">Catalogue Id</TableCell>
                <TableCell align="center">Catalogue Type</TableCell>
                <TableCell align="center">Name</TableCell>
                <TableCell align="center">Price</TableCell>
                <TableCell align="center">Duration (In Days)</TableCell>
                <TableCell align="center">Status</TableCell>
                <TableCell align="center">Action</TableCell>

              </TableRow>
            </TableHead>
            <TableBody>
              {APIData.map((catalogue, index) => {
                return (
                  <TableRow key={index}>
                    <TableCell align="center">{catalogue.id}</TableCell>
                    <TableCell align="center">{catalogue.gsType}</TableCell>
                    <TableCell align="center">{catalogue.gsName}</TableCell>
                    <TableCell align="center">₹ {catalogue.gsPrice}</TableCell>
                    <TableCell align="center">{catalogue.durationName}</TableCell>
                    <TableCell align="center">
                      {catalogue.status == 0 ? (
                        <> <Chip label="Inactive" color="warning" /></>
                      ) :
                        (
                          <> <Chip label="Active" color="success" /></>
                        )
                      }
                    </TableCell>

                    <TableCell align="center">
                      <IconButton onClick={() => handleShow(catalogue)}>
                        <Icon color="success">edit</Icon>
                      </IconButton>
                    </TableCell>


                  </TableRow>
                );
              })}
            </TableBody>
          </StyledTable>
          {/* <div style={{ height: 620, width: '100%' }}>
            <DataGrid
              rows={APIData}
              columns={columns}
              pageSize={10}
              rowsPerPageOptions={[10]}
            // checkboxSelection
            />
          </div> */}
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
            <Modal.Title>Update Catalogue</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <EditCatalogue theEditCatalogue={obj1} handleDialog={handleClose} />
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

export default ManageCatalogue;
