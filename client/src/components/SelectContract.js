import React, { useEffect, useState } from 'react';
import { getContractData } from '../utils/calls'
import { Link } from "react-router-dom";

export function SelectContract({ updateSelectedContract, contract }) {
    const [userContracts, updateUserContracts] = useState([])

    useEffect(() => {
        const controller = new AbortController();
        async function fetchContracts() {
            try {
                const contracts = await (getContractData())
                updateUserContracts(contracts)
            } catch (err) {
                console.log(err)
            }

        }
        fetchContracts()
        return () => {
            controller.abort();
        }
    }, [])

    function handleSelect(address) {
        updateSelectedContract(address)
    }


    return (
        <div>
            <Link to="create-collection">Create Contract</Link>
            <p>Currently Selected Address: {contract}</p>
            {userContracts.map(({ name, symbol, totalSupply, address }, index) => {
                return <div onClick={() => handleSelect(address)} key={index}>
                    <h1>Contract: {address}</h1>
                    <p>Name: {name}</p>
                    <p>Symbol: {symbol}</p>
                    <p>Total Supply: {totalSupply}</p>
                    <Link to={`/collection/${address}`}>Click to see collection</Link>
                </div>
            })}
        </div>
    );

}