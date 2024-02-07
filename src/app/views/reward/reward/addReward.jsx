import { styled } from '@mui/system';
import { Breadcrumb, SimpleCard } from 'app/components';
import { Form, Row, Col, Button, InputGroup } from 'react-bootstrap';
import { Box, MenuItem, Autocomplete, TextField, FormControl, Select } from '@mui/material';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from 'app/utils/constant';


const AddReward = ({ handleDialog, handleRefresh }) => {

    const today = new Date();
    const numberOfDaysToAdd = 0;
    const date = today.setDate(today.getDate() + numberOfDaysToAdd);
    const defaultValue = new Date(date).toISOString().split('T')[0];

    const [startDate, setStartDate] = useState(defaultValue);
    const [endDate, setEndDate] = useState();
    const [targetAmt, setTargetAmt] = useState(10000);
    const [giftAmt, setGiftAmt] = useState(0);
    const [status, setStatus] = useState(0);

    const items = localStorage.getItem('accessToken');
    const roleCode = localStorage.getItem('roleCode');
    const userId = localStorage.getItem('userId');
    const headers = {
        "x-access-token": items,
        "roleCode": roleCode,
        "userId": userId
    }

    const postReward = () => {
        const data = {
            startDate: startDate,
            endDate: endDate,
            targetAmt: targetAmt,
            giftAmt: giftAmt,
            createdBy: 1,
            status: status
        }
        axios.post(BASE_URL + `/api/saveReward`, data,
            { headers: headers });
        handleRefresh();
        handleDialog();
    }

    const changePage = () => {
        handleDialog()
    };



    return (


        <Form onSubmit={postReward}>
            <Row>
                <Col md="6">
                    <Form.Label>Start Date</Form.Label>
                    <Form.Control
                        type='date'
                        required
                        onChange={(e) => setStartDate(e.target.value)}
                        value={startDate}
                    />
                </Col>
                <Col className="mt-1" md="6">
                    <Form.Label>End Date</Form.Label>
                    <Form.Control
                        type='date'
                        required
                        onChange={(e) => setEndDate(e.target.value)}
                        value={endDate}
                    />
                </Col>
            </Row>
            <Row>
                <Col md="12">
                    <Form.Label>Target Amount</Form.Label>
                    <Form.Control
                        required
                        onChange={(e) => setTargetAmt(e.target.value)}
                        value={targetAmt}
                        placeholder="Enter the Target Amount"
                    />
                </Col>

            </Row>
            <Row>
                <Col md="12">
                    <Form.Label>Redeem Gift Amount</Form.Label>
                    <Form.Control
                        required
                        onChange={(e) => setGiftAmt(e.target.value)}
                        value={giftAmt}
                        placeholder="Enter the Gift Amount"
                    />
                </Col>

            </Row>
            <br />
            <Row>
                <Col className="d-flex justify-content-end">
                    <Button variant="secondary" onClick={changePage}>
                        Cancel
                    </Button>
                    &nbsp;
                    <button type="submit" className="btn btn-success" >
                        Save
                    </button>
                </Col>
            </Row>

        </Form>

    );
};

export default AddReward;


