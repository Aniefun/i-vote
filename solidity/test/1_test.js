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

contract('Config Set', async accounts => {
    it('Set Vote Nft', async () => {
        const voteCore = await VoteCore.deployed()

        const trx = await voteCore.setVoteNft(VoteNFT.address)

        console.log(trx.tx);
    })
})

contract('Create Managers', async accounts => {
    it('Create Fisrt Manager', async () => {
        const voteCore = await VoteCore.deployed()

        const manager = {
            data: Web3.utils.stringToHex(
                JSON.stringify({
                    lastname: "Aniefuna",
                    firstname: "Chisom",
                    image: "https://i.pravatar.cc/150?img=36"
                })
            ),
            state: states.indexOf('Enugu')
        }

        const trx = await voteCore.createManager(manager, accounts[0])

        console.log(trx.tx);
    })
})

contract('Create Agents', async accounts => {
    it('Create Agent Account For Gabriel', async () => {
        const voteCore = await VoteCore.deployed()

        const agent = {
            data: Web3.utils.stringToHex(
                JSON.stringify({
                    lastname: "Gabriel",
                    firstname: "Halex",
                    avatar: "https://i.pravatar.cc/150?img=8",
                    title: "Mr",
                    gender: "male"
                })
            ),
            unit: 1
        }

        const trx = await voteCore.createAgent(agent, "0xb75Aafd87E586CB7710f898DB371447B678d1ED7")

        console.log(trx.tx);
    })

    it('Create Agent Account For Austine', async () => {
        const voteCore = await VoteCore.deployed()

        const agent = {
            data: Web3.utils.stringToHex(
                JSON.stringify({
                    lastname: "Austine",
                    firstname: "Charles",
                    avatar: "https://i.pravatar.cc/150?img=52",
                    title: "Mr",
                    gender: "male"
                })
            ),
            unit: 2
        }

        const trx = await voteCore.createAgent(agent, "0xb75Aafd87E586CB7710f898DB371447B678d1ED7")

        console.log(trx.tx);
    })

    it('Create Agent Account For Me', async () => {
        const voteCore = await VoteCore.deployed()

        const agent = {
            data: Web3.utils.stringToHex(
                JSON.stringify({
                    lastname: "Ibrahim",
                    firstname: "Seun",
                    avatar: "https://i.pravatar.cc/150?img=68",
                    title: "Mr",
                    gender: "male"
                })
            ),
            unit: 3
        }

        const trx = await voteCore.createAgent(agent, accounts[1])

        console.log(trx.tx);
    })
})

contract('Create Units', async accounts => {
    it('Create Polling Unit 1', async () => {
        const voteCore = await VoteCore.deployed()

        const unit = {
            state: states.indexOf('Lagos'),
            localGovernment: 1,
            numOfAccreditedVoters: 120,
        }

        const trx = await voteCore.createUnit(unit)

        console.log(trx.tx);
    })

    it('Create Polling Unit 2', async () => {
        const voteCore = await VoteCore.deployed()

        const unit = {
            state: states.indexOf('Abia'),
            localGovernment: 2,
            numOfAccreditedVoters: 150,
        }

        const trx = await voteCore.createUnit(unit)

        console.log(trx.tx);
    })

    it('Create Polling Unit 3', async () => {
        const voteCore = await VoteCore.deployed()

        const unit = {
            state: states.indexOf('Kano'),
            localGovernment: 3,
            numOfAccreditedVoters: 80,
        }

        const trx = await voteCore.createUnit(unit)

        console.log(trx.tx);
    })
})

contract('Create Polls', async accounts => {
    it('Create Poll For Presidential election', async () => {
        const voteCore = await VoteCore.deployed()

        const now = new Date();
        const tomorrow = new Date()
        tomorrow.setTime(now.getTime() + (24 * 60 * 60 * 1000))

        const poll = {
            data: Web3.utils.stringToHex(
                JSON.stringify({
                    name: "2023 Presidential election",
                    candidates: {
                        1: "Atiku Abubakar",
                        2: "Bola Ahmed Tinubu",
                        3: "Peter Obi",
                        4: "Peter Umeadi",
                        5: "Rabiu Kwankwaso",
                        6: "Adewole Adebayo"
                    }
                })
            ),
            endAt: (tomorrow.getTime() / 1000).toFixed(0),
            startAt: (now.getTime() / 1000).toFixed(0),
            numOfVotes: 0,
            unit: 1,
            nftUri: JSON.stringify({
                name: "Thanks for voting",
                description: "This NFT is not for sale",
                image: "https://i.pravatar.cc/150?img=30"
            })
        }

        const trx = await voteCore.createPoll(poll)

        console.log(trx.tx);
    })
})

contract('Create Voters', async accounts => {
    it('Create Voter For Id 16905647738', async () => {
        const voteCore = await VoteCore.deployed()

        const voter = {
            data: Web3.utils.stringToHex(
                JSON.stringify({
                    lastname: "Jennie",
                    firstname: "Nichols",
                    dob: "Jan-12-2000",
                    gender: "male",
                    avatar: "https://randomuser.me/api/portraits/med/men/75.jpg",
                    address: "43 Valwood Pkwy"
                })
            ),
            suspended: false,
            numOfVotes: 0,
            unit: 1
        }, cardNumber = 16905647738;

        const trx = await voteCore.createVoter(voter, accounts[1], cardNumber)

        console.log(trx.tx);
    })

    it('Create Voter For Id 74177279741', async () => {
        const voteCore = await VoteCore.deployed()

        const voter = {
            data: Web3.utils.stringToHex(
                JSON.stringify({
                    lastname: "Willard",
                    firstname: "Jennings",
                    dob: "Aug-08-1992",
                    gender: "male",
                    avatar: "https://randomuser.me/api/portraits/men/22.jpg",
                    address: "2851 Hillcrest Rd"
                })
            ),
            suspended: false,
            numOfVotes: 0,
            unit: 1
        }, cardNumber = 74177279741;

        const trx = await voteCore.createVoter(voter, accounts[1], cardNumber)

        console.log(trx.tx);
    })

    it('Create Voter For Id 84269396443', async () => {
        const voteCore = await VoteCore.deployed()

        const voter = {
            data: Web3.utils.stringToHex(
                JSON.stringify({
                    lastname: "Marian",
                    firstname: "Alvarez",
                    dob: "Dec-01-1981",
                    gender: "female",
                    avatar: "https://randomuser.me/api/portraits/women/46.jpg",
                    address: "8373 Spring St"
                })
            ),
            suspended: false,
            numOfVotes: 0,
            unit: 1
        }, cardNumber = 84269396443;

        const trx = await voteCore.createVoter(voter, accounts[1], cardNumber)

        console.log(trx.tx);
    })
})

contract('Create Parties', async accounts => {
    it('Create Party For PDP', async () => {
        const voteCore = await VoteCore.deployed()

        const party = {
            data: Web3.utils.stringToHex(
                JSON.stringify({
                    tag: "PDP",
                    name: "People’s Democratic Party",
                    image: "https://upload.wikimedia.org/wikipedia/en/6/62/Logo_of_the_Peoples_Democratic_Party_%28Nigeria%29.png"
                })
            )
        }, partyId = 1

        const trx = await voteCore.createParty(party, partyId)

        console.log(trx.tx);
    })

    it('Create Party For APC', async () => {
        const voteCore = await VoteCore.deployed()

        const party = {
            data: Web3.utils.stringToHex(
                JSON.stringify({
                    tag: "APC",
                    name: "All Progressive Congress",
                    image: "https://upload.wikimedia.org/wikipedia/en/2/23/All_Progressives_Congress_logo.png"
                })
            )
        }, partyId = 2

        const trx = await voteCore.createParty(party, partyId)

        console.log(trx.tx);
    })

    it('Create Party For LP', async () => {
        const voteCore = await VoteCore.deployed()

        const party = {
            data: Web3.utils.stringToHex(
                JSON.stringify({
                    tag: "LP",
                    name: "Labour Party",
                    image: "https://upload.wikimedia.org/wikipedia/en/5/5f/Labour_Party_%28Nigeria%29_logo.png"
                })
            )
        }, partyId = 3

        const trx = await voteCore.createParty(party, partyId)

        console.log(trx.tx);
    })

    it('Create Party For APGA', async () => {
        const voteCore = await VoteCore.deployed()

        const party = {
            data: Web3.utils.stringToHex(
                JSON.stringify({
                    tag: "APGA",
                    name: "All Progressive Grand Alliance",
                    image: "https://upload.wikimedia.org/wikipedia/en/b/b3/APGA_Nigeria_Logo.png"
                })
            )
        }, partyId = 4

        const trx = await voteCore.createParty(party, partyId)

        console.log(trx.tx);
    })

    it('Create Party For NNPP', async () => {
        const voteCore = await VoteCore.deployed()

        const party = {
            data: Web3.utils.stringToHex(
                JSON.stringify({
                    tag: "NNPP",
                    name: "New Nigeria People’s Party",
                    image: "https://cdn.vanguardngr.com/wp-content/uploads/2022/03/NNPP.jpg"
                })
            )
        }, partyId = 5

        const trx = await voteCore.createParty(party, partyId)

        console.log(trx.tx);
    })

    it('Create Party For ADC', async () => {
        const voteCore = await VoteCore.deployed()

        const party = {
            data: Web3.utils.stringToHex(
                JSON.stringify({
                    tag: "ADC",
                    name: "African Democratic Congress",
                    image: "https://leadership.ng/wp-content/uploads/2022/08/adc-1.jpg"
                })
            )
        }, partyId = 6

        const trx = await voteCore.createParty(party, partyId)

        console.log(trx.tx);
    })
})

// contract('Vote Polls', async accounts => {
//     it('Vote Poll For Id 1', async () => {
//         const voteCore = await VoteCore.deployed()

//         const pollId = 1, voterId = accounts[1], partyId = 1

//         const trx = await voteCore.castVote(pollId, voterId, partyId)

//         console.log(trx.tx);
//     })
// })
