import { Card, Box, Fab, Grid, Icon, lighten, styled, useTheme } from '@mui/material';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Row, Col } from 'react-bootstrap'
import { Small } from 'app/components/Typography';
import "./statusCard.css";

import ApartmentIcon from '@mui/icons-material/Apartment';



const TLWiseCount = () => {

    const { palette } = useTheme();
    const textError = palette.error.main;
    const bgError = lighten(palette.error.main, 0.85);


    const [TLWiseCount, setTLWiseCount] = useState([]);


    const getDashboardDataFetch = () => {
        const items = localStorage.getItem('accessToken');
        const roleCode = localStorage.getItem('roleCode');
        const userId = localStorage.getItem('userId');
        const headers = {
            "x-access-token": items,
            "roleCode": roleCode,
            "userId": userId
        }
        axios.get(`http://43.204.38.243:3001/api/getRolewiseClosedCount`, {
            headers: {
                "x-access-token": items,
                "roleCode": roleCode,
                "userId": userId
            }
        })
            .then((response) => {
                setTLWiseCount(response.data.data);

            });
    }
    useEffect(() => {
        getDashboardDataFetch()
    }, [TLWiseCount]);

    return (
        <Grid container spacing={4} sx={{ mb: '24px' }}>
            {TLWiseCount.map((item, index) => (
                <Grid item xs={12} md={3} key={index}>
                    <StyledCard elevation={11} style={{ boxShadow: '80px 90px' }} >
                        <ContentBox>

                            <Icon style={{ fontSize: "65px", color: '#7499e5' }} >group</Icon>

                            <Box ml="12px">
                                <Small fontSize={14} >{item.tlName}</Small>
                                <Heading>{item.totalCount}</Heading>
                                <Heading>₹ {item.totalAmount}</Heading>
                            </Box>
                        </ContentBox>
                    </StyledCard>
                </Grid>
            ))}
        </Grid>

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
    fontSize: '16px',
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
export default TLWiseCount;
