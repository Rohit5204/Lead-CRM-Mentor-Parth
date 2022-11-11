import { Tab, Tabs } from 'react-bootstrap';
import { styled } from '@mui/system';
import { Breadcrumb } from 'app/components';
import { Box } from '@mui/material';
import PlatformMaster from './systemMaster/platformMaster';
import AssignMaster from './systemMaster/assignMaster';
import LabelMaster from './systemMaster/labelMaster';
import StatusMaster from './systemMaster/statusMaster';


const Container = styled('div')(({ theme }) => ({
    margin: '30px',
    [theme.breakpoints.down('sm')]: { margin: '16px' },
    '& .breadcrumb': {
        marginBottom: '30px',
        [theme.breakpoints.down('sm')]: { marginBottom: '16px' },
    },
}));

function ManageMaster() {
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
                <Box> <Tabs
                    defaultActiveKey="home"
                    id="fill-tab-example"
                    className="mb-3"
                    fill
                >
                    <Tab eventKey="home" title="Platform Master">
                        <PlatformMaster />
                    </Tab>
                    <Tab eventKey="profile" title="Assign Master">
                        <AssignMaster />
                    </Tab>
                    <Tab eventKey="longer-tab" title="Label Master">
                        <LabelMaster />
                    </Tab>
                    <Tab eventKey="contact" title="Status Master">
                        <StatusMaster />
                    </Tab>
                </Tabs></Box>
            </Box></Container>
    );
}

export default ManageMaster;