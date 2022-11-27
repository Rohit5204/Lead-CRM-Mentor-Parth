import { Breadcrumb, SimpleCard } from 'app/components';
import { Row, Col, Button, InputGroup, Form, Card } from 'react-bootstrap';
import { styled } from '@mui/system';
import { Icon, Box } from '@mui/material';
import React, { useState } from 'react';
import SubtitlesIcon from '@mui/icons-material/Subtitles';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

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

    const navigate = useNavigate();
    const changePage = () => {
        navigate('/digitalCards');
    };
    const userCard = {
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
    const postData = () => {
        const items = localStorage.getItem('accessToken');
        console.log(userCard);
        axios.post('http://213.136.72.177/cms/api/digitalCardUpsert', userCard,
            { headers: { "x-access-token": items } }
        );
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        //postData();
        changePage();
    };

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
                            background: "url(data:image/jpeg;base64,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) center/cover no-repeat"
                        }}>
                            {/* <Card.Img variant="top" src="" /> */}
                            <Card.Body className="text-center">
                                <Row>
                                    <Col>
                                        <h5>
                                            Boostock
                                        </h5>
                                        <h6> The Finance Advisory
                                        </h6>

                                        {/* <img width="180px"
                                            height="180px"
                                            sizes="12px"
                                            src="/assets/images/payment-card/boostock-logo.jpg" /> */}
                                    </Col>
                                    <Col>
                                        <h5 style={{
                                            position: "relative",
                                            // marginTop: "-40px",
                                            // top: "7px",
                                            left: "35px"
                                        }}>{userCard.name}</h5>
                                        <Row>
                                            <Col className='ml-3'>
                                                <Card.Text className="text-muted mb-4">
                                                    <h6 style={{
                                                        position: "relative",
                                                        // marginTop: "-40px",
                                                        // top: "7px",
                                                        left: "25px"
                                                    }} className="mx-2">{userCard.profileRole}</h6>
                                                </Card.Text>
                                            </Col>
                                        </Row>
                                        <Row className="mt-4">
                                            <Col>
                                                <br />
                                                <span>{userCard.mobileNo1}/
                                                </span>
                                                <Icon
                                                    style={{
                                                        position: "relative",
                                                        marginTop: "-40px",
                                                        top: "7px",
                                                        left: "45px"
                                                    }} color='primary' >phone
                                                </Icon>
                                            </Col>

                                        </Row>
                                        <Row>
                                            <Col>
                                                <span>{userCard.email}</span>
                                                <Icon
                                                    style={{
                                                        position: "relative",
                                                        marginTop: "-40px",
                                                        top: "7px",
                                                        left: "30px"
                                                    }}
                                                    color='primary'>mail</Icon>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col>
                                                <span>{userCard.address}</span>
                                                <Icon
                                                    style={{
                                                        position: "relative",
                                                        marginTop: "-40px",
                                                        top: "7px",
                                                        left: "20px"
                                                    }}
                                                    color='primary'>home</Icon>
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>
                        <br />
                        <Card style={{ borderRadius: '29px', height: "250px", background: "url(data:image/jpeg;base64,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) center/cover no-repeat" }}>
                            {/* <Card.Img variant="top" src="" /> */}
                            <Card.Body className="text-center">
                                <Row>
                                    <Col style={{
                                        position: "relative",
                                        // marginTop: "-40px",
                                        top: "20px",
                                        left: "35px"
                                    }}>
                                        {/* <img width="180px"
                                            height="180px"
                                            sizes="12px"
                                            src="/assets/images/payment-card/boostock-logo.jpg" /> */}
                                    </Col>
                                    <Col>
                                        <h5 color='rgb(255 255 255)'>{userCard.name}</h5>
                                        <Row>
                                            <Col className='ml-3'>
                                                <Card.Text className="text-muted mb-4">
                                                    <h6 className="mx-2" color='white'>{userCard.profile}</h6>
                                                </Card.Text>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col >
                                                <br />
                                                <span>{userCard.mobileNo2}/
                                                    {userCard.mobileNo2}
                                                </span>
                                                <Icon color='primary' >phone</Icon>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col>
                                                <span>{userCard.email}</span>
                                                <Icon color='primary' >mail</Icon>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col>
                                                <span>{userCard.address}</span>
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
                        <Button variant="secondary" onClick={changePage}>
                            Cancel
                        </Button>
                        &nbsp;
                        <button type="button" className="btn btn-success" onClick={handleSubmit}>
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