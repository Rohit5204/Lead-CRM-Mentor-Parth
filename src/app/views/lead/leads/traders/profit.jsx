import { Box, Chip, Table, Icon, IconButton, TableBody, TableCell, TableHead, TableRow, Button } from "@mui/material";
import { BASE_URL } from "app/utils/constant";
import axios from "axios";
import { styled } from '@mui/material/styles';
import React, { useState } from "react";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";


const StyledTable = styled(Table)(() => ({
    whiteSpace: 'pre',
    '& thead': {
        '& tr': { '& th': { paddingLeft: 0, paddingRight: 0 } },
    },
    '& tbody': {
        '& tr': { '& td': { paddingLeft: 0 } },
    },
}));

const ProfitTrader = ({ fetch }) => {
    const location = useLocation();
    const [APIData, setAPIData] = useState([]);
    const leadId = location.state.leadId;
    const name = location.state.name

    const items = localStorage.getItem('accessToken');
    const roleCode = localStorage.getItem('roleCode');
    const userId = localStorage.getItem('userId');

    const headers = {
        "x-access-token": items,
        "roleCode": roleCode,
        "userId": userId
    }

    // const getLeadTraderData = () => {
    //     axios.post(BASE_URL + `/api/getLeadTrader`, { headers: headers })
    //         .then((response) => {
    //             setAPIData(response.data.data);
    //         });
    // }
    const getLeadTraderData = () => {
        axios.post(BASE_URL + `/api/getFilteredLeadData`, {
            leadId: leadId, userId: 0, statusId: 0, searchKey: "",
            locationkey: "", platformId: 0, opType: ""
        },
            { headers: headers })
            .then((response) => {
                for (var i = 0; i < response.data.data.length; i++) {
                    setAPIData(response.data.data[i].traderData);
                }
            });
    }
    useEffect(() => {
        getLeadTraderData()
    }, [fetch]);
    return (
        <>
            <Box className="text-center" width="100%" overflow="auto">
                {/* Table Section */}
                <StyledTable className="table table-striped table-bordered" style={{ 'borderRadius': '1px' }}>
                    <TableHead style={{ borderLeft: '1px solid red', borderRight: '1px solid red' }} className='text-center'>
                        <TableRow>

                            <TableCell align="center">Trader Name</TableCell>
                            <TableCell align="center">Trading Date</TableCell>
                            <TableCell align="center">Trading Amount</TableCell>
                            <TableCell align="center">Profit Amount</TableCell>
                            <TableCell align="center">Paid Amount</TableCell>
                            <TableCell align="center">Client Status</TableCell>
                            <TableCell align="center">Remark</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {APIData.map((subscriber, index) => {
                            if (subscriber.status == 0) {
                                return (
                                    <TableRow key={index}>

                                        <TableCell align="center">{name}</TableCell>
                                        <TableCell align="center">{new Date(subscriber.traderDate).toLocaleDateString('en-GB')}</TableCell>
                                        <TableCell align="center">{subscriber.traderAmt}</TableCell>
                                        <TableCell align="center">{subscriber.plAmt}</TableCell>
                                        <TableCell align="center">{subscriber.compAmt}</TableCell>
                                        <TableCell align="center">
                                            <Chip label="Profit" color="success" />
                                        </TableCell>
                                        <TableCell align="center">{subscriber.remarks}</TableCell>
                                    </TableRow>
                                );
                            }
                        })}
                    </TableBody>
                </StyledTable>
            </Box>
        </>
    )
}
export default ProfitTrader