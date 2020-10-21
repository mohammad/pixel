import React, { useState } from "react";
import { createAsset } from '../utils/calls';
import axios from "axios";

export function CreateAsset({ canvas, contract }) {
    const [name, updateName] = useState("")
    const [description, updateDescription] = useState("")

    function submitUploadRequest(buffer) {
        axios.post('http://localhost:9000/upload', {
            buffer: buffer
        }).then((resp) => {
            console.log(resp)
        }).catch((err) => {
            console.log(err)
        })
    }



    function handleSubmit() {
        if (canvas) {
            // createAsset () if successful, upload the image, then uplaod the JSON

            const buffer = canvas.toDataURL();
            submitUploadRequest(buffer)
        }
    }

    return (
        <div onClick={() => handleSubmit()}>
            <input />
            <p>Create Asset</p>
        </div>
    )
}
