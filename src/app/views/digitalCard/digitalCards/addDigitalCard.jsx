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


const AddFormCard = () => {
    return (
        <Container className="py-5">
            <Row>
                <Col>

                </Col>
            </Row>
        </Container>
    );
}
export default AddFormCard