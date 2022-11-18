import { styled } from '@mui/system';
import { Breadcrumb } from 'app/components';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import SampleDigitalCardPreview from './SampleCard';
import { Form, Row, Col, InputGroup } from 'react-bootstrap';
import {
    Box,
    Icon,
    IconButton,
    Table,
    TableBody,
    TableCell,
    TableHead,
    Chip,
    TableRow,
} from '@mui/material';

const Container = styled('div')(({ theme }) => ({
    margin: '30px',
    [theme.breakpoints.down('sm')]: { margin: '16px' },
    '& .breadcrumb': {
        marginBottom: '30px',
        [theme.breakpoints.down('sm')]: { marginBottom: '16px' },
    },
}));
const StyledTable = styled(Table)(() => ({
    whiteSpace: 'pre',
    '& thead': {
        '& tr': { '& th': { paddingLeft: 0, paddingRight: 0 } },
    },
    '& tbody': {
        '& tr': { '& td': { paddingLeft: 0 } },
    },
}));
// .btnShopNow .card {
//     display:none;
// }

// .card:hover {
//   transform:scale(1.1);
//   background-color:#f8f9fa; 
//   /* need to figure out how to do something like #btnShopNow display:block; */
// }

const ManageDigitalCard = () => {
    const [showCardPreview, setShowCardPreview] = useState(false);

    const showCard = () => {
        setShowCardPreview(!showCardPreview);
    };
    return (
        <Container>
            <Box>
                <Box className="breadcrumb">
                    <Breadcrumb
                        routeSegments={[
                            { name: 'Manage Digital Card', path: '/digitalCards/managedigitalCard' },
                            { name: 'Digital Card Detail Page' },
                        ]}
                    />
                </Box>
                <Box>
                    <Row>
                        <Col>
                            <InputGroup className="mb-3">
                                <Link to='/digitalCards/addDigitalCard'> <button type="submit" className="btn btn-success" >
                                    ADD
                                </button></Link>

                                &nbsp;
                                <Form.Control
                                    placeholder="Search Box"
                                    aria-label="Recipient's username"
                                    aria-describedby="basic-addon2"
                                />&nbsp;
                                <button type="button" className="btn btn-primary" onClick={showCard}>Card Design</button>
                            </InputGroup>
                        </Col>
                    </Row>
                </Box>
                {showCardPreview && (
                    <Box>
                        <SampleDigitalCardPreview />
                    </Box>)}
                <Box className="text-center" width="100%" overflow="auto">
                    {/* Table Section */}
                    <h4>Digital Card Table List</h4>
                    <StyledTable>
                        <TableHead>
                            <TableRow>
                                <TableCell align="justify">Sr. No</TableCell>
                                <TableCell align="justify">Name</TableCell>
                                <TableCell align="justify">DOB</TableCell>
                                <TableCell align="justify">Mobile </TableCell>
                                <TableCell align="justify">Email</TableCell>
                                <TableCell align="center">Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow >
                                <TableCell align="justify">1</TableCell>
                                <TableCell align="justify">Rohit Jaiswal</TableCell>
                                <TableCell align="justify">19/12/2002</TableCell>
                                <TableCell align="justify">7558227432</TableCell>
                                <TableCell align="justify">rohit@gmail.com
                                </TableCell>
                                <TableCell align="center">
                                    <IconButton>
                                        <Icon color="success">visibility</Icon>
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </StyledTable>
                </Box>
            </Box>
        </Container>
    );
};

export default ManageDigitalCard;
