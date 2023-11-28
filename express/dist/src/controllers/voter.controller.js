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
const VoteCore = require('../contracts/VoteCore.json');
const voteCoreId = VoteCore.networks[80001].address;
const web3 = new web3_1.default('https://rpc.ankr.com/polygon_mumbai');
// Signing Key
const handlerEvmKey = process.env.EVM_PRIVATE_KEY;
const voteCore = new web3.eth.Contract(VoteCore.abi, voteCoreId);
const signer = web3.eth.accounts.privateKeyToAccount(handlerEvmKey);
web3.eth.accounts.wallet.add(signer);
class VoterController {
    writeVoter(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const voter = {
                    data: web3_1.default.utils.stringToHex(JSON.stringify(data)),
                    suspended: false,
                    numOfVotes: 0,
                    unit: data.unit
                };
                const gas = yield voteCore.methods.createVoter(voter, data.address).estimateGas({ from: signer.address });
                console.log('Gas: ', gas);
                const gasPrice = yield web3.eth.getGasPrice();
                console.log('Gas Price: ', gasPrice);
                const { transactionHash } = yield voteCore.methods.createVoter(voter, data.address).send({
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
    create(voter) {
        const wallet = web3.eth.accounts.create();
        // create wallet for this voter
        voter.address = wallet.address;
        this.writeVoter(voter);
        return { status: true };
    }
    castVote(voterId, pollId, partyId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const gas = yield voteCore.methods.castVote(pollId, voterId, partyId).estimateGas({ from: signer.address });
                console.log('Gas: ', gas);
                const gasPrice = yield web3.eth.getGasPrice();
                console.log('Gas Price: ', gasPrice);
                const { transactionHash } = yield voteCore.methods.castVote(pollId, voterId, partyId).send({
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
}
exports.VoterController = VoterController;
