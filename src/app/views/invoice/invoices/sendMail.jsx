import axios from "axios";
import React, { useState } from "react";

const SendInvoiceMail = () => {
    const [selectedFile, setSelectedFile] = useState();

    const changeHandler = (event) => {
        setSelectedFile(event.target.files[0]);
    };
    const data1 = {
        invoiceNumber: "0000000004",
        clientEmail: "rohit.mmj98@gmail.com"
    }
    const items = localStorage.getItem('accessToken');

    // const form = new FormData();
    // form.append(item.name, fs.createReadStream(pathToFile));

    // const response = await axios({
    //     method: 'post',
    //     url: 'http://www.yourserver.com/upload',
    //     data: form,
    //     headers: {
    //         'Content-Type': `multipart/form-data; boundary=${form._boundary}`,
    //     },
    // });
    const handleSubmission = () => {
        const formData = new FormData();
        formData.append(data1, selectedFile);
        // formData.append('File', selectedFile);
        console.log({ data: formData, })
        axios(
            'http://213.136.72.177/cms/api/sendInvoiceMail',
            {
                method: 'POST',
                headers: { "x-access-token": items },
                data: formData,
            }
        )
            .then((response) => response.json())
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