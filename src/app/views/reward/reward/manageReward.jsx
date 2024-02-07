import { styled } from '@mui/system';
import { Breadcrumb } from 'app/components';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Row, Col, Modal, InputGroup, Button } from 'react-bootstrap';
import ClearIcon from '@mui/icons-material/Clear';
import { useNavigate } from 'react-router-dom';
import { DataGrid } from '@mui/x-data-grid';
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
import { BASE_URL } from 'app/utils/constant';
import AddReward from './addReward';

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

const ManageReward = () => {

    const [APIData, setAPIData] = useState([]);

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => {
        setShow(true);
    };

    const [showForm, setShowForm] = useState(false);
    const handleCloseForm = () => setShowForm(false);
    const handleShowForm = () => {
        setShowForm(true);
    };

    const navigate = useNavigate();
    const changePage = () => {
        navigate('/reward/manageReward');
    };


    //get method
    const items = localStorage.getItem('accessToken');
    const roleCode = localStorage.getItem('roleCode');
    const userId = localStorage.getItem('userId');
    const headers = {
        "x-access-token": items,
        "roleCode": roleCode,
        "userId": userId
    }

    const getRewardData = async () => {
        await axios.get(BASE_URL + `/api/getReward`,
            { headers: headers })
            .then((response) => {
                setAPIData(response.data.data);
            });
    }

    useEffect(() => {
        getRewardData()
    }, []);
    const roleName = window.localStorage.getItem('roleName');
    return (
        <Container>
            <Box>
                <Box className="breadcrumb">
                    <Breadcrumb
                        routeSegments={[
                            { name: 'Manage Reward', path: '/reward/manageReward' },
                        ]}
                    />
                </Box>
                <Box>
                    <Row>
                        <Col>
                            <InputGroup className="mb-3">

                                <Form.Control
                                    placeholder="Search By Target Amount"
                                    aria-label="Recipient's username"
                                    aria-describedby="basic-addon2"


                                />
                                &nbsp;
                                {roleName == "Admin" ? (<>
                                    <button type="submit" className="btn btn-success" onClick={handleShowForm}>
                                        ADD
                                    </button>
                                </>
                                ) : (<></>)}
                            </InputGroup>
                        </Col>
                    </Row>
                </Box>
                <Box className="text-center" width="100%" overflow="auto">
                    {/* Table Section */}

                    <StyledTable className="table table-striped table-bordered" style={{ 'borderRadius': '1px' }}>
                        <TableHead style={{ borderLeft: '1px solid red', borderRight: '1px solid red' }} className='text-center'>
                            <TableRow>
                                <TableCell align="center">Reward Id</TableCell>
                                <TableCell align="center">Start Date</TableCell>
                                <TableCell align="center">End Date</TableCell>
                                <TableCell align="center">Target Amount</TableCell>
                                <TableCell align="center">Achieved Amount</TableCell>
                                <TableCell align="center">Status</TableCell>
                                <TableCell align="center">Reedem Gift</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {APIData.map((reward, index) => {
                                return (
                                    <TableRow key={index}>
                                        <TableCell align="center">{reward.id}</TableCell>
                                        <TableCell align="center">{new Date(reward.startDate).toLocaleDateString('en-GB')}</TableCell>
                                        <TableCell align="center">{new Date(reward.endDate).toLocaleDateString('en-GB')}</TableCell>
                                        <TableCell align="center">₹ {reward.targetAmt}</TableCell>
                                        <TableCell align="center">₹ 0</TableCell>
                                        <TableCell align="center">{(function () {
                                            if (reward.status == 0) {
                                                return <Chip label="Open Spot" color="success" />;
                                            }
                                            else {
                                                return <Chip label="Expired" color="error" />
                                            }
                                        })()}</TableCell>

                                        <TableCell align="center">
                                            {(function () {
                                                if (reward.targetAmt >= 300000) {
                                                    return <IconButton onClick={() => handleShow(reward)}>
                                                        <Icon color="success">visibility</Icon>
                                                    </IconButton>;
                                                }
                                                else {
                                                    return <Chip label="Target Not Triger" color="error" />
                                                }
                                            })()}

                                        </TableCell>


                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </StyledTable>

                </Box>

            </Box>
            <Modal
                backdrop="static"
                keyboard={false}
                show={showForm}
                onHide={handleCloseForm}
                animation={false}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header>
                    <h5>Add Reward For Employee</h5>
                    <IconButton type="button" onClick={handleCloseForm}>
                        <ClearIcon />
                    </IconButton>
                </Modal.Header>
                <Modal.Body>
                    <AddReward handleDialog={handleCloseForm} handleRefresh={getRewardData}></AddReward>
                </Modal.Body>
            </Modal>
            <Modal
                backdrop="static"
                keyboard={false}
                show={show}
                onHide={handleClose}
                animation={false}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header>
                    <h5>Hey You have Earned the Incentive</h5>
                    <IconButton type="button" onClick={handleClose}>
                        <ClearIcon />
                    </IconButton>
                </Modal.Header>
                <Modal.Body>
                    <Button>You will get this in your Salary</Button>
                </Modal.Body>
            </Modal>
        </Container>
    );
};

export default ManageReward;
