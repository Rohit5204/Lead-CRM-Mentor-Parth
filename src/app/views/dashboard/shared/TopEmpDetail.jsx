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
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';

const TopEmpDetail = (showData) => {
    const [statusWiseData, setStatusWiseData] = useState([]);

    useEffect(() => {
        axios.get(BASE_URL + `/api/getTopEmp`)
            .then((response) => {
                console.log(response)
                setStatusWiseData(response.data.data);
            });
    }, [statusWiseData]);

    const rank = ["Rank 1", "Rank 2", "Rank 3"]
    return (
        <div className="row align-items-stretch">
            {statusWiseData.map((item, index) => (

                <div className="card" style={{ borderRadius: '15px' }}>
                    <div className="card-body p-4">
                        <div className="d-flex text-black">
                            <div className="flex-shrink-0">
                                <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
                                    alt="Generic placeholder image" className="img-fluid"
                                    style={{ borderRadius: '10px', width: '120px' }}
                                />
                            </div>
                            <div className="flex-grow-1 ms-3 ml-5">
                                <h5 className="mb-1">{item.firstName} {item.lastName}</h5>
                                <p className="mb-2 pb-1" style={{ color: '#2b2a2a' }}>{rank[index]}</p>
                                <div className="d-flex justify-content-start rounded-3 p-2 mb-2"
                                    style={{ backgroundColor: '#efefef' }}
                                >
                                    <div>
                                        <p className="small text-muted mb-1">Total Lead</p>
                                        <p className="mb-0">{item.total_lead_count}</p>
                                    </div>
                                    <div className="px-3">
                                        <p className="small text-muted mb-1">Total Amount</p>
                                        <p className="mb-0">₹ {item.total_amount}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            ))}
        </div>
    );
};
export default TopEmpDetail;
