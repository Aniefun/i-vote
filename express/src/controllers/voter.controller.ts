import Web3 from "web3";
import { Voter } from "../interfaces/index";
import { AppResponse } from './../interfaces/index';

const VoteCore = require('../contracts/VoteCore.json');
const voteCoreId: string = VoteCore.networks[80001].address;

const web3 = new Web3('https://rpc.ankr.com/polygon_mumbai');

// Signing Key
const handlerEvmKey = process.env.EVM_PRIVATE_KEY!!;

const voteCore = new web3.eth.Contract(VoteCore.abi, voteCoreId);

const signer = web3.eth.accounts.privateKeyToAccount(handlerEvmKey);
web3.eth.accounts.wallet.add(signer);

export class VoterController {

    private async writeVoter(data: Voter) {
        try {
            const voter = {
                data: Web3.utils.stringToHex(
                    JSON.stringify(data)
                ),
                suspended: false,
                numOfVotes: 0,
                unit: data.unit
            };

            const gas = await voteCore.methods.createVoter(
                voter, data.address
            ).estimateGas({ from: signer.address });
            console.log('Gas: ', gas);

            const gasPrice = await web3.eth.getGasPrice();
            console.log('Gas Price: ', gasPrice);

            const { transactionHash } = await voteCore.methods.createVoter(
                voter, data.address
            ).send({
                from: signer.address,
                gasPrice: gasPrice,
                gas: gas
            });

            return { status: true, message: transactionHash };
        } catch (error) {
            return { status: false, message: "Transaction failed" };
        }
    }

    create(voter: Voter): AppResponse<null> {
        const wallet = web3.eth.accounts.create();

        // create wallet for this voter
        voter.address = wallet.address;

        this.writeVoter(voter);

        return { status: true };
    }

    async castVote(voterId: string, pollId: number, partyId: number): Promise<AppResponse<null>> {
        try {
            const gas = await voteCore.methods.castVote(
                pollId,
                voterId,
                partyId
            ).estimateGas({ from: signer.address });
            console.log('Gas: ', gas);

            const gasPrice = await web3.eth.getGasPrice();
            console.log('Gas Price: ', gasPrice);

            const { transactionHash } = await voteCore.methods.castVote(
                pollId,
                voterId,
                partyId
            ).send({
                from: signer.address,
                gasPrice: gasPrice,
                gas: gas
            });

            return { status: true, message: transactionHash };
        } catch (error) {
            return { status: false, message: "Transaction failed" };
        }
    }
}