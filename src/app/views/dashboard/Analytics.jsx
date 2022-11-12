import { Card, Grid, styled, useTheme } from '@mui/material';
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
import InputGroup from 'react-bootstrap/InputGroup';
import LineGraph from './shared/LineGraph';
import React, { useState, useEffect } from 'react';
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
  const [obj1, setObj1] = useState(null);
  const { palette } = useTheme();
  const theme = useTheme();
  return (
    <Fragment>
      <ContentBox className="analytics">
        <SimpleCard title="Dashboard">
          <SimpleCard>
            <Row>
              <Col>
                <Form.Label htmlFor="basic-url">Apply Filter Search</Form.Label>
                <br></br>
                <button type="button" className="btn btn-outline-success">
                  Last Day
                </button>
                &nbsp;
                <button type="button" className="btn btn-outline-success">
                  Last Week
                </button>
                &nbsp;
                <button type="button" className="btn btn-outline-success">
                  Last Month
                </button>
                &nbsp;
              </Col>
              <Col>
                <Form.Label htmlFor="basic-url">{''}</Form.Label>
                <InputGroup className="mb-3">
                  <InputGroup.Text id="basic-addon3">Select Date Range</InputGroup.Text>
                  <Form.Control id="basic-url" aria-describedby="basic-addon3" type="date" />
                  <Form.Control id="basic-url" aria-describedby="basic-addon3" type="date" />
                </InputGroup>
              </Col>
            </Row>
          </SimpleCard>
          <br></br>
          <Tabs defaultActiveKey="home" id="justify-tab-example" className="mb-3 ml-8">
            <Tab eventKey="home" title="Total Lead">
              <StatCards />
            </Tab>
            <Tab eventKey="profile" title="Platform Wise">
              <StatCards2 />
            </Tab>
          </Tabs>
        </SimpleCard>
        <br></br>
        <Grid container spacing={3}>
          <Grid item lg={8} md={8} sm={12} xs={12}>
            <Title>Monthly Leads</Title>
            <LineGraph
              height="350px"
              color={[theme.palette.primary.main, theme.palette.primary.light]}
            />
            <br></br>
            {/* <RowCards /> */}
          </Grid>

          <Grid item lg={4} md={4} sm={12} xs={12}>
            <Card sx={{ px: 3, py: 2, mb: 3 }}>
              <Title>Total Yearly Leads</Title>
              <SubTitle>Last 365 days</SubTitle>

              <DoughnutChart
                height="300px"
                color={[palette.primary.dark, palette.primary.main, palette.primary.light]}
              />
            </Card>
          </Grid>
        </Grid>
        <Campaigns />
      </ContentBox>
    </Fragment>
  );
};

export default Analytics;
