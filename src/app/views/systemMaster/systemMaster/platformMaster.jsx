import { SimpleCard } from 'app/components';
import React, { useState, useEffect } from 'react';
import { styled } from '@mui/system';
import axios from 'axios';
import { Form, Row, Col, Button, Modal } from 'react-bootstrap';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import EditPlatform from './editPlatform';
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
function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const Div = styled('div')(({ theme }) => ({
    margin: '0px 0px 0px 430px',
}));


const PlatformMaster = () => {
    const [masterName, setMasterName] = useState('Platform');
    const [inputText, setInputText] = useState('');
    const [APIData, setAPIData] = useState([]);
    const [obj1, setObj1] = useState(null);
    const [show, setShow] = useState(false);
    const [value, setValue] = useState(0);
    const items = localStorage.getItem('accessToken');

    useEffect(() => {
        axios
            .get(`http://35.89.6.16:4002/api/getMasterData?masterName=platformmaster`,
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

    const deleteData = (e, i) => {
        console.log(i);
        axios.post('http://35.89.6.16:4002/api/mastersUpsert', {
            id: i.id,
            masterName: 'platform',
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
    const handleSubmit = (e) => {
        e.preventDefault();
        postData();
        setInputText('');
    };


    const handleCChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div>
            <Row>
                <Col>
                    <SimpleCard title="Add Platform ">
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
                                <Form.Label>Input Text</Form.Label>
                                <Form.Control
                                    required
                                    onChange={(e) => setInputText(e.target.value)}
                                    value={inputText}
                                    placeholder="Enter the Input Text"
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
                    <SimpleCard title="List Of Platform Master ">
                        {/* Tab Section */}
                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                            <Tabs value={value} onChange={handleCChange} aria-label="basic tabs example">
                                <Tab label="Active Leads" {...a11yProps(0)} />
                                <Tab label="Inactive Leads" {...a11yProps(1)} />
                            </Tabs>
                        </Box>
                        <TabPanel value={value} index={0}>
                            {/* First Tab */}
                            <Box className="text-center" width="100%" overflow="auto">
                                {/* Table Section */}
                                <StyledTable>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell align="justify">Lead Id</TableCell>
                                            <TableCell align="justify">Lead Name</TableCell>
                                            <TableCell align="center">Action</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {APIData.map((subscriber, index) => {
                                            if (subscriber.status == 1) {
                                                return (
                                                    <TableRow key={index}>
                                                        <TableCell align="justify">{subscriber.id}</TableCell>
                                                        <TableCell align="justify">{subscriber.platformName}</TableCell>
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
                        </TabPanel>
                        {/* Second Tab */}
                        <TabPanel value={value} index={1}>
                            <Box className="text-center" width="100%" overflow="auto">
                                {/* Inactive Table Section */}
                                <StyledTable>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell align="justify">Lead Id</TableCell>
                                            <TableCell align="justify">Lead Name</TableCell>
                                            <TableCell align="center">Action</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {APIData.map((subscriber, index) => {
                                            if (subscriber.status == 0) {
                                                return (
                                                    <TableRow key={index}>
                                                        <TableCell align="justify">{subscriber.id}</TableCell>
                                                        <TableCell align="justify">{subscriber.platformName}</TableCell>
                                                        <TableCell align="center">
                                                            <IconButton onClick={() => handleShow(subscriber)}>
                                                                <Icon color="success">edit</Icon>
                                                            </IconButton>

                                                        </TableCell>
                                                    </TableRow>
                                                );
                                            }
                                        })}
                                    </TableBody>
                                </StyledTable>
                            </Box>
                        </TabPanel>
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
                                <Modal.Title>Update Platform Master</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <EditPlatform theEditPlatform={obj1} />
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

export default PlatformMaster;
