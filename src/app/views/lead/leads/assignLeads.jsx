import { styled } from '@mui/system';
import { SimpleCard } from 'app/components';
import { Row, Col, Button } from 'react-bootstrap';
import StepperForm from 'app/views/material-kit/forms/StepperForm';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { useLocation, useNavigate } from 'react-router-dom';

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
const AssignLead = () => {
  const location = useLocation();
  // console.log(location.state);

  const navigate = useNavigate();
  const changePage = () => {
    navigate('/leads/manageLeads');
  };
  return (
    <Container>
      {/* <SimpleCard title="Lead Management">
        <StepperForm />
      </SimpleCard> */}
      <SimpleCard title="Lead Management">
        <Tabs defaultActiveKey="leads" id="uncontrolled-tab-example" className="mb-3" justify>
          <Tab eventKey="leads" title="Active Leads" className="ml-8">
            <Row>
              <Col>
                <label>
                  Lead Sr No: <h5> {location.state.leadId}</h5>
                </label>
              </Col>
              <Col>
                <label>
                  Lead Name: <h5> {location.state.name}</h5>
                </label>
              </Col>
              <Col>
                <label>
                  Lead Date: <h5> {location.state.createdDate}</h5>
                </label>
              </Col>
            </Row>
            <Row>
              <Col>
                <label>Client Name: </label>
              </Col>
              <Col>
                <label>
                  Mobile Number: <h5> {location.state.mobileNo}</h5>
                </label>
              </Col>
              <Col>
                <label>
                  Email Id: <h5> {location.state.emailId}</h5>
                </label>
              </Col>
            </Row>
            <Row>
              <Col>
                <label>
                  Lead Source: <h5> {location.state.remarks}</h5>
                </label>
              </Col>
              <Col>
                <label>
                  Interested In: <h5> {location.state.platformName}</h5>
                </label>
              </Col>
              <Col>
                <label>
                  Assign To: <h5> {location.state.assignedUser}</h5>
                </label>
              </Col>
            </Row>
            <Row>
              <Col>
                <label>
                  Address: <h5> {location.state.stateName}</h5>
                </label>
              </Col>
            </Row>
            <Row>
              <Col>
                <label>
                  Pin Code: <h5> {location.state.zipCode}</h5>
                </label>
              </Col>
              <Col>
                <label>
                  City: <h5> {location.state.cityName}</h5>
                </label>
              </Col>
              <Col>
                <label>
                  State: <h5> {location.state.stateName}</h5>
                </label>
              </Col>
            </Row>
            <Row>
              <Col>
                <label>
                  Country: <h5> {location.state.countryName}</h5>
                </label>
              </Col>
              <Col>
                <label>
                  Status: <h5> {location.state.status}</h5>
                </label>
              </Col>
              <Col>
                <label>
                  Label:<h5> {location.state.labelName}</h5>
                </label>
              </Col>
            </Row>
          </Tab>

          <Tab eventKey="followups" title="Followups">
            <Row>
              <Col>
                <label>Ex Name:</label>
              </Col>
              <Col>
                <label>Followup Date:</label>
              </Col>
              <Col>
                <label>Followup Time:</label>
              </Col>
            </Row>
            <Row>
              <Col>
                <label>Remarks:</label>
              </Col>
              <Col>
                <label>Next Followup Date:</label>
              </Col>
              <Col>
                <label>Next Followup Time:</label>
              </Col>
            </Row>
          </Tab>
          <Tab eventKey="meetings" title="Meetings">
            <Row>
              <Col>
                <label>Ex Name:</label>
              </Col>
              <Col>
                <label>Date:</label>
              </Col>
              <Col>
                <label>From Time:</label>
              </Col>
            </Row>
            <Row>
              <Col>
                <label>To Time:</label>
              </Col>
              <Col></Col>
              <Col>
                <label>Remarks:</label>
              </Col>
            </Row>
          </Tab>
          <Tab eventKey="quotations" title="Quotations">
            <Row>
              <Col>
                <label>Ex Name:</label>
              </Col>
              <Col>
                <label>Date:</label>
              </Col>
            </Row>
            <Row>
              <Col>
                <label>Attachment:</label>
              </Col>
              <Col>
                <label>Amount:</label>
              </Col>
            </Row>
            <Row>
              <Col>
                <label>Remarks:</label>
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

export default AssignLead;
