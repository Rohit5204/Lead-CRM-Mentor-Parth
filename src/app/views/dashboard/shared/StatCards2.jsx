import { Card, Box, Fab, Grid, Icon, lighten, styled, useTheme } from '@mui/material';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Small } from 'app/components/Typography';



const StatCards2 = (showData) => {
  // console.log(showData.showData)
  const { palette } = useTheme();
  const textError = palette.error.main;
  const bgError = lighten(palette.error.main, 0.85);

  // const [onType, setOnType] = useState(showData.showData);
  const [APIData123, setAPIData123] = useState([]);

  const getDashboardDataFetch = () => {
    const items = localStorage.getItem('accessToken');

    axios.post(`http://213.136.72.177/cms/api/getDashboardData`, {
      opType: showData.showData.opType,
      fromDate: showData.showData.fromDate,
      toDate: showData.showData.toDate,
      empId: 0
    }, { headers: { "x-access-token": items } })
      .then((response) => {
        setAPIData123(response.data.data);
      });
    // console.log(APIData123)
  }
  useEffect(() => {
    getDashboardDataFetch()
  }, [APIData123]);

  return (
    <Grid container spacing={4} sx={{ mb: '24px' }}>
      {APIData123.map((item, index) => (
        <Grid item xs={12} md={4} key={index}>
          <StyledCard elevation={1} style={{ backgroundColor: '#F4BE65' }}>
            <ContentBox>
              <FabIcon><Icon className="icon">send</Icon></FabIcon>
              <Box ml="12px">
                <H3 textcolor={'green'}>{item.platformName}</H3>
                <H1 >Count {item.count}</H1>
                {/* <Heading>{item.amount}</Heading> */}
              </Box>
            </ContentBox>

            {/* <Tooltip title="View Details" placement="top">
              <IconButton>
                <Icon>arrow_right_alt</Icon>
              </IconButton>
            </Tooltip> */}
          </StyledCard>
        </Grid>
      ))}
      {/* {APIData123.map((item, index) => (
        <Grid item xs={12} md={6} key={index}>

          <Card elevation={3} sx={{ p: 2, backgroundColor: '#3b5998' }}>
            <ContentBox>
              <FabIcon size="medium" sx={{ background: 'bgError' }}>
                <Icon sx={{ color: '#fffff' }}>trending_up</Icon>
              </FabIcon>
              <H3 textcolor={'#FFFFFF'}>{item.platformName}</H3>
            </ContentBox>

            <ContentBox sx={{ pt: 2 }}>
              <H1>{item.count}</H1> */}
      {/* <IconBox sx={{ background: 'rgba(9, 182, 109, 0.15)' }}>
                <Icon className="icon">expand_less</Icon>
              </IconBox>
              <Span textcolor={'#FFFFFF'}>(+21%)</Span> */}
      {/* </ContentBox>
          </Card>
        </Grid>
      ))} */}

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
      </Grid> */}

    </Grid>
  );
};
// #282f4e removed

// #EB9694
// #F4BE65
// #19CABA
const StyledCard = styled(Card)(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '24px !important',
  // background: '#19CABA',
  [theme.breakpoints.down('sm')]: { padding: '16px !important' },
}));

const Heading = styled('h6')(({ theme }) => ({
  margin: 0,
  marginTop: '4px',
  fontSize: '18px',
  color: '#FFFFFF',
  fontWeight: '500',
  color: theme.palette.primary.main,
}));
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
  marginLeft: '0px',
}));

const H1 = styled('h5')(({ textcolor }) => ({
  margin: 0,
  // flexGrow: 1,
  color: textcolor,
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
