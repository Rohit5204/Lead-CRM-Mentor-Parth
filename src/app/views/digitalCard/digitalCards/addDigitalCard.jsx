import { Breadcrumb, SimpleCard } from 'app/components';
import { Row, Col, Button, InputGroup, Form, Card } from 'react-bootstrap';
import { styled } from '@mui/system';
import { Icon, Box } from '@mui/material';
import React, { useState } from 'react';
import SubtitlesIcon from '@mui/icons-material/Subtitles';

const Container = styled('div')(({ theme }) => ({
    margin: '30px',
    [theme.breakpoints.down('sm')]: { margin: '16px' },
    '& .breadcrumb': {
        marginBottom: '30px',
        [theme.breakpoints.down('sm')]: { marginBottom: '16px' },
    },
}));


const AddFormCard = () => {

    const [name, setName] = useState('Rohit Jaiswal');
    const [profileName, setProfileName] = useState('Full Stack Developer');
    const [mobileNo1, setMobileNo1] = useState('8989898989');
    const [mobileNo2, setMobileNo2] = useState('5874745215');
    const [address, setAddress] = useState('Nashik Road ,Nashik');
    const [email, setEmail] = useState('rohit@gmail.com');
    const [dob, setDob] = useState('');

    const user = {
        _id: 0,
        name: name,
        profileRole: profileName,
        mobileNo1: mobileNo1,
        mobileNo2: mobileNo2,
        email: email,
        address: address,
        status: 1,
        lastActive: null,
        createdBy: 1,
        updatedBy: 1
    }

    return (
        <Container>
            <Box className="breadcrumb">
                <Breadcrumb
                    routeSegments={[
                        { name: 'Digital Card', path: '/digitalCards/managedigitalCard' },
                        { name: 'Add Digital Card' },
                    ]}
                />
            </Box>
            <Row>
                <Col>
                    <SimpleCard title="Fill Employee Detail's">
                        <Row>
                            <Col>
                                <Form.Label>Full Name</Form.Label>
                                <InputGroup>
                                    <InputGroup.Text id="basic-addon1">
                                        <Icon>person</Icon>
                                    </InputGroup.Text>
                                    <Form.Control
                                        onChange={(e) => setName(e.target.value)}
                                        value={name}
                                        required
                                        placeholder="Enter the Full Name"
                                    /></InputGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Form.Label>Profile</Form.Label>
                                <InputGroup>
                                    <InputGroup.Text id="basic-addon1">
                                        <SubtitlesIcon />
                                    </InputGroup.Text>
                                    <Form.Control
                                        required
                                        onChange={(e) => setProfileName(e.target.value)}
                                        value={profileName}
                                        placeholder="Enter the Profile Name"
                                    /></InputGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Form.Label>Personal Mobile</Form.Label>
                                <InputGroup>
                                    <InputGroup.Text id="basic-addon1">
                                        <Icon>phone</Icon>
                                    </InputGroup.Text>
                                    <Form.Control
                                        required
                                        onChange={(e) => setMobileNo1(e.target.value)}
                                        value={mobileNo1}
                                        placeholder="Enter the Personal Mobile"
                                    /></InputGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Form.Label>Alternate Mobile</Form.Label>
                                <InputGroup>
                                    <InputGroup.Text id="basic-addon1">
                                        <Icon>phone</Icon>
                                    </InputGroup.Text>
                                    <Form.Control
                                        required
                                        onChange={(e) => setMobileNo2(e.target.value)}
                                        value={mobileNo2}
                                        placeholder="Enter the Alternate Mobile"
                                    /></InputGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Form.Label>Email</Form.Label>
                                <InputGroup>
                                    <InputGroup.Text id="basic-addon1">
                                        <Icon>mail</Icon>
                                    </InputGroup.Text>
                                    <Form.Control
                                        required
                                        onChange={(e) => setEmail(e.target.value)}
                                        value={email}
                                        placeholder="Enter the Email Id"
                                    /></InputGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Form.Label>Address</Form.Label>
                                <InputGroup>
                                    <InputGroup.Text id="basic-addon1">
                                        <Icon>home</Icon>
                                    </InputGroup.Text>
                                    <Form.Control
                                        required
                                        onChange={(e) => setAddress(e.target.value)}
                                        value={address}
                                        placeholder="Enter your Address"
                                    /></InputGroup>
                            </Col>
                        </Row>
                    </SimpleCard>
                </Col>
                <Col>
                    <SimpleCard title="Preview Card">
                        {/* #2c5674 */}
                        {/* <Card>
                            <img src="data:image/jpeg;base64,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" alt="" />
                        </Card> */}
                        <Card style={{
                            borderRadius: '29px', height: "250px",
                            background: "url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEvu0b5x7D77Bm4BLMoPkKaE5x-K3gkezUwg&usqp=CAU)"
                        }}>
                            {/* <Card.Img variant="top" src="" /> */}
                            <Card.Body className="text-center">
                                <Row>
                                    <Col md="5">
                                        <h5>
                                            Boostock
                                        </h5>

                                        The Finance Advisory

                                        {/* <img width="180px"
                                            height="180px"
                                            sizes="12px"
                                            src="/assets/images/payment-card/boostock-logo.jpg" /> */}
                                    </Col>
                                    <Col>
                                        <h5>{user.name}</h5>
                                        <Row>
                                            <Col className='ml-3'>
                                                <Card.Text className="text-muted mb-4">
                                                    <h6 className="mx-2">{user.profile}</h6>
                                                </Card.Text>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col >
                                                <br />
                                                <span>{user.mobileNo1}/
                                                    {user.mobileNo2}
                                                </span>
                                                <Icon color='primary' >phone</Icon>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col>
                                                <span>{user.email}</span>
                                                <Icon color='primary' >mail</Icon>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col>
                                                <span>{user.address}</span>
                                                <Icon color='primary' >home</Icon>
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>
                        <br />
                        <Card style={{ borderRadius: '29px', height: "250px", background: "url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQE7HQGs1EsdF09LJmurIO0N-OrtZLXkW5UyQ&usqp=CAU)" }}>
                            {/* <Card.Img variant="top" src="" /> */}
                            <Card.Body className="text-center">
                                <Row>
                                    <Col md="4">
                                        {/* <img width="180px"
                                            height="180px"
                                            sizes="12px"
                                            src="/assets/images/payment-card/boostock-logo.jpg" /> */}
                                    </Col>
                                    <Col>
                                        <h5 color='rgb(255 255 255)'>{user.name}</h5>
                                        <Row>
                                            <Col className='ml-3'>
                                                <Card.Text className="text-muted mb-4">
                                                    <h6 className="mx-2" color='white'>{user.profile}</h6>
                                                </Card.Text>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col >
                                                <br />
                                                <span>{user.mobileNo2}/
                                                    {user.mobileNo2}
                                                </span>
                                                <Icon color='primary' >phone</Icon>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col>
                                                <span>{user.email}</span>
                                                <Icon color='primary' >mail</Icon>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col>
                                                <span>{user.address}</span>
                                                <Icon color='primary' >home</Icon>
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>
                    </SimpleCard>
                </Col>
            </Row>
            <Div className="mt-2">
                <Row>
                    <Col>
                        <Button variant="secondary" >
                            Cancel
                        </Button>
                        &nbsp;
                        <button type="button" className="btn btn-success" >
                            Save
                        </button>
                    </Col>
                </Row>
            </Div>
        </Container >
    );
}
const Div = styled('div')(() => ({
    margin: '0px 0px 0px 441px',
}));
export default AddFormCard