// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {ERC721} from "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract VoteNft is ERC721, Ownable {
    uint256 private _tokenId = 1;
    mapping(uint256 => string) private _tokenURIs;

    constructor(address voteCore) ERC721("IVoteNft", "IVT") Ownable(voteCore) {}

    function mint(address to, string memory uri) external onlyOwner {
        _mint(to, _tokenId);
        _tokenURIs[_tokenId] = uri;

        _tokenId++;
    }

    function tokenURI(
        uint256 tokenId
    ) public view virtual override returns (string memory) {
        return _tokenURIs[tokenId];
    }
}
