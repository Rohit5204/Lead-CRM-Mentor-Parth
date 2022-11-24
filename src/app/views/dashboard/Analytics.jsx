import { Card, Grid, styled, useTheme, Icon, IconButton } from '@mui/material';
import { Fragment } from 'react';
import Campaigns from './shared/Campaigns';
import DoughnutChart from './shared/Doughnut';
import { SimpleCard } from 'app/components';
import RowCards from './shared/RowCards';
import StatCards from './shared/StatCards';
import StatCards2 from './shared/StatCards2';
import TopSellingTable from './shared/TopSellingTable';
import UpgradeCard from './shared/UpgradeCard';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { Col, Row } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import { InputGroup, Button } from 'react-bootstrap';
import LineGraph from './shared/LineGraph';
import SampleLine from './shared/MixedGraph';
import React, { useState, useEffect } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import EmployeeDashboard from './EmployeeDashboard';
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

const Analytics = () => {

  // const passObjectData1 = (startDate, endDate, onType) => {

  // }
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
  const roleName = window.localStorage.getItem('roleName');
  const userName = window.localStorage.getItem('userName');

  return (
    <Fragment>
      <ContentBox className="analytics">
        {roleName == "Admin" ? (<>
          <SimpleCard title="Dashboard">
            <SimpleCard>
              <Row>
                <Col>
                  <Form.Label htmlFor="basic-url">Apply Filter Search</Form.Label>
                  <br></br>
                  <button type="button" className="btn btn-outline-success"
                    value={onType}
                    onClick={() => setOnType('LASTDAY')}>
                    Last Day
                  </button>
                  &nbsp;
                  <button type="button" className="btn btn-outline-success"
                    value={onType}
                    onClick={() => setOnType('LASTWEEK')}>
                    Last Week
                  </button>
                  &nbsp;
                  <button type="button" className="btn btn-outline-success"
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
                    <button type="button" className="btn btn-outline-success"
                      value={onType}
                      onClick={() => setOnType('DATE')}>
                      Search
                    </button>

                  </InputGroup>
                </Col>
              </Row>
            </SimpleCard>
            <br></br>
            {/* Tab Section Start */}
            <Tabs defaultActiveKey="home" id="justify-tab-example" className="mb-3 ml-8">
              <Tab eventKey="home" title="Total Lead">
                <StatCards />
              </Tab>
              <Tab eventKey="profile" title="Platform Wise">
                <StatCards2 showData={dashboard} />
              </Tab>
            </Tabs>
            {/* Tab Section End */}
          </SimpleCard>
          <br></br>
          <Grid container spacing={0}>
            <Grid item lg={12} md={8} sm={12} xs={12}>
              <SimpleCard title="Status Wise Count">
                <StatusWiseCard></StatusWiseCard>
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
        </>) : (<>
          <EmployeeDashboard />
        </>)}
      </ContentBox>
    </Fragment>
  );
};

export default Analytics;
