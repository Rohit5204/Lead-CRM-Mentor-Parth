import { SimpleCard } from 'app/components';
import React, { useState, useEffect } from 'react';
import { styled } from '@mui/system';
import axios from 'axios';
import { Form, Row, Col, Button, Modal, InputGroup } from 'react-bootstrap';
import EditLabel from './editLabel';
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


const LabelMaster = () => {
    const [masterName, setMasterName] = useState('Label');
    const [inputText, setInputText] = useState('');
    const [APIData, setAPIData] = useState([]);
    const [obj1, setObj1] = useState(null);
    const [show, setShow] = useState(false);
    const [show1, setShow1] = useState(false);
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
            .get(`http://43.204.38.243:3001/api/getMasterData?masterName=labelmaster`,
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
            .post(`http://43.204.38.243:3001/api/mastersUpsert`, {
                id: 0,
                masterName: masterName,
                inputText: inputText,
                recodStatus: 1,
                addedBy: 1,
                updatedBy: 1,
            }, { headers: headers })
            .then(() => useEffect);
    };

    const deleteData = (e, i) => {
        console.log(i);
        axios.post('http://43.204.38.243:3001/api/mastersUpsert', {
            id: i.id,
            masterName: 'label',
            inputText: i.platformName,
            recodStatus: 0,
            addedBy: 1,
            updatedBy: 1,
        }, { headers: headers });
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
        handleClose()
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
                                    <StyledTable className="table table-striped table-bordered" style={{ 'borderRadius': '1px' }}>
                                        <TableHead style={{ borderLeft: '1px solid red', borderRight: '1px solid red' }} className='text-center'>
                                            <TableRow>
                                                <TableCell align="center">Label Id</TableCell>
                                                <TableCell align="center">Label Name</TableCell>
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
                    {/* <SimpleCard>
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
                    <Modal.Title>Add Label </Modal.Title>
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
                            <Form.Label>Label Name</Form.Label>
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
                    <Modal.Title>Update Label Master</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <EditLabel theEditLabel={obj1} handleDialog={handleClose} />
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

export default LabelMaster;
