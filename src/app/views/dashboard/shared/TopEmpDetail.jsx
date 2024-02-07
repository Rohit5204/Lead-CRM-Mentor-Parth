import { Card, Box, Fab, Grid, Icon, lighten, styled, useTheme, IconButton, Tooltip } from '@mui/material';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { makeStyles } from '@mui/styles';
import "./statusCard.css";

import { BASE_URL } from 'app/utils/constant';
import { SimpleCard } from 'app/components';
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




const TopEmpDetail = (showData) => {
    const useStyles = makeStyles({
        root: {
            transition: "transform 0.15s ease-in-out",
            "&:hover": { transform: "scale3d(1.05, 1.05, 1)" },
        },
    });

    const classes = useStyles()
    const [statusWiseData, setStatusWiseData] = useState([]);

    useEffect(() => {
        axios.get(BASE_URL + `/api/getTopEmp`)
            .then((response) => {
                setStatusWiseData(response.data.data);
            });
    }, [statusWiseData]);

    const rank = ["Rank 1", "Rank 2", "Rank 3"]

    const user = localStorage.getItem('name')

    const items = localStorage.getItem('accessToken');
    const roleCode = localStorage.getItem('roleCode');
    const userId = localStorage.getItem('userId');
    const headers = {
        "x-access-token": items,
        "roleCode": roleCode,
        "userId": userId
    }
    const [totalGain, setTotalGain] = useState([]);

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
    return (
        <Grid container spacing={4} sx={{ mb: '24px' }}>
            {roleCode == "EMP" ? (<>
                {totalGain.map((item, index) => (
                    <Grid item xs={12} md={3} key={index}>

                        <StyledCard elevation={11} style={{ boxShadow: '80px 90px' }} className={classes.root}>
                            <ContentBox>
                                <Grid container spacing={4}>
                                    <Grid item xs={8} md={7}>
                                        <Box>
                                            <div className="flex-grow-1 ms-3">
                                                <h6 className="mb-1">{user} </h6>
                                                <p className="small text-muted mb-1">Total Lead</p>
                                                <p className="mb-0" style={{ fontSize: '24px' }}>{item.leadCount}</p>
                                            </div>
                                        </Box>
                                    </Grid>
                                    <Grid item xs={3} md={4}>
                                        <img src="/assets/images/Male 1.png" alt="" style={{ borderRadius: '10px', width: '105px', marginLeft: '-35px' }} />
                                    </Grid>
                                </Grid>
                            </ContentBox>
                            <Box style={{ backgroundColor: '#10c469' }}>
                                <Heading style={{ padding: '10px', color: 'white' }}>Total Amount  ₹  {item.amount}</Heading>
                            </Box>
                        </StyledCard>
                    </Grid>
                ))}
            </>) : (<></>)
            }
            {roleCode == "TL" ? (<>
                {totalGain.map((item, index) => (
                    <Grid item xs={12} md={3} key={index}>

                        <StyledCard elevation={11} style={{ boxShadow: '80px 90px' }} className={classes.root}>
                            <ContentBox>
                                <Grid container spacing={4}>
                                    <Grid item xs={8} md={7}>
                                        <Box>
                                            <div className="flex-grow-1 ms-3">
                                                <h6 className="mb-1">{user} </h6>
                                                <p className="small text-muted mb-1">Total Lead</p>
                                                <p className="mb-0" style={{ fontSize: '24px' }}>{item.leadCount}</p>
                                            </div>
                                        </Box>
                                    </Grid>
                                    <Grid item xs={3} md={4}>
                                        <img src="/assets/images/Male 1.png" alt="" style={{ borderRadius: '10px', width: '105px', marginLeft: '-35px' }} />
                                    </Grid>
                                </Grid>
                            </ContentBox>
                            <Box style={{ backgroundColor: '#10c469' }}>
                                <Heading style={{ padding: '10px', color: 'white' }}>Total Amount  ₹  {item.amount}</Heading>
                            </Box>
                        </StyledCard>
                    </Grid>
                ))}
            </>) : (<></>)
            }

            {statusWiseData.map((item, index) => (
                <Grid item xs={12} md={3} key={index}>

                    <StyledCard elevation={11} style={{ boxShadow: '80px 90px' }} className={classes.root}>
                        <ContentBox>
                            <Grid container spacing={4}>
                                <Grid item xs={8} md={7}>
                                    <Box>
                                        <div className="flex-grow-1 ms-3">
                                            <h6 className="mb-1">{item.firstName} {item.lastName}</h6>
                                            <p className="mb-2 pb-1" style={{ color: '#2b2a2a' }}>{rank[index]}</p>
                                            <p className="small text-muted mb-1">Total Leads</p>
                                            <p className="mb-0" style={{ fontSize: '24px' }}>{item.total_lead_count}</p>
                                        </div>
                                    </Box>
                                </Grid>
                                <Grid item xs={3} md={4}>
                                    <img src="/assets/images/male c 1.png" alt="" style={{ borderRadius: '10px', width: '120px', marginLeft: '-35px' }} />
                                </Grid>
                            </Grid>
                        </ContentBox>
                        <Box style={{ backgroundColor: '#188ae2' }}>
                            <Heading style={{ padding: '10px', color: 'white' }}>Total Amount  ₹  {item.total_amount}</Heading>
                        </Box>
                        {/* <FilterAltIcon></FilterAltIcon> */}
                    </StyledCard>
                </Grid>
            ))}
        </Grid>

    );
};
export default TopEmpDetail;
