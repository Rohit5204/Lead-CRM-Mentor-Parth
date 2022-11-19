import React from 'react';
import { Breadcrumb, SimpleCard } from 'app/components';
import { Row, Col, Button, InputGroup, Card, Form } from 'react-bootstrap';
import { styled } from '@mui/system';
import { Icon, Box } from '@mui/material';

const Container = styled('div')(({ theme }) => ({
    margin: '30px',
    [theme.breakpoints.down('sm')]: { margin: '16px' },
    '& .breadcrumb': {
        marginBottom: '30px',
        [theme.breakpoints.down('sm')]: { marginBottom: '16px' },
    },
}));


const AddFormCard = () => {
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
                                <Form.Label>Name</Form.Label>
                                <Form.Control
                                    required
                                    placeholder="Enter the Name"
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Form.Label>Profile</Form.Label>
                                <Form.Control
                                    required
                                    placeholder="Enter the Profile Name"
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Form.Label>Profile</Form.Label>
                                <Form.Control
                                    required
                                    placeholder="Enter the Profile Name"
                                />
                            </Col>
                        </Row>
                    </SimpleCard>
                </Col>
                <Col>
                    <SimpleCard title="Preview Card">
                        <Row>

                        </Row>
                    </SimpleCard>
                </Col>
            </Row>
        </Container>
    );
}
export default AddFormCard