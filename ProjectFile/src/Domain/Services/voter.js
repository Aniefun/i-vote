import Graph from "../Clients/graph"
import Rest from "../Clients/rest"

export async function voter(cardNumber) {
    const result = await Graph.postRequest(`
        {
            voters(where:{cardNumber: ${cardNumber}}) {
            id
            voterId
            data
            unit
            suspended
            }
        }
    `)

    if (result.status && result.data.voters.length > 0) {
        return result.data.voters[0]
    }

    console.log(result.message);
    return null
}

export async function voters(page = 1) {
    const pageSize = 20
    const skip = page * pageSize
    const result = await Graph.postRequest(`
        {
            voters(first: ${pageSize}, skip: ${skip}) {
            id
            voterId
            data
            unit
            suspended
            }
        }
    `)

    if (result.status) {
        return result.data.voters
    }

    console.log(result.message);
    return null
}

// @params voterId typeof EVM address
// @params pollId typeof number
// @params partyId typeof number
export async function castVote(voterId, pollId, partyId) {
    const body = { voterId, pollId, partyId }

    const result = await Rest.postRequest('/cast-vote', body)

    if (result.status) {
        console.log('TxId', result.data);
        return body
    }

    console.log(result.message);
    return null
}