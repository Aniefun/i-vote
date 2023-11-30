import Graph from "../Clients/graph.js"
import Rest from "../Clients/rest.js"
// import { useContractWrite, usePrepareContractWrite } from 'wagmi'

// params agentId is the wallet address of the agent
export async function agent(agentId) {
    const result = await Graph.postRequest(`
        {
            agent(id: "${agentId}") {
                id
                agentId
                data
                unit
            }
        }
    `)

    if (!result.status) {
        console.log(result.message)
    }

    return result.data.agent
}

export async function createVoter(firstName, lastName, state, unit, phoneNumber, cardNumber) {
    const body = { firstName, lastName, state, unit, phoneNumber, cardNumber }

    const result = await Rest.postRequest('/create-voter', body)

    if (result.status) {
        console.log('TxId', result.data);
        return body
    }

    console.log(result.message);
    return null
}

// const IVoteCoreId = "0x417eCeE8E303F05E9a937513091f1a20296574d5"
// const IVoteCoreJson = ""

// function CreatePollReactExample() {
//     const pollData = {
//         name: "Presidential Election",
//         description: "Vote for your party!"
//         // add other attributes here
//     }

//     const date = new Date();
//     const tomorrowDate = new Date()
//     tomorrowDate.setTime(date.getTime() + (24 * 60 * 60 * 1000))

//     // dates must be in seconds
//     const now = (date.getTime() / 1000).toFixed(0) // start time for poll
//     const tomorrow = (tomorrowDate.getTime() / 1000).toFixed(0) // end time for poll
//     const unit = 1 // the poll unit in number, must be equal to the agent unit

//     const nftData = {
//         name: "A vote NFT",
//         description: "Just a reward for voting"
//     }

//     const poll = {
//         data: Web3.utils.stringToHex(JSON.stringify(pollData)),
//         endAt: now,
//         startAt: tomorrow,
//         numOfVotes: 0, // by default
//         unit: unit,
//         nftUri: JSON.stringify(nftData)
//         // or set nftUri = '' if you dont want to mint nft to voters of this poll
//     }

//     const { data, isLoading, isSuccess, write } = useContractWrite({
//         address: IVoteCoreId,
//         abi: IVoteCoreJson.abi,
//         functionName: 'createPoll',
//         args: [poll]
//     })

//     return (
//         <div>
//             <button onClick={() => write()}>Create Poll</button>
//             {isLoading && <div>Check Wallet</div>}
//             {isSuccess && <div>Transaction: {JSON.stringify(data)}</div>}
//         </div>
//     )
// }