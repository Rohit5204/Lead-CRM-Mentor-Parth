import { Card, Box, Fab, Grid, Icon, lighten, styled, useTheme, IconButton } from '@mui/material';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Row, Col } from 'react-bootstrap'
import { Small } from 'app/components/Typography';
import "./statusCard.css";
import FollowTheSignsIcon from '@mui/icons-material/FollowTheSigns';
import EventNoteIcon from '@mui/icons-material/EventNote';
import DescriptionIcon from '@mui/icons-material/Description';
import ReceiptIcon from '@mui/icons-material/Receipt';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import ArrowDropDownCircleIcon from '@mui/icons-material/ArrowDropDownCircle';
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
    '& small': { color: "#4886b0", fontSize: '20px', },
    '& .icon': { opacity: 0.6, fontSize: '105px', color: '#B6D0E2' },
}));

const Heading = styled('h6')(({ theme }) => ({
    margin: 0,
    marginTop: '4px',
    fontSize: '14px',
    fontWeight: '500',
    color: "black"
    // color: theme.palette.primary.main,
}));
// const FabIcon = styled(Fab)(() => ({
//     width: '55px !important',
//     height: '55px !important',
//     position: "relative",
//     marginTop: "-40px",
//     top: "35px",
//     left: "155px"
// }));
const StatusWiseCard = () => {
    const { palette } = useTheme();
    const textError = palette.error.main;
    const bgError = lighten(palette.error.main, 0.85);
    const cardList = [
        { name: 'Active Leads', total: 62, amount: 'Rs. 2,50,000', icon: 'group' },
        { name: 'Followup', total: 0, amount: 'Rs. 0', icon: 'work' },
        { name: 'Meeting ', total: 7, amount: 'Rs. 2,60,000', icon: 'work' },
        { name: 'Quotation', total: 55, amount: 'Rs. 0', icon: 'work' },
    ];
    const cardList2 = [
        { name: 'Inovice', total: 70, amount: 'Rs. 4,85,015', icon: 'group' },
        { name: 'Drop', total: 70, amount: 'Rs. 4,85,015', icon: 'group' },
        { name: 'Closed', total: 70, amount: 'Rs. 4,85,015', icon: 'closed' },
    ]
    const cardList1 = [
        { name: 'Total Renewal', total: 4, amount: 'Rs. 1,15,000', icon: 'card_membership' },
        { name: 'Total Expiry', total: 4, amount: 'Rs. 1,20,015', icon: 'card_membership' },
    ]
    const [statusWiseData, setStatusWiseData] = useState([]);
    const items = localStorage.getItem('accessToken');
    useEffect(() => {
        axios.get(`http://213.136.72.177/cms/api/getLeadStatusCount`, { headers: { "x-access-token": items } })
            .then((response) => {
                setStatusWiseData(response.data.data);
            });
        console.log(statusWiseData)
    }, [statusWiseData]);
    return (
        <div>
            <div>
                <div id="root">
                    <div className="container" >
                        <div className="row align-items-stretch">
                            {statusWiseData.map((item, index) => (
                                <div className="c-dashboardInfo col-lg-3 col-md-6" key={index}>
                                    <div className="wrap">
                                        <Row>
                                            <Col md="4">
                                                <IconButton>
                                                    <Icon style={{ fontSize: "70px", }}>send</Icon>
                                                </IconButton>
                                            </Col>
                                            <Col style={{ marginLeft: "12px" }}>
                                                <h4 className="heading heading5 hind-font medium-font-weight c-dashboardInfo__title ">{item.statusName}
                                                </h4>
                                                <span className="hind-font caption-10 c-dashboardInfo__count">{item.count}</span>
                                            </Col>

                                        </Row>
                                    </div>
                                </div>
                            ))}
                            {/* <div className="c-dashboardInfo col-lg-3 col-md-6">
                                <div className="wrap">
                                    <Row>
                                        <Col md="4">
                                            <IconButton> <FollowTheSignsIcon style={{ fontSize: "65px", }}></FollowTheSignsIcon></IconButton>
                                        </Col>
                                        <Col style={{ marginLeft: "12px" }}>
                                            <h4 className="heading heading5 hind-font medium-font-weight c-dashboardInfo__title ">Follow Up
                                            </h4>
                                            <span className="hind-font caption-10 c-dashboardInfo__count">2</span>
                                        </Col>
                                    </Row>
                                </div>
                            </div>

                            <div className="c-dashboardInfo col-lg-3 col-md-6">
                                <div className="wrap">
                                    <Row>
                                        <Col md="4">
                                            <IconButton> <EventNoteIcon style={{ fontSize: "65px", }}></EventNoteIcon></IconButton>
                                        </Col>
                                        <Col style={{ marginLeft: "12px" }}>
                                            <h4 className="heading heading5 hind-font medium-font-weight c-dashboardInfo__title ">Meeting
                                            </h4>
                                            <span className="hind-font caption-10 c-dashboardInfo__count">0</span>
                                        </Col>
                                    </Row></div>
                            </div>
                            <div className="c-dashboardInfo col-lg-3 col-md-6">
                                <div className="wrap">
                                    <Row>
                                        <Col md="4">
                                            <IconButton> <DescriptionIcon style={{ fontSize: "70px", }}></DescriptionIcon></IconButton>
                                        </Col>
                                        <Col style={{ marginLeft: "12px" }}>
                                            <h4 className="heading heading5 hind-font medium-font-weight c-dashboardInfo__title ">Quotation
                                            </h4>
                                            <span className="hind-font caption-10 c-dashboardInfo__count">0</span>
                                        </Col>

                                    </Row>
                                </div>
                            </div> */}
                            {/* </div>
                        <div className="row align-items-stretch"> */}
                            {/* <div className="c-dashboardInfo col-lg-4 col-md-6">
                                <div className="wrap">
                                    <Row>
                                        <Col md="4">
                                            <IconButton> <ReceiptIcon style={{ fontSize: "70px" }}></ReceiptIcon></IconButton>
                                        </Col>
                                        <Col style={{ marginLeft: "12px" }}>
                                            <h4 className="heading heading5 hind-font medium-font-weight c-dashboardInfo__title ">Invoice
                                            </h4>
                                            <span className="hind-font caption-10 c-dashboardInfo__count">1</span>
                                        </Col>

                                    </Row>
                                </div>
                            </div>

                            <div className="c-dashboardInfo col-lg-4 col-md-6">
                                <div className="wrap">
                                    <Row>
                                        <Col md="4">
                                            <IconButton> <AssignmentTurnedInIcon style={{ fontSize: "70px", }}></AssignmentTurnedInIcon></IconButton>
                                        </Col>
                                        <Col style={{ marginLeft: "12px" }}>
                                            <h4 className="heading heading5 hind-font medium-font-weight c-dashboardInfo__title ">Lead Closed
                                            </h4>
                                            <span className="hind-font caption-10 c-dashboardInfo__count">1</span>
                                        </Col>

                                    </Row></div>
                            </div>

                            <div className="c-dashboardInfo col-lg-4 col-md-6">
                                <div className="wrap">
                                    <Row>
                                        <Col md="4">
                                            <IconButton>
                                                <ArrowDropDownCircleIcon style={{ fontSize: "70px", }}></ArrowDropDownCircleIcon>
                                            </IconButton>
                                        </Col>
                                        <Col style={{ marginLeft: "12px" }}>
                                            <h4 className="heading heading5 hind-font medium-font-weight c-dashboardInfo__title ">Lead Drop
                                            </h4>
                                            <span className="hind-font caption-10 c-dashboardInfo__count">0</span>
                                        </Col>

                                    </Row>
                                </div>
                            </div> */}
                        </div>
                    </div>

                </div>
            </div>
            {/* <Grid container spacing={4} sx={{ mb: '24px' }}>
                {cardList.map((item, index) => (
                    <Grid item xs={12} md={3} key={index}>

                        <Icon style={{
                            color: "#4886b0",
                            fontSize: "55px",
                            position: "relative",
                            marginTop: "-45px",
                            top: "40px",
                            left: "155px"
                        }} className="icon">{item.icon}</Icon>
                       
                        <StyledCard elevation={1} style={{ background: '#B6D0E2' }}>
                            <ContentBox>
                                <Box ml="5px">
                                    <Small>{item.name}</Small>
                                    <Heading>{item.total}</Heading>
                                    <Heading>{item.amount}</Heading>
                                </Box>
                            </ContentBox>

                        </StyledCard>
                    </Grid>
                ))}
            </Grid>
            <Grid container spacing={4} sx={{ mb: '24px' }}>
                {cardList2.map((item, index) => (
                    <Grid item xs={12} md={4} key={index}>
                     
                        <Icon style={{
                            color: "#4886b0",
                            fontSize: "55px",
                            position: "relative",
                            marginTop: "-40px",
                            top: "40px",
                            left: "230px"
                        }} className="icon">{item.icon}</Icon>
                       
                        <StyledCard elevation={1} style={{ background: '#B6D0E2' }}>
                            <ContentBox>
                                <Box ml="5px">
                                    <Small>{item.name}</Small>
                                    <Heading>{item.total}</Heading>
                                    <Heading>{item.amount}</Heading>
                                </Box>
                            </ContentBox>

                        </StyledCard>
                    </Grid>
                ))}
            </Grid> */}
            {/* <Grid container spacing={4} sx={{ mb: '24px' }}>
                {cardList1.map((item, index) => (
                    <Grid item xs={12} md={6} key={index}> */}
            {/* <FabIcon> */}
            {/* <Icon style={{
                            color: "#4886b0",
                            fontSize: "55px",
                            position: "relative",
                            marginTop: "-40px",
                            top: "40px",
                            left: "390px"
                        }} className="icon">{item.icon}</Icon> */}
            {/* </FabIcon> */}
            {/* <StyledCard elevation={1} style={{ background: '#B6D0E2' }}>
                            <ContentBox>
                                <Box ml="5px">
                                    <Small>{item.name}</Small>
                                    <Heading>{item.total}</Heading>
                                    <Heading>{item.amount}</Heading>
                                </Box>
                            </ContentBox>

                        </StyledCard>
                    </Grid> */}
            {/* ))}
            </Grid> */}
        </div>
    );
};
// #282f4e removed

// #EB9694
// #F4BE65
// #19CABA

export default StatusWiseCard;
