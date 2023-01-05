import * as React from 'react';
import { styled } from '@mui/system';
import { Breadcrumb } from 'app/components';
import { SimpleCard } from 'app/components';
import { Row, Col, Button, Form, Tab, Tabs } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import {
    Box
} from '@mui/material';

const ViewRenew = () => {
    const navigate = useNavigate();
    const changePage = () => {
        navigate('/myDeal/renewal/manageRenewal');
    };

    return (
        <Container>
            <Box className="breadcrumb">
                <Breadcrumb
                    routeSegments={[
                        { name: 'Manage Renewal List', path: '/myDeal/renewal/manageRenewal' },
                        { name: 'Invoice Detail' },
                    ]}
                />
            </Box>
            <Row>
                <Col>
                    <SimpleCard title="Membership Detail's">
                        <Row>
                            <Col>
                                <Form.Label>Invoice No</Form.Label>
                                <Form.Control
                                    disabled
                                    //onChange={(e) => setRemarks(e.target.value)}
                                    // defaultValue={location.state.leadId}
                                    // value={location.state.leadId}
                                    placeholder="Lead Number"
                                />
                            </Col>
                            <Col>
                                <Form.Label>Invoice Date</Form.Label>
                                <Form.Control
                                    disabled
                                    //onChange={(e) => setRemarks(e.target.value)}
                                    // defaultValue={location.state.leadId}
                                    // value={location.state.leadId}
                                    placeholder="Lead Number"
                                />
                            </Col>
                        </Row>
                        <Row className='mt-2'>
                            <Col>
                                <h6 style={{ color: 'red' }}>Client Detail's</h6>
                            </Col>
                        </Row>

                        <Row>
                            <Col>
                                <Form.Label>Client Name</Form.Label>
                                <Form.Control
                                    disabled
                                    //onChange={(e) => setRemarks(e.target.value)}
                                    // defaultValue={location.state.leadId}
                                    // value={location.state.leadId}
                                    placeholder="Lead Number"
                                />
                            </Col>
                            <Col>
                                <Form.Label>Client Email</Form.Label>
                                <Form.Control
                                    disabled
                                    //onChange={(e) => setRemarks(e.target.value)}
                                    // defaultValue={location.state.leadId}
                                    // value={location.state.leadId}
                                    placeholder="Lead Number"
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Form.Label>Address</Form.Label>
                                <Form.Control
                                    disabled
                                    //onChange={(e) => setRemarks(e.target.value)}
                                    // defaultValue={location.state.leadId}
                                    // value={location.state.leadId}
                                    placeholder="Lead Number"
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Form.Label>Mobile Number</Form.Label>
                                <Form.Control
                                    disabled
                                    //onChange={(e) => setRemarks(e.target.value)}
                                    // defaultValue={location.state.leadId}
                                    // value={location.state.leadId}
                                    placeholder="Lead Number"
                                />
                            </Col>
                            <Col>
                                <Form.Label>Pan No</Form.Label>
                                <Form.Control
                                    disabled
                                    //onChange={(e) => setRemarks(e.target.value)}
                                    // defaultValue={location.state.leadId}
                                    // value={location.state.leadId}
                                    placeholder="Lead Number"
                                />
                            </Col>
                            <Col>
                                <Form.Label>GST No</Form.Label>
                                <Form.Control
                                    disabled
                                    //onChange={(e) => setRemarks(e.target.value)}
                                    // defaultValue={location.state.leadId}
                                    // value={location.state.leadId}
                                    placeholder="Lead Number"
                                />
                            </Col>
                        </Row>
                        <Row className='mt-2'>
                            <Col>
                                <h6 style={{ color: 'red' }}>Purchase History</h6>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Form.Label>Product Name</Form.Label>
                                <Form.Control
                                    disabled
                                    //onChange={(e) => setRemarks(e.target.value)}
                                    // defaultValue={location.state.leadId}
                                    // value={location.state.leadId}
                                    placeholder="Lead Number"
                                />
                            </Col>
                            <Col>
                                <Form.Label>Unit Price</Form.Label>
                                <Form.Control
                                    disabled
                                    //onChange={(e) => setRemarks(e.target.value)}
                                    // defaultValue={location.state.leadId}
                                    // value={location.state.leadId}
                                    placeholder="Lead Number"
                                />
                            </Col>
                            <Col>
                                <Form.Label>Total Price</Form.Label>
                                <Form.Control
                                    disabled
                                    //onChange={(e) => setRemarks(e.target.value)}
                                    // defaultValue={location.state.leadId}
                                    // value={location.state.leadId}
                                    placeholder="Lead Number"
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col md="4">
                                <Form.Label>GST</Form.Label>
                                <Form.Control
                                    disabled
                                    //onChange={(e) => setRemarks(e.target.value)}
                                    // defaultValue={location.state.leadId}
                                    // value={location.state.leadId}
                                    placeholder="Lead Number"
                                />
                            </Col>
                            <Col md="4">
                                <Form.Label>Discount</Form.Label>
                                <Form.Control
                                    disabled
                                    //onChange={(e) => setRemarks(e.target.value)}
                                    // defaultValue={location.state.leadId}
                                    // value={location.state.leadId}
                                    placeholder="Lead Number"
                                />
                            </Col>
                        </Row>
                    </SimpleCard>
                </Col>
            </Row>

            <Div className='mt-2'>
                <Button variant="secondary" onClick={changePage}> Back
                </Button>
                {/* &nbsp;
                <button type="button" className="btn btn-success">
                    Save
                </button> */}
            </Div>


        </Container >
    );
};
const Container = styled('div')(({ theme }) => ({
    margin: '30px',
    [theme.breakpoints.down('sm')]: { margin: '16px' },
    '& .breadcrumb': {
        marginBottom: '30px',
        [theme.breakpoints.down('sm')]: { marginBottom: '16px' },
    },
}));
const Div = styled('div')(({ theme }) => ({
    margin: '0px 0px 0px 441px',
}));
export default ViewRenew;
