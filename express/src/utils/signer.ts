import Web3 from 'web3';
import { TxnResponse } from '../interfaces';

const IVoteCore = require('../contracts/IVoteCore.json');

// Signing Key and Address
const handlerEvmKey = process.env.EVM_PRIVATE_KEY!!;

const web3 = new Web3('https://bsc-testnet.public.blastapi.io');

export const I_VOTE_CORE_ADDRESS = IVoteCore.networks[97].address;

const signer = web3.eth.accounts.privateKeyToAccount(handlerEvmKey);
web3.eth.accounts.wallet.add(signer);

export async function signVoteTransaction(pollId: number, voterId: string, partyId: number): Promise<TxnResponse> {
    const voteCore = new web3.eth.Contract(IVoteCore.abi, I_VOTE_CORE_ADDRESS);

    try {
        const gas = await voteCore.methods.castVote(
            pollId, voterId, partyId
        ).estimateGas({ from: signer.address });

        const gasPrice = await web3.eth.getGasPrice();

        const { transactionHash } = await voteCore.methods.castVote(
            pollId, voterId, partyId
        ).send({
            from: signer.address,
            gasPrice: gasPrice.toString(),
            gas: gas.toString()
        });

        return {
            status: true,
            txHash: transactionHash
        };
    } catch (error) {
        return { status: false, error: error?.message };
    }
}