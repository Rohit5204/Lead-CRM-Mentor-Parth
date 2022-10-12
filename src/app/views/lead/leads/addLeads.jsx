import { Stack } from '@mui/material';
import { styled } from '@mui/system';
import { Breadcrumb, SimpleCard } from 'app/components';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import {
  TextField,
  InputLabel,
  MenuItem,
  Button,
  FormControl,
  Select,
  Box,
  Icon,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  Grid,
  TableRow,
} from '@mui/material';

const Container = styled('div')(({ theme }) => ({
  margin: '30px',
  [theme.breakpoints.down('sm')]: { margin: '16px' },
  '& .breadcrumb': {
    marginBottom: '30px',
    [theme.breakpoints.down('sm')]: { marginBottom: '16px' },
  },
}));

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
const LeadForm = () => {
  const [masterName, setMasterName] = useState('platform');
  const [inputText, setInputText] = useState('');
  const [id, setId] = useState(null);
  const [APIData, setAPIData] = useState([]);
  const [edit, setEdit] = useState(false);

  useEffect(() => {
    axios
      .get(`http://35.89.6.16:4002/api/getMasterData?masterName=platformmaster`)
      .then((response) => {
        setAPIData(response.data.data);
      });
  }, [APIData]);

  //add data in the table
  const postData = () => {
    console.log({
      masterName: masterName,
      inputText: inputText,
    });
    axios
      .post(`http://35.89.6.16:4002/api/mastersUpsert`, {
        id: 0,
        masterName: masterName,
        inputText: inputText,
        recodStatus: 1,
        addedBy: 1,
        updatedBy: 1,
      })
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
    });
  };
  const Edit = (e) => {
    console.log({
      masterName: masterName,
      inputText: inputText,
    });
    e.preventDefault();
    axios
      .post(`http://35.89.6.16:4002/api/mastersUpsert`, {
        id: id,
        masterName: masterName,
        inputText: inputText,
        recodStatus: 1,
        addedBy: 1,
        updatedBy: 1,
      })
      .then(() => useEffect);
    setInputText('');
  };
  const updateData = (event, i) => {
    event.preventDefault();
    setEdit(!edit);
    setId(i.id);
    setMasterName(masterName);
    setInputText(i.platformName);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    postData();
    setInputText('');
  };
  const [value, setValue] = useState(0);

  const handleCChange = (event, newValue) => {
    setValue(newValue);
  };
  const handelClose = (e) => {
    setEdit(!edit);
    e.preventDefault();
    setInputText('');
  };
  return (
    <Container>
      <Box className="breadcrumb">
        <Breadcrumb
          routeSegments={[{ name: 'Lead', path: '/leads/addLeads' }, { name: 'Add Lead Page' }]}
        />
      </Box>
      {/* Form Section */}
      <Stack>
        <h2 className="ml-5">System Master Page</h2>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={4}>
            <Grid item xs={4}>
              <FormControl sx={{ m: 1, minWidth: 320 }}>
                <InputLabel id="demo-simple-select-helper-label">System Master</InputLabel>
                <Select
                  labelId="demo-simple-select-helper-label"
                  id="demo-simple-select-helper"
                  value={masterName}
                  label="System Master"
                  onChange={(e) => setMasterName(e.target.value)}
                >
                  <MenuItem value="platform">Platform</MenuItem>
                  <MenuItem value="assign">Assign</MenuItem>
                  <MenuItem value="label">Label</MenuItem>
                  <MenuItem value="status">Status</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl sx={{ m: 1, minWidth: 620 }}>
                <TextField
                  name="inputText"
                  label="Enter the Name"
                  onChange={(e) => setInputText(e.target.value)}
                  value={inputText}
                />
                <br />
                <div className="ml-2">
                  {edit ? (
                    <Button variant="contained" onClick={Edit}>
                      Update Lead
                    </Button>
                  ) : (
                    <Button variant="contained" onClick={handleSubmit}>
                      Add Lead
                    </Button>
                  )}
                  &nbsp;
                  <Button variant="contained" onClick={handelClose}>
                    Cancel
                  </Button>
                </div>
              </FormControl>
            </Grid>
          </Grid>
        </Box>

        <br />
      </Stack>
      <h3>Lead Details</h3>
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
                        <IconButton onClick={(event) => updateData(event, subscriber)}>
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
                        <IconButton onClick={(event) => updateData(event, subscriber)}>
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
    </Container>
  );
};

export default LeadForm;
