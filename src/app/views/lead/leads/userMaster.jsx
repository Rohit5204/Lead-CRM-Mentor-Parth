import { Breadcrumb, SimpleCard } from 'app/components';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  TextField,
  Stack,
  styled,
  Button,
  FormControl,
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

const UserMaster = () => {
  const [userId, setUserId] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');

  const [userData, setUserData] = useState([]);
  const [show, setShow] = useState(false);
  useEffect(() => {
    axios.get(`http://35.89.6.16:4002/api/getMasterData?masterName=usermaster`).then((response) => {
      setUserData(response.data.data);
    });
  }, []);

  //Add data in the table
  const postData = () => {
    console.log({
      firstName: firstName,
      lastName: lastName,
      email: email,
    });
    axios
      .post(`http://35.89.6.16:4002/api/userMasterUpsert`, {
        id: 0,
        firstName: firstName,
        lastName: lastName,
        email: email,
        createdBy: 1,
        lastActive: '',
      })
      .then(() => useEffect);
  };
  //Delete Object From the Array
  const deleteData = (e, i) => {
    console.log(i);
    axios.post('http://35.89.6.16:4002/api/userMasterUpsert', {
      id: i.userId,
      firstName: i.firstName,
      lastName: i.lastName,
      email: i.email,
      updatedBy: 1,
      createdBy: 1,
      lastActive: '',
    });
  };
  //Update Object in the API Array
  const Edit = (e) => {
    console.log({
      id: userId,
      firstName: firstName,
      lastName: lastName,
      email: email,
    });
    axios
      .post(`http://35.89.6.16:4002/api/userMasterUpsert`, {
        id: userId,
        firstName: firstName,
        lastName: lastName,
        email: email,
        createdBy: 1,
        updatedBy: 1,
        lastActive: '',
      })
      .then(() => useEffect);
    setFirstName('');
    setLastName('');
    setEmail('');
  };
  //Call Data in the Form when Edit Button is trigger
  const updateData = (event, i) => {
    event.preventDefault();
    console.log('Edit Button Call=' + JSON.stringify(i));
    console.log('HELLO');
    setUserId(i.userId);
    setFirstName(i.firstName);
    setLastName(i.lastName);
    setEmail(i.email);
    setShow(!show);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    postData();
    setFirstName('');
    setLastName('');
    setEmail('');
  };
  const handelClose = (e) => {
    setShow(!show);
    e.preventDefault();
    setFirstName('');
    setLastName('');
    setEmail('');
  };
  return (
    <Container>
      <Box className="breadcrumb">
        <Breadcrumb
          routeSegments={[{ name: 'Lead', path: '/leads/addLeads' }, { name: 'User Master Page' }]}
        />
      </Box>

      <Stack>
        <h2 className="ml-5">User Master Page</h2>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={4}>
            <Grid item xs={4}>
              <FormControl sx={{ m: 1, minWidth: 320 }}>
                <TextField
                  name="firstName"
                  label="Enter the First Name"
                  onChange={(e) => setFirstName(e.target.value)}
                  value={firstName}
                />
              </FormControl>
            </Grid>
            <Grid item xs={4}>
              <FormControl sx={{ m: 1, minWidth: 540 }}>
                <TextField
                  name="lastName"
                  label="Enter the Last Name"
                  onChange={(e) => setLastName(e.target.value)}
                  value={lastName}
                />
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl sx={{ m: 1, minWidth: 900 }}>
                <TextField
                  name="email"
                  label="Enter the Email"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                />
                <br />
                <div className="ml-2">
                  {show ? (
                    <Button variant="contained" onClick={Edit}>
                      Update User
                    </Button>
                  ) : (
                    <Button variant="contained" onClick={handleSubmit}>
                      Add User
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
      <h3>User's Details</h3>
      <Box className="text-center" width="100%" overflow="auto">
        <StyledTable>
          <TableHead>
            <TableRow>
              <TableCell align="justify">User Id</TableCell>
              <TableCell align="justify">Name</TableCell>
              <TableCell align="justify">Email</TableCell>
              <TableCell align="center">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {userData.map((subscriber, index) => (
              <TableRow key={index}>
                <TableCell align="justify">{subscriber.userId}</TableCell>
                <TableCell align="justify">
                  {subscriber.firstName} {subscriber.lastName}
                </TableCell>
                <TableCell align="justify">{subscriber.email}</TableCell>
                <TableCell align="center">
                  <IconButton onClick={(event) => updateData(event, subscriber)}>
                    <Icon color="success">edit</Icon>
                  </IconButton>
                  <IconButton onClick={(event) => deleteData(event, subscriber)}>
                    <Icon color="warning">delete</Icon>
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </StyledTable>
      </Box>
    </Container>
  );
};

export default UserMaster;
