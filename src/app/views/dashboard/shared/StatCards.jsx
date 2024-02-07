import { Box, Card, Grid, Icon, IconButton, styled, Tooltip } from '@mui/material';
import { green } from '@mui/material/colors';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { makeStyles } from '@mui/styles';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import { Small } from 'app/components/Typography';
import { BASE_URL } from 'app/utils/constant';


const StyledCard = styled(Card)(({ theme }) => ({
  // display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  justifyContent: 'space-between',
  background: theme.palette.background.paper,
  // [theme.breakpoints.down('sm')]: { padding: '16px !important' },
}));

const ContentBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  padding: '10px !important',
  '& small': { color: theme.palette.text.secondary, fontSize: '16px' },
  '& .icon': { opacity: 0.6, fontSize: '44px', color: '#1e55c7' },
}));

const Heading = styled('h6')(({ theme }) => ({
  margin: 0,
  marginTop: '4px',
  fontSize: '14px',
  fontWeight: '500',
  // color: theme.palette.primary.main,
}));

const StatCards = (showData) => {
  const useStyles = makeStyles({
    root: {
      transition: "transform 0.15s ease-in-out",
      "&:hover": { transform: "scale3d(1.05, 1.05, 1)" },
    },
  });

  const classes = useStyles()

  // console.log(showData.showData)
  const [totalPipeline, setTotalPipeline] = useState([]);
  const [totalLead, setTotalLead] = useState([]);
  const [totalGain, setTotalGain] = useState([]);
  const [totalLoss, setTotalLoss] = useState([]);

  // const [startDate, setstartDate] = useState('')
  // const [endDate, setendDate] = useState('')
  // const [onType, setOnType] = useState('DEFAULT')
  const items = localStorage.getItem('accessToken');
  const roleCode = localStorage.getItem('roleCode');
  const userId = localStorage.getItem('userId');
  const headers = {
    "x-access-token": items,
    "roleCode": roleCode,
    "userId": userId
  }
  useEffect(() => {
    axios.post(BASE_URL + `/api/getAdvancedDashboardData`, {
      opType: showData.showData.opType,
      fromDate: showData.showData.fromDate,
      toDate: showData.showData.toDate,
      empId: 0
    }, { headers: headers })
      .then((response) => {
        setTotalPipeline(response.data.data);
      });
  }, [showData]);

  useEffect(() => {
    axios.post(BASE_URL + `/api/getDashboardTotalLeadData`, {
      opType: showData.showData.opType,
      fromDate: showData.showData.fromDate,
      toDate: showData.showData.toDate,
      empId: 0
    }, { headers: headers })
      .then((response) => {
        setTotalLead(response.data.data);
      });
  }, [showData]);

  useEffect(() => {
    axios.post(BASE_URL + `/api/getDashboardOrderGainData`, {
      opType: showData.showData.opType,
      fromDate: showData.showData.fromDate,
      toDate: showData.showData.toDate,
      empId: 0
    }, { headers: headers })
      .then((response) => {
        setTotalGain(response.data.data);
      });
  }, [showData]);
  useEffect(() => {
    axios.post(BASE_URL + `/api/getDashboardOrderLossData`, {
      opType: showData.showData.opType,
      fromDate: showData.showData.fromDate,
      toDate: showData.showData.toDate,
      empId: 0
    }, { headers: headers })
      .then((response) => {
        setTotalLoss(response.data.data);
      });
  }, [showData]);


  return (
    <Grid container spacing={4} sx={{ mb: '24px' }}>
      {totalPipeline.map((item, index) => (
        <Grid item xs={12} md={3} key={index}>
          <StyledCard elevation={11} style={{ boxShadow: '80px 90px' }} className={classes.root}>
            <ContentBox>
              <Grid container spacing={4}>
                <Grid item xs={8} md={8}>
                  <Box>
                    <Heading className='mb-2'>₹{item.amount}</Heading>
                    <Small className='mb-2'>Open Leads</Small>
                  </Box>
                </Grid>
                <Grid item xs={3} md={3}>
                  <Box>
                    <Tooltip title="Open Leads" placement="top">
                      <Icon className="icon" style={{ fontSize: '50px', color: '#188ae2' }}>group</Icon>
                    </Tooltip>
                  </Box>
                </Grid>
              </Grid>
            </ContentBox>
            <Box style={{ backgroundColor: '#188ae2' }}>
              <Heading style={{ padding: '10px', color: 'white' }}>Total Lead {item.leadCount}</Heading>
            </Box>
            {/* <FilterAltIcon></FilterAltIcon> */}
          </StyledCard>
        </Grid>
      ))}
      {totalLead.map((item, index) => (
        <Grid item xs={12} md={3} key={index}>
          <StyledCard elevation={11} style={{ boxShadow: '80px 90px' }} className={classes.root}>
            <ContentBox>
              <Grid container spacing={4}>
                <Grid item xs={8} md={8}>
                  <Box>
                    <Heading className='mb-2'>₹{item.amount}</Heading>
                    <Small className='mb-2'>Opportunity</Small>
                  </Box>
                </Grid>
                <Grid item xs={3} md={3}>
                  <Box>
                    <Tooltip title="Opportunity" placement="top">
                      <Icon className="icon" style={{ fontSize: '50px', color: '#ff5b5b' }}>send</Icon>
                    </Tooltip>
                  </Box>
                </Grid>
              </Grid>
            </ContentBox>
            <Box style={{ backgroundColor: '#ff5b5b' }}>
              <Heading style={{ padding: '10px', color: 'white' }}>Total Lead {item.leadCount}</Heading>
            </Box>
            {/* <FilterAltIcon></FilterAltIcon> */}
          </StyledCard>
        </Grid>
      ))}
      {totalGain.map((item, index) => (
        <Grid item xs={12} md={3} key={index}>
          <StyledCard elevation={11} style={{ boxShadow: '80px 90px' }} className={classes.root}>
            <ContentBox>
              <Grid container spacing={4}>
                <Grid item xs={8} md={8}>
                  <Box>
                    <Heading className='mb-2'>₹{item.amount}</Heading>
                    <Small className='mb-2'>Closed Lead</Small>
                  </Box>
                </Grid>
                <Grid item xs={3} md={3}>
                  <Box>
                    <Tooltip title="Closed Lead" placement="top">
                      <CurrencyRupeeIcon className="icon" style={{ fontSize: '50px', color: '#10c469' }}></CurrencyRupeeIcon>
                    </Tooltip>
                  </Box>
                </Grid>
              </Grid>
            </ContentBox>
            <Box style={{ backgroundColor: '#10c469' }}>
              <Heading style={{ padding: '10px', color: 'white' }}>Total Lead {item.leadCount}</Heading>
            </Box>
            {/* <FilterAltIcon></FilterAltIcon> */}
          </StyledCard>
        </Grid>
        // <Grid item xs={12} md={3} key={index}>
        //   <StyledCard elevation={11} style={{ boxShadow: '80px 90px' }}>
        //     <ContentBox>
        //       <Icon className="icon">attach_money</Icon>

        //       <Box ml="12px">
        //         <Small>Closed Lead</Small>
        //         <Heading>{item.leadCount}</Heading>
        //         <Heading>₹ {item.amount}</Heading>
        //       </Box>

        //     </ContentBox>
        //     {/* <FilterAltIcon></FilterAltIcon> */}
        //     {/* <Tooltip title="View Details" placement="top">
        //   <IconButton>
        //     <Icon>menu</Icon>
        //   </IconButton>
        // </Tooltip> */}
        //   </StyledCard>
        // </Grid>
      ))}
      {totalLoss.map((item, index) => (
        <Grid item xs={12} md={3} key={index}>
          <StyledCard elevation={11} style={{ boxShadow: '80px 90px' }} className={classes.root}>
            <ContentBox>
              <Grid container spacing={4}>
                <Grid item xs={8} md={8}>
                  <Box>
                    <Heading className='mb-2'>₹{item.amount}</Heading>
                    <Small className='mb-2'>Drop Lead</Small>
                  </Box>
                </Grid>
                <Grid item xs={3} md={3}>
                  <Box>
                    <Tooltip title="Drop Lead" placement="top">
                      <Icon className="icon" style={{ fontSize: '50px', color: '#f9c851' }}>arrow_downward</Icon>
                    </Tooltip>
                  </Box>
                </Grid>
              </Grid>
            </ContentBox>
            <Box style={{ backgroundColor: '#f9c851' }}>
              <Heading style={{ padding: '10px', color: 'white' }}>Total Lead {item.leadCount}</Heading>
            </Box>
            {/* <FilterAltIcon></FilterAltIcon> */}
          </StyledCard>
        </Grid>
        // <Grid item xs={12} md={3} key={index}>
        //   <StyledCard elevation={11} style={{ boxShadow: '80px 90px' }}>
        //     <ContentBox>
        //       <Icon className="icon">arrow_downward</Icon>
        //       <Box ml="12px">
        //         <Small>Drop Lead</Small>
        //         <Heading>{item.leadCount}</Heading>
        //         <Heading>₹ {item.amount}</Heading>
        //       </Box>
        //     </ContentBox>
        //     {/* <FilterAltIcon></FilterAltIcon> */}
        //     {/* <Tooltip title="View Details" placement="top">
        //   <IconButton>
        //     <Icon>menu</Icon>
        //   </IconButton>
        // </Tooltip> */}
        //   </StyledCard>
        // </Grid>
      ))}
    </Grid>
  );
};

export default StatCards;
