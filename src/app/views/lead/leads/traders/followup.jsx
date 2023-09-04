import { Box, Chip, Table, Icon, IconButton, TableBody, TableCell, TableHead, TableRow, Button } from "@mui/material";
import { BASE_URL } from "app/utils/constant";
import axios from "axios";
import { styled } from '@mui/material/styles';
import React, { useState } from "react";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Modal } from "react-bootstrap";
import ClearIcon from '@mui/icons-material/Clear';
import LeadStatusChange from "./statusChange";


const StyledTable = styled(Table)(() => ({
    whiteSpace: 'pre',
    '& thead': {
        '& tr': { '& th': { paddingLeft: 0, paddingRight: 0 } },
    },
    '& tbody': {
        '& tr': { '& td': { paddingLeft: 0 } },
    },
}));

const FollowUpTrader = ({ fetch }) => {
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
    const [obj1, setObj1] = useState(null);
    const [showAdd, setShowAdd] = useState(false);

    const closeAdd = () => setShowAdd(false);
    const openAdd = (subscriber) => {
        setObj1(subscriber);
        setShowAdd(true);
    }
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
                            <TableCell align="center">Pending Amount</TableCell>
                            <TableCell align="center">Client Status</TableCell>
                            <TableCell align="center">Remark</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {APIData.map((subscriber, index) => {
                            if (subscriber.compStatus == 1) {
                                return (
                                    <TableRow key={index}>

                                        <TableCell align="center">{name}</TableCell>
                                        <TableCell align="center">{new Date(subscriber.traderDate).toLocaleDateString('en-GB')}</TableCell>
                                        <TableCell align="center">{subscriber.traderAmt}</TableCell>
                                        <TableCell align="center">{subscriber.plAmt}</TableCell>
                                        <TableCell align="center">{subscriber.compAmt}</TableCell>
                                        <TableCell align="center">
                                            <Chip label="Follow Up" color="warning" onClick={() => openAdd(subscriber)} />
                                        </TableCell>
                                        <TableCell align="center">{subscriber.remarks}</TableCell>
                                    </TableRow>
                                );
                            }
                        })}
                    </TableBody>
                </StyledTable>
            </Box>
            <Modal
                backdrop="static"
                keyboard={false}
                show={showAdd}
                onHide={closeAdd}
                animation={false}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header>
                    <h5>Update Client Status</h5>
                    <IconButton type="button" onClick={closeAdd}>
                        <ClearIcon />
                    </IconButton>
                </Modal.Header>
                <Modal.Body>
                    <LeadStatusChange theViewData={obj1} handleDialog={closeAdd}></LeadStatusChange>
                </Modal.Body>
            </Modal>
        </>
    )
}
export default FollowUpTrader