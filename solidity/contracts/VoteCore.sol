// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {IVoteCore} from "./interfaces/IVoteCore.sol";
import {PollingLib} from "./libraries/PollingLib.sol";

import {Context} from "@openzeppelin/contracts/utils/Context.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {Pausable} from "@openzeppelin/contracts/utils/Pausable.sol";
import {IERC721} from "@openzeppelin/contracts/token/ERC721/IERC721.sol";

/// @title I-Vote Core
/// @author Arogundade Ibrahim
/// @notice A simple replace for traditional elections
contract VoteCore is IVoteCore, Context, Pausable, Ownable {
    // vote nft
    IERC721 private _voteNft;

    // Unique Id Trackers
    uint256 private _pollId;

    // Polling Units: Unit Unique Id => Unit object
    mapping(uint256 => PollingLib.Uint) private _units;

    // Polls: Poll Unique Id => Poll object
    mapping(uint256 => PollingLib.Poll) private _polls;

    // Voters: Voter Unique Id => Voter object
    mapping(address => PollingLib.Voter) private _voters;

    // Agent: Voter Unique Id => Agent object
    mapping(address => PollingLib.Agent) private _agents;

    // Managers: Manager Unique Id => Manager object
    mapping(address => PollingLib.Manager) private _managers;

    // Parties: Party Unique Id => Party object
    mapping(uint256 => PollingLib.Party) private _parties;

    // Votes: Poll Unique Id => Voter Unique Id => Party Unique Id
    mapping(uint256 => mapping(address => uint256)) private _votes;

    constructor() Ownable(_msgSender()) {}

    // ============= Voter Functions ============= //

    function castVote(
        uint256 pollId,
        address voterId,
        uint256 partyId
    ) external override whenNotPaused {
        PollingLib.Poll storage poll = _polls[pollId];
        PollingLib.Voter storage voter = _voters[voterId];

        // check the voter is not suspended
        require(!voter.suspended, "Voter is suspended");

        // check poll duration
        require(poll.endAt < block.timestamp, "Poll has ended");
        require(poll.startAt >= block.timestamp, "Poll has not started");

        // check voter entry
        require(_votes[pollId][voterId] == uint256(0), "Already casted vote");

        // check voter uint is in the poll units
        bool isInUint = false;
        for (uint256 index = 0; index < poll.units.length; index++) {
            if (poll.units[index] == voter.unit) {
                isInUint = true;
                break;
            }
        }
        require(isInUint, "Voter unit not in the poll units");

        // check party exists
        require(isParty(partyId), "Party does not exist");

        // otherwise cast vote
        _votes[pollId][voterId] == partyId;
        poll.numOfVotes = poll.numOfVotes + 1;

        // mint nft to voter --if-exists
        if (bytes(poll.nftUri).length != 0) {
            // _voteNft.transferFrom(address, to, tokenId);;
        }

        emit VoteCasted(pollId, voterId, partyId);
    }

    // ============= View Functions ============= //

    function votesCount(uint256 pollId) public view override returns (uint256) {
        return _polls[pollId].numOfVotes;
    }

    function isManager(address lookUpId) public view override returns (bool) {
        PollingLib.Manager storage manager = _managers[lookUpId];
        return manager.data.length != 0;
    }

    function isAgent(address lookUpId) public view override returns (bool) {
        PollingLib.Agent storage agent = _agents[lookUpId];
        return agent.data.length != 0;
    }

    function isParty(uint256 lookUpId) public view override returns (bool) {
        PollingLib.Party storage party = _parties[lookUpId];
        return party.data.length != 0;
    }

    // ============= Agents Functions ============= //

    function createVoter(
        PollingLib.Voter memory voter,
        address voterId
    ) external override onlyAgent {
        _voters[voterId] = voter;

        emit VoterCreated(voterId, voter.data, voter.unit);
    }

    function suspendVoter(address voter) external override onlyAgent {
        _voters[voter].suspended = true;

        emit VoterSuspended(voter);
    }

    function unSuspendVoter(address voter) external override onlyAgent {
        _voters[voter].suspended = true;

        emit VoterSuspended(voter);
    }

    // ============= Managers Functions ============= //

    function createPoll(
        PollingLib.Poll memory poll
    ) external override onlyManager whenNotPaused {
        _polls[_pollId] = poll;

        // increment Poll Id trackers
        _pollId++;

        emit PollCreated(
            poll.data,
            poll.endAt,
            poll.startAt,
            poll.numOfVotes,
            poll.units
        );
    }

    function createParty(
        PollingLib.Party memory party,
        uint256 partyId
    ) external override onlyManager whenNotPaused {
        _parties[partyId] = party;

        emit PartyCreated(partyId, party.data);
    }

    function endPoll(uint256 pollId) external onlyManager {
        _polls[pollId].endAt = block.timestamp;

        emit PollEnded(pollId);
    }

    function resumePoll(
        uint256 pollId,
        uint256 newEndAt
    ) external override onlyManager {
        require(newEndAt > block.timestamp, "Time is in the past");
        _polls[pollId].endAt = newEndAt;

        emit PollResumed(pollId, newEndAt);
    }

    function createAgent(
        PollingLib.Agent memory agent,
        address agentId
    ) external override onlyManager {
        _agents[agentId] = agent;

        emit AgentCreated(agentId, agent.data, agent.unit);
    }

    // ============= Creator Functions ============= //

    function createManager(
        PollingLib.Manager memory manager,
        address managerId
    ) external override onlyOwner {
        _managers[managerId] = manager;

        emit ManagerCreated(managerId, manager.data, manager.state);
    }

    // ============= Modifiers ============= //

    modifier onlyManager() {
        require(isManager(_msgSender()), "UnAuthorized");
        _;
    }

    modifier onlyAgent() {
        require(isAgent(_msgSender()), "UnAuthorized");
        _;
    }
}
