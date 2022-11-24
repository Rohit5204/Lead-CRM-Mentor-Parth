import React from 'react';
import { Row, Col, Form, InputGroup, Card, Table } from 'react-bootstrap';
import { styled } from '@mui/system';
import { SimpleCard } from 'app/components';
import SampleLine from './shared/MixedGraph';
import { Icon, Tooltip, Box, IconButton, Fab, Grid, lighten, useTheme } from '@mui/material';
import InstagramIcon from '@mui/icons-material/Instagram';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
// import { faCheckSquare, faCoffee } from '@fortawesome/fontawesome-free-solid'

const Container = styled('div')(({ theme }) => ({
  margin: '10px',
  [theme.breakpoints.down('sm')]: { margin: '16px' },
  '& .breadcrumb': {
    marginBottom: '10px',
    [theme.breakpoints.down('sm')]: { marginBottom: '16px' },
  },
}));
const StyledCard = styled(Card)(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '24px !important',
  // background: '#19CABA',
  [theme.breakpoints.down('sm')]: { padding: '16px !important' },
}));

const Heading = styled('h6')(({ theme }) => ({
  margin: 0,
  marginTop: '4px',
  fontSize: '18px',
  color: '#FFFFFF',
  fontWeight: '500',
  color: theme.palette.primary.main,
}));
const ContentBox = styled('div')(() => ({
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'left',
}));

const FabIcon = styled(Fab)(() => ({
  width: '44px !important',
  height: '44px !important',
  boxShadow: 'none !important',
}));

const H3 = styled('h3')(({ textcolor }) => ({
  margin: 0,
  color: textcolor,
  fontWeight: '500',
  marginLeft: '0px',
}));

const H1 = styled('h5')(({ textcolor }) => ({
  margin: 0,
  // flexGrow: 1,
  color: textcolor,
}));

const Span = styled('span')(({ textcolor }) => ({
  fontSize: '13px',
  color: textcolor,
  marginLeft: '4px',
}));

const IconBox = styled('div')(() => ({
  width: 16,
  height: 16,
  color: '#1e55c7',
  display: 'flex',
  overflow: 'hidden',
  borderRadius: '300px ',
  justifyContent: 'center',
  '& .icon': { fontSize: '14px' },
}));


export default function EmployeeDashboard(props) {
  const { palette } = useTheme();
  const textError = palette.error.main;
  const bgError = lighten(palette.error.main, 0.85);

  return (

    <Container className="py-2">
      <h5 className='ml-2'>Dashboard</h5>
      <SimpleCard>
        <Row>
          <Col>
            <Form.Label htmlFor="basic-url">Apply Filter Search</Form.Label>
            <br></br>
            <button type="button" className="btn btn-outline-primary"
            >Last Day
            </button>
            &nbsp;
            <button type="button" className="btn btn-outline-primary"
            > Last Week
            </button>
            &nbsp;
            <button type="button" className="btn btn-outline-primary"
            >Last Month
            </button>
            &nbsp;
          </Col>
          <Col>
            <Form.Label htmlFor="basic-url">{''}</Form.Label>
            <InputGroup className="mb-3">
              <InputGroup.Text id="basic-addon3">
                Date Range
              </InputGroup.Text>
              <Form.Control
                type="date" />
              <Form.Control
                type="date" />
            </InputGroup>
          </Col>
        </Row>
      </SimpleCard>
      <Row className='mt-4'>
        <Col lg="4">
          <Card style={{ borderRadius: '29px', height: '700px', background: 'linear-gradient(0deg, rgba(34,193,195,1) 0%, rgba(253,163,45,1) 100%)' }} >
            <Card.Body className="text-center">
              <div className="mt-3 mb-4">
                <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava2-bg.webp"
                  className="rounded-circle" fluid style={{ width: '100px' }} />
              </div>
              <h5 tag="h4">Julie L. Arsenault</h5>
              <Card.Text className="text-muted mb-4">
                @Programmer <span className="mx-2">|</span> <a href="#!">mdbootstrap.com</a>
              </Card.Text>
              <hr />
              <div className="mb-4 pb-2">

                <h6>Communication ----------------------</h6>
                <Row>
                  <Col md="2">
                    <Icon color='primary' >phone</Icon>
                  </Col>
                  <Col md="8">
                    +91-7896541230
                  </Col>
                </Row>
                <Row>
                  <Col md="2">
                    <Icon color='primary' >mail</Icon>
                  </Col>
                  <Col md="10">
                    superAdmin@gmail.com
                  </Col>

                </Row>
                <Row>
                  <Col md="2">
                    <Icon color='primary' >map</Icon>
                  </Col>
                  <Col md="9">
                    Thane West,Mumbai
                  </Col>
                </Row>
                <br />
                <h6>Biography -----------------------------</h6>
                <Row>
                  <Col md="12">
                    <span style={{ textAlignLeft: '2px' }}>
                      It has survived not only five centuries, but also the leap into electronic typesetting,
                      remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets
                    </span>
                  </Col>
                </Row>
                <br />
                <h6>Elsewhere -----------------------------</h6>

                <Row className='mt-3'>
                  <Col md="12">
                    <Tooltip title="Facebook" placement="top">
                      <IconButton type="button" className="btn btn-primary">
                        <Icon>facebook</Icon>
                      </IconButton>
                    </Tooltip>&nbsp;
                    <Tooltip title="Instagram" placement="top">
                      <IconButton type="button" className="btn btn-danger">
                        <InstagramIcon />
                      </IconButton>
                    </Tooltip>&nbsp;
                    <Tooltip title="Whatsapp" placement="top">
                      <IconButton type="button" className="btn btn-success">
                        <WhatsAppIcon />
                      </IconButton>
                    </Tooltip>
                  </Col>
                </Row>
              </div>


            </Card.Body>
          </Card>
        </Col>
        <Col lg="8">
          <Row >
            <Col>
              <Grid container spacing={4} sx={{ mb: '24px' }}>
                <Grid item xs={12} md={4}>
                  <StyledCard elevation={1} style={{ background: '#EB9694' }}>
                    <ContentBox>
                      <Row>
                        <Col md="8" >
                          <h6>Total Leads</h6>
                        </Col>
                        <Col md="2" >
                          <Tooltip title="View Details" placement="top">
                            <IconButton>
                              <Icon>list</Icon>
                            </IconButton>
                          </Tooltip>
                        </Col>
                      </Row>
                      <H1 >250 </H1>
                    </ContentBox>
                  </StyledCard>
                </Grid>
                <Grid item xs={12} md={4}>
                  <StyledCard elevation={1} style={{ background: '#F4BE65' }}>
                    <ContentBox>
                      <Row>
                        <Col md="8" >
                          <h6>Pending Leads</h6>
                        </Col>
                        <Col md="2" >
                          <Tooltip title="View Details" placement="top">
                            <IconButton>
                              <Icon>list</Icon>
                            </IconButton>
                          </Tooltip>
                        </Col>
                      </Row>
                      <H1 >36 </H1>
                    </ContentBox>
                  </StyledCard>
                </Grid>
                <Grid item xs={12} md={4}>
                  <StyledCard elevation={1} style={{ background: '#19CABA' }}>
                    <ContentBox>
                      <Row>
                        <Col md="8" >
                          <h6>Active Leads</h6>
                        </Col>
                        <Col md="2" >
                          <Tooltip title="View Details" placement="top">
                            <IconButton>
                              <Icon>list</Icon>
                            </IconButton>
                          </Tooltip>
                        </Col>
                      </Row>
                      <H1 >140 </H1>
                    </ContentBox>
                  </StyledCard>
                </Grid>
              </Grid>
            </Col>
          </Row>
          <Row>
            <Col>
              <Grid container spacing={0}>
                <Grid item lg={12} md={8} sm={12} xs={12}>
                  <SimpleCard title="Lead Wise Chart">
                    <SampleLine></SampleLine></SimpleCard>

                </Grid>
              </Grid>
            </Col>
          </Row>
          <br />
          <Row >
            <Col>
              <Grid container spacing={4} sx={{ mb: '24px' }}>
                <Grid item xs={12} md={4}>
                  <StyledCard elevation={1} style={{ background: '#EB9694' }}>
                    <ContentBox>
                      <Row>
                        <Col md="8" >
                          <h6>Today Followups</h6>
                        </Col>
                        <Col md="2" >
                          <Tooltip title="View Details" placement="top">
                            <IconButton>
                              <Icon>list</Icon>
                            </IconButton>
                          </Tooltip>
                        </Col>
                      </Row>
                      <H1 >250 </H1>
                    </ContentBox>
                  </StyledCard>
                </Grid>
                <Grid item xs={12} md={4}>
                  <StyledCard elevation={1} style={{ background: '#F4BE65' }}>
                    <ContentBox>
                      <Row>
                        <Col md="8" >
                          <h6>Today Metting</h6>
                        </Col>
                        <Col md="2" >
                          <Tooltip title="View Details" placement="top">
                            <IconButton>
                              <Icon>list</Icon>
                            </IconButton>
                          </Tooltip>
                        </Col>
                      </Row>
                      <H1 >36 </H1>
                    </ContentBox>
                  </StyledCard>
                </Grid>
                <Grid item xs={12} md={4}>
                  <StyledCard elevation={1} style={{ background: '#19CABA' }}>
                    <ContentBox>
                      <Row>
                        <Col md="8" >
                          <h6>Performance</h6>
                        </Col>
                        <Col md="2" >
                          <Tooltip title="View Details" placement="top">
                            <IconButton>
                              <Icon>list</Icon>
                            </IconButton>
                          </Tooltip>
                        </Col>
                      </Row>
                      <H1 >86%</H1>
                    </ContentBox>
                  </StyledCard>
                </Grid>
              </Grid>
            </Col>
          </Row>
        </Col>
      </Row>
      <br />
      <Row>
        <Col md="12">
          <Card className="mb-4 mb-md-0" style={{ borderRadius: '10px' }}>
            <Card.Body>
              <h5>Customer Lists</h5>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>No</th>
                    <th>Name</th>
                    <th>Mobile No</th>
                    <th>Lead Name</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1</td>
                    <td>Sunil Bengade</td>
                    <td>7895412360</td>
                    <td>EQUITY</td>
                  </tr>
                  <tr>
                    <td>2</td>
                    <td>Vishal Anekar</td>
                    <td>8574213690</td>
                    <td>Index</td>
                  </tr>
                  <tr>
                    <td>3</td>
                    <td>Vikram Jadhav</td>
                    <td>OPTIONS</td>
                  </tr>
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>


      </Row>
    </Container>

  );
}