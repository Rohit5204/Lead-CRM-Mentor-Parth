import { Box, Card, Grid, Icon, IconButton, styled, Tooltip } from '@mui/material';
import { green } from '@mui/material/colors';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import { Col, Row, Form, InputGroup } from 'react-bootstrap';
import { Small } from 'app/components/Typography';

const StyledCard = styled(Card)(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '24px !important',
  background: theme.palette.background.paper,
  [theme.breakpoints.down('sm')]: { padding: '16px !important' },
}));

const ContentBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  '& small': { color: theme.palette.text.secondary, fontSize: '16px' },
  '& .icon': { opacity: 0.6, fontSize: '44px', color: '#1e55c7' },
}));

const Heading = styled('h6')(({ theme }) => ({
  margin: 0,
  marginTop: '4px',
  fontSize: '14px',
  fontWeight: '500',
  color: theme.palette.primary.main,
}));

const StatCards = (showData) => {
  // console.log(showData.showData)
  const [totalPipeline, setTotalPipeline] = useState([]);
  const [totalLead, setTotalLead] = useState([]);
  const [totalGain, setTotalGain] = useState([]);
  const [totalLoss, setTotalLoss] = useState([]);
  const items = localStorage.getItem('accessToken');
  // const [startDate, setstartDate] = useState('')
  // const [endDate, setendDate] = useState('')
  // const [onType, setOnType] = useState('DEFAULT')

  const roleCode = localStorage.getItem('roleCode');
  const userId = localStorage.getItem('userId');
  const headers = {
    "x-access-token": items,
    "roleCode": roleCode,
    "userId": userId
  }
  useEffect(() => {
    axios.post(`http://43.204.38.243:3001/api/getAdvancedDashboardData`, {
      opType: showData.showData.opType,
      fromDate: showData.showData.fromDate,
      toDate: showData.showData.toDate,
      empId: 0
    }, { headers: headers })
      .then((response) => {
        setTotalPipeline(response.data.data);
      });
  }, [totalPipeline]);

  useEffect(() => {
    axios.post(`http://43.204.38.243:3001/api/getDashboardTotalLeadData`, {
      opType: showData.showData.opType,
      fromDate: showData.showData.fromDate,
      toDate: showData.showData.toDate,
      empId: 0
    }, { headers: headers })
      .then((response) => {
        setTotalLead(response.data.data);
      });
  }, [totalLead]);

  useEffect(() => {
    axios.post(`http://43.204.38.243:3001/api/getDashboardOrderGainData`, {
      opType: showData.showData.opType,
      fromDate: showData.showData.fromDate,
      toDate: showData.showData.toDate,
      empId: 0
    }, { headers: headers })
      .then((response) => {
        setTotalGain(response.data.data);
      });
  }, [totalGain]);
  useEffect(() => {
    axios.post(`http://43.204.38.243:3001/api/getDashboardOrderLossData`, {
      opType: showData.showData.opType,
      fromDate: showData.showData.fromDate,
      toDate: showData.showData.toDate,
      empId: 0
    }, { headers: headers })
      .then((response) => {
        setTotalLoss(response.data.data);
      });
  }, [totalLoss]);


  return (
    <Grid container spacing={4} sx={{ mb: '24px' }}>
      {totalPipeline.map((item, index) => (
        <Grid item xs={12} md={3} key={index}>
          <StyledCard elevation={11} style={{ boxShadow: '80px 90px' }} >
            <ContentBox>
              <Icon className="icon">group</Icon>
              <Box ml="12px">
                <Small>Total Pipeline</Small>
                <Heading>{item.leadCount}</Heading>
                <Heading>₹ {item.amount}</Heading>
              </Box>
            </ContentBox>
            {/* <FilterAltIcon></FilterAltIcon> */}
            {/* <Tooltip title="View Details" placement="top">
          <IconButton>
            <Icon>menu</Icon>
          </IconButton>
        </Tooltip> */}
          </StyledCard>
        </Grid>
      ))}
      {totalLead.map((item, index) => (
        <Grid item xs={12} md={3} key={index}>
          <StyledCard elevation={11} style={{ boxShadow: '80px 90px' }}>
            <ContentBox>
              <Icon className="icon">send</Icon>
              <Box ml="12px">
                <Small>Total Lead</Small>
                <Heading>{item.leadCount}</Heading>
                <Heading>₹ {item.amount}</Heading>
              </Box>
            </ContentBox>
            {/* <FilterAltIcon></FilterAltIcon> */}
            {/* <Tooltip title="View Details" placement="top">
          <IconButton>
            <Icon>menu</Icon>
          </IconButton>
        </Tooltip> */}
          </StyledCard>
        </Grid>
      ))}
      {totalGain.map((item, index) => (
        <Grid item xs={12} md={3} key={index}>
          <StyledCard elevation={11} style={{ boxShadow: '80px 90px' }}>
            <ContentBox>
              <Icon className="icon">attach_money</Icon>

              <Box ml="12px">
                <Small>Order Gain</Small>
                <Heading>{item.leadCount}</Heading>
                <Heading>₹ {item.amount}</Heading>
              </Box>

            </ContentBox>
            {/* <FilterAltIcon></FilterAltIcon> */}
            {/* <Tooltip title="View Details" placement="top">
          <IconButton>
            <Icon>menu</Icon>
          </IconButton>
        </Tooltip> */}
          </StyledCard>
        </Grid>
      ))}
      {totalLoss.map((item, index) => (
        <Grid item xs={12} md={3} key={index}>
          <StyledCard elevation={11} style={{ boxShadow: '80px 90px' }}>
            <ContentBox>
              <Icon className="icon">arrow_downward</Icon>
              <Box ml="12px">
                <Small>Order Loss</Small>
                <Heading>{item.leadCount}</Heading>
                <Heading>₹ {item.amount}</Heading>
              </Box>
            </ContentBox>
            {/* <FilterAltIcon></FilterAltIcon> */}
            {/* <Tooltip title="View Details" placement="top">
          <IconButton>
            <Icon>menu</Icon>
          </IconButton>
        </Tooltip> */}
          </StyledCard>
        </Grid>
      ))}
    </Grid>
  );
};

export default StatCards;
