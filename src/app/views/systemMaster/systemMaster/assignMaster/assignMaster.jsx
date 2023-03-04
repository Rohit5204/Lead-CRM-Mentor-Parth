import { SimpleCard } from 'app/components';
import React, { useState, useEffect } from 'react';
import { styled } from '@mui/system';
import axios from 'axios';
import { Form, Row, Col, Button, Modal } from 'react-bootstrap';
import EditAssign from './editAssign';
import {
    Box,
    Icon,
    IconButton,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
} from '@mui/material';
import { BASE_URL } from 'app/utils/constant';


const StyledTable = styled(Table)(() => ({
    whiteSpace: 'pre',
    '& thead': {
        '& tr': { '& th': { paddingLeft: 0, paddingRight: 0 } },
    },
    '& tbody': {
        '& tr': { '& td': { paddingLeft: 0 } },
    },
}));


const Div = styled('div')(({ theme }) => ({
    margin: '0px 0px 0px 430px',
}));


const AssignMaster = () => {
    const [masterName, setMasterName] = useState('Assign');
    const [inputText, setInputText] = useState('');
    const [APIData, setAPIData] = useState([]);
    const [obj1, setObj1] = useState(null);
    const [show, setShow] = useState(false);
    const [value, setValue] = useState(0);
    const items = localStorage.getItem('accessToken');
    const roleCode = localStorage.getItem('roleCode');
    const userId = localStorage.getItem('userId');
    const headers = {
        "x-access-token": items,
        "roleCode": roleCode,
        "userId": userId
    }

    useEffect(() => {
        axios
            .get(BASE_URL + `/api/getMasterData?masterName=assignmaster`,
                { headers: headers })
            .then((response) => {
                setAPIData(response.data.data);
            });
    }, [APIData]);

    const postData = () => {
        console.log({
            masterName: masterName,
            inputText: inputText,
        });
        axios
            .post(BASE_URL + `/api/mastersUpsert`, {
                id: 0,
                masterName: masterName,
                inputText: inputText,
                recodStatus: 1,
                addedBy: 1,
                updatedBy: 1,
            }, { headers: headers })
            .then(() => useEffect);
    };

    // const deleteData = (e, i) => {
    //     console.log(i);
    //     axios.post(BASE_URL+'/api/mastersUpsert', {
    //         id: i.id,
    //         masterName: 'platform',
    //         inputText: i.platformName,
    //         recodStatus: 0,
    //         addedBy: 1,
    //         updatedBy: 1,
    //     }, { headers: headers });
    // };

    const handleClose = () => setShow(false);

    const handleShow = (subscriber) => {
        setObj1(subscriber)
        setShow(true);
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        postData();
        setInputText('');
    };


    return (
        <div>
            <Row>
                <Col>
                    <SimpleCard title="Add Assign  ">
                        <Row>
                            <Col md="6">
                                <Form.Label>Platform Name</Form.Label>
                                <Form.Control
                                    disabled
                                    value={masterName}
                                    onChange={(e) => setMasterName(e.target.value)}
                                    placeholder="Enter the Platform Name"
                                />
                            </Col>
                            <Col md="6">
                                <Form.Label>Name</Form.Label>
                                <Form.Control
                                    required
                                    onChange={(e) => setInputText(e.target.value)}
                                    value={inputText}
                                    placeholder="Enter the Name"
                                />
                            </Col>
                        </Row>
                        <Div className="mt-4">
                            <Row>
                                <Col>
                                    <Button variant="secondary" >
                                        Cancel
                                    </Button>
                                    &nbsp;
                                    <Button variant="success"
                                        onClick={handleSubmit}>
                                        Save
                                    </Button>
                                </Col>
                            </Row>
                        </Div>
                    </SimpleCard>
                </Col>
            </Row>
            <br />
            <Row>
                <Col>
                    <SimpleCard title="List Of Assign Master ">
                        {/* Tab Section */}

                        <Box className="text-center" width="100%" overflow="auto">
                            {/* Table Section */}
                            <StyledTable className="table table-striped table-bordered" style={{ 'borderRadius': '1px' }}>
                                <TableHead style={{ borderLeft: '1px solid red', borderRight: '1px solid red' }} className='text-center'>
                                    <TableRow>
                                        <TableCell align="center">Assign Id</TableCell>
                                        <TableCell align="center">Assign Name</TableCell>
                                        <TableCell align="center">Action</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {APIData.map((subscriber, index) => {
                                        if (subscriber.status == 1) {
                                            return (
                                                <TableRow key={index}>
                                                    <TableCell align="center">{subscriber.id}</TableCell>
                                                    <TableCell align="center">{subscriber.name}</TableCell>
                                                    <TableCell align="center">
                                                        <IconButton onClick={() => handleShow(subscriber)}>
                                                            <Icon color="success">edit</Icon>
                                                        </IconButton>
                                                        {/* <IconButton onClick={(event) => deleteData(event, subscriber)}>
                                                            <Icon color="warning">delete</Icon>
                                                        </IconButton> */}
                                                    </TableCell>
                                                </TableRow>
                                            );
                                        }
                                    })}
                                </TableBody>
                            </StyledTable>
                        </Box>

                        <Modal
                            show={show}
                            onHide={handleClose}
                            backdrop="static"
                            keyboard={false}
                            size="lg"
                            aria-labelledby="contained-modal-title-vcenter"
                            centered
                        >
                            <Modal.Header>
                                <Modal.Title>Update Assign Master</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <EditAssign theEditAssign={obj1} />
                            </Modal.Body>
                            <Modal.Footer>
                                <button
                                    type="submit"
                                    className="btn btn-error"
                                    style={{ marginTop: 5 + 'px' }}
                                    onClick={handleClose}
                                >
                                    Cancel
                                </button>

                            </Modal.Footer>
                        </Modal>
                    </SimpleCard>
                </Col>
            </Row>
        </div>
    );
};

export default AssignMaster;
