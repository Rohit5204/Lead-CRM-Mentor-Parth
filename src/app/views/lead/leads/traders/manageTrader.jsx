import PropTypes from 'prop-types';
import { styled } from '@mui/system';
import { Tabs, Tab, Box, Typography } from '@mui/material';
import React, { useState } from 'react';

import ClearIcon from '@mui/icons-material/Clear';
import LossTrader from './loss';
import ProfitTrader from './profit';
import { Button, Grid, IconButton } from '@mui/material';
import { Form, InputGroup, Modal } from 'react-bootstrap';
import AddTrader from './addtrader';
import TraderCount from './count';
import FollowUpTrader from './followup';
import RunnerTrader from './runner';

const Container = styled('div')(({ theme }) => ({
    margin: '30px',
    [theme.breakpoints.down('sm')]: { margin: '16px' },
    '& .breadcrumb': {
        marginBottom: '30px',
        [theme.breakpoints.down('sm')]: { marginBottom: '16px' },
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
const ManageTrader = () => {
    const [value, setValue] = useState(0);
    const handleCChange = (event, newValue) => {
        setValue(newValue);
    };
    const [showAdd, setShowAdd] = useState(false);

    const closeAdd = () => setShowAdd(false);
    const openAdd = () => setShowAdd(true);



    return (
        <Container>
            <Box>

                <Grid container spacing={4} sx={{ mb: '24px' }}>

                    <Grid item xs={12} md={10} >
                        <InputGroup className="mb-3">
                            <Form.Control
                                placeholder="Search By Lead Name"
                                aria-label="Recipient's username"
                                aria-describedby="basic-addon2"
                            />
                        </InputGroup>
                    </Grid>
                    <Grid item xs={12} md={2} >
                        <div className="d-flex justify-content-end">
                            <Button variant="contained" color="success" onClick={openAdd}>Add Trader</Button>&nbsp;
                        </div>
                    </Grid>
                </Grid>

                <Grid container spacing={4} sx={{ mb: '24px' }}>

                    <Grid item xs={12} md={12} >
                        <div style={{ textAlign: 'center' }}>
                            <TraderCount fetch={showAdd}></TraderCount>
                        </div>
                    </Grid>
                </Grid>

                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs
                        value={value}
                        onChange={handleCChange}
                        variant="fullWidth"
                        aria-label="basic tabs example"
                    >
                        <Tab label="Profit Trader" {...a11yProps(0)} />
                        <Tab label="Loss Trader" {...a11yProps(1)} />
                        <Tab label="Follow Up" {...a11yProps(2)} />
                        <Tab label="Runner" {...a11yProps(3)} />

                    </Tabs>
                </Box>
                <TabPanel value={value} index={0}>
                    <ProfitTrader fetch={showAdd}></ProfitTrader>
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <LossTrader fetch={showAdd}></LossTrader>
                </TabPanel>
                <TabPanel value={value} index={2}>
                    <FollowUpTrader fetch={showAdd}></FollowUpTrader>
                </TabPanel>
                <TabPanel value={value} index={3}>
                    <RunnerTrader fetch={showAdd}></RunnerTrader>
                </TabPanel>
            </Box>

            <Modal
                backdrop="static"
                keyboard={false}
                show={showAdd}
                onHide={closeAdd}
                animation={false}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header>
                    <Modal.Title>Trader Profit/Loss Records</Modal.Title>
                    <IconButton type="button" onClick={closeAdd}>
                        <ClearIcon />
                    </IconButton>
                </Modal.Header>
                <Modal.Body>
                    <AddTrader handleDialog={closeAdd}></AddTrader>
                </Modal.Body>
            </Modal>
        </Container >

    )
}
export default ManageTrader