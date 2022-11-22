import { LoadingButton } from '@mui/lab';
import { Card, Checkbox, Grid, TextField } from '@mui/material';
import { Box, styled, useTheme } from '@mui/system';
import { Paragraph } from 'app/components/Typography';
import useAuth from 'app/hooks/useAuth';
import { Formik } from 'formik';
import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

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
  backgroundImage: "url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1G5nMDSg6MLYj55AFZPe5S08EaWc3s1ltjg&usqp=CAU')",
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
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();

  const handleFormSubmit = async (values) => {
    setLoading(true);
    try {
      await login(values.userName, values.password);
      navigate('/');
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
              <img src="data:image/png;base64,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" width="100%" alt="" />
            </JustifyBox>
          </Grid>
        </Grid>
        <Grid item sm={6} xs={12}>
          <ContentBox>
            <Formik
              onSubmit={handleFormSubmit}
              initialValues={initialValues}
              validationSchema={validationSchema}
            >
              {({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => (
                <form onSubmit={handleSubmit}>
                  <TextField
                    fullWidth
                    size="small"
                    type="text"
                    name="userName"
                    label="UserName"
                    variant="outlined"
                    onBlur={handleBlur}
                    value={values.userName}
                    onChange={handleChange}
                    helperText={touched.userName && errors.userName}
                    error={Boolean(errors.userName && touched.userName)}
                    sx={{ mb: 3 }}
                  />

                  <TextField
                    fullWidth
                    size="small"
                    name="password"
                    type="password"
                    label="Password"
                    variant="outlined"
                    onBlur={handleBlur}
                    value={values.password}
                    onChange={handleChange}
                    helperText={touched.password && errors.password}
                    error={Boolean(errors.password && touched.password)}
                    sx={{ mb: 1.5 }}
                  />

                  <FlexBox justifyContent="space-between">
                    <FlexBox gap={1}>
                      <Checkbox
                        size="small"
                        name="remember"
                        onChange={handleChange}
                        checked={values.remember}
                        sx={{ padding: 0 }}
                      />

                      <Paragraph>Remember Me</Paragraph>
                    </FlexBox>

                    {/* <NavLink
                        to="/session/forgot-password"
                        style={{ color: theme.palette.primary.main }}
                      >
                        Forgot password?
                      </NavLink> */}
                  </FlexBox>

                  <LoadingButton
                    style={{ marginLeft: "140px" }}
                    type="submit"
                    color="primary"
                    loading={loading}
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
              )}
            </Formik>
          </ContentBox>

        </Grid>
      </Card>
    </JWTRoot>
  );
};

export default JwtLogin;

