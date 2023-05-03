import { Card, Box, Fab, Grid, Icon, lighten, styled, useTheme, IconButton } from '@mui/material';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Row, Col } from 'react-bootstrap'
import { Small } from 'app/components/Typography';
import "./statusCard.css";
import FollowTheSignsIcon from '@mui/icons-material/FollowTheSigns';
import EventNoteIcon from '@mui/icons-material/EventNote';
import SendIcon from '@mui/icons-material/Send';
import DescriptionIcon from '@mui/icons-material/Description';
import ReceiptIcon from '@mui/icons-material/Receipt';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import ArrowDropDownCircleIcon from '@mui/icons-material/ArrowDropDownCircle';
import WifiCalling3Icon from '@mui/icons-material/WifiCalling3';
import { BASE_URL } from 'app/utils/constant';

const StatusWiseCard = (showData) => {
    const { palette } = useTheme();

    const [statusWiseData, setStatusWiseData] = useState([]);
    const items = localStorage.getItem('accessToken');
    const roleCode = localStorage.getItem('roleCode');
    const userId = localStorage.getItem('userId');
    const headers = {
        "x-access-token": items,
        "roleCode": roleCode,
        "userId": userId
    }
    useEffect(() => {
        axios.post(BASE_URL + `/api/getLeadStatusCount`, {
            opType: showData.showData.opType,
            fromDate: showData.showData.fromDate,
            toDate: showData.showData.toDate,
            empId: 0
        }, { headers: headers })
            .then((response) => {
                console.log(response.data.data)
                setStatusWiseData(response.data.data);
            });
    }, [statusWiseData]);

    const iconOption = [
        <SendIcon style={{ fontSize: "65px" }}></SendIcon>,
        <FollowTheSignsIcon style={{ fontSize: "65px" }}></FollowTheSignsIcon>,
        <EventNoteIcon style={{ fontSize: "65px" }}></EventNoteIcon>,
        <DescriptionIcon style={{ fontSize: "70px" }}></DescriptionIcon>,
        <ArrowDropDownCircleIcon style={{ fontSize: "70px" }}></ArrowDropDownCircleIcon>,
        <ReceiptIcon style={{ fontSize: "70px" }}></ReceiptIcon>,
        <AssignmentTurnedInIcon style={{ fontSize: "70px" }}></AssignmentTurnedInIcon>,
        <WifiCalling3Icon style={{ fontSize: "65px" }}></WifiCalling3Icon>
    ]
    return (
        <div className="row align-items-stretch">
            {statusWiseData.map((item, index) => (
                <div className="c-dashboardInfo col-lg-3 col-md-6" key={index} style={{ borderRadius: "5px" }}>
                    <div className="wrap">
                        <Row>
                            <Col md="4">
                                <div style={{ color: '#7499e5' }}>
                                    {iconOption[index]}
                                </div>
                            </Col>
                            <Col style={{ marginLeft: "12px" }}>
                                <h4 className="heading heading5 hind-font medium-font-weight c-dashboardInfo__title ">
                                    {item.statusName}
                                </h4>
                                <span className="hind-font caption-8 c-dashboardInfo__count">{item.count}</span>
                            </Col>

                        </Row>
                    </div>
                </div>
            ))}
        </div>
    );
};
export default StatusWiseCard;
