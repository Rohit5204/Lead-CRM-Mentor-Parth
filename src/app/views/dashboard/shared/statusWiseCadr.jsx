import { Card, Box, Fab, Grid, Icon, lighten, styled, useTheme } from '@mui/material';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
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
    return (
        <div>
            <Grid container spacing={4} sx={{ mb: '24px' }}>
                {cardList.map((item, index) => (
                    <Grid item xs={12} md={3} key={index}>
                        {/* <FabIcon> */}
                        <Icon style={{
                            color: "#4886b0",
                            fontSize: "55px",
                            position: "relative",
                            marginTop: "-45px",
                            top: "40px",
                            left: "155px"
                        }} className="icon">{item.icon}</Icon>
                        {/* </FabIcon> */}
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
                        {/* <FabIcon> */}
                        <Icon style={{
                            color: "#4886b0",
                            fontSize: "55px",
                            position: "relative",
                            marginTop: "-40px",
                            top: "40px",
                            left: "230px"
                        }} className="icon">{item.icon}</Icon>
                        {/* </FabIcon> */}
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
                {cardList1.map((item, index) => (
                    <Grid item xs={12} md={6} key={index}>
                        {/* <FabIcon> */}
                        <Icon style={{
                            color: "#4886b0",
                            fontSize: "55px",
                            position: "relative",
                            marginTop: "-40px",
                            top: "40px",
                            left: "390px"
                        }} className="icon">{item.icon}</Icon>
                        {/* </FabIcon> */}
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
        </div>
    );
};
// #282f4e removed

// #EB9694
// #F4BE65
// #19CABA

export default StatusWiseCard;
