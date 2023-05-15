import { styled } from '@mui/system';
import { Breadcrumb } from 'app/components';
import React, { useState, useRef, useEffect } from 'react';
import { Form, Row, Modal, Col, InputGroup } from 'react-bootstrap';
import { Button, TextField, Autocomplete, Grid } from '@mui/material';
import JoditEditor from 'jodit-react';
import axios from 'axios';
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
import EditEmail from './editEmail';
import { BASE_URL } from 'app/utils/constant';

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

const ManageEmailMessage = () => {
    const [obj1, setObj1] = useState(null);
    const [show, setShow] = useState(false);
    //Dialog Form
    const handleClose = () => {
        setShow(false);
        setContent('')
    }
    const handleShow = () => {
        setShow(true);
    };
    const [show1, setShow1] = useState(false);
    //Dialog Form
    const handleClose1 = () => {
        setShow1(false)
    }
    const handleShow1 = (subscriber) => {
        setObj1(subscriber);
        setShow1(true);
    };
    const editor = useRef(null);
    const [content, setContent] = useState('');
    const [emailSubject, setEmailSubject] = useState('');

    const [emailData, setEmailData] = useState([]);
    const items = localStorage.getItem('accessToken');
    const roleCode = localStorage.getItem('roleCode');
    const userId = localStorage.getItem('userId');
    const headers = {
        "x-access-token": items,
        "roleCode": roleCode,
        "userId": userId
    }
    //get method
    useEffect(() => {
        axios.get(BASE_URL + `/api/getEmailTemplate?_id=0`,
            { headers: headers }).then((response) => {
                setEmailData(response.data.data);
            });
    }, [emailData]);

    const [categoryData, setCategoryData] = useState([])
    const [idData, setIdData] = useState([]);
    const [myOptions, setMyOptions] = useState(null);

    // const connection = () => {
    //     // Connect to the WebSocket server
    //     const socket = new WebSocket('ws://localhost:8080');

    //     socket.addEventListener('open', () => {
    //         console.log('WebSocket connection established');

    //         // Send a message to the server
    //         socket.send('Hello, server!');
    //     });

    //     socket.addEventListener('message', (event) => {
    //         console.log('Message received from server:', event.data);
    //     });

    //     socket.addEventListener('close', () => {
    //         console.log('WebSocket connection closed');
    //     });
    // }

    useEffect(() => {
        axios.get(BASE_URL + `/api/getMasterData?masterName=emailcategorymaster`,
            { headers: headers }).then((res) => {
                for (var i = 0; i < res.data.data.length; i++) {
                    setCategoryData(current => [...current, res.data.data[i].emailCategory]);
                    setIdData(current => [...current, res.data.data[i].id, res.data.data[i].emailCategory
                    ])
                }
            });
    }, []);
    const postData = async () => {
        var catdataid
        for (var i = 0; i < idData.length; i++) {
            if (myOptions == idData[i]) {
                catdataid = idData[i - 1]
            }
        }
        const AddEmail = {
            _id: 0,
            emailSubject: emailSubject,
            emailCategory: catdataid,
            emailBody: content,
            recordStatus: 1
        }
        console.log({ AddEmail })
        await axios.post(BASE_URL + '/api/emailTemplateUpsert', AddEmail,
            { headers: headers });

    }
    const handleSubmit = (e) => {
        e.preventDefault();
        postData();
        handleClose()
    };
    return (
        <Container>
            <Box className="breadcrumb">
                <Breadcrumb
                    routeSegments={[
                        { name: 'Manage Email Templates', path: '/manageEmailMessage' },
                        { name: 'Email Catalogue List' },
                    ]}
                />
            </Box>
            <Grid container spacing={4}>

                <Grid item xs={12} md={12}>
                    <InputGroup className="mb-3">


                        <Form.Control
                            placeholder="Search Box"
                            aria-label="Recipient's username"
                            aria-describedby="basic-addon2"
                        />&nbsp;
                        <Button
                            id="demo-customized-button"
                            size='small'

                            variant="contained"
                            disableElevation
                            onClick={handleShow}

                        >
                            Email
                        </Button>

                    </InputGroup>
                </Grid>

            </Grid>
            <Box className="text-center" width="100%" overflow="auto">
                {/* Table Section */}
                <h4>Email Templates</h4>
                <StyledTable className="table table-striped table-bordered" style={{ 'borderRadius': '1px' }}>
                    <TableHead style={{ borderLeft: '1px solid red', borderRight: '1px solid red' }} className='text-center'>
                        <TableRow>
                            <TableCell align="center">Sr. No</TableCell>
                            <TableCell align="center">Title Name</TableCell>
                            <TableCell align="center">Category</TableCell>
                            <TableCell align="center">Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {emailData.map((subscriber, index) => {
                            // if (subscriber.status == 1) {
                            return (
                                <TableRow key={index}>
                                    <TableCell align="center">{subscriber.id}</TableCell>
                                    <TableCell align="center">{subscriber.emailSubject}</TableCell>
                                    <TableCell align="center">{subscriber.emailCategory}</TableCell>
                                    <TableCell align="center">
                                        <IconButton onClick={() => handleShow1(subscriber)}>
                                            <Icon color="success">edit</Icon>
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            )
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
                    <Modal.Title>Create Email Template</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col>
                            <Form.Label>Email Subject</Form.Label>
                            <Form.Control
                                onChange={(e) => setEmailSubject(e.target.value)}
                                value={emailSubject}
                                placeholder="Enter the Email Subject"

                            />
                        </Col>
                        <Col md="6">
                            <InputGroup>
                                <Form.Label>Category</Form.Label>
                            </InputGroup>
                            <Autocomplete
                                freeSolo
                                autoComplete
                                autoHighlight
                                options={categoryData}
                                value={myOptions}
                                onChange={(e) => setMyOptions(e.currentTarget.innerHTML)}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}

                                        variant="outlined"
                                        label="Select the Mail Category"
                                        size="small"
                                    />
                                )}
                            />
                        </Col>

                    </Row>
                    <Row className='mt-1'>
                        <Col>
                            <Form.Label>Email Body</Form.Label>
                            <JoditEditor
                                ref={editor}
                                value={content}

                                tabIndex={1} // tabIndex of textarea
                                onBlur={newContent => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
                                onChange={newContent => { }}
                            />
                        </Col>
                    </Row>
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
                    &nbsp;
                    <button
                        type="submit"
                        className="btn btn-success"
                        style={{ marginTop: 5 + 'px' }}
                        onClick={handleSubmit}
                    >
                        Save
                    </button>
                </Modal.Footer>
            </Modal>
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
                    <Modal.Title>Update Email Template</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <EditEmail theEditEmail={obj1} handleDialog={handleClose1} />
                </Modal.Body>
            </Modal>
        </Container>
    );
};

export default ManageEmailMessage;
