"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VoterController = void 0;
const web3_1 = __importDefault(require("web3"));
const fs_1 = require("fs");
const VoteCore = require('../contracts/VoteCore.json');
const voteCoreId = "";
const web3 = new web3_1.default('https://rpc.ankr.com/polygon_mumbai');
const accountFileName = "/account.json";
const voterDir = (phoneNumber) => {
    return `${__dirname}/voters/${phoneNumber}`;
};
// Signing Key
const handlerEvmKey = process.env.EVM_PRIVATE_KEY;
class VoterController {
    create(voter) {
        if (this.readVoter(voter.phoneNumber)) {
            return { status: false, message: "Voter already exists" };
        }
        const wallet = web3.eth.accounts.create();
        // create wallet for this voter
        voter.address = wallet.address;
        voter.privateKey = wallet.privateKey;
        this.writeVoter(voter);
        return { status: true };
    }
    get(phoneNumber) {
        const voter = this.readVoter(phoneNumber);
        if (!voter) {
            return { status: false, message: "Voter not found" };
        }
        return { status: true, data: voter };
    }
    ;
    castVote(phoneNumber, pollId, partyId) {
        return __awaiter(this, void 0, void 0, function* () {
            const voter = this.readVoter(phoneNumber);
            if (!voter) {
                return { status: false, message: "Voter not found" };
            }
            const voteCore = new web3.eth.Contract(VoteCore.abi, voteCoreId);
            const signer = web3.eth.accounts.privateKeyToAccount(handlerEvmKey);
            web3.eth.accounts.wallet.add(signer);
            try {
                const gas = yield voteCore.methods.castVote(pollId, voter.address, partyId).estimateGas({ from: signer.address });
                console.log('Gas: ', gas);
                const gasPrice = yield web3.eth.getGasPrice();
                console.log('Gas Price: ', gasPrice);
                const { transactionHash } = yield voteCore.methods.castVote(pollId, voter.address, partyId).send({
                    from: signer.address,
                    gasPrice: gasPrice,
                    gas: gas
                });
                return { status: true, message: transactionHash };
            }
            catch (error) {
                return { status: false, message: "Transaction failed" };
            }
        });
    }
    readVoter(phoneNumber) {
        try {
            (0, fs_1.mkdirSync)(voterDir(phoneNumber), { recursive: true });
            const content = (0, fs_1.readFileSync)(voterDir(phoneNumber) + accountFileName);
            return JSON.parse(content.toString());
        }
        catch (error) {
            console.error(`Read Error: ${error}`);
            return null;
        }
    }
    writeVoter(voter) {
        try {
            (0, fs_1.mkdirSync)(voterDir(voter.phoneNumber), { recursive: true });
            (0, fs_1.writeFileSync)(voterDir(voter.phoneNumber) + accountFileName, JSON.stringify(voter));
            return voter;
        }
        catch (error) {
            console.error(`Write Error: ${error}`);
            return null;
        }
    }
}
exports.VoterController = VoterController;
