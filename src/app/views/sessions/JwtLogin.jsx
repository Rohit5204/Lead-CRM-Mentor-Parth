import { LoadingButton } from '@mui/lab';
import { Grid, IconButton, TextField, } from '@mui/material';
import { Box, useTheme } from '@mui/system';
import useAuth from 'app/hooks/useAuth';
import React, { useState } from 'react';
import Paper from '@mui/material/Paper';
import { NavLink } from 'react-router-dom';

import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import FinanceHead from '../../assets/FinanceHead.png'
import CssBaseline from '@mui/material/CssBaseline';
import { Form } from 'react-bootstrap';
import Avatar from '@mui/material/Avatar';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';


const theme = createTheme();

const JwtLogin = () => {
  const theme = useTheme();
  const [userlogin, setuserlogin] = useState("");
  const [passwordlogin, setuserpassword] = useState("");
  const [loading, setLoading] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const { login } = useAuth();

  const handleFormSubmit = async () => {
    setLoading(true);
    try {
      await login(userlogin, passwordlogin);
    } catch (e) {
      setLoading(false);
    }
  }; const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
  };

  return (
    <>
      <ThemeProvider theme={theme}>
        <Grid container component="main" sx={{ height: '100vh' }}>
          <CssBaseline />
          <Grid
            item
            xs={false}
            sm={4}
            md={7}
            sx={{
              backgroundImage: 'url(/assets/images/FinanceStock.png)',
              backgroundRepeat: 'no-repeat',
              backgroundColor: (t) =>
                t.palette.mode === 'green' ? '#187BB7' : '#187BB7',
              backgroundSize: '80%',
              backgroundPosition: 'center',
            }}
          />
          {/* component={Paper} */}
          <Grid item xs={12} sm={8} md={5} elevation={6} square style={{ backgroundColor: '#187BB7' }}>
            <Box
              sx={{
                my: 8,
                mx: 4,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >

              {/* <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Sign in
              </Typography> */}
              <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                <b style={{ alignItems: 'left' }}>
                  <Form.Label style={{ fontSize: '30px', color: 'white' }}>Get Ready </Form.Label><br></br>
                  <Form.Label style={{ fontSize: '30px', color: 'white' }}>To Manage Leads</Form.Label><br></br>
                  <Form.Label style={{ fontSize: '30px', color: 'white' }}>Smarter, Better & Faster</Form.Label><br></br><br></br>
                </b>
                <Form.Label style={{ fontSize: '20px', color: 'white', fontFamily: 'sans-serif', marginTop: '2px' }}>UserName </Form.Label>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="."
                  name="email"
                  autoComplete="email"
                  autoFocus
                  value={userlogin}
                  onChange={(e) => setuserlogin(e.target.value)}
                  InputProps={{
                    style: {
                      borderRadius: 20,
                      backgroundColor: 'white'
                    },
                  }}
                />
                <Form.Label style={{ fontSize: '20px', color: 'white', fontFamily: 'sans-serif' }}>Password </Form.Label>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="."
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  onChange={(e) => setuserpassword(e.target.value)}
                  value={passwordlogin}
                  InputProps={{
                    endAdornment: (

                      <InputAdornment position="end">
                        <IconButton
                          style={{ color: '#187BB7' }}
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                    style: {
                      borderRadius: 20,
                      backgroundColor: 'white'
                    }
                  }}
                />


                <Grid container style={{ marginTop: '5px' }}>
                  <Grid item xs>
                    <NavLink
                      to="/session/forgot-password"
                      style={{ fontSize: '15px', color: 'white', fontFamily: 'sans-serif' }}
                    >
                      Forgot password?
                    </NavLink>
                  </Grid>
                  <Grid item>

                  </Grid>
                </Grid>
                <LoadingButton
                  type="submit"
                  loading={loading}
                  onClick={handleFormSubmit}
                  style={{ width: "100%", borderRadius: 20, fontFamily: 'sans-serif' }}
                  variant="contained" sx={{ color: 'secondary', bgcolor: '#EF3139', my: 5 }}
                >
                  Login
                </LoadingButton>
                <div className="d-flex justify-content-center ">
                  <img src={FinanceHead} alt="" width='45%' />
                </div>

              </Box>
            </Box>
          </Grid>
        </Grid>
      </ThemeProvider>

    </>
  );
};

export default JwtLogin;

