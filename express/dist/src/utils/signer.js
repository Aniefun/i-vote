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
exports.signVoteTransaction = exports.I_VOTE_CORE_ADDRESS = void 0;
const web3_1 = __importDefault(require("web3"));
const IVoteCore = require('../contracts/IVoteCore.json');
// Signing Key and Address
const handlerEvmKey = process.env.EVM_PRIVATE_KEY;
const web3 = new web3_1.default('https://bsc-testnet.public.blastapi.io');
exports.I_VOTE_CORE_ADDRESS = IVoteCore.networks[97].address;
const signer = web3.eth.accounts.privateKeyToAccount(handlerEvmKey);
web3.eth.accounts.wallet.add(signer);
function signVoteTransaction(pollId, voterId, partyId) {
    return __awaiter(this, void 0, void 0, function* () {
        const voteCore = new web3.eth.Contract(IVoteCore.abi, exports.I_VOTE_CORE_ADDRESS);
        try {
            const gas = yield voteCore.methods.castVote(pollId, voterId, partyId).estimateGas({ from: signer.address });
            const gasPrice = yield web3.eth.getGasPrice();
            const { transactionHash } = yield voteCore.methods.castVote(pollId, voterId, partyId).send({
                from: signer.address,
                gasPrice: gasPrice.toString(),
                gas: gas.toString()
            });
            return {
                status: true,
                txHash: transactionHash
            };
        }
        catch (error) {
            return { status: false, error: error === null || error === void 0 ? void 0 : error.message };
        }
    });
}
exports.signVoteTransaction = signVoteTransaction;
