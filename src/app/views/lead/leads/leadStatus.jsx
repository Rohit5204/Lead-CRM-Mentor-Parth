import axios from "axios";
import React, { useState, useEffect } from "react";
import { Form, Row, Col, Button } from 'react-bootstrap';
import { Autocomplete, TextField, FormControl } from '@mui/material';
import { BASE_URL } from "app/utils/constant";
import { useRef } from "react";

const LeadStatus = ({ theLeadStatus, handleDialog }) => {
    const [leadId] = useState(theLeadStatus.leadId);
    const [name] = useState(theLeadStatus.name);
    const [mobileNo] = useState(theLeadStatus.mobileNo)
    const [comapanyName] = useState("BooStock-Info");
    const [companyAddress] = useState("Vashi, Navi-Mumbai");
    const [companyContact] = useState("7896541230")
    const [companyWebsite] = useState("www.boostock.in")
    const [content, setContent] = useState("🌟 Welcome to our family of clients! 🌟 We're thrilled to have you on board and look forward to delivering exceptional service tailored to your needs. Feel free to reach out with any questions or requests. We're here to make your experience with us extraordinary!");

    const [statusName, setStatusName] = useState([]);

    const [myOptions4, setMyOptions4] = useState(theLeadStatus.statusName);
    const [remarks, setRemarks] = useState(theLeadStatus.remarks);


    const [id3, setId3] = useState([]);
    const items = localStorage.getItem('accessToken');
    const roleCode = localStorage.getItem('roleCode');
    const userId = localStorage.getItem('userId');
    const headers = {
        "x-access-token": items,
        "roleCode": roleCode,
        "userId": userId
    }
    const [APIData, setAPIData] = useState([]);
    useEffect(() => {
        axios.get(BASE_URL + `/api/getMasterData?masterName=statusmaster`, { headers: headers }).then((res) => {
            for (var i = 0; i < res.data.data.length; i++) {
                setStatusName(current => [...current, res.data.data[i].name]);
                setId3(current => [...current, res.data.data[i].id, res.data.data[i].name])
            }
        });
    }, [])


    const getFetchLeadData = () => {
        axios.post(BASE_URL + `/api/getFilteredLeadData`, {
            leadId: 0,
            userId: 0,
            statusId: 0,
            searchKey: "",
            locationkey: "",
            platformId: 0,
            opType: ""
        }, { headers: { "x-access-token": items, "roleCode": roleCode, "userId": userId } })
            .then((response) => {
                setAPIData(response.data.data);
            });
    }
    const updateLead = (e) => {
        var statusid;
        for (var i = 0; i < id3.length; i++) {
            if (myOptions4 == id3[i]) {
                statusid = id3[i - 1]
            }
        }
        const UpdateUser = {
            leadId: leadId,
            remarks: remarks,
            statusId: statusid,
            actionBy: 1,
            isMeeting: 1,
            name: theLeadStatus.name,
            mobileNo: theLeadStatus.mobileNo,
            streetName: theLeadStatus.streetName,
            cityName: theLeadStatus.cityName,
            stateName: theLeadStatus.stateName,
            zipCode: theLeadStatus.zipCode,
            countryName: theLeadStatus.countryName,
            intrestedIn: theLeadStatus.intrestedIn,
            sourceId: theLeadStatus.sourceId,
            assignId: theLeadStatus.assignId,
            label: theLeadStatus.label,
            alternateMobile: theLeadStatus.alternateMobile,
            clientName: theLeadStatus.clientName,
            expectedAmount: theLeadStatus.expectedAmount
        };
        // e.preventDefault();
        console.log(UpdateUser)
        axios.post(BASE_URL + `/api/updateLeadData`, UpdateUser,
            { headers: headers });
        // getFetchLeadData()
        handleDialog()
    };
    const [followUpDate, setFollowUpDate] = useState("");
    const [followUpTme, setFollowUpTime] = useState("");
    const [nextFollowUpDate, setNextFollowUpDate] = useState("");
    const [nextFollowUpTme, setNextFollowUpTime] = useState("");
    const [remark, setRemark] = useState("");
    const followUpData = {
        leadId: leadId,
        followUpDate: followUpDate,
        followUpTme: followUpTme,
        remarks: remark,
        nextFollowUpDate: "",
        nextFollowUpTme: "",
        createdBy: 1
    };
    const postData = () => {
        axios.post(BASE_URL + `/api/saveLeadFollowups`, followUpData,
            { headers: headers });
    };
    const blankForm = () => {
        setFollowUpDate('')
        setFollowUpTime('')
        setNextFollowUpDate('')
        setNextFollowUpTime('')
        setRemarks('')
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        updateLead();
        postData();
        blankForm();
        getFetchLeadData()
        handleDialog()
    };

    const [meetingDate, setMeetingDate] = useState("");
    const [fromTime, setFromTime] = useState("");
    const [toTime, setToTime] = useState("");

    const MeetingData = {
        leadId: leadId,
        meetingDate: meetingDate,
        fromTime: fromTime,
        toTime: toTime,
        remark: remark,
    };

    const postData1 = () => {
        axios.post(BASE_URL + `/api/saveLeadMeetings`, MeetingData,
            { headers: headers });
    };
    const blankForm1 = () => {
        setMeetingDate('')
        setFromTime('')
        setToTime('')
        setRemark('')
    };
    const handleSubmit1 = (e) => {
        e.preventDefault();
        updateLead();
        postData1();
        blankForm1();
        getFetchLeadData()
        handleDialog()
    };
    const whatsapp = () => {

        let url = `https://web.whatsapp.com/send?phone=${theLeadStatus.mobileNo}&text=Hey,%0aGreetings from Unity Share Info !!!%0aThanks for showing your interest in ${theLeadStatus.intrestedIn}.%0a%0a${content}%0a%0aPlease visit our website for more detail's www.unityshareinfo.com&app_absent=0`;

        //let url = `https://web.whatsapp.com/send?phone=${theLeadStatus.mobileNo}&text=Hey,%0aGreetings from BOOSTOCK INFO !!!%0aThanks for showing your interest in ${theLeadStatus.intrestedIn}.%0a%0a${content}%0a%0aPlease visit our website for more detail's www.boostok.in&app_absent=0`;

        window.open(url);
    }
    const changePage = () => {
        handleDialog()
    }
    return (
        <div>
            <Row>
                <Col>
                    <Form.Label>Lead No</Form.Label>
                    <Form.Control
                        disabled
                        value={leadId}
                        placeholder="Enter the Lead Name"
                    />
                </Col>
                <Col>
                    <Form.Label>Lead Name</Form.Label>
                    <Form.Control
                        disabled
                        value={name}
                        placeholder="Enter the Lead Name"
                    />
                </Col>
            </Row>
            <br></br>
            <label style={{ color: 'red' }}>Share Company Detail's</label>
            <br></br>
            <Row>
                <Col>
                    <Form.Label>Company Name</Form.Label>
                    <Form.Control
                        disabled
                        value={"Unity Share Info"}
                        placeholder="Enter the Lead Name"
                    />
                </Col>
                <Col>
                    <Form.Label>Company Address</Form.Label>
                    <Form.Control
                        disabled
                        value={"Nerul, Navi Mumbai"}
                        placeholder="Enter the Lead Name"
                    />
                </Col>
            </Row>
            <Row>
                <Col>
                    <Form.Label>Contact Number</Form.Label>
                    <Form.Control
                        disabled
                        value={"8369204059"}
                        placeholder="Enter the Lead Name"
                    />
                </Col>
                <Col>
                    <Form.Label>Webiste Link</Form.Label>
                    <Form.Control
                        disabled
                        value={"www.unityshareinfo.com"}
                        placeholder="Enter the Lead Name"
                    />
                </Col>
            </Row>
            <Row className='mt-1'>
                <Col>
                    <Form.Label>Message</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={4}
                        onChange={(e) => setContent(e.target.value)}
                        value={content}
                        placeholder="Welcome Message"
                    />
                </Col>
            </Row>
            <br />
            <Row>
                <Col className="d-flex justify-content-end">
                    <Button onClick={changePage} variant="secondary">Cancel</Button>
                    &nbsp;
                    <Button onClick={whatsapp} variant="success">Share</Button>
                </Col>
            </Row>
        </div>
    )
};

export default LeadStatus;