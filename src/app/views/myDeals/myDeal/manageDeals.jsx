import { styled, alpha } from '@mui/system';
import { Breadcrumb } from 'app/components';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, InputGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import {
    Box,
    Icon,
    Chip,
    IconButton,
    Table,
    TableBody,
    Menu,
    TableCell,
    TableHead,
    TableRow,
    Grid,
    Button,
    MenuItem,
} from '@mui/material';
import { BASE_URL } from 'app/utils/constant';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';


const StyledMenu = styled((props) => (
    <Menu
        elevation={0}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
        }}
        {...props}
    />
))(({ theme }) => ({
    '& .MuiPaper-root': {
        borderRadius: 6,
        marginTop: theme.spacing(1),
        minWidth: 180,
        color:
            theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
        boxShadow:
            'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
        '& .MuiMenu-list': {
            padding: '4px 0',
        },
        '& .MuiMenuItem-root': {
            '& .MuiSvgIcon-root': {
                fontSize: 18,
                color: theme.palette.text.secondary,
                marginRight: theme.spacing(1.5),
            },
            '&:active': {
                backgroundColor: alpha(
                    theme.palette.primary.main,
                    theme.palette.action.selectedOpacity,
                ),
            },
        },
    },
}));

const Container = styled('div')(({ theme }) => ({
    margin: '30px',
    [theme.breakpoints.down('sm')]: { margin: '16px' },
    '& .breadcrumb': {
        marginBottom: '30px',
        [theme.breakpoints.down('sm')]: { marginBottom: '16px' },
    },
}));
const StyledTable = styled(Table)(() => ({
    whiteSpace: 'pre',
    '& thead': {
        '& tr': { '& th': { paddingLeft: 0, paddingRight: 0 } },
    },
    '& tbody': {
        '& tr': { '& td': { paddingLeft: 0 } },
    },
}));

const ManageDeals = () => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose5 = () => {
        setAnchorEl(null);
    };


    const [APIData, setAPIData] = useState([]);

    const [onType, setOnType] = useState('')
    const [searchBox, setSearchBox] = useState('')
    const [locationkey, setLocationkey] = useState('')

    const items = localStorage.getItem('accessToken');
    const roleCode = localStorage.getItem('roleCode');
    const userId = localStorage.getItem('userId');
    const headers = {
        "x-access-token": items,
        "roleCode": roleCode,
        "userId": userId
    }
    //get method
    const getFetchLeadData = () => {
        axios.post(BASE_URL + `/api/getFilteredLeadData`, {
            leadId: 0,
            userId: 0,
            statusId: 0,
            searchKey: searchBox,
            locationkey: locationkey,
            platformId: 0,
            opType: onType
        }, { headers: headers })
            .then((response) => {
                setAPIData(response.data.data);
            });
    }
    useEffect(() => {
        getFetchLeadData()
    }, [APIData]);



    return (
        <Container>
            <Box className="breadcrumb">

                <Breadcrumb
                    routeSegments={[{ name: 'Dashboard', path: '/dashboard/default' }, { name: 'My Delas', path: '/myDeal/manageDeals' }, { name: 'Manage Close Lead List' }]}
                />
            </Box>


            <Grid container spacing={4} sx={{ mb: '24px' }}>

                <Grid item xs={12} md={4} >
                    <Form.Label htmlFor="basic-url">Search Lead</Form.Label>
                    <br></br>
                    <InputGroup className="mb-3">
                        <Form.Control
                            placeholder="Search By Lead ID, Name, Mobile Number"
                            aria-label="Recipient's username"
                            aria-describedby="basic-addon2"
                            value={searchBox}
                            onChange={(e) => setSearchBox(e.target.value)}
                        />
                    </InputGroup>
                </Grid>
                <Grid item xs={12} md={4} >
                    <Form.Label htmlFor="basic-url">Search Advanced Lead</Form.Label>
                    <br></br>
                    <InputGroup className="mb-3">
                        <Form.Control
                            placeholder="Search By Street, City, State, Country"
                            aria-label="Recipient's username"
                            aria-describedby="basic-addon2"
                            value={locationkey}
                            onChange={(e) => setLocationkey(e.target.value)}
                        />
                    </InputGroup>
                </Grid>
                <Grid item xs={12} md={4} style={{ marginTop: '30px' }}>
                    <div className="d-flex justify-content-end">
                        <Button
                            id="demo-customized-button"
                            size='large'
                            aria-controls={open ? 'demo-customized-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? 'true' : undefined}
                            variant="contained"
                            disableElevation
                            onClick={handleClick}
                            endIcon={<KeyboardArrowDownIcon />}
                        >
                            Apply Filter
                        </Button>
                        <StyledMenu
                            id="demo-customized-menu"
                            MenuListProps={{
                                'aria-labelledby': 'demo-customized-button',
                            }}
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose5}
                        >
                            <MenuItem
                                onClick={() => { setOnType('DEFAULT'); getFetchLeadData(); handleClose5() }} disableRipple>
                                DEFAULT
                            </MenuItem>
                            <MenuItem
                                onClick={() => { setOnType('LASTDAY'); getFetchLeadData(); handleClose5() }} disableRipple>
                                LASTDAY
                            </MenuItem>
                            <MenuItem
                                onClick={() => { setOnType('LASTWEEK'); getFetchLeadData(); handleClose5() }} disableRipple>
                                LASTWEEK
                            </MenuItem>
                            <MenuItem
                                onClick={() => { setOnType('LASTMONTH'); getFetchLeadData(); handleClose5() }} disableRipple>
                                LASTMONTH
                            </MenuItem>
                        </StyledMenu>&nbsp;
                    </div>
                </Grid>
            </Grid>
            <Box className="text-center" width="100%" overflow="auto">
                {/* Table Section */}
                <StyledTable className="table table-striped table-bordered" style={{ 'borderRadius': '1px' }}>
                    <TableHead style={{ borderLeft: '1px solid red', borderRight: '1px solid red' }} className='text-center'>
                        <TableRow>
                            <TableCell align="center">Lead Id</TableCell>
                            <TableCell align="center">Lead Name</TableCell>
                            <TableCell align="center">Email</TableCell>
                            <TableCell align="center">Mobile Number</TableCell>
                            <TableCell align="center">Intersted In</TableCell>
                            <TableCell align="center">Status</TableCell>
                            <TableCell align="center">Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {APIData.map((subscriber, index) => {
                            if (subscriber.statusName == "Closed (Paid)") {
                                return (
                                    <TableRow key={index}>
                                        <TableCell align="center">{subscriber.leadId}</TableCell>
                                        <TableCell align="center">{subscriber.name}</TableCell>
                                        <TableCell align="center">{subscriber.emailId}</TableCell>
                                        <TableCell align="center">{subscriber.mobileNo}</TableCell>
                                        <TableCell align="center">{subscriber.intrestedIn}</TableCell>
                                        <TableCell align="center">
                                            {(function () {
                                                if (subscriber.statusName == "Closed") {
                                                    return <Chip label="Closed" />;
                                                }
                                                else {
                                                    return <Chip label="Not Listed" color="error" />
                                                }
                                            })()}
                                        </TableCell>
                                        <TableCell align="center">
                                            <Link to="/leads/viewLeads" state={subscriber}>
                                                <IconButton>
                                                    <Icon color="red">visibility</Icon>
                                                </IconButton>
                                            </Link>

                                        </TableCell>
                                    </TableRow>
                                );
                            }
                        })}
                    </TableBody>
                </StyledTable>
            </Box>


        </Container>
    );
};

export default ManageDeals;
