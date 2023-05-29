import { Box, Card, Grid, Icon, IconButton, styled, Tooltip } from '@mui/material';
import { green } from '@mui/material/colors';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { makeStyles } from '@mui/styles';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import { Small } from 'app/components/Typography';
import { BASE_URL } from 'app/utils/constant';
import { useLocation } from 'react-router-dom';


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

const TraderCount = ({ fetch }) => {
    const location = useLocation();
    const useStyles = makeStyles({
        root: {
            transition: "transform 0.15s ease-in-out",
            "&:hover": { transform: "scale3d(1.05, 1.05, 1)" },
        },
    });

    const classes = useStyles()

    const [totalGain, setTotalGain] = useState([]);
    const [totalLoss, setTotalLoss] = useState([]);
    const items = localStorage.getItem('accessToken');


    const roleCode = localStorage.getItem('roleCode');
    const userId = localStorage.getItem('userId');
    const headers = {
        "x-access-token": items,
        "roleCode": roleCode,
        "userId": userId
    }

    useEffect(() => {
        axios.get(BASE_URL + `/api/getTraderCount?leadId=` + location.state.leadId,
            { headers: headers })
            .then((response) => {
                setTotalGain(response.data.profit);
                setTotalLoss(response.data.loss);
            });
    }, [fetch]);


    return (
        <Grid container spacing={4} sx={{ mb: '24px' }}>

            {totalGain.map((item, index) => (
                <Grid item xs={12} md={4} key={index}>
                    <StyledCard elevation={11} style={{ boxShadow: '80px 90px' }} className={classes.root}>
                        <ContentBox>
                            <Grid container spacing={4}>
                                <Grid item xs={8} md={8}>
                                    <Box>
                                        <Heading className='mb-2'>₹ {item.total_amount}</Heading>
                                        <Small className='mb-2'>Profit Amount</Small>
                                    </Box>
                                </Grid>
                                <Grid item xs={3} md={3}>
                                    <Box>
                                        <Tooltip title="Profit Lead" placement="top">
                                            <CurrencyRupeeIcon className="icon" style={{ fontSize: '50px', color: '#10c469' }}></CurrencyRupeeIcon>
                                        </Tooltip>
                                    </Box>
                                </Grid>
                            </Grid>
                        </ContentBox>
                        <Box style={{ backgroundColor: '#10c469' }}>
                            <Heading style={{ padding: '10px', color: 'white' }}>Total Profit Count <b>{item.total_profit}</b></Heading>
                        </Box>
                    </StyledCard>
                </Grid>
            ))}
            {totalLoss.map((item, index) => (
                <Grid item xs={12} md={4} key={index}>
                    <StyledCard elevation={11} style={{ boxShadow: '80px 90px' }} className={classes.root}>
                        <ContentBox>
                            <Grid container spacing={4}>
                                <Grid item xs={8} md={8}>
                                    <Box>
                                        <Heading className='mb-2'>₹{item.total_amount}</Heading>
                                        <Small className='mb-2'>Loss Amount</Small>
                                    </Box>
                                </Grid>
                                <Grid item xs={3} md={3}>
                                    <Box>
                                        <Tooltip title="Loss Lead" placement="top">
                                            <CurrencyRupeeIcon className="icon" style={{ fontSize: '50px', color: '#ff5b5b' }}></CurrencyRupeeIcon>
                                        </Tooltip>
                                    </Box>
                                </Grid>
                            </Grid>
                        </ContentBox>
                        <Box style={{ backgroundColor: '#ff5b5b' }}>
                            <Heading style={{ padding: '10px', color: 'white' }}>Total Loss Count <b>{item.total_loss}</b></Heading>
                        </Box>
                    </StyledCard>
                </Grid>
            ))}
        </Grid>
    );
};

export default TraderCount;
