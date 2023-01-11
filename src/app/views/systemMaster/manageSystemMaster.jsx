import { styled } from '@mui/system';
import { Breadcrumb } from 'app/components';
import PlatformMaster from './systemMaster/platformMaster/platformMaster';
import AssignMaster from './systemMaster/assignMaster/assignMaster';
import LabelMaster from './systemMaster/labelMaster/labelMaster';
import StatusMaster from './systemMaster/statusMaster/statusMaster';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import React, { useState } from 'react';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

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

function ManageMaster() {
    const [value, setValue] = useState(0);
    const handleCChange = (event, newValue) => {
        setValue(newValue);
    };
    return (
        <Container>
            <Box>
                <Box className="breadcrumb">
                    <Breadcrumb
                        routeSegments={[
                            { name: 'Dashboard', path: '/employees/manageEmployee' },
                            { name: 'Manage System Master' },
                        ]}
                    />
                </Box>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs value={value} onChange={handleCChange} variant="fullWidth" aria-label="basic tabs example">
                        <Tab label="Platform Master" {...a11yProps(0)} />
                        <Tab label="Assign Master" {...a11yProps(1)} />
                        <Tab label="Label Master" {...a11yProps(2)} />
                        <Tab label="Status Master" {...a11yProps(3)} />
                    </Tabs>
                </Box>
                <TabPanel value={value} index={0}>
                    <PlatformMaster />
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <AssignMaster />
                </TabPanel>
                <TabPanel value={value} index={2}>
                    <LabelMaster />
                </TabPanel>
                <TabPanel value={value} index={3}>
                    <StatusMaster />
                </TabPanel>

            </Box>
        </Container >
    );
}

export default ManageMaster;