import Web3 from "web3";
import { Voter } from "../interfaces/index";
import { AppResponse } from './../interfaces/index';
import { readFileSync, writeFileSync, mkdirSync } from "fs";

const VoteCore = require('../contracts/VoteCore.json');
const voteCoreId: string = "";

const web3 = new Web3('https://rpc.ankr.com/polygon_mumbai');

const accountFileName = "/account.json";

const voterDir = (phoneNumber: string): string => {
    return `${__dirname}/voters/${phoneNumber}`;
};

// Signing Key
const handlerEvmKey = process.env.EVM_PRIVATE_KEY!!;

export class VoterController {

    create(voter: Voter): AppResponse<null> {
        if (this.readVoter(voter.phoneNumber!!)) {
            return { status: false, message: "Voter already exists" };
        }

        const wallet = web3.eth.accounts.create();

        // create wallet for this voter
        voter.address = wallet.address;
        voter.privateKey = wallet.privateKey;

        this.writeVoter(voter);

        return { status: true };
    }


    get(phoneNumber: string): AppResponse<Voter> {
        const voter = this.readVoter(phoneNumber);

        if (!voter) {
            return { status: false, message: "Voter not found" };
        }

        return { status: true, data: voter };
    };


    async castVote(phoneNumber: string, pollId: number, partyId: number): Promise<AppResponse<null>> {
        const voter = this.readVoter(phoneNumber);

        if (!voter) {
            return { status: false, message: "Voter not found" };
        }

        const voteCore = new web3.eth.Contract(VoteCore.abi, voteCoreId);

        const signer = web3.eth.accounts.privateKeyToAccount(handlerEvmKey);
        web3.eth.accounts.wallet.add(signer);

        try {
            const gas = await voteCore.methods.castVote(
                pollId,
                voter.address,
                partyId
            ).estimateGas({ from: signer.address });
            console.log('Gas: ', gas);

            const gasPrice = await web3.eth.getGasPrice();
            console.log('Gas Price: ', gasPrice);

            const { transactionHash } = await voteCore.methods.castVote(
                pollId,
                voter.address,
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


    private readVoter(phoneNumber: string): Voter | null {
        try {
            mkdirSync(voterDir(phoneNumber), { recursive: true });
            const content = readFileSync(voterDir(phoneNumber) + accountFileName);

            return JSON.parse(content.toString()) as Voter;
        } catch (error) {
            console.error(`Read Error: ${error}`);
            return null;
        }
    }

    private writeVoter(voter: Voter): Voter | null {
        try {
            mkdirSync(voterDir(voter.phoneNumber!!), { recursive: true });
            writeFileSync(voterDir(voter.phoneNumber!!) + accountFileName, JSON.stringify(voter));

            return voter;
        } catch (error) {
            console.error(`Write Error: ${error}`);
            return null;
        }
    }

}