import { Box } from '@mui/material';
import Button from '@mui/material/Button';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Stepper from '@mui/material/Stepper';
import Typography from '@mui/material/Typography';
import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
function getSteps() {
  return ['Active Leads', 'Followups', 'Meetings', 'Quotations'];
}

function getStepContent(stepIndex) {
  switch (stepIndex) {
    case 0:
      return (
        <div className="App">
          <Row>
            <Col>
              <label>
                Lead Sr No: <h5> </h5>
              </label>
            </Col>
            <Col>
              <label>
                Lead Name: <h5></h5>
              </label>
            </Col>
            <Col>
              <label>
                Lead Date: <h5> </h5>
              </label>
            </Col>
          </Row>
          <Row>
            <Col>
              <label>Client Name: </label>
            </Col>
            <Col>
              <label>
                Mobile Number: <h5> </h5>
              </label>
            </Col>
            <Col>
              <label>
                Email Id: <h5> </h5>
              </label>
            </Col>
          </Row>
          <Row>
            <Col>
              <label>
                Lead Source: <h5> </h5>
              </label>
            </Col>
            <Col>
              <label>
                Interested In: <h5> </h5>
              </label>
            </Col>
            <Col>
              <label>
                Assign To: <h5> </h5>
              </label>
            </Col>
          </Row>
          <Row>
            <Col>
              <label>
                Address: <h5> </h5>
              </label>
            </Col>
          </Row>
          <Row>
            <Col>
              <label>
                Pin Code: <h5></h5>
              </label>
            </Col>
            <Col>
              <label>
                City: <h5></h5>
              </label>
            </Col>
            <Col>
              <label>
                State: <h5></h5>
              </label>
            </Col>
          </Row>
          <Row>
            <Col>
              <label>
                Country: <h5> </h5>
              </label>
            </Col>
            <Col>
              <label>
                Status: <h5></h5>
              </label>
            </Col>
            <Col>
              <label>
                Label:<h5> </h5>
              </label>
            </Col>
          </Row>
        </div>
      );

    case 1:
      return (
        <div>
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
        </div>
      );

    case 2:
      return (
        <div>
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
            <Col>
              <label>Remarks:</label>
            </Col>
          </Row>
        </div>
      );
    case 3:
      return (
        <div>
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
        </div>
      );
    // default:
    //   return;
  }
}

export default function StepperForm() {
  const location = useLocation();
  // console.log(location.state);
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();

  const handleNext = () => setActiveStep((prevActiveStep) => prevActiveStep + 1);

  const handleBack = () => setActiveStep((prevActiveStep) => prevActiveStep - 1);

  const handleReset = () => setActiveStep(0);

  return (
    <Box>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      <Box mt={4}>
        {activeStep === steps.length ? (
          <Box>
            <Typography>All steps completed ,Go Back</Typography>

            <Button sx={{ mt: 2 }} variant="contained" color="secondary" onClick={handleReset}>
              Start Again
            </Button>
          </Box>
        ) : (
          <Box>
            <Typography>{getStepContent(activeStep)}</Typography>

            <Box pt={2}>
              <Button
                variant="contained"
                color="secondary"
                disabled={activeStep === 0}
                onClick={handleBack}
              >
                Back
              </Button>

              <Button sx={{ ml: 2 }} variant="contained" color="primary" onClick={handleNext}>
                {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
              </Button>
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
}
