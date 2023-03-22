import { SimpleCard } from 'app/components';
import React, { useState, useEffect } from 'react';
import { styled } from '@mui/system';
import axios from 'axios';
import { Form, Row, Col, Modal, InputGroup } from 'react-bootstrap';
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';
import EditPlatform from './editPlatform';
import { DataGrid } from '@mui/x-data-grid';
import {
    Box,
    Icon,
    Tabs,
    Tab,
    Card,
    Fab,
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
    const [platformIcon, setplatformIcon] = useState('s');
    const [platformColor, setplatformColor] = useState('#833ab4');
    const [APIData, setAPIData] = useState([]);
    const [obj1, setObj1] = useState(null);
    const [show, setShow] = useState(false);
    const [show1, setShow1] = useState(false);
    const [value, setValue] = useState(0);
    const items = localStorage.getItem('accessToken');
    const roleCode = localStorage.getItem('roleCode');
    const userId = localStorage.getItem('userId');
    const headers = {
        "x-access-token": items,
        "roleCode": roleCode,
        "userId": userId
    }
    const columns = [
        { field: 'id', headerName: 'Platform Id', width: 180 },
        { field: 'platformName', headerName: 'Platform Name', width: 240 },

    ];


    const PlatformPayload = {
        id: 0,
        masterName: masterName,
        platformIcon: platformIcon,
        platformColor: platformColor,
        inputText: inputText,
        recodStatus: 1,
        addedBy: 1,
        updatedBy: 1,
    }
    useEffect(() => {
        axios
            .get(BASE_URL + `/api/getMasterData?masterName=platformmaster`,
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
            .post(BASE_URL + `/api/mastersUpsert`, PlatformPayload,
                { headers: headers })
            .then(() => useEffect);
    };

    const deleteData = (e, i) => {
        console.log(i);
        axios.post(BASE_URL + '/api/mastersUpsert', {
            id: i.id,
            masterName: 'platform',
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
        setplatformIcon('');
        setplatformColor('');
        setShow1(false)
    };
    const handleCChange = (event, newValue) => {
        setValue(newValue);
    };
    return (
        <>
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
                    <SimpleCard>
                        {/* Tab Section */}
                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                            <Tabs value={value} onChange={handleCChange} aria-label="basic tabs example">
                                <Tab label="Active Platform" {...a11yProps(0)} />
                                <Tab label="Inactive Platform" {...a11yProps(1)} />
                            </Tabs>
                        </Box>
                        <TabPanel value={value} index={0}>
                            {/* First Tab */}
                            <Box className="text-center" width="100%" overflow="auto">
                                {/* Table Section */}
                                <StyledTable className="table table-striped table-bordered" style={{ 'borderRadius': '1px' }}>
                                    <TableHead style={{ borderLeft: '1px solid red', borderRight: '1px solid red' }} className='text-center'>
                                        <TableRow>
                                            <TableCell align="center">Lead Id</TableCell>
                                            <TableCell align="center">Lead Name</TableCell>
                                            <TableCell align="center">Action</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {APIData.map((subscriber, index) => {
                                            if (subscriber.status == 1) {
                                                return (
                                                    <TableRow key={index}>
                                                        <TableCell align="center">{subscriber.id}</TableCell>
                                                        <TableCell align="center">{subscriber.platformName}</TableCell>
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
                                {/* <div style={{ height: 570, width: '100%' }}>
                                    <DataGrid
                                        rows={APIData}
                                        columns={columns}
                                        pageSize={10}
                                        rowsPerPageOptions={[10]}
                                    // checkboxSelection
                                    />
                                </div> */}
                            </Box>
                        </TabPanel>
                        {/* Second Tab */}
                        <TabPanel value={value} index={1}>
                            <Box className="text-center" width="100%" overflow="auto">
                                {/* Inactive Table Section */}
                                <StyledTable className="table table-striped table-bordered" style={{ 'borderRadius': '1px' }}>
                                    <TableHead style={{ borderLeft: '1px solid red', borderRight: '1px solid red' }} className='text-center'>
                                        <TableRow>
                                            <TableCell align="center">Lead Id</TableCell>
                                            <TableCell align="center">Lead Name</TableCell>
                                            <TableCell align="center">Action</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {APIData.map((subscriber, index) => {
                                            if (subscriber.status == 0) {
                                                return (
                                                    <TableRow key={index}>
                                                        <TableCell align="center">{subscriber.id}</TableCell>
                                                        <TableCell align="center">{subscriber.platformName}</TableCell>
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

                    </SimpleCard>
                </Col>
            </Row>

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
                    <Modal.Title>Add Platform </Modal.Title>
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
                            <Form.Label>Platform Name</Form.Label>
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
                    <Modal.Title>Update Platform Master</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <EditPlatform theEditPlatform={obj1} handleDialog={handleClose} />
                </Modal.Body>
            </Modal>

        </>
    );
};
const StyledCard = styled(Card)(({ theme }) => ({
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    centerContent: 'space-between',
    padding: '24px !important',
    // background: '#19CABA',
    [theme.breakpoints.down('sm')]: { padding: '16px !important' },
}));
const ContentBox = styled('div')(() => ({
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    marginLeft: '90px'
}));

const FabIcon = styled(Fab)(() => ({
    width: '120px !important',
    height: '120px !important',
    boxShadow: 'none !important',
}));

const H3 = styled('h3')(({ textcolor }) => ({
    margin: 0,
    color: textcolor,
    fontWeight: '500',
    marginLeft: '0px',
}));

const H1 = styled('h5')(({ textcolor }) => ({
    margin: 0,
    // flexGrow: 1,
    color: textcolor,
}));

export default PlatformMaster;
