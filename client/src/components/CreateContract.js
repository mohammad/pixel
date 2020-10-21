import React, { useEffect, useState } from 'react';
import { createContract } from '../utils/calls'
import { Link } from "react-router-dom";

export function CreateContract() {
    const [name, updateName] = useState("")
    const [symbol, updateSymbol] = useState("")


    function handleSubmit() {
        if (name.length > 2 && symbol.length > 2) {
            createContract(name, symbol)
        } else {
            console.log("Need to enter a proper name and or symbol")
        }
    }

    function handleNameChange(e) {
        const value = e.target.value
        updateName(value)
    }

    function handleSymbolChange(e) {
        const value = e.target.value
        updateSymbol(value)
    }



    return (
        <div>
            <h1>Create a collection</h1>
            <input value={name} onChange={(e) => handleNameChange(e)} placeholder={"Enter a name"} />
            <br />
            <input value={symbol} onChange={(e) => handleSymbolChange(e)} placeholder={"Enter a symbol"} />
            <p onClick={() => handleSubmit()}>Create Test</p>
            <Link to="create">Go to drawing board</Link>
        </div>
    )
}