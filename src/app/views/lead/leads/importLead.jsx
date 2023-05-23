import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Data } from 'app/components/Data';
import { Row, Col, Form } from 'react-bootstrap';
import * as XLSX from 'xlsx';
import { EXCEL_FILE_BASE64 } from './constant'
import FileSaver from 'file-saver';
import { BASE_URL } from 'app/utils/constant';
import { useNavigate } from 'react-router-dom';
import { Grid } from '@mui/material';


const ImportLead = ({ handleDialog }) => {

    const items = localStorage.getItem('accessToken');
    const roleCode = localStorage.getItem('roleCode');
    const userId = localStorage.getItem('userId');
    const headers = {
        "x-access-token": items,
        "roleCode": roleCode,
        "userId": userId
    }

    const [excelFile, setExcelFile] = useState(null);
    const [excelFileError, setExcelFileError] = useState(null);

    // submit
    const [excelData, setExcelData] = useState(null);
    // it will contain array of objects

    // handle File
    const fileType = ['application/vnd.ms-excel'];
    const handleFile = (e) => {
        let selectedFile = e.target.files[0];
        if (selectedFile) {
            // console.log(selectedFile.type);
            if (selectedFile && fileType.includes(selectedFile.type)) {
                let reader = new FileReader();
                reader.readAsArrayBuffer(selectedFile);
                reader.onload = (e) => {
                    setExcelFileError(null);
                    setExcelFile(e.target.result);
                };
            } else {
                setExcelFileError('Please select only excel file types');
                setExcelFile(null);
            }
        } else {
            console.log('plz select your file');
        }
    };

    // submit function
    const handleSubmitFile = (e) => {
        e.preventDefault();
        if (excelFile !== null) {
            const workbook = XLSX.read(excelFile, { type: 'buffer' });
            const worksheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[worksheetName];
            const data = XLSX.utils.sheet_to_json(worksheet);
            setExcelData(data);
        } else {
            setExcelData(null);
        }
    };
    // add data in the table from Import
    const postData1 = () => {
        for (var i = 0; i < excelData.length; i++) {
            if (excelData[i].platformName == "Facebook" || excelData[i].platformName == "FB" || excelData[i].platformName == "facebook") {
                excelData[i].sourceId = 1;
            }
            else if (excelData[i].platformName == "Whatsapp") {
                excelData[i].sourceId = 2;
            }
            else if (excelData[i].platformName == "Indiamart") {
                excelData[i].sourceId = 3;
            }
            else if (excelData[i].platformName == "Justdial") {
                excelData[i].sourceId = 4;
            }
            else if (excelData[i].platformName == "99acress") {
                excelData[i].sourceId = 5;
            }
            else if (excelData[i].platformName == "magikbrics") {
                excelData[i].sourceId = 6;
            }
            else if (excelData[i].platformName == "Instagram") {
                excelData[i].sourceId = 7;
            }
            else if (excelData[i].platformName == "Google Ads") {
                excelData[i].sourceId = 8;
            }
            else if (excelData[i].platformName == "Web Ads") {
                excelData[i].sourceId = 9;
            }
            else if (excelData[i].platformName == "" || null) {
                excelData[i].sourceId = 1;
            }
            else {
                excelData[i].sourceId = 1
            }
            excelData[i].expectedAmount = 10000
            excelData[i].status = 1
            excelData[i].assignId = null;
            excelData[i].label = 1;       //Label
            excelData[i].createdBy = 1;
        }
        axios.post(BASE_URL + `/api/saveLeadGenerationData`, excelData,
            { headers: headers }).then((res) => {
                alert(res.data.message)
            }).catch(error => {
                alert(error.response.data.message)
            });
        handleDialog();
    };


    const handleDownload = () => {
        let sliceSize = 1024;
        let byteCharacters = atob(EXCEL_FILE_BASE64);
        let bytesLength = byteCharacters.length;
        let slicesCount = Math.ceil(bytesLength / sliceSize);
        let byteArrays = new Array(slicesCount);
        for (let sliceIndex = 0; sliceIndex < slicesCount; ++sliceIndex) {
            let begin = sliceIndex * sliceSize;
            let end = Math.min(begin + sliceSize, bytesLength);
            let bytes = new Array(end - begin);
            for (var offset = begin, i = 0; offset < end; ++i, ++offset) {
                bytes[i] = byteCharacters[offset].charCodeAt(0);
            }
            byteArrays[sliceIndex] = new Uint8Array(bytes);
        }
        FileSaver.saveAs(new Blob(byteArrays, { type: "application/vnd.ms-excel" }),
            "multiple-Lead-ADD.xls"
        );
    };

    const changePage = () => {
        handleDialog()
    };

    return (
        <>
            <div className="form">
                <form
                    className="form-group"
                    width="1200px"
                    autoComplete="off"
                    onSubmit={handleSubmitFile}
                >
                    <Grid container spacing={4} sx={{ mb: '24px' }}>

                        <Grid item xs={12} md={8} >
                            <input
                                type="file"
                                style={{ width: '100%' }}
                                className="form-control"
                                onChange={handleFile}
                                required
                            ></input>
                            {excelFileError && (
                                <div className="text-danger" style={{ marginTop: 5 + 'px' }}>
                                    {excelFileError}
                                </div>
                            )}

                        </Grid>
                        <Grid item xs={12} md={4} className="d-flex justify-content-end" >
                            <button
                                type="submit"
                                className="btn btn-primary"
                                style={{ marginTop: 5 + 'px' }}
                                onClick={handleDownload}>
                                Download
                            </button>&nbsp;
                            <button
                                type="submit"
                                className="btn btn-success"
                                style={{ marginTop: 5 + 'px' }}
                            >
                                Submit
                            </button>

                        </Grid>

                    </Grid>

                </form>
            </div>
            {/* view file section */}
            <div>
                <h5>View Excel file</h5>
                <div className="viewer">
                    {excelData === null && <>No file selected</>}
                    {excelData !== null && (
                        <div className="table-responsive">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th scope="col">Lead Name</th>
                                        <th scope="col">Mobile No</th>
                                        <th scope="col">Email Id</th>
                                        <th scope="col">City</th>
                                        <th scope="col">State</th>
                                        <th scope="col">Intersted In</th>
                                        <th scope="col">Platform Name</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <Data excelData={excelData} />
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
                <br />
                <Row>
                    <Col className="d-flex justify-content-end">
                        <button className="btn btn-secondary" type='button' onClick={changePage}>
                            Cancel
                        </button>
                        &nbsp;
                        <button
                            type="submit"
                            className="btn btn-success"
                            onClick={postData1}
                        >
                            Add Lead
                        </button>
                    </Col>
                </Row>

            </div>
        </>
    )
}

export default ImportLead