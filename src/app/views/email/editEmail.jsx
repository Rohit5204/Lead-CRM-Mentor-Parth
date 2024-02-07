import * as React from 'react';
import { styled } from '@mui/system';
import { Breadcrumb, SimpleCard } from 'app/components';
import { Box, MenuItem, FormControl, Select, Autocomplete, TextField, } from '@mui/material';
import { Form, Row, Col, InputGroup } from 'react-bootstrap';
import { useState, useEffect, useRef } from 'react';
import JoditEditor from 'jodit-react';
import axios from 'axios';
import { BASE_URL } from 'app/utils/constant';

const Container = styled('div')(({ theme }) => ({
    margin: '30px',
    [theme.breakpoints.down('sm')]: { margin: '16px' },
    '& .breadcrumb': {
        marginBottom: '30px',
        [theme.breakpoints.down('sm')]: { marginBottom: '16px' },
    },
}));
const Div = styled('div')(() => ({
    margin: '410px',
}));
const EditEmail = ({ theEditEmail, handleDialog, handleRefresh }) => {
    // console.log(theEditEmail)
    const editor = useRef(null);
    const [id, setId] = useState(theEditEmail.id);
    const [content, setContent] = useState(theEditEmail.emailBody);
    const [emailSubject, setEmailSubject] = useState(theEditEmail.emailSubject);

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
    }, []);

    const [categoryData, setCategoryData] = useState([])
    const [idData, setIdData] = useState([]);
    const [myOptions, setMyOptions] = useState(theEditEmail.emailCategory);

    useEffect(() => {
        axios.get(BASE_URL + `/api/getMasterData?masterName=emailcategorymaster`,
            { headers: headers }).then((res) => {
                for (var i = 0; i < res.data.status.length; i++) {
                    setCategoryData(current => [...current, res.data.status[i].emailCategory]);
                    setIdData(current => [...current, res.data.status[i].id, res.data.status[i].emailCategory
                    ])
                }
            });
    }, []);
    const editData = async () => {
        var catdataid
        for (var i = 0; i < idData.length; i++) {
            if (myOptions == idData[i]) {
                catdataid = idData[i - 1]
            }
        }
        const AddEmail = {
            _id: id,
            emailSubject: emailSubject,
            emailCategory: catdataid,
            emailBody: content,
            recordStatus: 1
        }
        console.log({ AddEmail })
        await axios.post(BASE_URL + '/api/emailTemplateUpsert', AddEmail,
            { headers: headers });
        handleRefresh()
        handleDialog()

    }
    const changePage = () => {
        handleDialog()
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        editData();
    };
    return (
        <Container>
            {/* <SimpleCard title="Update Catalogue Detail's"> */}
            <Form onSubmit={handleSubmit}>
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
                <br />
                <Row>
                    <Col className="d-flex justify-content-end">
                        <button
                            type="submit"
                            className="btn btn-error"
                            style={{ marginTop: 5 + 'px' }}
                            onClick={changePage}
                        >
                            Cancel
                        </button>&nbsp;
                        <button
                            type="submit"
                            className="btn btn-success"
                            style={{ marginTop: 5 + 'px' }}
                            onClick={handleSubmit}
                        >
                            Update
                        </button>
                    </Col>
                </Row>
            </Form>
            {/* </SimpleCard> */}
        </Container>
    );
};

export default EditEmail;
