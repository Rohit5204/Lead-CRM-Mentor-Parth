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
import FinanceHead from '../../assets/FinanceHead.png'
import FinanceStock from '../../assets/FinanceStock.png'
import { Container, Row, Col, Form, Button } from 'react-bootstrap';

const FlexBox = styled(Box)(() => ({ display: 'flex', alignItems: 'center' }));

const JustifyBox = styled(FlexBox)(() => ({ justifyContent: 'center' }));

const ContentBox = styled(Box)(() => ({
  height: '50%',
  padding: '24px',
  position: 'relative',
  background: 'rgba(0, 0, 0, 0.01)',
  backgroundColor: 'white'
}));

const JWTRoot = styled(JustifyBox)(() => ({
  // background: '#6876b0',
  backgroundImage: "url('/assets/images/FinanceStock.png')",
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
    <>
      {/* #1F6599 */}
      <div style={{ backgroundColor: '#187BB7', width: '100%', height: '100%' }}>
        <Container>

          <Row>
            <Col md={7} style={{ alignItems: 'baseline' }}>
              <img src={FinanceStock} alt="" style={{ marginLeft: '-225px', marginTop: '50px' }} width='622px' />
            </Col>
            <Col md={5} style={{ marginTop: '80px' }}>

              <b ><Form.Label style={{ fontSize: '38px', color: 'white' }}>Get Ready </Form.Label>
                < Form.Label style={{ fontSize: '38px', color: 'white' }}>To Manage Leads</Form.Label>
                <Form.Label style={{ fontSize: '38px', color: 'white' }}>Smarter, Better & Faster</Form.Label></b>

              <Formik
                // onSubmit={handleFormSubmit}
                initialValues={initialValues}
                validationSchema={validationSchema}
              >
                {/* {({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => ( */}
                <form >
                  <br />
                  <Form.Label style={{ fontSize: '20px', color: 'white', fontFamily: 'sans-serif' }}>Username </Form.Label>
                  <TextField
                    fullWidth
                    width={'100px'}
                    size="large"
                    type="text"
                    name="userName"
                    label="."
                    variant="outlined"
                    InputProps={{
                      style: {
                        borderRadius: 20, // or any other value you like
                        backgroundColor: 'white'
                      },
                    }}
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
                    <Form.Label style={{ fontSize: '20px', color: 'white', fontFamily: 'sans-serif' }}>Password </Form.Label>
                    {/* <OutlinedInput
                      size="large"
                      id="outlined-adornment-password"
                      onChange={(e) => setuserpassword(e.target.value)}
                      value={passwordlogin}
                      inputProps={{
                        style: {
                          borderRadius: 20,
                        },
                      }}
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
                    /> */}
                    <TextField
                      fullWidth
                      width={'100px'}
                      size="large"
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      label="."
                      variant="outlined"
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
                          borderRadius: 20, // or any other value you like
                          backgroundColor: 'white'
                        }
                      }}


                      // onBlur={handleBlur}
                      onChange={(e) => setuserpassword(e.target.value)}
                      value={passwordlogin}
                      // helperText={touched.userName && errors.userName}
                      // error={Boolean(errors.userName && touched.userName)}
                      sx={{ mb: 1 }}
                    />
                  </FormControl>

                  <FlexBox justifyContent="space-between" style={{ marginTop: '25px' }}>
                    <FlexBox gap={1}>
                      <Checkbox
                        size="small"
                        name="remember"
                        style={{ color: 'white' }}
                        // onChange={handleChange}
                        // checked={values.remember}
                        sx={{ padding: 0 }}
                      />

                      <Paragraph style={{ fontSize: '15px', color: 'white', fontFamily: 'sans-serif' }}>Remember Me</Paragraph>
                    </FlexBox>

                    <NavLink
                      to="/session/forgot-password"
                      style={{ fontSize: '15px', color: 'white', fontFamily: 'sans-serif' }}
                    >
                      Forgot password?
                    </NavLink>
                  </FlexBox>

                  <LoadingButton
                    type="submit"
                    loading={loading}
                    onClick={handleFormSubmit}
                    style={{ width: "455px", borderRadius: 20, fontFamily: 'sans-serif' }}
                    variant="contained" sx={{ color: 'secondary', bgcolor: '#EF3139', my: 5 }}
                  >
                    Login
                  </LoadingButton>
                </form>
              </Formik>
            </Col>
          </Row>
        </Container>
        <br>
        </br>
        <br>
        </br><br>
        </br>
        <br>
        </br>
        <br>
        </br>
        <Row>
          <Col className="d-flex justify-content-center">
            <img src={FinanceHead} alt="" width='18%' />
          </Col>
        </Row>
      </div>

    </>
  );
};

export default JwtLogin;

