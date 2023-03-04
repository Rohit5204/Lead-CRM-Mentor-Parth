import { styled } from '@mui/system';
import { Breadcrumb, SimpleCard } from 'app/components';
import { Form, Row, Col, Button, InputGroup } from 'react-bootstrap';
import { Box, MenuItem, FormControl, Select } from '@mui/material';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import { BASE_URL } from 'app/utils/constant';
const Container = styled('div')(({ theme }) => ({
    margin: '30px',
    [theme.breakpoints.down('sm')]: { margin: '16px' },
    '& .breadcrumb': {
        marginBottom: '30px',
        [theme.breakpoints.down('sm')]: { marginBottom: '16px' },
    },
}));
const Div = styled('div')(() => ({
    margin: '0px 0px 0px 441px',
}));
const EditRecoveryInstallment = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const changePage = () => {
        navigate('/myDeal/recovery/manageRecovery');
    };
    const [id, setId] = useState(location.state.id);
    const [instalmentNumber, setInstalmentNumber] = useState(location.state.instalmentNumber);
    const [instalmentAmount, setinstalmentAmount] = useState(location.state.instalmentAmount);
    const [instalmentDate, setinstalmentDate] = useState(location.state.instalmentDate);
    const [fineAmount, setfineAmount] = useState(location.state.fineAmount);
    const [hasPaid, sethasPaid] = useState(location.state.hasPaid);

    const UpdateData = {
        instalmentId: id,
        instalmentNumber: instalmentNumber,
        instalmentAmount: instalmentAmount,
        instalmentDate: instalmentDate,
        fineAmount: fineAmount,
        hasPaid: hasPaid,
        updatedBy: 1
    };
    const items = localStorage.getItem('accessToken');
    const roleCode = localStorage.getItem('roleCode');
    const userId = localStorage.getItem('userId');
    const headers = {
        "x-access-token": items,
        "roleCode": roleCode,
        "userId": userId
    }
    const updateInstallment = (e) => {
        // console.log({ UpdateData });
        e.preventDefault();
        axios.post(BASE_URL + `/api/updateProductInstalment`,
            UpdateData, { headers: headers }).then(() => useEffect);
        changePage();
    };
    const handleSubmit = (e) => {
        e.preventDefault();
    };
    return (
        <Container>
            <Box className="breadcrumb">
                <Breadcrumb
                    routeSegments={[
                        { name: 'Manage Recovery List', path: '/myDeal/recovery/manageRecovery' },
                        { name: 'Update Recovery Installment' },
                    ]}
                />
            </Box>
            <Row>
                <Col>
                    <SimpleCard title="Installment Detail's">
                        <Row>
                            <Col>
                                <Form.Label>Invoice Number</Form.Label>
                                <Form.Control
                                    disabled
                                    value={location.state.invoiceNumber}
                                />

                            </Col>
                            <Col>
                                <Form.Label>Customer Name</Form.Label>
                                <Form.Control
                                    disabled
                                // value={new Date(location.state.createdDate).toLocaleDateString()}
                                />

                            </Col>
                        </Row>

                        <Row className='mt-1'>
                            <Col>
                                <Form.Label>Installment Amount</Form.Label>
                                <Form.Control
                                    onChange={(e) => setinstalmentAmount(e.target.value)}
                                    value={instalmentAmount}
                                    placeholder="Enter the EMI Amount"
                                />
                            </Col>
                            <Col>
                                <Form.Label>Installment Date</Form.Label>
                                <InputGroup >
                                    <Form.Control
                                        readOnly
                                        value={(new Date(location.state.instalmentDate).toLocaleDateString('en-GB'))}
                                    />
                                </InputGroup>
                            </Col>
                        </Row>
                        <Row className='mt-1'>
                            <Col>
                                <Form.Label>New Installment Date</Form.Label>
                                <Form.Control
                                    type='date'
                                    onChange={(e) => setinstalmentDate(e.target.value)}
                                    value={instalmentDate}
                                    placeholder="Enter the Price"
                                />
                            </Col>
                            <Col>
                                <Form.Label>Penatly Charges</Form.Label>
                                <Form.Control
                                    type='number'
                                    onChange={(e) => setfineAmount(e.target.value)}
                                    value={fineAmount}
                                    placeholder="Enter the Fine Amount"
                                />
                            </Col>

                        </Row>
                        <Row>
                            <Col>
                                <FormControl sx={{ m: 0, minWidth: 480 }} size="small">
                                    <Form.Label>Status</Form.Label>
                                    <Select
                                        value={hasPaid}
                                        label="Age"
                                        onChange={(e) => sethasPaid(e.target.value)}
                                    >
                                        <MenuItem value={0}>Payment Pending</MenuItem>
                                        <MenuItem value={1}>Payment Recieved</MenuItem>
                                    </Select>
                                </FormControl>
                            </Col>
                        </Row>
                    </SimpleCard>
                </Col>
            </Row>
            <Div className="mt-2">
                <Row>
                    <Col>
                        <Button variant="secondary" onClick={changePage}>
                            Cancel
                        </Button>
                        &nbsp;

                        <button type="button" className="btn btn-success" onClick={updateInstallment}>
                            Save
                        </button>
                    </Col>
                </Row>
            </Div>
        </Container>
    );
};

export default EditRecoveryInstallment;
