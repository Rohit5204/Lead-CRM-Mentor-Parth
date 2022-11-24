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
  '& .icon': { opacity: 0.6, fontSize: '44px', color: 'green' },
}));

const Heading = styled('h6')(({ theme }) => ({
  margin: 0,
  marginTop: '4px',
  fontSize: '14px',
  fontWeight: '500',
  color: theme.palette.primary.main,
}));

const StatCards = () => {
  const cardList = [
    { name: 'Total Pipelines', total: 62, amount: 'Rs. 2,50,000', icon: 'group' },
    { name: 'Hot Lead', total: 0, amount: 'Rs. 0', icon: 'work' },
    { name: 'Warm Lead', total: 7, amount: 'Rs. 2,60,000', icon: 'work' },
    { name: 'Cold Lead', total: 55, amount: 'Rs. 0', icon: 'work' },
    { name: 'Total Lead', total: 70, amount: 'Rs. 4,85,015', icon: 'group' },
    { name: 'Order Recieved', total: 4, amount: 'Rs. 1,15,000', icon: 'attach_money' },
    { name: 'Order Loss', total: 4, amount: 'Rs. 1,20,015', icon: 'arrow_downward' },
  ];

  return (
    <Grid container spacing={4} sx={{ mb: '24px' }}>
      {cardList.map((item, index) => (
        <Grid item xs={12} md={3} key={index}>
          <StyledCard elevation={1} style={{ background: '#deb887  ' }}>
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

export default StatCards;
