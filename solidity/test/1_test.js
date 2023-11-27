const Web3 = require('web3')

const VoteCore = artifacts.require("VoteCore")
// const VoteNFT = artifacts.require("VoteNFT")

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

contract('VoteCore', async accounts => {
    it('Create Manager', async () => {
        const voteCore = await VoteCore.deployed()

        const manager = {
            data: Web3.utils.stringToHex(
                JSON.stringify({ last_name: "Aniefuna", first_name: "Chisom" })
            ),
            state: 12
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
            state: 0,
            localGovernment: 1,
            numOfAccreditedVoters: 120,
        }

        const trx = await voteCore.createUnit(unit)

        console.log(trx.tx);
    })

    it('Create Poll', async () => {
        const voteCore = await VoteCore.deployed()

        const now = new Date();
        const tomorrow = new Date()
        tomorrow.setTime(now.getTime() + (24 * 60 * 60 * 1000))

        const poll = {
            data: Web3.utils.stringToHex(
                JSON.stringify({ name: "Presidential Election" })
            ),
            endAt: (tomorrow.getTime() / 1000),
            startAt: (now.getTime() / 1000),
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
})
