import React from "react";

// react-bootstrap components
import {
    Badge,
    Button,
    Card,
    Form,
    Navbar,
    Nav,
    Container,
    Row,
    Col
} from "react-bootstrap";

function ManageProfile() {
    return (
        <>
            <Container fluid className="mt-4">
                <Row>
                    <Col md="8">
                        <Card>
                            <Card.Header>
                                <Card.Title as="h4">Company Profile</Card.Title>
                            </Card.Header>
                            <Card.Body>
                                <Form>
                                    <Row>
                                        <Col className="pr-1">
                                            <Form.Group>
                                                <label>Company Name</label>
                                                <Form.Control
                                                    defaultValue="Boostock The Finance Advisory"
                                                    placeholder="Company"
                                                    type="text"
                                                ></Form.Control>
                                            </Form.Group>
                                        </Col>
                                        {/* <Col className="px-1" md="6">
                                            <Form.Group>
                                                <label>Username</label>
                                                <Form.Control
                                                    defaultValue="michael23"
                                                    placeholder="Username"
                                                    type="text"
                                                ></Form.Control>
                                            </Form.Group>
                                        </Col> */}
                                        {/* <Col className="pl-1" md="4">
                                            <Form.Group>
                                                <label htmlFor="exampleInputEmail1">
                                                    Email address
                                                </label>
                                                <Form.Control
                                                    placeholder="Email"
                                                    type="email"
                                                ></Form.Control>
                                            </Form.Group>
                                        </Col> */}
                                    </Row>
                                    <Row>
                                        <Col className="pr-1" md="6">
                                            <Form.Group>
                                                <label>Email</label>
                                                <Form.Control
                                                    defaultValue="Mike"
                                                    placeholder="Company Registered Email"
                                                    type="text"
                                                ></Form.Control>
                                            </Form.Group>
                                        </Col>
                                        <Col className="pl-1" md="6">
                                            <Form.Group>
                                                <label>Contact No</label>
                                                <Form.Control
                                                    defaultValue="Andrew"
                                                    placeholder="Company Contact Number"
                                                    type="text"
                                                ></Form.Control>
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md="12">
                                            <Form.Group>
                                                <label>Address</label>
                                                <Form.Control
                                                    defaultValue="Bld Mihail Kogalniceanu, nr. 8 Bl 1, Sc 1, Ap 09"
                                                    placeholder="Home Address"
                                                    type="text"
                                                ></Form.Control>
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col className="pr-1" md="4">
                                            <Form.Group>
                                                <label>City</label>
                                                <Form.Control
                                                    defaultValue="Mike"
                                                    placeholder="City"
                                                    type="text"
                                                ></Form.Control>
                                            </Form.Group>
                                        </Col>
                                        <Col className="px-1" md="4">
                                            <Form.Group>
                                                <label>Country</label>
                                                <Form.Control
                                                    defaultValue="India"
                                                    placeholder="Country"
                                                    type="text"
                                                ></Form.Control>
                                            </Form.Group>
                                        </Col>
                                        <Col className="pl-1" md="4">
                                            <Form.Group>
                                                <label>Postal Code</label>
                                                <Form.Control
                                                    placeholder="ZIP Code"
                                                    type="number"
                                                ></Form.Control>
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col className="pr-1" md="6">
                                            <Form.Group>
                                                <label>GST No</label>
                                                <Form.Control
                                                    defaultValue="Andrew"
                                                    placeholder="Country"
                                                    type="text"
                                                ></Form.Control>
                                            </Form.Group>
                                        </Col>
                                        <Col className="px-1" md="6">
                                            <Form.Group>
                                                <label>GST No</label>
                                                <Form.Control
                                                    defaultValue="Andrew"
                                                    placeholder="Country"
                                                    type="text"
                                                ></Form.Control>
                                            </Form.Group>
                                        </Col>
                                    </Row>

                                    <br />
                                    <Button
                                        className="btn-fill pull-right"
                                        type="submit"
                                        variant="info"
                                    >
                                        Update Profile
                                    </Button>
                                    <div className="clearfix"></div>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md="4">
                        <Card className="card-user">
                            <div className="card-image">
                                <img
                                    alt="..."
                                    width="220px"
                                    height="220px"
                                    sizes="12px"
                                    src="/assets/images/payment-card/boostock-logo.jpg"
                                ></img>
                            </div>
                            <Card.Body>
                                <div className="author">
                                    <a href="#pablo"
                                    //onClick={(e) => e.preventDefault()}
                                    >
                                        {/* <img
                                            alt="..."
                                            className="avatar border-gray"
                                        //src={require("assets/img/faces/face-3.jpg")}
                                        ></img> */}
                                        <h5 className="title">Mike Andrew</h5>
                                    </a>
                                    <p className="description">michael24</p>
                                </div>
                                <p className="description text-center">
                                    "Lamborghini Mercy <br></br>
                                    Your chick she so thirsty <br></br>
                                    I'm in that two seat Lambo"
                                </p>
                            </Card.Body>
                            <hr></hr>
                            <div className="button-container mr-auto ml-auto">
                                <Button
                                    className="btn-simple btn-icon"
                                    href="#pablo"
                                    //onClick={(e) => e.preventDefault()}
                                    variant="link"
                                >
                                    <i className="fab fa-facebook-square"></i>
                                </Button>
                                <Button
                                    className="btn-simple btn-icon"
                                    href="#pablo"
                                    //onClick={(e) => e.preventDefault()}
                                    variant="link"
                                >
                                    <i className="fab fa-twitter"></i>
                                </Button>
                                <Button
                                    className="btn-simple btn-icon"
                                    href="#pablo"
                                    //onClick={(e) => e.preventDefault()}
                                    variant="link"
                                >
                                    <i className="fab fa-google-plus-square"></i>
                                </Button>
                            </div>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default ManageProfile;