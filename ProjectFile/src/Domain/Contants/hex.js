import Web3 from 'web3'

export async function decodeHexToObj(hex) {
    const data = Web3.utils.hexToSting(hex)
    return JSON.parse(data)
}