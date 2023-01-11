import { Card, Grid, styled, useTheme } from '@mui/material';
import { Fragment } from 'react';
import DoughnutChart from './shared/Doughnut';
import { SimpleCard } from 'app/components';
import StatCards from './shared/StatCards';
import StatCards2 from './shared/StatCards2';
import LabelWiseCount from './shared/labelWiseCount';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Col, Row } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import { InputGroup } from 'react-bootstrap';
import LineGraph from './shared/LineGraph';
import SampleLine from './shared/MixedGraph';
import React, { useState } from 'react';
import EmployeeDashboard from './EmployeeDashboard';
import EmployeeLine from './shared/EmployeeChart';
import StatusWiseCard from './shared/statusWiseCadr';

const ContentBox = styled('div')(({ theme }) => ({
  margin: '30px',
  [theme.breakpoints.down('sm')]: { margin: '16px' },
}));

const Title = styled('span')(() => ({
  fontSize: '1rem',
  fontWeight: '500',
  marginRight: '.5rem',
  textTransform: 'capitalize',
}));

const SubTitle = styled('span')(({ theme }) => ({
  fontSize: '0.875rem',
  color: theme.palette.text.secondary,
}));

const H4 = styled('h4')(({ theme }) => ({
  fontSize: '1rem',
  fontWeight: '500',
  marginBottom: '16px',
  textTransform: 'capitalize',
  color: theme.palette.text.secondary,
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
const Analytics = () => {

  const [value, setValue] = useState(0);
  const { palette } = useTheme();
  const theme = useTheme();
  const [startDate, setstartDate] = useState('')
  const [endDate, setendDate] = useState('')
  const [onType, setOnType] = useState('DEFAULT')
  const dashboard = {
    opType: onType,
    fromDate: startDate,
    toDate: endDate,
    empId: 0
  }
  const handleCChange = (event, newValue) => {
    setValue(newValue);
  };
  const roleName = window.localStorage.getItem('roleName');
  const userName = window.localStorage.getItem('userName');

  return (
    <Fragment>
      <ContentBox className="analytics">
        {roleName == "Admin" ? (
          <>
            <SimpleCard title="Dashboard">

              <Row>
                <Col>
                  <Form.Label >Apply Filter Search</Form.Label>
                  <br></br>
                  <button type="button" className="btn btn-outline-primary"
                    value={onType}
                    onClick={() => setOnType('DEFAULT')}>
                    ALL
                  </button>
                  &nbsp;
                  <button type="button" className="btn btn-outline-primary"
                    value={onType}
                    onClick={() => setOnType('LASTDAY')}>
                    Last Day
                  </button>
                  &nbsp;
                  <button type="button" className="btn btn-outline-primary"
                    value={onType}
                    onClick={() => setOnType('LASTWEEK')}>
                    Last Week
                  </button>
                  &nbsp;
                  <button type="button" className="btn btn-outline-primary"
                    value={onType}
                    onClick={() => setOnType('LASTMONTH')}>
                    Last Month
                  </button>
                  &nbsp;
                </Col>
                <Col>
                  <Form.Label htmlFor="basic-url">Apply Date Range</Form.Label>

                  <InputGroup className="mb-3">
                    <Form.Control
                      value={startDate}
                      onChange={(e) => setstartDate(e.target.value)}
                      type="date" />
                    <Form.Control
                      value={endDate}
                      onChange={(e) => setendDate(e.target.value)}
                      type="date" />
                    <button type="button" className="btn btn-outline-primary"
                      value={onType}
                      onClick={() => setOnType('DATE')}>
                      Search
                    </button>

                  </InputGroup>
                </Col>
              </Row>

              <br></br>

              {/* Tab Section */}
              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleCChange} variant="fullWidth" aria-label="basic tabs example">
                  <Tab label="Total Lead" {...a11yProps(0)} />
                  <Tab label="Label Wise" {...a11yProps(1)} />

                  <Tab label="Status Wise" {...a11yProps(2)} />
                  <Tab label="Employee Wise" {...a11yProps(3)} />
                </Tabs>
              </Box>
              <TabPanel value={value} index={0}>
                <StatCards />
              </TabPanel>
              <TabPanel value={value} index={1}>
                <LabelWiseCount />
              </TabPanel>
              <TabPanel value={value} index={2}>
                <StatusWiseCard />
              </TabPanel>
              <TabPanel value={value} index={3}>
                <EmployeeLine />
              </TabPanel>

              {/* Tab Section Start */}
              {/* <Tabs defaultActiveKey="home" id="justify-tab-example" className="mb-3" justify>
                <Tab eventKey="home" title="Total Lead">
                  <StatCards />
                </Tab>&nbsp;
                <Tab eventKey="labelwise" title="Label Wise">
                  <StatCards />
                </Tab>&nbsp;
                <Tab eventKey="empwise" title="Employee Wise">
                  <StatCards />
                </Tab>&nbsp;
                <Tab eventKey="profile" title="Platform Wise">
                  <StatCards2 showData={dashboard} />
                </Tab>
              </Tabs> */}
              {/* Tab Section End */}
            </SimpleCard>
            <br></br>
            <Grid container spacing={0}>
              <Grid item lg={12} md={8} sm={12} xs={12}>
                <SimpleCard backgroundColor="green" title="Platform Wise Count" >
                  <StatCards2 showData={dashboard} ></StatCards2>
                </SimpleCard>
              </Grid>
            </Grid>
            <br />
            <Grid container spacing={0}>
              <Grid item lg={12} md={8} sm={12} xs={12}>
                <SimpleCard title="Lead Wise Chart">
                  <SampleLine></SampleLine></SimpleCard>
              </Grid>
            </Grid>
            <br />
            <Grid container spacing={3}>
              <Grid item lg={8} md={8} sm={12} xs={12}>
                <SimpleCard title="Monthly Leads">
                  <LineGraph
                    height="350px"
                    color={[palette.error.dark, palette.warning.main, palette.success.main]}
                  /></SimpleCard>
                <br></br>
                {/* <RowCards /> */}
              </Grid>
              <Grid item lg={4} md={4} sm={12} xs={12}>
                <Card sx={{ px: 3, py: 2, mb: 3 }}>
                  <Title>Total Yearly Leads</Title>
                  <SubTitle>Last 365 days</SubTitle>

                  <DoughnutChart
                    height="300px"
                    color={[palette.error.main, palette.warning.light, palette.success.light, palette.primary.dark]}
                  />
                </Card>
              </Grid>
            </Grid>
            {/* <Campaigns /> */}
          </>
        ) : (<>
          <EmployeeDashboard />
        </>)}
      </ContentBox>
    </Fragment>
  );
};

export default Analytics;
