import Web3 from "web3"
import Pixel from "../constants/abis/Pixel"
import PixelFactory from "../constants/abis/PixelFactory"

// Return type is a string and we need to fix this
async function getContractTotalSupply(contractAddress) {
    if (window.ethereum) {
        window.ethereum.enable()
        const web3 = new Web3(window.ethereum)
        const address = web3.currentProvider.selectedAddress
        const PixelContract = new web3.eth.Contract(Pixel.abi, contractAddress)
        const totalSupply = await (PixelContract.methods.totalSupply().call({ from: address }))
        return parseInt(totalSupply)
    } else {
        console.log("No Web3 Provider");
        alert("Install Metamask!");
    }
}

async function getContractSymbol(contractAddress) {
    if (window.ethereum) {
        window.ethereum.enable()
        const web3 = new Web3(window.ethereum)
        const address = web3.currentProvider.selectedAddress
        const PixelContract = new web3.eth.Contract(Pixel.abi, contractAddress)
        const symbol = await (PixelContract.methods.symbol().call({ from: address }))
        return symbol
    } else {
        console.log("No Web3 Provider");
        alert("Install Metamask!");
    }
}

async function getContractName(contractAddress) {
    if (window.ethereum) {
        window.ethereum.enable()
        const web3 = new Web3(window.ethereum)
        const address = web3.currentProvider.selectedAddress
        const PixelContract = new web3.eth.Contract(Pixel.abi, contractAddress)
        const name = await (PixelContract.methods.name().call({ from: address }))
        return name
    } else {
        console.log("No Web3 Provider");
        alert("Install Metamask!");
    }
}

async function getContractDataFromAddress(address) {
    const name = await (getContractName(address))
    const symbol = await (getContractSymbol(address))
    const totalSupply = await (getContractTotalSupply(address))

    return { name, symbol, totalSupply, address }
}

// HELPER FUNCTIONS
async function createAsset(contractAddress, uri) {
    if (window.ethereum) {
        window.ethereum.enable()
        const web3 = new Web3(window.ethereum)
        const address = web3.currentProvider.selectedAddress
        const PixelContract = new web3.eth.Contract(Pixel.abi, contractAddress)
        await (PixelContract.methods.generateItem(address, uri).send({ from: address }))
    } else {
        console.log("No Web3 Provider");
        alert("Install Metamask!");
    }
}

async function createContract(name, symbol) {
    if (window.ethereum) {
        window.ethereum.enable()
        const web3 = new Web3(window.ethereum)
        const address = web3.currentProvider.selectedAddress
        const PixelFactoryContract = new web3.eth.Contract(PixelFactory.abi, '0x790a1eBbA2D24263d37bE123E55B2Cc6a1DFab09')
        await (PixelFactoryContract.methods.createCollection(name, symbol).send({ from: address }))
    }
    else {
        console.log("No Web3 Provider");
        alert("Install Metamask!");
    }
}

async function getItems(contractAddress) {
    if (window.ethereum) {
        window.ethereum.enable()
        const web3 = new Web3(window.ethereum)
        const address = web3.currentProvider.selectedAddress
        const PixelContract = new web3.eth.Contract(Pixel.abi, contractAddress)
        const totalSupply = await (getContractTotalSupply(contractAddress))
        // https://itnext.io/heres-why-mapping-a-constructed-array-doesn-t-work-in-javascript-f1195138615a
        // The explaination for the sorcery below can be found above 
        const itemMetadata = [...Array(totalSupply)].map(async (_, i) => {
            const tokenId = await (PixelContract.methods.tokenByIndex(i).call({ from: address }))
            const uri = await (PixelContract.methods.tokenURI(tokenId).call({ from: address }))
            return JSON.parse(uri)
        })

        return Promise.all(itemMetadata)

    } else {
        console.log("No Web3 Provider");
        alert("Install Metamask!");
    }
}

async function getContractData() {
    if (window.ethereum) {
        window.ethereum.enable()
        const web3 = new Web3(window.ethereum)
        const address = web3.currentProvider.selectedAddress
        const PixelFactoryContract = new web3.eth.Contract(PixelFactory.abi, '0x790a1eBbA2D24263d37bE123E55B2Cc6a1DFab09')
        const ownerContracts = await (PixelFactoryContract.methods.getOwnerCollections().call({ from: address }))
        const contractData = ownerContracts.map(async (contract) => {
            return await (getContractDataFromAddress(contract))
        })

        return Promise.all(contractData)
    } else {
        console.log("No Web3 Provider");
        alert("Install Metamask!");
    }
}

export { createAsset, createContract, getContractData, getItems }