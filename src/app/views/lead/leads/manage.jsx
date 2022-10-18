import { styled } from '@mui/system';
import { Breadcrumb, SimpleCard } from 'app/components';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EditUser from './editUser';
import {
  Stack,
  Button,
  DialogActions,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
} from '@mui/material';

const Container = styled('div')(({ theme }) => ({
  margin: '30px',
  [theme.breakpoints.down('sm')]: { margin: '16px' },
  '& .breadcrumb': {
    marginBottom: '30px',
    [theme.breakpoints.down('sm')]: { marginBottom: '16px' },
  },
}));

const Manage = () => {
  const [show, setShow] = useState(false);
  const [obj1, setObj1] = useState(null);
  const [users, setUsers] = useState(null);

  const handleShow = (user) => {
    setObj1(user);
    setShow(true);
  };
  const handleClose = () => {
    setShow(false);
  };
  //get method
  useEffect(() => {
    axios.get(`http://35.89.6.16:4002/api/getMasterData?masterName=usermaster`).then((response) => {
      setUsers(response.data.data);
    });
  }, []);
  //add data in the table
  // const postData = () => {
  //   console.log({
  //     firstName: firstName,
  //     lastName: lastName,
  //     email: eamil,
  //   });
  //   axios
  //     .post(`http://35.89.6.16:4002/api/mastersUpsert`, {
  //       id: 0,
  //       firstName: firstName,
  //       lastName: lastName,
  //       email: eamil,
  //       lastActive: '',
  //       createdBy: 1,
  //     })
  //     .then(() => useEffect);
  // };

  //Edit Method
  const Edit = (user, e) => {
    console.log({
      user,
    });
    e.preventDefault();
    axios
      .post(`http://35.89.6.16:4002/api/userMasterUpsert`, {
        id: user.userId,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        lastActive: null,
        createdBy: 1,
        updatedBy: 1,
      })
      .then(() => useEffect);
    setShow(false);
  };
  return (
    <Container>
      {/* <Box className="breadcrumb">
        <Breadcrumb routeSegments={[{ name: 'LEAD', path: '/lead' }, { name: 'Add Lead Page' }]} />
      </Box> */}

      <Stack spacing={3}>
        <SimpleCard title="User Master Page">
          <button
            className="btn text-warning btn-act"
            onClick={() => handleShow()}
            data-toggle="modal"
          >
            ADD User
          </button>
          <table>
            <thead>
              <tr>
                <th style={{ width: '30%' }}>ID</th>
                <th style={{ width: '30%' }}>Name</th>
                <th style={{ width: '30%' }}>Email</th>
                <th style={{ width: '10%' }}>Action</th>
              </tr>
            </thead>
            <tbody className="text-center">
              {users &&
                users.map((user) => (
                  <tr key={user.userId}>
                    <td>{user.userId}</td>
                    <td>
                      {user.firstName} {user.lastName}
                    </td>
                    <td>{user.email}</td>
                    <td style={{ whiteSpace: 'nowrap' }}>
                      {/* <OverlayTrigger overlay={<Tooltip id={`tooltip-top`}>Edit</Tooltip>}> */}
                      <button
                        className="btn text-warning btn-act"
                        onClick={() => handleShow(user)}
                        data-toggle="modal"
                      >
                        Edit
                      </button>
                      {/* </OverlayTrigger> */}

                      <button
                        // onClick={() => deleteUser(user.userId)}
                        className="btn btn-sm btn-danger btn-delete-user"
                        disabled={user.isDeleting}
                      >
                        {user.isDeleting ? (
                          <span className="spinner-border spinner-border-sm"></span>
                        ) : (
                          <span>Delete</span>
                        )}
                      </button>
                    </td>
                    <Dialog
                      open={show}
                      onClose={handleClose}
                      aria-labelledby="alert-dialog-title"
                      aria-describedby="alert-dialog-description"
                    >
                      <DialogTitle id="alert-dialog-title">{'Edit User Page'}</DialogTitle>
                      <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                          <EditUser theUser={obj1} />
                        </DialogContentText>
                      </DialogContent>
                      <DialogActions>
                        <Button onClick={() => Edit(user)}>Update User</Button>
                        <Button onClick={handleClose} autoFocus>
                          Cancel
                        </Button>
                      </DialogActions>
                    </Dialog>
                  </tr>
                ))}
            </tbody>
          </table>
        </SimpleCard>
      </Stack>
    </Container>
  );
};

export default Manage;
