import styled from "@emotion/styled";
import { Button, Chip, IconButton } from "@mui/material";
import { BASE_URL } from "app/utils/constant";
import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import { Col, Form, Modal, Row } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import ClearIcon from '@mui/icons-material/Clear';
import UpdateTransactionLead from "./updateStatus";

const Container = styled('div')(({ theme }) => ({
    margin: '30px',
    [theme.breakpoints.down('sm')]: { margin: '16px' },
    '& .breadcrumb': {
        marginBottom: '30px',
        [theme.breakpoints.down('sm')]: { marginBottom: '16px' },
    },
}));
const TransactionLeads = () => {
    const today = new Date();
    const numberOfDaysToAdd = 0;
    const date = today.setDate(today.getDate() + numberOfDaysToAdd);
    const defaultValue = new Date(date).toISOString().split('T')[0];
    const location = useLocation();
    const [APIData, setAPIData] = useState([])

    const token = localStorage.getItem('accessToken');
    const roleCode = localStorage.getItem('roleCode');
    const userId = localStorage.getItem('userId');
    const headers = {
        "x-access-token": token,
        "roleCode": roleCode,
        "userId": userId
    }
    const [leadId, setLeadId] = useState(location.state.leadId)
    const [tranDate, setTranDate] = useState(defaultValue)
    const [amount, setAmount] = useState()
    const [remark, setRemark] = useState()

    const [obj2, setObj2] = useState(null);
    const [show, setShow] = useState(false);
    const handleShow = (follow) => {
        setObj2(follow);
        setShow(true);
    };
    const handleClose = () => { setShow(false); }

    const [show1, setShow1] = useState(false);
    const handleShow1 = () => {
        setShow1(true);
    };
    const handleClose1 = () => { setShow1(false); }

    const blankData = () => {
        setTranDate('')
        setAmount('')
        setRemark('')
    }

    const postTransaction = () => {
        const transData = {
            leadId: leadId,
            tranDate: tranDate,
            amount: amount,
            remarks: remark,
            createdBy: 1,
            isapproved: 1,
            recordStatus: 0
        };
        // console.log({ followUpData })
        axios.post(BASE_URL + `/api/saveLeadTransaction`, transData,
            { headers: headers });
        blankData()
        handleClose1()
    }

    useEffect(() => {
        getLeadData()
    }, [show, show1]);


    const getLeadData = () => {
        axios.post(BASE_URL + `/api/getFilteredLeadData`, {
            leadId: leadId, userId: 0, statusId: 0, searchKey: "",
            locationkey: "", platformId: 0, opType: ""
        },
            { headers: headers })
            .then((response) => {
                for (var i = 0; i < response.data.data.length; i++) {
                    setAPIData(response.data.data[i].transactionData);
                    // response.data.data[i].followupData);
                    // console.log(response.data.data[i].followupData)
                    // console.log(APIData)
                }
            });
    }
    const navigate = useNavigate();
    const changePage = () => {
        navigate('/leads/manageLeads');
    };
    const roleName = window.localStorage.getItem('roleName');
    return (
        <>
            <Container>
                <div>
                    <h5>Lead Transaction Record</h5>




                    {/* {JSON.stringify(APIData456)} */}
                    <Row className="mt-2">
                        <Col> <h5 className='text-center'>Transaction Detail's</h5></Col>
                        <button type='button' className="btn btn-success" onClick={handleShow1}>ADD</button>
                        <br />
                        <table className="table table-striped table-bordered mt-4" style={{ 'borderRadius': '2px' }}>
                            <thead style={{ "color": "MidnightBlue" }} className='text-center'>
                                <tr>
                                    <th>Sr No.</th>
                                    <th>Transaction Date</th>
                                    <th>Transaction Amount</th>
                                    <th>Remarks</th>
                                    <th>Approved</th>
                                </tr>
                            </thead>
                            {APIData.map((follow, index) => {
                                return (
                                    <tbody className='text-center'>
                                        <tr key={index}>
                                            <td>{follow.id}</td>
                                            <td>{new Date(follow.tranDate).toLocaleDateString('en-GB')}</td>
                                            <td>{follow.amount}</td>

                                            <td>{follow.remark}</td>
                                            <td>
                                                {roleName == "Employee" ? (<>
                                                    {follow.isapproved == 1 ? (<>
                                                        <Chip label="Waiting" color="warning"></Chip></>) : (<>
                                                            <Chip label="Approved" color="success"></Chip></>
                                                    )}
                                                </>) : (<>
                                                    {follow.isapproved == 1 ? (<>
                                                        <Chip label="Waiting" color="warning" onClick={() => handleShow(follow)}></Chip></>) : (<>
                                                            <Chip label="Approved" color="success"></Chip></>
                                                    )}
                                                </>)}

                                            </td>
                                        </tr>
                                    </tbody>
                                )
                            })}
                        </table>

                    </Row>
                </div>

            </Container>

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                size="md"
                centered
                aria-labelledby="contained-modal-title-vcenter"

            >
                <Modal.Header>
                    <Modal.Title>Approve Transaction Record</Modal.Title>
                    <IconButton type="button" onClick={handleClose}>
                        <ClearIcon />
                    </IconButton>
                </Modal.Header>
                <Modal.Body>
                    <UpdateTransactionLead theUpdateLead={obj2} handleDialog={handleClose}></UpdateTransactionLead>
                </Modal.Body>
            </Modal>

            <Modal
                show={show1}
                onHide={handleClose1}
                backdrop="static"
                keyboard={false}
                size="md"
                centered
                aria-labelledby="contained-modal-title-vcenter"

            >
                <Modal.Header>
                    <Modal.Title>Add Transaction Record</Modal.Title>
                    <IconButton type="button" onClick={handleClose1}>
                        <ClearIcon />
                    </IconButton>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col>
                            <Form.Label>Lead ID</Form.Label>
                            <Form.Control
                                disabled
                                type="number"
                                placeholder="Enter Lead Id"
                                value={leadId}
                            // onChange={(e) => setFollowUpDate(e.target.value)}
                            // value={followUpDate}
                            />
                        </Col>
                        <Col>
                            <Form.Label>Lead Name</Form.Label>
                            <br />
                            <Form.Control
                                disabled
                                type="text"
                                placeholder="Enter Lead Name"
                                value={location.state.name}
                            // value={followUpTme}
                            // onChange={(e) => setFollowUpTime(e.target.value)}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Label>Transaction Date</Form.Label>
                            <Form.Control
                                type="date"
                                placeholder="Enter any Remarks"
                                onChange={(e) => setTranDate(e.target.value)}
                                value={tranDate}
                            />
                        </Col>
                        <Col>
                            <Form.Label>Transaction Amount</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Enter the Amount"
                                onChange={(e) => setAmount(e.target.value)}
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
                        <Col className="d-flex justify-content-end">
                            <button className="btn btn-secondary" type='button' onClick={changePage}>
                                Cancel
                            </button>
                            &nbsp;
                            <button type='button' className="btn btn-success" onClick={postTransaction}>
                                Save
                            </button>
                        </Col>
                    </Row>
                </Modal.Body>
            </Modal>
        </>
    )
}
export default TransactionLeads