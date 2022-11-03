import { Card, Grid, styled, useTheme, Box } from '@mui/material';
import { Fragment } from 'react';
import Campaigns from './shared/Campaigns';
import DoughnutChart from './shared/Doughnut';
import { SimpleCard } from 'app/components';
import RowCards from './shared/RowCards';
import StatCards from './shared/StatCards';
import StatCards2 from './shared/StatCards2';
import TopSellingTable from './shared/TopSellingTable';
import UpgradeCard from './shared/UpgradeCard';
import EmployeeCard from './shared/EmployeeCard';
import EmployeeCard1 from './shared/EmployeeCard1';

import { Col, Row, InputGroup, Form, Tab, Tabs } from 'react-bootstrap';

import LineGraph from './shared/LineGraph';

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

const EmployeeDashboard = () => {
  const { palette } = useTheme();
  const theme = useTheme();
  return (
    <Fragment>
      <ContentBox className="analytics">
        <SimpleCard title="Welcome Back, Employee Name">
          <Box className="ml-4">
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
              {/* <Col md="6">
                  <Form.Label htmlFor="basic-url">Search Box</Form.Label>
                  <InputGroup className="mb-3">
                    <Form.Control
                      placeholder="Search Box"
                      aria-label="Recipient's username"
                      aria-describedby="basic-addon2"
                    />
                  </InputGroup>
                </Col> */}
            </Row>
          </Box>

          <br></br>
          <card title="Lead Wise Performance">
            <Row>
              <Col>
                <EmployeeCard />
              </Col>
            </Row>
          </card>
          <SimpleCard title="Platform Wise Performance">
            <Row>
              <Col>
                <EmployeeCard1 />
              </Col>
            </Row>
          </SimpleCard>

          <br></br>
          {/* <Grid container spacing={3}>
            <Grid item lg={8} md={8} sm={12} xs={12}>
              <Title>Monthly Leads</Title>
              <LineGraph
                height="350px"
                color={[theme.palette.primary.main, theme.palette.primary.light]}
              />
              <br></br>
             
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
          <Campaigns /> */}
        </SimpleCard>
      </ContentBox>
    </Fragment>
  );
};

export default EmployeeDashboard;
