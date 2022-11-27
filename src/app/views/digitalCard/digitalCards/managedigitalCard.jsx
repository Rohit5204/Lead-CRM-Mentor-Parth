import { styled } from '@mui/system';
import { Breadcrumb } from 'app/components';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SampleDigitalCardPreview from './SampleCard';
import axios from 'axios';
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
    const [empAPI, setEmpApi] = useState([])
    const items = localStorage.getItem('accessToken');
    const getEmpDigitalCard = () => {
        axios.post(`http://213.136.72.177/cms/api/getDigitalCard`, { _id: 0 },
            { headers: { "x-access-token": items } })
            .then((response) => {
                setEmpApi(response.data.data);
            });
    }
    useEffect(() => {
        getEmpDigitalCard()
    }, []);
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
                                <Link to='/digitalCards/addCard'> <button type="submit" className="btn btn-success" >
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
                                <TableCell align="center">Sr. No</TableCell>
                                <TableCell align="center">Name</TableCell>
                                <TableCell align="center">DOB</TableCell>
                                <TableCell align="center">Mobile </TableCell>
                                <TableCell align="center">Email</TableCell>
                                <TableCell align="center">Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {empAPI.map((empCard, index) => {
                                return (
                                    <TableRow key={index}>
                                        <TableCell align="center">{empCard.id}</TableCell>
                                        <TableCell align="center">{empCard.name}</TableCell>
                                        <TableCell align="center">{empCard.profileName}</TableCell>
                                        <TableCell align="center">{empCard.mobileNo1}</TableCell>
                                        <TableCell align="center">{empCard.email}                                      </TableCell>
                                        <TableCell align="center">
                                            {/* <Link to="/leads/viewLeads" state={empCard}> */}
                                            <IconButton>
                                                <Icon color="red">visibility</Icon>
                                            </IconButton>
                                            {/* </Link> */}
                                            <Link to="/digitalCards/editCard" state={empCard}>
                                                <IconButton>
                                                    <Icon color="success">edit</Icon>
                                                </IconButton>
                                            </Link>
                                            <IconButton>
                                                <Icon color="success">delete</Icon>
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </StyledTable>
                </Box>
            </Box>
        </Container>
    );
};

export default ManageDigitalCard;
