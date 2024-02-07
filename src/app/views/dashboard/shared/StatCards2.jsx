import { Card, Box, Fab, Grid, Icon, lighten, styled, useTheme, Tooltip, Chip } from '@mui/material';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { makeStyles } from '@mui/styles';
import { Row, Col } from 'react-bootstrap'
import { Small } from 'app/components/Typography';
import "./statusCard.css";
import FollowTheSignsIcon from '@mui/icons-material/FollowTheSigns';
import EventNoteIcon from '@mui/icons-material/EventNote';
import SendIcon from '@mui/icons-material/Send';
import DescriptionIcon from '@mui/icons-material/Description';
import ReceiptIcon from '@mui/icons-material/Receipt';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import ArrowDropDownCircleIcon from '@mui/icons-material/ArrowDropDownCircle';
import { BASE_URL } from 'app/utils/constant';



const StatCards2 = (showData) => {

  const useStyles = makeStyles({
    root: {
      transition: "transform 0.15s ease-in-out",
      "&:hover": { transform: "scale3d(1.05, 1.05, 1)" },
    },
  });

  const classes = useStyles()
  // console.log(showData.showData)
  const { palette } = useTheme();
  const textError = palette.error.main;
  const bgError = lighten(palette.error.main, 0.85);

  // const [onType, setOnType] = useState(showData.showData);
  const [APIData123, setAPIData123] = useState([]);

  const getDashboardDataFetch = () => {
    const items = localStorage.getItem('accessToken');
    const roleCode = localStorage.getItem('roleCode');
    const userId = localStorage.getItem('userId');
    const headers = {
      "x-access-token": items,
      "roleCode": roleCode,
      "userId": userId
    }
    axios.post(BASE_URL + `/api/getDashboardData`, {
      opType: showData.showData.opType,
      fromDate: showData.showData.fromDate,
      toDate: showData.showData.toDate,
      empId: 0
    }, { headers: headers })
      .then((response) => {
        setAPIData123(response.data.data);
      });
    // console.log(APIData123)
  }
  useEffect(() => {
    getDashboardDataFetch()
  }, [showData]);


  // const CancelToken = axios.CancelToken;
  //   const source = CancelToken.source();
  //   const items = localStorage.getItem('accessToken');
  //   if (!showData) {
  //     axios.post(BASE_URL+`/api/getDashboardData`, {
  //       opType: showData.showData.opType,
  //       fromDate: showData.showData.fromDate,
  //       toDate: showData.showData.toDate,
  //       empId: 0
  //     }, { headers: headers }, {
  //       cancelToken: source.token
  //     })
  //       .then((response) => {
  //         setAPIData123(response.data.data);
  //       })
  //   }
  const listOfImages = [
    { url: '/assets/images/platformLogo/Untitled03.png' },
    { url: '/assets/images/platformLogo/Untitled05.png' },
    { url: '/assets/images/platformLogo/Untitled08.png' },
    { url: '/assets/images/platformLogo/Untitled02.png' },
    { url: '/assets/images/platformLogo/Untitled06.png' },
    { url: '/assets/images/platformLogo/Untitled01.png' },
    { url: '/assets/images/platformLogo/Untitled04.png' },
    { url: '/assets/images/platformLogo/Untitled07.png' },
    { url: '/assets/images/platformLogo/Untitled03.png' },

    { url: '/assets/images/platformLogo/Untitled01.png' },
    { url: '/assets/images/platformLogo/Untitled05.png' },
    { url: '/assets/images/platformLogo/Untitled08.png' },
    { url: '/assets/images/platformLogo/Untitled02.png' },
    { url: '/assets/images/platformLogo/Untitled06.png' },
    { url: '/assets/images/platformLogo/Untitled01.png' },
    { url: '/assets/images/platformLogo/Untitled04.png' },


    { url: '/assets/images/platformLogo/Untitled07.png' },
  ]
  const iconOption = [
    <SendIcon style={{ fontSize: "65px" }}></SendIcon>,
    <FollowTheSignsIcon style={{ fontSize: "65px" }}></FollowTheSignsIcon>,
    <EventNoteIcon style={{ fontSize: "65px" }}></EventNoteIcon>,
    <DescriptionIcon style={{ fontSize: "70px" }}></DescriptionIcon>,
    <ArrowDropDownCircleIcon style={{ fontSize: "70px" }}></ArrowDropDownCircleIcon>,
    <ReceiptIcon style={{ fontSize: "70px" }}></ReceiptIcon>,
    <AssignmentTurnedInIcon style={{ fontSize: "70px" }}></AssignmentTurnedInIcon>,
  ]
  return (
    <Grid container spacing={4} sx={{ mb: '24px' }}>
      {APIData123.map((item, index) => (
        <Grid item xs={12} md={3} key={index}>
          <StyledCard elevation={11} style={{ boxShadow: '80px 90px' }} className={classes.root}>
            <ContentBox>
              <Grid container spacing={4}>
                <Grid item xs={7} md={7}>
                  <Box>
                    <Small className='mb-2'>{item.platformName}</Small>
                    <Heading style={{ padding: '10px' }}>{item.count}</Heading>
                  </Box>
                </Grid>
                <Grid item xs={4} md={4}>
                  <Box>
                    <img key={index} src={listOfImages[index].url} height={80} width={80} ></img>
                  </Box>
                </Grid>
              </Grid>
            </ContentBox>
          </StyledCard>
        </Grid>
      ))
      }
    </Grid >
  );
};
const StyledCard = styled(Card)(({ theme }) => ({
  // display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  justifyContent: 'space-between',
  background: theme.palette.background.paper,
  // [theme.breakpoints.down('sm')]: { padding: '16px !important' },
}));

const Heading = styled('h6')(({ theme }) => ({
  margin: 0,
  marginTop: '4px',
  fontSize: '18px',
  fontWeight: '500',
}));
const ContentBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  padding: '10px !important',
  '& small': { color: theme.palette.text.secondary, fontSize: '16px' },
  '& .icon': { opacity: 0.6, fontSize: '44px', color: '#1e55c7' },
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
