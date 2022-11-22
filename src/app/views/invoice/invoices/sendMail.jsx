import axios from "axios";
import React, { useState } from "react";

const SendInvoiceMail = () => {
    const [selectedFile, setSelectedFile] = useState();

    const formData = new FormData();
    const data1 = {
        invoiceNumber: "0000000004",
        clientEmail: "rohit.mmj98@gmail.com"
    }
    const changeHandler = (event) => {
        // setSelectedFile(event.target.files[0]);
        formData.append('file', event.target.files[0]);
        formData.append('data', data1);
        console.log(event.target.files[0])
        console.log(formData)
        console.log({ data: data1, file: event.target.files[0] })
    };
    const items = localStorage.getItem('accessToken');
    const handleSubmission = () => {
        axios.post('http://213.136.72.177/cms/api/sendInvoiceMail', formData, {
            headers: {
                'Content-type': 'multipart/form-data',
                "x-access-token": items
            }
        }
        ).then((response) => response.json())
            .then((result) => {
                console.log('Success:', result);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };
    return (
        <div>
            <input type="file" name="file" onChange={changeHandler} />
            <div>
                <button onClick={handleSubmission}>Submit</button>
            </div>
        </div>
    )
};

export default SendInvoiceMail;