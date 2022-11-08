import { styled } from '@mui/system';
import { SimpleCard } from 'app/components';
import { Row, Col, Button, Form, Tab, Tabs } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';


const ViewLead = () => {
  const location = useLocation();
  console.log(location.state);

  const navigate = useNavigate();
  const changePage = () => {
    navigate('/leads/manageLeads');
  };
  const sendToQuotation = () => {
    navigate('/quotations/addQuotation');
  };
  return (
    <Container>
      <SimpleCard title="Lead Management">
        <Tabs defaultActiveKey="leads" id="uncontrolled-tab-example" className="mb-3" justify>
          <Tab eventKey="leads" title="Active Leads" className="ml-8">
            <Row>
              <Col>
                <Form.Label>Lead Sr No</Form.Label>
                <Form.Control
                  //onChange={(e) => setRemarks(e.target.value)}
                  value={location.state.leadId}
                  placeholder="Lead Number"
                />
              </Col>
              <Col>
                <Form.Label> Lead Name</Form.Label>
                <Form.Control
                  //onChange={(e) => setRemarks(e.target.value)}
                  value={location.state.name}
                  placeholder="Enter Lead Name"
                />
              </Col>
              <Col>
                <Form.Label> Date</Form.Label>
                <Form.Control
                  type="date"
                  //onChange={(e) => setRemarks(e.target.value)}
                  value={location.state.createdDate}
                />
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Label> Client Name</Form.Label>
                <Form.Control
                  placeholder="Enter Customer Name"
                //onChange={(e) => setRemarks(e.target.value)}
                // value={location.state.createdDate}
                />
              </Col>
              <Col>
                <Form.Label>Mobile Number</Form.Label>
                <Form.Control
                  placeholder="Enter Customer Mobile No."
                  //onChange={(e) => setRemarks(e.target.value)}
                  value={location.state.mobileNo}
                />
              </Col>
              <Col>
                <Form.Label>Email Id</Form.Label>
                <Form.Control
                  placeholder="Enter Email Id"
                  //onChange={(e) => setRemarks(e.target.value)}
                  value={location.state.emailId}
                />
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Label>Lead Source</Form.Label>
                <Form.Control
                  placeholder="Enter Lead Source"
                  //onChange={(e) => setRemarks(e.target.value)}
                  value={location.state.platformName}
                />
              </Col>
              <Col>
                <Form.Label>Interested In</Form.Label>
                <Form.Control
                  placeholder="Interested In"
                  //onChange={(e) => setRemarks(e.target.value)}
                  value={location.state.intrestedIn}
                />
              </Col>
              <Col>
                <Form.Label>Assign To</Form.Label>
                <Form.Control
                  placeholder="Assign Employee"
                  //onChange={(e) => setRemarks(e.target.value)}
                  value={location.state.assignedUser}
                />
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Label>Address</Form.Label>
                <Form.Control
                  placeholder="Enter the Address"
                  //onChange={(e) => setRemarks(e.target.value)}
                  value={location.state.streetName}
                />
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Label>Pin Code</Form.Label>
                <Form.Control
                  placeholder="Enter the Pin Code"
                  //onChange={(e) => setRemarks(e.target.value)}
                  value={location.state.zipCode}
                />
              </Col>
              <Col>
                <Form.Label>City</Form.Label>
                <Form.Control
                  placeholder="Enter the City"
                  //onChange={(e) => setRemarks(e.target.value)}
                  value={location.state.cityName}
                />
              </Col>
              <Col>
                <Form.Label>State</Form.Label>
                <Form.Control
                  placeholder="Mention the State"
                  //onChange={(e) => setRemarks(e.target.value)}
                  value={location.state.stateName}
                />
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Label>Country</Form.Label>
                <Form.Control
                  placeholder="Mention the Country"
                  //onChange={(e) => setRemarks(e.target.value)}
                  value={location.state.countryName}
                />
              </Col>
              <Col>
                <Form.Label>Status</Form.Label>
                <Form.Control
                  placeholder="Mention the Status"
                  //onChange={(e) => setRemarks(e.target.value)}
                  value={location.state.statusName}
                />
              </Col>
              <Col>
                <Form.Label>Label</Form.Label>
                <Form.Control
                  placeholder="Mention the Label"
                  //onChange={(e) => setRemarks(e.target.value)}
                  value={location.state.labelName}
                />
              </Col>
            </Row>
          </Tab>

          <Tab eventKey="followups" title="Followups">
            <Row>
              <Col>
                <Form.Label>Ex Name</Form.Label>
                <Form.Control
                  placeholder="Enter the Ex Name"
                //onChange={(e) => setRemarks(e.target.value)}
                // value={location.state.labelName}
                />
              </Col>
              <Col>
                <Form.Label>Followup Date</Form.Label>
                <Form.Control
                  type="date"
                  placeholder="Enter Followup Date"
                //onChange={(e) => setRemarks(e.target.value)}
                // value={location.state.labelName}
                />
              </Col>
              <Col>
                <Form.Label>Followup Time</Form.Label>
                <Form.Control
                  type="time"
                  placeholder="Enter Followup Time"
                //onChange={(e) => setRemarks(e.target.value)}
                // value={location.state.labelName}
                />
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Label>Remarks</Form.Label>
                <Form.Control
                  placeholder="Enter any Remarks"
                //onChange={(e) => setRemarks(e.target.value)}
                // value={location.state.labelName}
                />
              </Col>
              <Col>
                <Form.Label>Next Followup Date</Form.Label>
                <Form.Control
                  type="date"
                  placeholder="Enter Next Followup Date"
                //onChange={(e) => setRemarks(e.target.value)}
                // value={location.state.labelName}
                />
              </Col>
              <Col>
                <Form.Label>Next Followup Time</Form.Label>
                <Form.Control
                  type="time"
                  placeholder="Enter Next Followup Time"
                //onChange={(e) => setRemarks(e.target.value)}
                // value={location.state.labelName}
                />
              </Col>
            </Row>
          </Tab>
          <Tab eventKey="meetings" title="Meetings">
            <Row>
              <Col>
                <Form.Label>Ex Name</Form.Label>
                <Form.Control
                  placeholder="Enter the Ex Name"
                //onChange={(e) => setRemarks(e.target.value)}
                // value={location.state.labelName}
                />
              </Col>
              <Col>
                <Form.Label>Date</Form.Label>
                <Form.Control
                  type="date"
                  placeholder="Enter Followup Date"
                //onChange={(e) => setRemarks(e.target.value)}
                // value={location.state.labelName}
                />
              </Col>
              <Col>
                <Form.Label>From Time</Form.Label>
                <Form.Control
                  type="time"
                  placeholder="Enter Followup Time"
                //onChange={(e) => setRemarks(e.target.value)}
                // value={location.state.labelName}
                />
              </Col>
            </Row>
            <Row>
              <Col md="4">
                <Form.Label>To Time</Form.Label>
                <Form.Control
                  type="time"
                  placeholder="Enter Followup Time"
                //onChange={(e) => setRemarks(e.target.value)}
                // value={location.state.labelName}
                />
              </Col>

              <Col>
                <Form.Label>Remarks</Form.Label>
                <Form.Control
                  placeholder="Enter any Remarks"
                //onChange={(e) => setRemarks(e.target.value)}
                // value={location.state.labelName}
                />
              </Col>
            </Row>
          </Tab>
          <Tab eventKey="quotations" title="Quotations">
            <Row>
              <Col>
                <button type="button" className="btn btn-success" onClick={sendToQuotation}>
                  Quotation for Lead
                </button>
              </Col>
            </Row>
          </Tab>
        </Tabs>
      </SimpleCard>
      <Div className="mt-2">
        <Row>
          <Col>
            <Button variant="primary" onClick={changePage}>
              Back
            </Button>
          </Col>
        </Row>
      </Div>
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
export default ViewLead;
