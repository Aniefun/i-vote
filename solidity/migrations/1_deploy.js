const VoteNFT = artifacts.require("VoteNFT")
const VoteCore = artifacts.require("VoteCore")

module.exports = async function (deployer, network, accounts) {
    return
    await deployer.deploy(VoteCore)
    await deployer.deploy(VoteNFT, VoteCore.address)
};