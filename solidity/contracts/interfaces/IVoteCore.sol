// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {PollingLib} from "./../libraries/PollingLib.sol";

interface IVoteCore {
    // ============= Events ============= //

    event VoteCasted(uint256 pollId, address voterId, uint256 partyId);

    event VoterCreated(address voterId, bytes data, uint256 unit);

    event VoterSuspended(address voterId);

    event VoterUnSuspended(address voterId);

    event PollCreated(
        uint256 pollId,
        bytes data,
        uint256 endsAt,
        uint256 startAt,
        uint256 numOfVotes,
        uint256 unit
    );

    event PartyCreated(uint256 partyId, bytes data);

    event PollEnded(uint256 pollId);

    event PollResumed(uint256 pollId, uint256 newEndAt);

    event AgentCreated(address agentId, bytes data, uint256 unit);

    event ManagerCreated(address managerId, bytes data, PollingLib.State state);

    event UnitCreated(
        uint256 unitId,
        PollingLib.State state,
        uint256 localGovernment,
        uint256 numOfAccreditedVoters
    );

    // ============= Functions ============= //

    function castVote(
        uint256 pollId,
        address voterId,
        uint256 partyId
    ) external;

    function votesCount(uint256 pollId) external view returns (uint256);

    function isManager(address lookUpId) external view returns (bool);

    function isAgent(address lookUpId) external view returns (bool);

    function isParty(uint256 lookUpId) external view returns (bool);

    function createVoter(
        PollingLib.Voter memory voter,
        address voterId
    ) external;

    function suspendVoter(address voter) external;

    function unSuspendVoter(address voter) external;

    function createPoll(PollingLib.Poll memory poll) external;

    function createParty(
        PollingLib.Party memory party,
        uint256 partyId
    ) external;

    function createUnit(PollingLib.Unit memory unit) external;

    function endPoll(uint256 pollId) external;

    function resumePoll(uint256 pollId, uint256 newEndAt) external;

    function createAgent(
        PollingLib.Agent memory agent,
        address agentId
    ) external;

    function createManager(
        PollingLib.Manager memory manager,
        address managerId
    ) external;
}
