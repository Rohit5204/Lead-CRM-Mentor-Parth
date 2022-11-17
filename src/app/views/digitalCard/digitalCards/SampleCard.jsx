import React from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import { styled } from '@mui/system';
import { SimpleCard } from 'app/components';
import "./sample.css";
import { Icon, Tooltip, IconButton } from '@mui/material';
import InstagramIcon from '@mui/icons-material/Instagram';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import { green, pink } from '@mui/material/colors';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import EmailIcon from '@mui/icons-material/Email';
import YouTubeIcon from '@mui/icons-material/YouTube';
import FacebookIcon from '@mui/icons-material/Facebook';
import PhoneIcon from '@mui/icons-material/Phone';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import TwitterIcon from '@mui/icons-material/Twitter';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';

const Container = styled('div')(({ theme }) => ({
    margin: '10px',
    [theme.breakpoints.down('sm')]: { margin: '16px' },
    '& .breadcrumb': {
        marginBottom: '10px',
        [theme.breakpoints.down('sm')]: { marginBottom: '16px' },
    },
}));
const SampleDigitalCardPreview = () => {

    return (
        <Container>
            <SimpleCard>
                <Row>
                    <Col md="4" className="mb-5 mb-md-0">
                        <Card className="testimonial-card" style={{ borderRadius: '29px' }}>
                            <div
                                className="card-up"
                                style={{ backgroundColor: "#9d789b" }}
                            ></div>
                            <div className="avatar mx-auto bg-white">
                                <img
                                    src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(1).webp"
                                    className="rounded-circle img-fluid"
                                />
                            </div>
                            <Card.Body>
                                <h5 className="text-center" >Vikram Jadhav</h5>
                                <h6 className="text-center">Backend Developer</h6>

                                <hr />
                                {/* <div className="avatar mx-auto bg-white">
                                    <img
                                        src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(1).webp"
                                        className="rounded-circle img-fluid"
                                    />
                                </div> */}
                                <Card style={{ background: '#A3A9A6', borderLeft: 'thick solid' }} ><h6 className='ml-1 mt-1'>Contact :</h6></Card>
                                <br />
                                <Stack direction="row" spacing={2} className="align-center">
                                    <Row>
                                        <Col md="3">
                                            <Avatar >
                                                <PhoneIcon color='primary' />
                                            </Avatar>
                                            <p className='ml-1'>Call</p>
                                        </Col>
                                        <Col md="3">
                                            <Avatar>
                                                <EmailIcon color='warning' />
                                            </Avatar>
                                            <p className='ml-1'>Mail</p>
                                        </Col>
                                        <Col md="3">
                                            <Avatar>
                                                <WhatsAppIcon color='success' />
                                            </Avatar>
                                            <p className='ml-1'>Chat</p>
                                        </Col>
                                        <Col md="3">
                                            <Avatar>
                                                <YouTubeIcon color='error' />
                                            </Avatar>
                                            <p className='ml-1'>View</p>
                                        </Col>
                                    </Row>
                                </Stack>
                                <Stack>
                                    <Row className="ml-2">
                                        <Col md="4">
                                            <Avatar>
                                                <TwitterIcon color='primary' />
                                            </Avatar>
                                            <p className='ml-1'>Follow</p>
                                        </Col>
                                        <Col md="4">
                                            <Avatar>
                                                <GroupAddIcon color='warning' />
                                            </Avatar>
                                            <p className='ml-1'>Save</p>
                                        </Col>
                                        <Col md="4">
                                            <Avatar>
                                                <CurrencyRupeeIcon color='success' />
                                            </Avatar>
                                            <p >Pay Me</p>
                                        </Col>

                                    </Row>
                                </Stack>
                                <Card style={{ background: '#A3A9A6', borderLeft: 'thick solid' }} ><h6 className='ml-1 mt-1'>Follow Me :</h6></Card>
                                <br />
                                {/* <Stack direction="row" spacing={2} className="align-center">
                                    <Row>
                                        <Col md="3">
                                            <Avatar>
                                                <PhoneIcon color='primary' />
                                            </Avatar>
                                            <p>About Me</p>
                                        </Col>
                                        <Col md="3">
                                            <Avatar>
                                                <EmailIcon color='warning' />
                                            </Avatar>
                                            <p>Skill</p>
                                        </Col>
                                        <Col md="3">
                                            <Avatar>
                                                <WhatsAppIcon color='success' />
                                            </Avatar>
                                            <p>Chat</p>
                                        </Col>
                                        <Col md="3">
                                            <Avatar>
                                                <YouTubeIcon color='error' />
                                            </Avatar>
                                            <p>View</p>
                                        </Col>
                                    </Row>
                                </Stack> */}
                                <Stack>
                                    <Row className="ml-4">
                                        <Col md="4">
                                            <Avatar>
                                                <FacebookIcon color='primary' />
                                            </Avatar>
                                            <p className='ml-1'>Call</p>
                                        </Col>
                                        <Col md="4">
                                            <Avatar>
                                                <InstagramIcon color='error' />
                                            </Avatar>
                                            <p className='ml-1'>Mail</p>
                                        </Col>
                                        <Col md="4">
                                            <Avatar>
                                                <WhatsAppIcon color='success' />
                                            </Avatar>
                                            <p className='ml-1'>Chat</p>
                                        </Col>
                                    </Row>
                                </Stack>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col lg="4">
                        <Card style={{ borderRadius: '29px', height: '670px', background: 'linear-gradient(0deg, rgba(34,193,195,1) 0%, rgba(253,163,45,1) 100%)' }} >
                            <Card.Body className="text-center">
                                <div className="mt-3 mb-4">
                                    <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava2-bg.webp"
                                        className="rounded-circle" style={{ width: '100px' }} />
                                </div>
                                <h5 tag="h4">Julie L. Arsenault</h5>
                                <Card.Text className="text-muted mb-4">
                                    @Programmer <span className="mx-2">|</span> <a href="#!">mdbootstrap.com</a>
                                </Card.Text>
                                <hr />
                                <div className="mb-4 pb-2">

                                    <h6>Contact -----------------------------</h6>
                                    <br />
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
                                            {/* <span style={{ textAlignLeft: '2px' }}>
                                                It has survived not only five centuries, but also the leap into electronic typesetting,
                                                remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets
                                            </span> */}
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
                    <Col lg="4">
                        <Card style={{ borderRadius: '29px', height: '670px', background: 'linear-gradient(0deg, #F2F5D0 0%, #F9957F 100%)' }} >
                            <Card.Body className="text-center">
                                <div className="mt-3 mb-4">
                                    <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3-bg.webp"
                                        className="rounded-circle" style={{ width: '100px' }} />
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
                                            {/* <span style={{ textAlignLeft: '2px' }}>
                                                It has survived not only five centuries, but also the leap into electronic typesetting,
                                                remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets
                                            </span> */}
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
                    <Col lg="4">
                        <Card style={{ borderRadius: '29px', height: '670px', background: 'linear-gradient(0deg, #849B5C 0%, #BFFFC7 100%)' }} >
                            <Card.Body className="text-center">
                                <div className="mt-3 mb-4">
                                    <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava6-bg.webp"
                                        className="rounded-circle" style={{ width: '100px' }} />
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
                                            <Icon color='primary'>phone</Icon>
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
                                            {/* <span style={{ textAlignLeft: '2px' }}>
                                                It has survived not only five centuries, but also the leap into electronic typesetting,
                                                remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets
                                            </span> */}
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
                </Row>
            </SimpleCard>
        </Container >)
}
export default SampleDigitalCardPreview