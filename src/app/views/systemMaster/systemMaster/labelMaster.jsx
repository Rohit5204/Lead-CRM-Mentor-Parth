import { SimpleCard } from 'app/components';
import React, { useState, useEffect } from 'react';
import { styled } from '@mui/system';
import axios from 'axios';
import { Form, Row, Col, Button, Modal } from 'react-bootstrap';
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
    const items = localStorage.getItem('accessToken');

    useEffect(() => {
        axios
            .get(`http://35.89.6.16:4002/api/getMasterData?masterName=labelmaster`,
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
            .post(`http://35.89.6.16:4002/api/mastersUpsert`, {
                id: 0,
                masterName: masterName,
                inputText: inputText,
                recodStatus: 1,
                addedBy: 1,
                updatedBy: 1,
            }, { headers: { "x-access-token": items } })
            .then(() => useEffect);
    };

    // const deleteData = (e, i) => {
    //     console.log(i);
    //     axios.post('http://35.89.6.16:4002/api/mastersUpsert', {
    //         id: i.id,
    //         masterName: 'platform',
    //         inputText: i.platformName,
    //         recodStatus: 0,
    //         addedBy: 1,
    //         updatedBy: 1,
    //     }, { headers: { "x-access-token": items } });
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
                    <SimpleCard title="List Of Label Master ">
                        {/* Tab Section */}

                        <Box className="text-center" width="100%" overflow="auto">
                            {/* Table Section */}
                            <StyledTable>
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="justify">Label Id</TableCell>
                                        <TableCell align="justify">Label Name</TableCell>
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
                                <Modal.Title>Update Label Master</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <EditLabel theEditLabel={obj1} />
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

export default LabelMaster;
