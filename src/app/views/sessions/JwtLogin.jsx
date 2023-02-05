import { LoadingButton } from '@mui/lab';
import { Card, Checkbox, Grid, IconButton, TextField, FormControl } from '@mui/material';
import { Box, styled, useTheme } from '@mui/system';
import { Paragraph } from 'app/components/Typography';
import useAuth from 'app/hooks/useAuth';
import { Formik } from 'formik';
import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Form, } from 'react-bootstrap';

const FlexBox = styled(Box)(() => ({ display: 'flex', alignItems: 'center' }));

const JustifyBox = styled(FlexBox)(() => ({ justifyContent: 'center' }));

const ContentBox = styled(Box)(() => ({
  height: '100%',
  padding: '24px',
  position: 'relative',
  background: 'rgba(0, 0, 0, 0.01)',
}));

const JWTRoot = styled(JustifyBox)(() => ({
  // background: '#6876b0',
  backgroundImage: "url('/assets/images/backgroundLogo.jpg')",
  minHeight: '100% !important',
  '& .card': {
    maxWidth: 500,
    minHeight: 400,
    margin: '1rem',
    display: 'flex',
    borderRadius: 12,
    alignItems: 'center',
  },
}));

// inital login credentials
const initialValues = {
  userName: '',
  password: '',
  remember: true,
};

// form field validation schema
const validationSchema = Yup.object().shape({
  password: Yup.string()
    .min(6, 'Password must be 6 character length')
    .required('Password is required!'),
  userName: Yup.string()
    .min(3, 'User Name must be 3 character length')
    .required('User Name is required!'),
});

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
  };
  // const handleChange = () => {

  // }
  return (
    <JWTRoot>
      <Card className="card">
        <Grid container>
          <Grid item sm={6} xs={12}>
            <JustifyBox p={4} height="100%" sx={{ minWidth: 320 }} className="ml-5">
              <img src="/assets/images/crmloginlogo.png" width="100%" alt="" />
            </JustifyBox>
          </Grid>
        </Grid>
        <Grid item sm={6} xs={12}>
          <ContentBox>
            <Formik
              // onSubmit={handleFormSubmit}
              initialValues={initialValues}
              validationSchema={validationSchema}
            >
              {/* {({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => ( */}
              <form >
                <Form.Label>Username </Form.Label>
                <TextField
                  fullWidth
                  size="small"
                  type="text"
                  name="userName"
                  label="."
                  variant="outlined"
                  // onBlur={handleBlur}
                  value={userlogin}
                  onChange={(e) => setuserlogin(e.target.value)}
                  // helperText={touched.userName && errors.userName}
                  // error={Boolean(errors.userName && touched.userName)}
                  sx={{ mb: 1 }}
                />

                {/* <TextField
                  fullWidth
                  size="small"
                  name="password"
                  type="password"
                  label="Password"
                  variant="outlined"
                  // onBlur={handleBlur}
                  value={passwordlogin}
                  onChange={(e) => setuserpassword(e.target.value)}
                  // helperText={touched.password && errors.password}
                  // error={Boolean(errors.password && touched.password)}
                  sx={{ mb: 1.5 }}
                /> */}
                <FormControl sx={{ mb: 1, width: "100%" }} variant="outlined" >
                  <Form.Label>Password </Form.Label>
                  <OutlinedInput
                    size="small"
                    id="outlined-adornment-password"
                    onChange={(e) => setuserpassword(e.target.value)}
                    value={passwordlogin}
                    type={showPassword ? 'text' : 'password'}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                    label="h"
                  />
                </FormControl>

                <FlexBox justifyContent="space-between">
                  <FlexBox gap={1}>
                    <Checkbox
                      size="small"
                      name="remember"
                      // onChange={handleChange}
                      // checked={values.remember}
                      sx={{ padding: 0 }}
                    />

                    <Paragraph>Remember Me</Paragraph>
                  </FlexBox>

                  <NavLink
                    to="/session/forgot-password"
                    style={{ color: theme.palette.primary.main }}
                  >
                    Forgot password?
                  </NavLink>
                </FlexBox>

                <LoadingButton
                  style={{ marginLeft: "180px" }}
                  type="submit"
                  color="primary"
                  loading={loading}
                  onClick={handleFormSubmit}
                  variant="contained"
                  sx={{ my: 2 }}
                >
                  Login
                </LoadingButton>

                {/* <Paragraph>
                      Don't have an account?
                      <NavLink
                        to="/session/signup"
                        style={{ color: theme.palette.primary.main, marginLeft: 5 }}
                      >
                        Register
                      </NavLink>
                    </Paragraph> */}
              </form>
              {/* )} */}
            </Formik>
          </ContentBox>

        </Grid>
      </Card>
    </JWTRoot>
  );
};

export default JwtLogin;

