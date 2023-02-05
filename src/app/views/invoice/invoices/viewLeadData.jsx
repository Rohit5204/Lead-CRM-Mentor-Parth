import { styled } from '@mui/system';
import { SimpleCard } from 'app/components';
import { Row, Col, Button, Form } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const ViewLeadInvoice = () => {
    const location = useLocation();
    // console.log(location.state);

    const navigate = useNavigate();
    const changePage = () => {
        navigate('/invoices/ManageInvoiceList');
    };
    return (
        <Container>
            <SimpleCard title="Lead Management">
                <Row>
                    <Col>
                        <Form.Label>Lead Sr No</Form.Label>
                        <Form.Control
                            disabled
                            //onChange={(e) => setRemarks(e.target.value)}
                            defaultValue={location.state.leadId}
                            // value={location.state.leadId}
                            placeholder="Lead Number"
                        />
                    </Col>
                    <Col>
                        <Form.Label> Lead Name</Form.Label>
                        <Form.Control
                            disabled
                            //onChange={(e) => setRemarks(e.target.value)}
                            defaultValue={location.state.name}
                            placeholder="Enter Lead Name"
                        />
                    </Col>
                    <Col>
                        <Form.Label> Expected Amount</Form.Label>
                        <Form.Control
                            disabled
                            //onChange={(e) => setRemarks(e.target.value)}
                            defaultValue={location.state.expectedAmount}
                        />
                    </Col>

                </Row>
                <Row>
                    <Col>
                        <Form.Label> Client Name</Form.Label>
                        <Form.Control
                            placeholder="Enter Customer Name"
                            disabled
                            value={location.state.clientName}
                        />
                    </Col>
                    <Col>
                        <Form.Label>Mobile Number</Form.Label>
                        <Form.Control
                            disabled
                            placeholder="Enter Customer Mobile No."
                            //onChange={(e) => setRemarks(e.target.value)}
                            defaultValue={location.state.mobileNo}
                        />
                    </Col>
                    <Col>
                        <Form.Label>Email Id</Form.Label>
                        <Form.Control
                            disabled
                            placeholder="Enter Email Id"
                            //onChange={(e) => setRemarks(e.target.value)}
                            defaultValue={location.state.emailId}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Label>Lead Source</Form.Label>
                        <Form.Control
                            disabled
                            placeholder="Enter Lead Source"
                            //onChange={(e) => setRemarks(e.target.value)}
                            defaultValue={location.state.platformName}
                        />
                    </Col>
                    <Col>
                        <Form.Label>Interested In</Form.Label>
                        <Form.Control
                            disabled
                            placeholder="Interested In"
                            //onChange={(e) => setRemarks(e.target.value)}
                            defaultValue={location.state.intrestedIn}
                        />
                    </Col>
                    <Col>
                        <Form.Label>Assign To</Form.Label>
                        <Form.Control
                            disabled
                            placeholder="Assign Employee"
                            //onChange={(e) => setRemarks(e.target.value)}
                            defaultValue={location.state.assignedUser}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Label>Address</Form.Label>
                        <Form.Control
                            disabled
                            placeholder="Enter the Address"
                            //onChange={(e) => setRemarks(e.target.value)}
                            defaultValue={location.state.streetName}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Label>Pin Code</Form.Label>
                        <Form.Control
                            disabled
                            placeholder="Enter the Pin Code"
                            //onChange={(e) => setRemarks(e.target.value)}
                            defaultValue={location.state.zipCode}
                        />
                    </Col>
                    <Col>
                        <Form.Label>City</Form.Label>
                        <Form.Control
                            disabled
                            placeholder="Enter the City"
                            //onChange={(e) => setRemarks(e.target.value)}
                            defaultValue={location.state.cityName}
                        />
                    </Col>
                    <Col>
                        <Form.Label>State</Form.Label>
                        <Form.Control
                            disabled
                            placeholder="Mention the State"
                            //onChange={(e) => setRemarks(e.target.value)}
                            defaultValue={location.state.stateName}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Label>Country</Form.Label>
                        <Form.Control
                            disabled
                            placeholder="Mention the Country"
                            //onChange={(e) => setRemarks(e.target.value)}
                            defaultValue={location.state.countryName}
                        />
                    </Col>
                    <Col>
                        <Form.Label>Status</Form.Label>
                        <Form.Control
                            disabled
                            placeholder="Mention the Status"
                            //onChange={(e) => setRemarks(e.target.value)}
                            defaultValue={location.state.statusName}
                        />
                    </Col>
                    <Col>
                        <Form.Label>Label</Form.Label>
                        <Form.Control
                            disabled
                            placeholder="Mention the Label"
                            //onChange={(e) => setRemarks(e.target.value)}
                            defaultValue={location.state.labelName}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col md="4">
                        <Form.Label>Created Date</Form.Label>
                        <Form.Control
                            disabled
                            //onChange={(e) => setRemarks(e.target.value)}
                            defaultValue={new Date(location.state.createdDate).toLocaleDateString('en-GB')}
                        />
                    </Col>

                </Row>
                <Div className="mt-2">
                    <Row>
                        <Col>
                            <Button variant="secondary" onClick={changePage}>
                                Back
                            </Button>&nbsp;
                        </Col>
                    </Row>
                </Div>

            </SimpleCard>
        </Container>
    );
};
// Custom Style Section
const Container = styled('div')(({ theme }) => ({
    margin: '2.9px',
    [theme.breakpoints.down('sm')]: { margin: '16px' },
    '& .breadcrumb': {
        marginBottom: '3px',
        [theme.breakpoints.down('sm')]: { marginBottom: '1px' },
    },
}));
const Div = styled('div')(({ theme }) => ({
    margin: '0px 0px 0px 441px',
}));
export default ViewLeadInvoice;
