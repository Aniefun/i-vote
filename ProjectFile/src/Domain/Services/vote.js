import Graph from "../Clients/graph";

// you can use this function to check if a voter has voted
// in a particular poll, before calling the castVote() func
export async function vote(voterId, pollId) {
    const result = await Graph.postRequest(`
        {
            votes(where: {voterId: "${voterId}", pollId: ${pollId}})  {
                id
                pollId
                voterId
                partyId
                blockTimestamp
                transactionHash
                poll {
                    id
                    pollId
                    data
                    startAt
                    endsAt
                    numOfVotes
                    unit
                }
            }
        }
    `)

    if (result.status && result.data.votes.length > 0) {
        return result.data.votes[0]
    }

    console.log(result.message)
    return null
}

// uses this function to get list of voters
export async function votes(page = 1) {
    const pageSize = 20
    const skip = page * pageSize
    const result = await Graph.postRequest(`
        {
            votes(first: ${pageSize}, skip: ${skip})  {
                id
                pollId
                voterId
                partyId
                blockTimestamp
                transactionHash
                poll {
                    id
                    pollId
                    data
                    startAt
                    endsAt
                    numOfVotes
                    unit
                }
            }
        }
    `)

    if (!result.status) {
        console.log(result.message)
    }

    return result.data.votes
}

// use this function to get list of votes from a poll
export async function votesFromPoll(page = 1, pollId) {
    const pageSize = 20
    const skip = page * pageSize
    const result = await Graph.postRequest(`
        {
            votes(first: ${pageSize}, skip: ${skip}, where: {pollId: ${pollId}})  {
                id
                pollId
                voterId
                partyId
                blockTimestamp
                transactionHash
                poll {
                    id
                    pollId
                    data
                    startAt
                    endsAt
                    numOfVotes
                    unit
                }
            }
        }
    `)

    if (!result.status) {
        console.log(result.message)
    }

    return result.data.votes
}

// uses this function to get list of votes of a 
// particular voter
export async function votesFromVoter(page = 1, voterId) {
    const pageSize = 20
    const skip = page * pageSize
    const result = await Graph.postRequest(`
        {
            votes(first: ${pageSize}, skip: ${skip}, where: {voterId: "${voterId}"})  {
                id
                pollId
                voterId
                partyId
                blockTimestamp
                transactionHash
                poll {
                    id
                    pollId
                    data
                    startAt
                    endsAt
                    numOfVotes
                    unit
                }
            }
        }
    `)

    if (!result.status) {
        console.log(result.message)
    }

    return result.data.votes
}

// use this function to count votes of a poll
export async function votesCountForPoll(pollId) {
    const result = await Graph.postRequest(`
        {
            votes(where: {pollId: ${pollId}})  {
                id
            }
        }
    `)

    if (!result.status) {
        console.log(result.message)
        return 0
    }

    return result.data.votes.length
}

// use this function to count votes of a party in 
// a particular poll
export async function votesCountForParty(pollId, partyId) {
    const result = await Graph.postRequest(`
        {
            votes(where: {pollId: ${pollId}, partyId: ${partyId}})  {
                id
            }
        }
    `)

    if (!result.status) {
        console.log(result.message)
        return 0
    }

    return result.data.votes.length
}