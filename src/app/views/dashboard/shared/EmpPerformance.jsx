import { Box, Chip, Table, Icon, IconButton, TableBody, TableCell, TableHead, TableRow, Button } from "@mui/material";

import axios from "axios";
import { styled } from '@mui/material/styles';
import React, { useState } from "react";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Modal } from "react-bootstrap";
import ClearIcon from '@mui/icons-material/Clear';
import { BASE_URL } from "app/utils/constant";



const StyledTable = styled(Table)(() => ({
    whiteSpace: 'pre',
    '& thead': {
        '& tr': { '& th': { paddingLeft: 0, paddingRight: 0 } },
    },
    '& tbody': {
        '& tr': { '& td': { paddingLeft: 0 } },
    },
}));

const EmpPerformance = () => {

    const [APIData, setAPIData] = useState([]);

    const items = localStorage.getItem('accessToken');
    const roleCode = localStorage.getItem('roleCode');
    const userId = localStorage.getItem('userId');

    const headers = {
        "x-access-token": items,
        "roleCode": roleCode,
        "userId": userId
    }

    const getEmployeePerformance = () => {
        axios.get(BASE_URL + `/api/getEmployeePerform`,
            { headers: headers })
            .then((response) => {
                console.log(response.data.data)
                setAPIData(response.data.data);

            });
    }
    useEffect(() => {
        getEmployeePerformance()
    }, []);
    return (
        <>
            <Box className="text-center" width="100%" overflow="auto">
                {/* Table Section */}
                <StyledTable className="table table-striped table-bordered" style={{ 'borderRadius': '1px' }}>
                    <TableHead style={{ borderLeft: '1px solid red', borderRight: '1px solid red' }} className='text-center'>
                        <TableRow>

                            <TableCell align="center">Employee Name</TableCell>
                            <TableCell align="center">FT (Fresh Trader)</TableCell>
                            <TableCell align="center">AT (Active Trader)</TableCell>
                            <TableCell align="center">Total Amount</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {APIData.map((subscriber, index) => {
                            if (subscriber.assignId != 1) {
                                return (
                                    <TableRow key={index}>

                                        <TableCell align="center">{subscriber.firstName + " " + subscriber.lastName}</TableCell>
                                        <TableCell align="center">{subscriber.FT_count}</TableCell>
                                        <TableCell align="center">{subscriber.AT_count}</TableCell>
                                        <TableCell align="center">{subscriber.total_amount}</TableCell>

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
export default EmpPerformance