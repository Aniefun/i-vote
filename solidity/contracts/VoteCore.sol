// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {IVoteCore} from "./interfaces/IVoteCore.sol";
import {PollingLib} from "./libraries/PollingLib.sol";

import {Context} from "@openzeppelin/contracts/utils/Context.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {Pausable} from "@openzeppelin/contracts/utils/Pausable.sol";

import {VoteNft} from "./VoteNft.sol";

/// @title I-Vote Core
/// @author Arogundade Ibrahim
/// @notice A simple replace for traditional elections
contract VoteCore is IVoteCore, Context, Pausable, Ownable {
    // vote nft
    VoteNft private _voteNft;

    // Unique Id Trackers
    uint256 private _pollId;
    uint256 private _unitId;

    // Polling Units: Unit Unique Id => Unit object
    mapping(uint256 => PollingLib.Unit) private _units;

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
        require(block.timestamp >= poll.startAt, "Poll has not started");
        require(block.timestamp < poll.endAt, "Poll has ended");

        // check voter entry
        require(_votes[pollId][voterId] == uint256(0), "Already casted vote");

        // check voter uint is in the poll units
        require(voter.unit == poll.unit, "Voter is not in this unit");

        // check party exists
        require(isParty(partyId), "Party does not exist");

        // otherwise cast vote
        _votes[pollId][voterId] == partyId;
        poll.numOfVotes = poll.numOfVotes + 1;

        // mint nft to voter --if-exists
        if (bytes(poll.nftUri).length != 0) {
            _voteNft.mint(voterId, poll.nftUri);
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

    function createPoll(
        PollingLib.Poll memory poll
    ) external override onlyAgent whenNotPaused {
        // increment Poll Id trackers
        _pollId++;

        _polls[_pollId] = poll;

        require(_agents[_msgSender()].unit == poll.unit);

        emit PollCreated(
            _pollId,
            poll.data,
            poll.endAt,
            poll.startAt,
            poll.numOfVotes,
            poll.unit
        );
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

    function createUnit(
        PollingLib.Unit memory unit
    ) external override onlyManager whenNotPaused {
        // increment Unit Id trackers
        _unitId++;

        _units[_unitId] = unit;

        emit UnitCreated(
            _unitId,
            unit.state,
            unit.localGovernment,
            unit.numOfAccreditedVoters
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

    function setVoteNft(address voteNft) external {
        _voteNft = VoteNft(voteNft);
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
