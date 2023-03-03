import React from 'react';
import { Row, Col, Card, Button } from 'react-bootstrap';
import { styled } from '@mui/system';
import { Breadcrumb } from 'app/components';
import "./sample.css";
import { Link } from 'react-router-dom';
import { Box, } from '@mui/material';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import "./card.css";

const Container = styled('div')(({ theme }) => ({
    margin: '25px',
    [theme.breakpoints.down('sm')]: { margin: '16px' },
    '& .breadcrumb': {
        marginBottom: '10px',
        [theme.breakpoints.down('sm')]: { marginBottom: '16px' },
    },
}));
const SampleDigitalCardPreview = () => {
    const options = [{ id: 1, color: "#1187ac" }]
    return (
        <Container>
            <Box className="breadcrumb">
                <Breadcrumb
                    routeSegments={[
                        { name: 'Manage Digital Card', path: '/digitalCards' },
                        { name: 'Digital Card Page' },
                    ]}
                />
            </Box>
            <Row className='ml-3'>
                <Col md="6" >
                    <Card className="testimonial-card">
                        <div className='card-wrapper'>
                            <div className='card'>
                                <div className='card-front'>
                                    <div className='left'>
                                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0n4ODoAIA--3sUNXFOtz78IfoaPwViociyQ&usqp=CAU" alt="logo" />
                                    </div>
                                    <div className='right'>
                                        <div className='person right-content'>
                                            <i><PersonIcon /></i>
                                            <div>
                                                <h4>John Dev</h4>
                                                <span>Full Stack Developer</span>
                                            </div>
                                        </div>
                                        <div className='phone right-content'>
                                            <i><PhoneIcon /> </i>
                                            <div>
                                                <span>+91-123456789</span><br />
                                                <span>+91-021365478</span>

                                            </div>
                                        </div>
                                        <div className='email right-content'>
                                            <i><EmailIcon /> </i>
                                            <div>
                                                <p>demo@gmail.com</p>
                                            </div>
                                        </div>
                                        <div className='address right-content'>
                                            <i><HomeIcon /> </i>
                                            <div>
                                                <p> ABC,Street,456</p>
                                            </div>
                                        </div>
                                    </div>
                                    {/* <div className='card-back' hidden>
                                        <img src="/assets/images/payment-card/boostock-logo.jpg" width="150" alt="logo" />
                                    </div> */}
                                </div>
                            </div>
                        </div>
                    </Card>
                    <Link to='/digitalCards/addCard'>
                        <button style={{ marginLeft: "200px" }} type="button" className="btn btn-success mt-1">Option 1</button>
                    </Link>
                </Col>
                <Col md="6" >
                    <Card className="testimonial-card" >
                        <div className='card-wrapper'>
                            <div className='card'>
                                <div className='card-front'>
                                    <div className='left'>
                                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0n4ODoAIA--3sUNXFOtz78IfoaPwViociyQ&usqp=CAU" alt="logo" />
                                    </div>
                                    <div className='right'>
                                        <div className='person1 right-content'>
                                            <i><PersonIcon /></i>
                                            <div>
                                                <h4>Steve Rogers</h4>
                                                <span>Backend Developer</span>
                                            </div>
                                        </div>
                                        <div className='phone right-content'>
                                            <i><PhoneIcon color='red' /> </i>
                                            <div>
                                                <span>+44-0123654789</span><br />
                                                <span>+44-9856321470</span>

                                            </div>
                                        </div>
                                        <div className='email right-content'>
                                            <i><EmailIcon /> </i>
                                            <div>
                                                <p> steve@yahoo.com</p>
                                            </div>
                                        </div>
                                        <div className='address right-content'>
                                            <i><HomeIcon /> </i>
                                            <div>
                                                <p> 133,BlackMount Street</p>
                                            </div>
                                        </div>
                                    </div>
                                    {/* <div className='card-back' hidden>
                                        <img src="/assets/images/payment-card/boostock-logo.jpg" alt="logo" />
                                    </div> */}
                                </div>
                            </div>
                        </div>
                    </Card>
                    <Link to='/digitalCards/addCard'>
                        <button style={{ marginLeft: "200px" }} type="button" className="btn btn-success mt-1">Option 2</button>
                    </Link>
                </Col>
            </Row>

        </Container >)
}
export default SampleDigitalCardPreview