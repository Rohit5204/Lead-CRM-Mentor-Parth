import React, { useState } from 'react';
import { Grid, InputLabel, TextField, Button, } from "@mui/material";
import axios from 'axios';
import moment from 'moment/moment';
import { BASE_URL1 } from 'app/utils/constant';
import { Col, Form, Row } from 'react-bootstrap';


const CheckOut = ({ thelogoutData, handleClose }) => {
    const [organization, setOrganization] = useState(thelogoutData.organization)
    const [name, setName] = useState(thelogoutData.fname + " " + thelogoutData.lname)

    const checkOutAttendence = () => {

        var now = new Date();

        const currentTime = new Date();
        const currentHour = currentTime.getHours();
        if (moment(thelogoutData.date).format('YYYY-MM-DD') == moment(now).format('YYYY-MM-DD')) {
            if (currentHour < 16) {
                const Data = {
                    fname: thelogoutData.fname,
                    lname: thelogoutData.lname,
                    date: thelogoutData.date,
                    checkOut: now,
                    disableLogout: 1,
                    attendence: 2,
                    organization: organization
                }
                axios.put(BASE_URL1 + '/updateAttendence/' + thelogoutData._id, Data)
            }
            else {
                const Data = {
                    fname: thelogoutData.fname,
                    lname: thelogoutData.lname,
                    date: thelogoutData.date,
                    checkOut: now,
                    disableLogout: 1,
                    attendence: thelogoutData.attendence,
                    organization: organization
                }
                axios.put(BASE_URL1 + '/updateAttendence/' + thelogoutData._id, Data)

            }
        }
        else {
            return alert('Sorry You can not Logout for Previous Day')
        }
        handleClose()
    }

    const changePage = () => {
        handleClose()
    }

    return (
        <>

            <form>
                <Row>
                    <Col md="6">
                        <Form.Label>Oraganization</Form.Label>
                        <Form.Control
                            required
                            disabled
                            placeholder='Enter the Organization Name'
                            value={organization}
                        />
                    </Col>
                    <Col className="mt-1" md="6">
                        <Form.Label>Employee Name</Form.Label>
                        <Form.Control
                            required
                            disabled
                            placeholder='Enter the Employee Name'
                            value={name}
                        />
                    </Col>

                </Row>
                <Row>

                    <Col className="mt-1" md="6">
                        <Form.Label>Date</Form.Label>
                        <Form.Control

                            required
                            disabled
                            value={new Date(thelogoutData.date).toLocaleDateString('en-GB')}
                        />
                    </Col>
                    <Col className="mt-1" md="6">
                        <Form.Label>Check In Time</Form.Label>
                        <Form.Control

                            required
                            disabled
                            value={new Date(thelogoutData.checkInTime).toLocaleTimeString('en-GB')}
                        />
                    </Col>
                </Row>


            </form>
            <br />
            <div style={{ textAlign: 'right' }}>
                <Button variant="contained" color="error" onClick={checkOutAttendence}>Check Out</Button>
            </div>

        </>

    )
}

export default CheckOut;
