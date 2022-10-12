import * as React from 'react';
import { Box, Grid, FormControl, TextField, Typography } from '@mui/material';

import { useState } from 'react';

const EditUser = ({ theUser }) => {
  const id = theUser.userId;
  const [firstName, setFirstName] = useState(theUser.firstName);
  const [email, setEmail] = useState(theUser.email);
  const [lastName, setLastName] = useState(theUser.lastName);

  const UpdateUser = { firstName, email, lastName };

  const handleSubmit = (e) => {
    e.preventDefault();
    UpdateUser(id, UpdateUser);
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Typography component="span">
        <Grid container spacing={2} onSubmit={handleSubmit}>
          <Grid item xs={6} md={5}>
            <FormControl sx={{ m: 1, minWidth: 100 }}>
              <TextField
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                type="fname"
                placeholder="Enter First Name"
              />
            </FormControl>
          </Grid>
          <Grid item xs={6} md={7}>
            <FormControl sx={{ m: 1, minWidth: 250 }}>
              <TextField
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                type="lname"
                placeholder="Enter Last Name"
              />
            </FormControl>
          </Grid>
          <Grid item xs={6} md={7}>
            <FormControl sx={{ m: 1, minWidth: 480 }}>
              <TextField
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="Enter the Email"
              />
            </FormControl>
          </Grid>
        </Grid>
      </Typography>
    </Box>
  );
};

export default EditUser;
