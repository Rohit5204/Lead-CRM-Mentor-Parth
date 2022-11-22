import axios from "axios";
import React, { useState } from "react";

const SendInvoiceMail = () => {
    const [selectedFile, setSelectedFile] = useState();
    const data1 = {
        invoiceNumber: "0000000004",
        clientEmail: "rohit.mmj98@gmail.com"
    }
    const changeHandler = (event) => {
        setSelectedFile(event.target.files[0]);

    };
    const items = localStorage.getItem('accessToken');
    const handleSubmission = async () => {
        const formData = new FormData();
        formData.append('data', JSON.stringify(data1));
        formData.append('file', selectedFile);
        for (var pair of formData.entries()) {
            console.log(pair[0] + ', ' + pair[1]);
        }
        console.log({ data: data1, file: selectedFile })
        await axios.post('http://213.136.72.177/cms/api/sendInvoiceMail',
            formData, {
            headers: { "x-access-token": items }
        })
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