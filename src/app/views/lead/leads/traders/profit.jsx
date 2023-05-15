import { Box, Chip, Table, Icon, IconButton, TableBody, TableCell, TableHead, TableRow, Button } from "@mui/material";
import { BASE_URL } from "app/utils/constant";
import axios from "axios";
import { styled } from '@mui/material/styles';
import React, { useState } from "react";
import { useEffect } from "react";


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
    const [APIData, setAPIData] = useState([]);

    const items = localStorage.getItem('accessToken');
    const roleCode = localStorage.getItem('roleCode');
    const userId = localStorage.getItem('userId');

    const headers = {
        "x-access-token": items,
        "roleCode": roleCode,
        "userId": userId
    }

    const getLeadTraderData = () => {
        axios.post(BASE_URL + `/api/getLeadTrader`, { headers: headers })
            .then((response) => {
                setAPIData(response.data.data);
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

                            <TableCell align="center">Trader Amount</TableCell>
                            <TableCell align="center">Trader Date</TableCell>
                            <TableCell align="center">Remark</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {APIData.map((subscriber, index) => {
                            if (subscriber.status == 0) {
                                return (
                                    <TableRow key={index}>

                                        <TableCell align="center">{subscriber.name}</TableCell>

                                        <TableCell align="center">{subscriber.traderAmt}</TableCell>
                                        <TableCell align="center">{new Date(subscriber.traderDate).toLocaleDateString('en-GB')}</TableCell>
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