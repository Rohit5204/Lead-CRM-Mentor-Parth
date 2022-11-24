import React from 'react';
import { Breadcrumb, SimpleCard } from 'app/components';
import { Row, Col, Button, InputGroup, Form } from 'react-bootstrap';
import { styled } from '@mui/system';
import { Icon, Box } from '@mui/material';
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
                                        placeholder="Enter your Address"
                                    /></InputGroup>
                            </Col>
                        </Row>
                    </SimpleCard>
                </Col>
                <Col>
                    <SimpleCard title="Preview Card">
                        {/* #2c5674 */}
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
        </Container>
    );
}
const Div = styled('div')(() => ({
    margin: '0px 0px 0px 441px',
}));
export default AddFormCard