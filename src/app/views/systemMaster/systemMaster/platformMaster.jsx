import { SimpleCard } from 'app/components';
import React, { useState, useEffect } from 'react';
import { styled } from '@mui/system';
import axios from 'axios';
import { Form, Row, Col, Button, Modal } from 'react-bootstrap';
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';
import EditPlatform from './editPlatform';
import {
    Box,
    Icon,
    Tabs,
    Tab,
    MenuItem,
    FormControl,
    Select,
    Card,
    Fab,
    Grid,
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
    const [platformIcon, setplatformIcon] = useState('');
    const [platformColor, setplatformColor] = useState('');
    const [APIData, setAPIData] = useState([]);
    const [obj1, setObj1] = useState(null);
    const [show, setShow] = useState(false);
    const [value, setValue] = useState(0);
    const items = localStorage.getItem('accessToken');

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
            .post(`http://35.89.6.16:4002/api/mastersUpsert`, PlatformPayload,
                { headers: { "x-access-token": items } })
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
        <>
            <Row>
                <Col lg="8">
                    <SimpleCard>
                        <Row >
                            <Col>
                                <Form.Label>Platform Name</Form.Label>
                                <Form.Control
                                    required
                                    onChange={(e) => setInputText(e.target.value)}
                                    value={inputText}
                                    placeholder="Enter the Input Text"
                                />
                            </Col>
                        </Row>
                        <Row className='mt-2'>
                            <Col>
                                <Form.Label>Platform Icon</Form.Label>

                                <Form.Control
                                    required
                                    onChange={(e) => setplatformIcon(e.target.value)}
                                    value={platformIcon}
                                    placeholder="Enter the Input Text"
                                />
                                {/* <FormControl fullWidth>
                                    <Select
                                     defaultValue={ options [0] }
                                        options={options}
                                        onChange={(e) => setplatformIcon(e.target.value)}
                                        // value={platformIcon}
                                        label="Age"
                                    >
                                    </Select>
                                </FormControl> */}
                            </Col>
                        </Row>
                        {/* InstagramIcon */}
                        <Row>
                            <Col>
                                <Form.Label>Platform Color</Form.Label>
                                <FormControl fullWidth>
                                    {/* <InputLabel id="demo-simple-select-label">Platform Icon</InputLabel> */}
                                    <Select
                                        // labelId="demo-simple-select-label"
                                        // id="demo-simple-select"
                                        onChange={(e) => setplatformColor(e.target.value)}
                                        value={platformColor}
                                        label="Age"
                                    >
                                        <MenuItem value='red'>Red</MenuItem>
                                        <MenuItem value='cyan'>Cyan</MenuItem>
                                        <MenuItem value='green'>Green</MenuItem>
                                    </Select>
                                </FormControl>
                                {/* <Form.Label>Color</Form.Label>
                                <Form.Control
                                    required
                                    onChange={(e) => setplatformColor(e.target.value)}
                                    value={platformColor}
                                    placeholder="Enter the Input Text"
                                /> */}
                            </Col>

                        </Row>
                    </SimpleCard>

                </Col>
                <Col lg="4">
                    <Card className="mb-4" height="120px" >
                        <Grid item xs={2} md={2} >
                            <StyledCard elevation={1} style={{ backgroundColor: platformColor }}>
                                <ContentBox>
                                    <FabIcon><Icon className="icon">{platformIcon}</Icon></FabIcon>

                                    <Box ml="12px">
                                        <H3 textcolor={'#fffff'}>{inputText}</H3>

                                        {/* <H1 >Count {inputText}</H1> */}
                                    </Box>
                                </ContentBox>
                            </StyledCard>
                        </Grid>
                    </Card>
                </Col>
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
            </Row>
            {/* <Row>
                <Col>
                    <SimpleCard title="Add Platform ">

                        <Row>


                        </Row>
                       
                    </SimpleCard>
                </Col>
            </Row>
            <br /> */}
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
        </>
    );
};
const StyledCard = styled(Card)(({ theme }) => ({
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '24px !important',
    // background: '#19CABA',
    [theme.breakpoints.down('sm')]: { padding: '16px !important' },
}));
const ContentBox = styled('div')(() => ({
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
}));

const FabIcon = styled(Fab)(() => ({
    width: '44px !important',
    height: '44px !important',
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
