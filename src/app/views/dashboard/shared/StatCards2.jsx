import { Card, Fab, Grid, Icon, lighten, styled, useTheme } from '@mui/material';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const StatCards2 = () => {
  const { palette } = useTheme();
  const textError = palette.error.main;
  const bgError = lighten(palette.error.main, 0.85);
  const [onType, setOnType] = useState('DEFAULT');
  const [APIData, setAPIData] = useState([]);
  useEffect(() => {
    const items = localStorage.getItem('accessToken');
    axios.post(`http://35.89.6.16:4002/api/getDashboardData`, {
      opType: onType,
      fromDate: "",
      toDate: "",
      empId: 0
    }, { headers: { "x-access-token": items } })
      .then((response) => {
        setAPIData(response.data.data);
      });
  }, [APIData]);

  return (
    <Grid container spacing={3} sx={{ mb: 3 }}>
      {APIData.map((item, index) => (
        <Grid item xs={12} md={6} key={index}>

          <Card elevation={3} sx={{ p: 2, backgroundColor: '#3b5998' }}>
            <ContentBox>
              <FabIcon size="medium" sx={{ background: 'bgError' }}>
                <Icon sx={{ color: '#08ad6c' }}>trending_up</Icon>
              </FabIcon>
              <H3 textcolor={'#FFFFFF'}>{item.platformName}</H3>
            </ContentBox>

            <ContentBox sx={{ pt: 2 }}>
              <H1>{item.count}</H1>
              {/* <IconBox sx={{ background: 'rgba(9, 182, 109, 0.15)' }}>
                <Icon className="icon">expand_less</Icon>
              </IconBox>
              <Span textcolor={'#FFFFFF'}>(+21%)</Span> */}
            </ContentBox>
          </Card>
        </Grid>
      ))}

      {/* <Grid item xs={12} md={6}>
        <Card elevation={3} sx={{ p: 2, backgroundColor: '#feda75' }}>
          <ContentBox>
            <FabIcon size="medium" sx={{ background: bgError, overflow: 'hidden' }}>
              <Icon sx={{ color: textError }}>star_outline</Icon>
            </FabIcon>
            <H3 textcolor="#FFFFFF">Instagram</H3>
          </ContentBox>

          <ContentBox sx={{ pt: 2 }}>
            <H1>$2.8M</H1>
            <IconBox sx={{ background: bgError }}>
              <Icon className="icon">expand_less</Icon>
            </IconBox>
            <Span textcolor="#FFFFFF">(+21%)</Span>
          </ContentBox>
        </Card>
      </Grid>
      <Grid item xs={12} md={6}>
        <Card elevation={3} sx={{ p: 2, backgroundColor: '#FFB6C1' }}>
          <ContentBox>
            <FabIcon size="medium" sx={{ background: bgError, overflow: 'hidden' }}>
              <Icon sx={{ color: textError }}>star_outline</Icon>
            </FabIcon>
            <H3 textcolor="#FFFFFF">India Mart</H3>
          </ContentBox>

          <ContentBox sx={{ pt: 2 }}>
            <H1>$2.8M</H1>
            <IconBox sx={{ background: bgError }}>
              <Icon className="icon">expand_less</Icon>
            </IconBox>
            <Span textcolor="#FFFFFF">(+21%)</Span>
          </ContentBox>
        </Card>
      </Grid>
      <Grid item xs={12} md={6}>
        <Card elevation={3} sx={{ p: 2, backgroundColor: '#25D366' }}>
          <ContentBox>
            <FabIcon size="medium" sx={{ background: bgError, overflow: 'hidden' }}>
              <Icon sx={{ color: textError }}>expand_less</Icon>
            </FabIcon>
            <H3 textcolor="#FFFFFF">Whatsapp</H3>
          </ContentBox>

          <ContentBox sx={{ pt: 2 }}>
            <H1>$2.8M</H1>
            <IconBox sx={{ background: bgError }}>
              <Icon className="icon">expand_less</Icon>
            </IconBox>
            <Span textcolor="#FFFFFF">(+21%)</Span>
          </ContentBox>
        </Card>
      </Grid> */}
    </Grid>
  );
};
const ContentBox = styled('div')(() => ({
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
}));

const FabIcon = styled(Fab)(() => ({
  width: '44px !important',
  height: '44px !important',
  boxShadow: 'none !important',
}));

const H3 = styled('h3')(({ textcolor }) => ({
  margin: 0,
  color: textcolor,
  fontWeight: '500',
  marginLeft: '12px',
}));

const H1 = styled('h1')(({ theme }) => ({
  margin: 0,
  flexGrow: 1,
  color: theme.palette.text.secondary,
}));

const Span = styled('span')(({ textcolor }) => ({
  fontSize: '13px',
  color: textcolor,
  marginLeft: '4px',
}));

const IconBox = styled('div')(() => ({
  width: 16,
  height: 16,
  color: '#1e55c7',
  display: 'flex',
  overflow: 'hidden',
  borderRadius: '300px ',
  justifyContent: 'center',
  '& .icon': { fontSize: '14px' },
}));
export default StatCards2;
