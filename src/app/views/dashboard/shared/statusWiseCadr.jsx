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

const StatusWiseCard = () => {
    const { palette } = useTheme();

    const [statusWiseData, setStatusWiseData] = useState([]);
    const items = localStorage.getItem('accessToken');
    useEffect(() => {
        axios.get(`https://43.204.38.243:3000/api/getLeadStatusCount`, { headers: { "x-access-token": items } })
            .then((response) => {
                setStatusWiseData(response.data.data);
            });
        console.log(statusWiseData)
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
        <div>
            <div>
                <div id="root">
                    <div className="container" >
                        <div className="row align-items-stretch">
                            {statusWiseData.map((item, index) => (
                                <div className="c-dashboardInfo col-lg-3 col-md-6" key={index}>
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
                                                <span className="hind-font caption-10 c-dashboardInfo__count">{item.count}</span>
                                            </Col>

                                        </Row>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default StatusWiseCard;
