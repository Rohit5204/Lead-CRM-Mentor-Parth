import { Box, Card, Grid, Icon, IconButton, styled, Tooltip } from '@mui/material';
import { Small } from 'app/components/Typography';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BASE_URL } from 'app/utils/constant';

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

const LabelWiseCount = (showData) => {
    const onj = {
        "hot": 20,
        "Cold": 1,
        "Warm": 1
    }
    const cardList = [
        { icon: 'brightness_high' },
        { icon: 'brightness_medium' },
        { icon: 'brightness_low' },
    ];
    const [labelWiseData, setLabelWiseData] = useState([]);

    const items = localStorage.getItem('accessToken');
    const roleCode = localStorage.getItem('roleCode');
    const userId = localStorage.getItem('userId');
    const headers = {
        "x-access-token": items,
        "roleCode": roleCode,
        "userId": userId
    }
    const getDashboardDataFetch = () => {
        axios.post(BASE_URL + `/api/getDashboardDataByLabel`, {
            opType: showData.showData.opType,
            fromDate: showData.showData.fromDate,
            toDate: showData.showData.toDate,
            empId: 0
        }, { headers: headers })
            .then((response) => {
                setLabelWiseData(response.data.data);
            });
        // console.log(LabelWiseData)
    }
    useEffect(() => {
        getDashboardDataFetch()
    }, [labelWiseData]);

    return (
        <Grid container spacing={4} sx={{ mb: '24px' }}>
            {labelWiseData.map((item, index) => (
                <Grid item xs={12} md={4} key={index}>
                    <StyledCard elevation={11} style={{ boxShadow: '80px 90px' }}>
                        <ContentBox>
                            <Icon className="icon">{cardList[index].icon}</Icon>
                            <Box ml="12px">
                                <Small>{item.labelName}</Small>
                                <Heading>{item.count}</Heading>
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
        </Grid>
    );
};

export default LabelWiseCount;
