import React, { useState, useEffect } from 'react';
import { Nifty } from './Nifty';
import { getItems } from '../utils/calls'


// The eventual display page for all NFTS of a certain generated contract
export default function Collection() {
    const [items, updateItems] = useState([])

    useEffect(() => {
        const controller = new AbortController();
        async function fetchItems() {
            try {
                const address = window.location.pathname.split('/')[2]
                const fetchedItems = await (getItems(address))
                updateItems(fetchedItems)
            } catch (err) {
                console.log(err)
            }
        }
        fetchItems()
        return () => {
            controller.abort();
        }
    }, [])


    return (
        <div>
            {items.map(({ name, description, imageUrl, attributes }, i) => {
                return <Nifty key={i} name={name} description={description} url={imageUrl} attributes={attributes} />
            })}
        </div>
    )

}