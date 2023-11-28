import Graph from "../Clients/graph"

// uses this function to get a single poll
export async function polls(pollId) {
    const result = await Graph.postRequest(`
        {
            poll(id: ${pollId}) {
                id
                pollId
                data
                endsAt
                startAt
                numOfVotes
                votes {
                    id
                    pollId
                    voterId
                    partyId
                }
            }
        }
    `)

    if (!result.status) {
        console.log(result.message)
    }

    return result.data.poll
}


// uses this function to get list of polls
export async function polls(page = 1) {
    const pageSize = 20
    const skip = page * pageSize
    const result = await Graph.postRequest(`
        {
            polls(first: ${pageSize}, skip: ${skip}) {
                id
                pollId
                data
                endsAt
                startAt
                numOfVotes
                votes {
                    id
                    pollId
                    voterId
                    partyId
                }
            }
        }
    `)

    if (!result.status) {
        console.log(result.message)
    }

    return result.data.polls
}










