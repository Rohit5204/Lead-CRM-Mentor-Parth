import { Box, Card, Grid, Icon, IconButton, styled, Tooltip } from '@mui/material';
import { green } from '@mui/material/colors';
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

const LabelWiseCount = () => {
    const cardList = [
        // { name: 'Pipelines', total: 0, amount: 'Rs. 0', icon: 'group' },
        { name: 'Hot Lead', total: 0, amount: 'Rs. 0', icon: 'brightness_high' },
        { name: 'Warm Lead', total: 0, amount: 'Rs. 0', icon: 'brightness_medium' },
        { name: 'Cold Lead', total: 0, amount: 'Rs. 0', icon: 'brightness_low' },
        // { name: 'Total Lead', total: 0, amount: 'Rs. 0', icon: 'group' },
        // { name: 'Order Gain', total: 0, amount: 'Rs. 0', icon: 'attach_money' },
        // { name: 'Order Loss', total: 0, amount: 'Rs. 0', icon: 'arrow_downward' },
    ];

    return (
        <Grid container spacing={4} sx={{ mb: '24px' }}>
            {cardList.map((item, index) => (
                <Grid item xs={12} md={4} key={index}>
                    <StyledCard elevation={11} style={{ boxShadow: '80px 90px' }}>
                        <ContentBox>
                            <Icon className="icon">{item.icon}</Icon>
                            <Box ml="12px">
                                <Small>{item.name}</Small>
                                <Heading>{item.total}</Heading>
                                <Heading>{item.amount}</Heading>
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
