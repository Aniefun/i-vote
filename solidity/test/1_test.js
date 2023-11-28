const Web3 = require('web3')

const VoteCore = artifacts.require("VoteCore")
const VoteNFT = artifacts.require("VoteNFT")

const states = [
    'Abia',
    'Adamawa',
    'AkwaIbom',
    'Anambra',
    'Bauchi',
    'Bayelsa',
    'Benue',
    'Borno',
    'CrossRiver',
    'Delta',
    'Ebonyi',
    'Edo',
    'Ekiti',
    'Enugu',
    'Gombe',
    'Imo',
    'Jigawa',
    'Kaduna',
    'Kano',
    'Katsina',
    'Kebbi',
    'Kogi',
    'Kwara',
    'Lagos',
    'Nasarawa',
    'Niger',
    'Ogun',
    'Ondo',
    'Osun',
    'Oyo',
    'Plateau',
    'Rivers',
    'Sokoto',
    'Taraba',
    'Yobe',
    'Zamfara'
]

contract('Group 0', async accounts => {
    it('Set Vote Nft', async () => {
        const voteCore = await VoteCore.deployed()

        const trx = await voteCore.setVoteNft(VoteNFT.address)

        console.log(trx.tx);
    })
})

contract('Group 1', async accounts => {
    it('Create Manager', async () => {
        const voteCore = await VoteCore.deployed()

        const manager = {
            data: Web3.utils.stringToHex(
                JSON.stringify({ last_name: "Aniefuna", first_name: "Chisom" })
            ),
            state: states.indexOf('Enugu')
        }

        const trx = await voteCore.createManager(manager, accounts[0])

        console.log(trx.tx);
    })

    it('Create Agent', async () => {
        const voteCore = await VoteCore.deployed()

        const agent = {
            data: Web3.utils.stringToHex(
                JSON.stringify({ last_name: "Arogundade", first_name: "Ibrahim" })
            ),
            unit: 1
        }

        const trx = await voteCore.createAgent(agent, accounts[0])

        console.log(trx.tx);
    })

    it('Create Polling Unit', async () => {
        const voteCore = await VoteCore.deployed()

        const unit = {
            state: states.indexOf('Enugu'),
            localGovernment: 1,
            numOfAccreditedVoters: 120,
        }

        const trx = await voteCore.createUnit(unit)

        console.log(trx.tx);
    })
})

contract('Group 2', async accounts => {
    it('Create Poll', async () => {
        const voteCore = await VoteCore.deployed()

        const now = new Date();
        const tomorrow = new Date()
        tomorrow.setTime(now.getTime() + (24 * 60 * 60 * 1000))

        const poll = {
            data: Web3.utils.stringToHex(
                JSON.stringify({ name: "Presidential Election" })
            ),
            endAt: (tomorrow.getTime() / 1000).toFixed(0),
            startAt: (now.getTime() / 1000).toFixed(0),
            numOfVotes: 0,
            unit: 1,
            nftUri: JSON.stringify({
                name: "Thanks for voting",
                description: "This NFT is not for sale"
            })
        }

        const trx = await voteCore.createPoll(poll)

        console.log(trx.tx);
    })

    it('Create Voter', async () => {
        const voteCore = await VoteCore.deployed()

        const voter = {
            data: Web3.utils.stringToHex(
                JSON.stringify({ last_name: "Gabriel", first_name: "Chi", dob: "Jan 12 2000" })
            ),
            suspended: false,
            numOfVotes: 0,
            unit: 1
        }, cardNumber = 12345678901;

        const trx = await voteCore.createVoter(voter, accounts[1], cardNumber)

        console.log(trx.tx);
    })

    it('Create Party', async () => {
        const voteCore = await VoteCore.deployed()

        const party = {
            data: Web3.utils.stringToHex(
                JSON.stringify({ name: "ADC", chairman: "Austine", logo: "" })
            )
        }, partyId = 1

        const trx = await voteCore.createParty(party, partyId)

        console.log(trx.tx);
    })
})

contract('Group 3', async accounts => {
    it('Vote A Poll', async () => {
        const voteCore = await VoteCore.deployed()

        const pollId = 1, voterId = accounts[1], partyId = 1

        const trx = await voteCore.castVote(pollId, voterId, partyId)

        console.log(trx.tx);
    })
})
