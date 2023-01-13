import { SimpleCard } from 'app/components';
import React, { useState, useEffect } from 'react';
import { styled } from '@mui/system';
import axios from 'axios';
import { Form, Row, Col, Button, Modal, InputGroup } from 'react-bootstrap';
import EditStatus from './editStatus';
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


const StatusMaster = () => {
    const [masterName, setMasterName] = useState('Status');
    const [inputText, setInputText] = useState('');
    const [APIData, setAPIData] = useState([]);
    const [obj1, setObj1] = useState(null);
    const [show, setShow] = useState(false);
    const [show1, setShow1] = useState(false);
    const items = localStorage.getItem('accessToken');

    useEffect(() => {
        axios
            .get(`https://43.204.38.243:3000/api/getMasterData?masterName=statusmaster`,
                { headers: { "x-access-token": items } })
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
            .post(`https://43.204.38.243:3000/api/mastersUpsert`, {
                id: 0,
                masterName: masterName,
                inputText: inputText,
                recodStatus: 1,
                addedBy: 1,
                updatedBy: 1,
            }, { headers: { "x-access-token": items } })
            .then(() => useEffect);
    };

    const deleteData = (e, i) => {
        console.log(i);
        axios.post('https://43.204.38.243:3000/api/mastersUpsert', {
            id: i.id,
            masterName: 'status',
            inputText: i.platformName,
            recodStatus: 0,
            addedBy: 1,
            updatedBy: 1,
        }, { headers: { "x-access-token": items } });
    };

    const handleClose = () => setShow(false);

    const handleShow = (subscriber) => {
        setObj1(subscriber)
        setShow(true);
    };
    const handleClose1 = () => setShow1(false);

    const handleShow1 = () => {
        setShow1(true);
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        postData();
        setInputText('');
        handleClose1()
    };

    return (
        <div>
            <Row>
                <Col>
                    <Box>
                        <Row>
                            <Col md="1">
                                <button type="button" className="btn btn-success" onClick={handleShow1}>
                                    ADD
                                </button>
                            </Col>
                            <Col md="11">
                                <InputGroup className="mb-3">
                                    <Form.Control
                                        placeholder="Search Box"
                                        aria-label="Recipient's username"
                                        aria-describedby="basic-addon2"
                                    />
                                </InputGroup>
                            </Col>

                        </Row>
                        <div className="container"></div>
                    </Box>
                    <Row>
                        <Col>
                            <SimpleCard>
                                {/* Tab Section */}

                                <Box className="text-center" width="100%" overflow="auto">
                                    {/* Table Section */}
                                    <StyledTable>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell align="justify">Status Id</TableCell>
                                                <TableCell align="justify">Status Name</TableCell>
                                                <TableCell align="center">Action</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {APIData.map((subscriber, index) => {
                                                if (subscriber.status == 1) {
                                                    return (
                                                        <TableRow key={index}>
                                                            <TableCell align="justify">{subscriber.id}</TableCell>
                                                            <TableCell align="justify">{subscriber.name}</TableCell>
                                                            <TableCell align="center">
                                                                <IconButton onClick={() => handleShow(subscriber)}>
                                                                    <Icon color="success">edit</Icon>
                                                                </IconButton>
                                                                <IconButton onClick={(event) => deleteData(event, subscriber)}>
                                                                    <Icon color="warning">delete</Icon>
                                                                </IconButton>
                                                            </TableCell>
                                                        </TableRow>
                                                    );
                                                }
                                            })}
                                        </TableBody>
                                    </StyledTable>
                                </Box>
                            </SimpleCard>
                        </Col>
                    </Row>
                    {/* <SimpleCard title="Add Assign  ">
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
                    </SimpleCard> */}
                </Col>
            </Row>
            <br />

            <Modal
                show={show1}
                onHide={handleClose1}
                backdrop="static"
                keyboard={false}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header>
                    <Modal.Title>Add Status </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row >
                        <Col>
                            <Form.Label>Master Name</Form.Label>
                            <Form.Control
                                required
                                disabled
                                onChange={(e) => setMasterName(e.target.value)}
                                value={masterName}
                                placeholder="Master Name"
                            />
                        </Col>
                        <Col>
                            <Form.Label>Status Name</Form.Label>
                            <Form.Control
                                required
                                onChange={(e) => setInputText(e.target.value)}
                                value={inputText}
                                placeholder="Enter the Platform Name"
                            />
                        </Col>
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <button
                        type="submit"
                        className="btn btn-error"
                        style={{ marginTop: 5 + 'px' }}
                        onClick={handleClose1}>
                        Cancel
                    </button>&nbsp;
                    <button
                        type="submit"
                        className="btn btn-success"
                        style={{ marginTop: 5 + 'px' }}
                        onClick={handleSubmit}>
                        Save
                    </button>

                </Modal.Footer>
            </Modal>
            {/* Edit Modal */}
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
                    <Modal.Title>Update Status Master</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <EditStatus theEditStatus={obj1} handleDialog={handleClose} />
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
        </div>
    );
};

export default StatusMaster;
