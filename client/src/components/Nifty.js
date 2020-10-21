import React from 'react';
import "./styles/Nifty.css";


export function Nifty({ name, description, url, attributes }) {

    return <div className="nft-container" >
        <p>Name: {name}</p>
        <p>Description: {description}</p>
        <img href={url}></img>
    </div>

}