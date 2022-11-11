import React from 'react';
import { Row, Col, Button, Card } from 'react-bootstrap';
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
export default function ProfileStatistics() {
    return (
        <div className="vh-100" style={{ backgroundColor: '#eee' }}>
            <Container className="container py-5 h-100">
                <Row className="justify-content-center align-items-center h-100">
                    <Col md="12" xl="4">
                        <Card style={{ borderRadius: '15px' }}>
                            <Card.Body className="text-center">
                                <div className="mt-3 mb-4">
                                    <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava2-bg.webp"
                                        className="rounded-circle" fluid style={{ width: '100px' }} />
                                </div>
                                {/* <MDBTypography tag="h4">Julie L. Arsenault</MDBTypography> */}
                                <Card.Text className="text-muted mb-4">
                                    @Programmer <span className="mx-2">|</span> <a href="#!">mdbootstrap.com</a>
                                </Card.Text>
                                <div className="mb-4 pb-2">
                                    <Button outline floating>
                                        <Icon >facebook</Icon>
                                    </Button>
                                    <Button outline floating className="mx-1">
                                        <Icon >google</Icon>
                                    </Button>
                                    <Button outline floating>
                                        <Icon >instagram</Icon>
                                    </Button>
                                </div>
                                <Button rounded size="lg">
                                    Message now
                                </Button>
                                <div className="d-flex justify-content-between text-center mt-5 mb-2">
                                    <div>
                                        <Card.Text className="mb-1 h5">8471</Card.Text>
                                        <Card.Text className="small text-muted mb-0">Wallets Balance</Card.Text>
                                    </div>
                                    <div className="px-3">
                                        <Card.Text className="mb-1 h5">8512</Card.Text>
                                        <Card.Text className="small text-muted mb-0">Followers</Card.Text>
                                    </div>
                                    <div>
                                        <Card.Text className="mb-1 h5">4751</Card.Text>
                                        <Card.Text className="small text-muted mb-0">Total Transactions</Card.Text>
                                    </div>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}