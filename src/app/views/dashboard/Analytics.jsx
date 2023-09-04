import { Card, Grid, MenuItem, Select, useTheme, Button } from '@mui/material';
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
import { Col, Row, Form, InputGroup } from 'react-bootstrap';
import React, { useState } from 'react';
import EmployeeDashboard from './EmployeeDashboard';
import EmployeeLine from './shared/EmployeeChart';
import StatusWiseCard from './shared/statusWiseCadr';
import UserWiseCount from './shared/userLoginWiseCount';
import TLWiseCount from './shared/TeamLeadCount';
import EmpWiseCount from './shared/EmpWiseCount';
import TopEmpDetail from './shared/TopEmpDetail';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { styled, alpha } from '@mui/material/styles';
import Menu from '@mui/material/Menu';
import EmpPerformance from './shared/EmpPerformance';

const ContentBox = styled('div')(({ theme }) => ({
  margin: '30px',
  [theme.breakpoints.down('sm')]: { margin: '16px' },
}));

const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    {...props}
  />
))(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color:
      theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
    boxShadow:
      'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
    '& .MuiMenu-list': {
      padding: '4px 0',
    },
    '& .MuiMenuItem-root': {
      '& .MuiSvgIcon-root': {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      '&:active': {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity,
        ),
      },
    },
  },
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
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose5 = () => {
    setAnchorEl(null);
  };

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
        {roleName == "Admin" || "Branch Manager" ? (
          <>
            <Grid container spacing={4}>

              <Grid item xs={12} md={6}>
                <SimpleCard>

                  <Form.Label htmlFor="basic-url">Apply Date Range</Form.Label>
                  <InputGroup>
                    <Form.Control
                      value={startDate}
                      onChange={(e) => setstartDate(e.target.value)}
                      type="date" />
                    <Form.Control
                      value={endDate}
                      onChange={(e) => setendDate(e.target.value)}
                      type="date" />&nbsp;
                    <Button variant='contained'
                      value={onType}
                      onClick={() => setOnType('DATE')}>
                      Search
                    </Button>

                  </InputGroup>

                </SimpleCard>
              </Grid>

              <Grid item xs={12} md={6}>
                <SimpleCard>
                  {/* <Grid container spacing={4}>

                    <Grid item xs={12} md={8}>
                      <img width={'350px'} height={'100%'} src="/assets/images/banner table.png" alt="">

                      </img>
                    </Grid>
                    <Grid item xs={12} md={4}> */}
                  <div className="d-flex justify-content-end">
                    <Button
                      style={{ marginTop: '31px' }}
                      id="demo-customized-button"
                      size='large'
                      aria-controls={open ? 'demo-customized-menu' : undefined}
                      aria-haspopup="true"
                      aria-expanded={open ? 'true' : undefined}
                      variant="contained"
                      disableElevation
                      onClick={handleClick}
                      endIcon={<KeyboardArrowDownIcon />}
                    >
                      Apply Filter
                    </Button>
                    <StyledMenu
                      id="demo-customized-menu"
                      MenuListProps={{
                        'aria-labelledby': 'demo-customized-button',
                      }}
                      className="d-flex justify-content-end"
                      anchorEl={anchorEl}
                      open={open}
                      onClose={handleClose5}
                    >
                      <MenuItem
                        onClick={() => { setOnType('DEFAULT'); handleClose5() }} disableRipple>
                        DEFAULT
                      </MenuItem>
                      <MenuItem
                        onClick={() => { setOnType('LASTDAY'); handleClose5() }} disableRipple>
                        LASTDAY
                      </MenuItem>
                      <MenuItem
                        onClick={() => { setOnType('LASTWEEK'); handleClose5() }} disableRipple>
                        LASTWEEK
                      </MenuItem>
                      <MenuItem
                        onClick={() => { setOnType('LASTMONTH'); handleClose5() }} disableRipple>
                        LASTMONTH
                      </MenuItem>
                    </StyledMenu>
                  </div>
                  {/* </Grid>
                  </Grid> */}
                </SimpleCard>
              </Grid>

            </Grid>

            <br></br>
            <SimpleCard>

              {/* Tab Section */}
              {(function () {
                if (roleName == "Admin") {
                  return <>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                      <Tabs value={value} onChange={handleCChange} variant="fullWidth" aria-label="basic tabs example">
                        <Tab label="Total Lead" {...a11yProps(0)} />
                        <Tab label="Label Wise" {...a11yProps(1)} />
                        <Tab label="Status Wise" {...a11yProps(2)} />
                        <Tab label="Branch Wise" {...a11yProps(3)} />
                        <Tab label="Top 3 Employee" {...a11yProps(4)} />
                      </Tabs>
                    </Box>
                    <TabPanel value={value} index={0}>
                      <div className='grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5'>
                        <StatCards showData={dashboard} />
                      </div>

                    </TabPanel>
                    <TabPanel value={value} index={1}>
                      <LabelWiseCount showData={dashboard} />
                    </TabPanel>
                    <TabPanel value={value} index={2}>
                      <StatusWiseCard showData={dashboard} />
                    </TabPanel>
                    <TabPanel value={value} index={3}>
                      <UserWiseCount />
                    </TabPanel>
                    <TabPanel value={value} index={4}>
                      <TopEmpDetail showData={dashboard}></TopEmpDetail>
                    </TabPanel>
                  </>
                }
                else if (roleName == "Branch Manager") {
                  return <>
                    <TopEmpDetail showData={dashboard}></TopEmpDetail>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                      <Tabs value={value} onChange={handleCChange} variant="fullWidth" aria-label="basic tabs example">
                        <Tab label="Total Lead" {...a11yProps(0)} />
                        <Tab label="Label Wise" {...a11yProps(1)} />
                        <Tab label="Status Wise" {...a11yProps(2)} />
                        <Tab label="Team Lead Wise" {...a11yProps(3)} />
                      </Tabs>
                    </Box>
                    <TabPanel value={value} index={0}>
                      <StatCards showData={dashboard} />
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                      <LabelWiseCount showData={dashboard} />
                    </TabPanel>
                    <TabPanel value={value} index={2}>
                      <StatusWiseCard showData={dashboard} />
                    </TabPanel>
                    <TabPanel value={value} index={3}>
                      <TLWiseCount />
                    </TabPanel>
                  </>
                }
                else if (roleName == "Team Lead") {
                  return <>
                    <TopEmpDetail showData={dashboard}></TopEmpDetail>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                      <Tabs value={value} onChange={handleCChange} variant="fullWidth" aria-label="basic tabs example">
                        <Tab label="Total Lead" {...a11yProps(0)} />
                        <Tab label="Label Wise" {...a11yProps(1)} />
                        <Tab label="Status Wise" {...a11yProps(2)} />
                        <Tab label="Employee Wise" {...a11yProps(3)} />
                      </Tabs>
                    </Box>
                    <TabPanel value={value} index={0}>
                      <StatCards showData={dashboard} />
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                      <LabelWiseCount showData={dashboard} />
                    </TabPanel>
                    <TabPanel value={value} index={2}>
                      <StatusWiseCard showData={dashboard} />
                    </TabPanel>
                    <TabPanel value={value} index={3}>
                      <EmpWiseCount />
                    </TabPanel>
                  </>
                }
                else {
                  return <>
                    <TopEmpDetail showData={dashboard}></TopEmpDetail>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                      <Tabs value={value} onChange={handleCChange} variant="fullWidth" aria-label="basic tabs example">
                        <Tab label="Total Lead" {...a11yProps(0)} />
                        <Tab label="Label Wise" {...a11yProps(1)} />
                        <Tab label="Status Wise" {...a11yProps(2)} />
                      </Tabs>
                    </Box>
                    <TabPanel value={value} index={0}>
                      <StatCards showData={dashboard} />
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                      <LabelWiseCount showData={dashboard} />
                    </TabPanel>
                    <TabPanel value={value} index={2}>
                      <StatusWiseCard showData={dashboard} />
                    </TabPanel>
                  </>
                }
              })()}

            </SimpleCard>
            <br></br>
            <SimpleCard title="Employee Wise Performance">
              <EmpPerformance></EmpPerformance>
            </SimpleCard>
            <br></br>
            <Grid container spacing={0}>
              <Grid item lg={12} md={8} sm={12} xs={12}>
                <SimpleCard backgroundColor="green" title="Platform Wise Count" >
                  <StatCards2 showData={dashboard} ></StatCards2>
                </SimpleCard>
              </Grid>
            </Grid>
          </>
        ) : (<>
          <EmployeeDashboard />
        </>)}
      </ContentBox>
    </Fragment >
  );
};


export default Analytics;
