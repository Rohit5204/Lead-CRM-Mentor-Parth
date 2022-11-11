import React from 'react';
import { Row, Col, Button, InputGroup, Card } from 'react-bootstrap';
import { styled } from '@mui/system';
import { Icon } from '@mui/material';

const Container = styled('div')(({ theme }) => ({
    margin: '30px',
    [theme.breakpoints.down('sm')]: { margin: '16px' },
    '& .breadcrumb': {
        marginBottom: '30px',
        [theme.breakpoints.down('sm')]: { marginBottom: '16px' },
    },
}));


export default function ProfilePage() {
    return (
        <section style={{ backgroundColor: '#eee' }}>
            <Container className="py-5">
                <Row>
                    <Col>
                        {/* <Breadcrumb className="bg-light rounded-3 p-3 mb-4">
                            <BreadcrumbItem>
                                <a href='#'>Home</a>
                            </BreadcrumbItem>
                            <BreadcrumbItem>
                                <a href="#">User</a>
                            </BreadcrumbItem>
                            <BreadcrumbItem active>User Profile</BreadcrumbItem>
                        </Breadcrumb> */}
                    </Col>
                </Row>

                <Row>
                    <Col lg="4">
                        <Card className="mb-4">
                            <Card.Body className="text-center">
                                <img
                                    src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
                                    alt="avatar"
                                    className="rounded-circle"
                                    style={{ width: '150px' }}
                                    fluid />
                                <p className="text-muted mb-1">Full Stack Developer</p>
                                <p className="text-muted mb-4">Bay Area, San Francisco, CA</p>
                                <div className="d-flex justify-content-center mb-2">
                                    <Button>Follow</Button>&nbsp;
                                    <Button outline className="ms-1">Message</Button>
                                </div>
                            </Card.Body>
                        </Card>

                        <Card className="mb-4 mb-lg-0">
                            <Card.Body className="p-0">
                                <InputGroup flush className="rounded-3">
                                    <InputGroup className="d-flex justify-content-between align-items-center p-3">
                                        <Icon>globe</Icon>
                                        <Card.Text>www.boostock.in</Card.Text>
                                    </InputGroup>
                                    <InputGroup className="d-flex justify-content-between align-items-center p-3">
                                        <Icon fab icon="github fa-lg" style={{ color: '#333333' }} />
                                        <Card.Text>mdbootstrap</Card.Text>
                                    </InputGroup>
                                    <InputGroup className="d-flex justify-content-between align-items-center p-3">
                                        <Icon fab icon="twitter fa-lg" style={{ color: '#55acee' }} />
                                        <Card.Text>@mdbootstrap</Card.Text>
                                    </InputGroup>
                                    <InputGroup className="d-flex justify-content-between align-items-center p-3">
                                        <Icon fab icon="instagram fa-lg" style={{ color: '#ac2bac' }} />
                                        <Card.Text>mdbootstrap</Card.Text>
                                    </InputGroup>
                                    <InputGroup className="d-flex justify-content-between align-items-center p-3">
                                        <Icon fab icon="facebook fa-lg" style={{ color: '#3b5998' }} />
                                        <Card.Text>mdbootstrap</Card.Text>
                                    </InputGroup>
                                </InputGroup>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col lg="8">
                        <Card className="mb-4">
                            <Card.Body>
                                <Row>
                                    <Col sm="3">
                                        <Card.Text>Full Name</Card.Text>
                                    </Col>
                                    <Col sm="9">
                                        <Card.Text className="text-muted">Super Admin</Card.Text>
                                    </Col>
                                </Row>
                                <hr />
                                <Row>
                                    <Col sm="3">
                                        <Card.Text>Email</Card.Text>
                                    </Col>
                                    <Col sm="9">
                                        <Card.Text className="text-muted">superAdmin@gmail.com</Card.Text>
                                    </Col>
                                </Row>
                                <hr />
                                <Row>
                                    <Col sm="3">
                                        <Card.Text>Phone</Card.Text>
                                    </Col>
                                    <Col sm="9">
                                        <Card.Text className="text-muted">(097) 234-5678</Card.Text>
                                    </Col>
                                </Row>
                                <hr />
                                <Row>
                                    <Col sm="3">
                                        <Card.Text>Mobile</Card.Text>
                                    </Col>
                                    <Col sm="9">
                                        <Card.Text className="text-muted">(098) 765-4321</Card.Text>
                                    </Col>
                                </Row>
                                <hr />
                                <Row>
                                    <Col sm="3">
                                        <Card.Text>Address</Card.Text>
                                    </Col>
                                    <Col sm="9">
                                        <Card.Text className="text-muted">Vashi, Navi-Mumbai</Card.Text>
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>

                        <Row>
                            <Col md="6">
                                <Card className="mb-4 mb-md-0">
                                    <Card.Body>
                                        <Card.Text className="mb-4"><span className="text-primary font-italic me-1">assigment</span> Project Status</Card.Text>
                                        <Card.Text className="mb-1" style={{ fontSize: '.77rem' }}>Web Design</Card.Text>
                                        {/* <MDBProgress className="rounded">
                                            <MDBProgressBar width={80} valuemin={0} valuemax={100} />
                                        </MDBProgress> */}

                                        <Card.Text className="mt-4 mb-1" style={{ fontSize: '.77rem' }}>Website Markup</Card.Text>
                                        {/* <MDBProgress className="rounded">
                                            <MDBProgressBar width={72} valuemin={0} valuemax={100} />
                                        </MDBProgress> */}

                                        <Card.Text className="mt-4 mb-1" style={{ fontSize: '.77rem' }}>One Page</Card.Text>
                                        {/* <MDBProgress className="rounded">
                                            <MDBProgressBar width={89} valuemin={0} valuemax={100} />
                                        </MDBProgress> */}

                                        <Card.Text className="mt-4 mb-1" style={{ fontSize: '.77rem' }}>Mobile Template</Card.Text>
                                        {/* <MDBProgress className="rounded">
                                            <MDBProgressBar width={55} valuemin={0} valuemax={100} />
                                        </MDBProgress> */}

                                        <Card.Text className="mt-4 mb-1" style={{ fontSize: '.77rem' }}>Backend API</Card.Text>
                                        {/* <MDBProgress className="rounded">
                                            <MDBProgressBar width={66} valuemin={0} valuemax={100} />
                                        </MDBProgress> */}
                                    </Card.Body>
                                </Card>
                            </Col>

                            <Col md="6">
                                <Card className="mb-4 mb-md-0">
                                    <Card.Body>
                                        <Card.Text className="mb-4"><span className="text-primary font-italic me-1">assigment</span> Project Status</Card.Text>
                                        <Card.Text className="mb-1" style={{ fontSize: '.77rem' }}>Web Design</Card.Text>
                                        {/* <MDBProgress className="rounded">
                                            <MDBProgressBar width={80} valuemin={0} valuemax={100} />
                                        </MDBProgress> */}

                                        <Card.Text className="mt-4 mb-1" style={{ fontSize: '.77rem' }}>Website Markup</Card.Text>
                                        {/* <MDBProgress className="rounded">
                                            <MDBProgressBar width={72} valuemin={0} valuemax={100} />
                                        </MDBProgress> */}

                                        <Card.Text className="mt-4 mb-1" style={{ fontSize: '.77rem' }}>One Page</Card.Text>
                                        {/* <MDBProgress className="rounded">
                                            <MDBProgressBar width={89} valuemin={0} valuemax={100} />
                                        </MDBProgress> */}

                                        <Card.Text className="mt-4 mb-1" style={{ fontSize: '.77rem' }}>Mobile Template</Card.Text>
                                        {/* <MDBProgress className="rounded">
                                            <MDBProgressBar width={55} valuemin={0} valuemax={100} />
                                        </MDBProgress> */}

                                        <Card.Text className="mt-4 mb-1" style={{ fontSize: '.77rem' }}>Backend API</Card.Text>
                                        {/* <MDBProgress className="rounded">
                                            <MDBProgressBar width={66} valuemin={0} valuemax={100} />
                                        </MDBProgress> */}
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
        </section>
    );
}