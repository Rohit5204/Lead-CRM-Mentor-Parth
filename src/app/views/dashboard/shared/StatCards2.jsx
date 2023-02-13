import { Card, Box, Fab, Grid, Icon, lighten, styled, useTheme } from '@mui/material';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
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



const StatCards2 = (showData) => {
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
    axios.post(`http://43.204.38.243:3001/api/getDashboardData`, {
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
  }, [APIData123]);


  // const CancelToken = axios.CancelToken;
  //   const source = CancelToken.source();
  //   const items = localStorage.getItem('accessToken');
  //   if (!showData) {
  //     axios.post(`http://43.204.38.243:3001/api/getDashboardData`, {
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
    <div>
      <div>
        <div id="root">
          <div className="container">
            <div className="row align-items-stretch">
              {APIData123.map((item, index) => (
                // if (item.platformName != "") {
                //   return (
                <div className="c-dashboardInfo col-lg-3 col-md-6" key={index} >
                  <div className="wrap">
                    <Row className='mb-1'>
                      <Col md="4">
                        <div style={{ color: '#7499e5' }}>
                          {/* {iconOption[index]} */}
                          <img key={index} src={listOfImages[index].url} height={80} width={80} style={{ marginTop: '-15px' }} ></img>
                        </div>
                      </Col>
                      <Col style={{ marginLeft: "12px" }}>
                        <h4 className="heading heading5 hind-font medium-font-weight c-dashboardInfo__title ">
                          {item.platformName}
                        </h4>
                        <span className="hind-font ">{item.count}</span>
                      </Col>

                    </Row>
                  </div>
                </div>
                // )}
              )
              )}
            </div>
          </div>
        </div>
      </div>
    </div >

  );
};
// <div className="c-dashboardInfo col-lg-4 col-md-6" key={index}>
//   <div className="wrap">
//     <h6 className="">{item.count}</h6>
//     <Row>
//       <Col >
//         <h5 className="heading heading5 hind-font medium-font-weight c-dashboardInfo__title ">
//           <img key={index} src={listOfImages[index].url} height={70} width={70} ></img>
//           {item.platformName}
//         </h5>
//       </Col>
//       <br />
//     </Row>
//   </div>
// </div>
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
