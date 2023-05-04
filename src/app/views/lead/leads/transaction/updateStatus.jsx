import styled from "@emotion/styled";
import { Chip, IconButton } from "@mui/material";
import { BASE_URL } from "app/utils/constant";
import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import { Col, Form, Modal, Row } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import ClearIcon from '@mui/icons-material/Clear';

const Container = styled('div')(({ theme }) => ({
    margin: '30px',
    [theme.breakpoints.down('sm')]: { margin: '16px' },
    '& .breadcrumb': {
        marginBottom: '30px',
        [theme.breakpoints.down('sm')]: { marginBottom: '16px' },
    },
}));
const UpdateTransactionLead = ({ theUpdateLead }) => {

    const [APIData, setAPIData] = useState([])

    const token = localStorage.getItem('accessToken');
    const roleCode = localStorage.getItem('roleCode');
    const userId = localStorage.getItem('userId');
    const headers = {
        "x-access-token": token,
        "roleCode": roleCode,
        "userId": userId
    }

    const [tranDate, setTranDate] = useState(theUpdateLead.tranDate)
    const [amount, setAmount] = useState(theUpdateLead.amount)
    const [remark, setRemark] = useState(theUpdateLead.remark)

    const blankData = () => {
        setTranDate('')
        setAmount('')
        setRemark('')
    }

    const updateTransaction = () => {
        const transData = {
            // leadId: leadId,
            tranDate: tranDate,
            amount: amount,
            remarks: remark,
            createdBy: 1,
            isapproved: 1,
            recordStatus: 0
        };
        // console.log({ followUpData })
        // axios.post(BASE_URL + `/api/saveLeadTransaction`, transData,
        //     { headers: headers });
        blankData()
    }


    const navigate = useNavigate();
    const changePage = () => {
        navigate('/leads/manageLeads');
    };

    return (
        <>



            <Row>
                <Col>
                    <Form.Label>Transaction Date</Form.Label>
                    <Form.Control
                        disabled
                        type='text'
                        placeholder="Enter any Transaction Date"
                        // onChange={(e) => setTranDate(e.target.value)}
                        value={new Date(tranDate).toLocaleDateString('en-GB')}
                    />
                </Col>
                <Col>
                    <Form.Label>Transaction Amount</Form.Label>
                    <Form.Control
                        type="number"
                        placeholder="Enter the Amount"
                        // onChange={(e) => setAmount(e.target.value)}
                        value={amount}
                    />
                </Col>
            </Row>
            <Row>
                <Col>
                    <Form.Label>Remarks</Form.Label>
                    <Form.Control
                        placeholder="Enter any Remarks"
                        onChange={(e) => setRemark(e.target.value)}
                        value={remark}
                    />
                </Col>
            </Row>
            <br />
            <Row>
                <Col className="d-flex justify-content-center">

                    <button type='button' className="btn btn-success" onClick={updateTransaction}>
                        Approved
                    </button>
                </Col>
            </Row>





        </>
    )
}
export default UpdateTransactionLead