import { BigInt } from "@graphprotocol/graph-ts";
import {
  AgentCreated as AgentCreatedEvent,
  ManagerCreated as ManagerCreatedEvent,
  PartyCreated as PartyCreatedEvent,
  PollCreated as PollCreatedEvent,
  PollEnded as PollEndedEvent,
  PollResumed as PollResumedEvent,
  UnitCreated as UnitCreatedEvent,
  VoteCasted as VoteCastedEvent,
  VoterCreated as VoterCreatedEvent,
  VoterSuspended as VoterSuspendedEvent,
  VoterUnSuspended as VoterUnSuspendedEvent
} from "../generated/IVoteCore/IVoteCore";
import {
  Agent,
  Manager,
  Party,
  Poll,
  Unit,
  Vote,
  Voter
} from "../generated/schema";

export function handleAgentCreated(event: AgentCreatedEvent): void {
  let entity = Agent.load(
    event.params.agentId.toHexString()
  );

  if (!entity) {
    entity = new Agent(
      event.params.agentId.toHexString()
    );
  }

  entity.agentId = event.params.agentId;
  entity.data = event.params.data;
  entity.unit = event.params.unit;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleManagerCreated(event: ManagerCreatedEvent): void {
  let entity = Manager.load(
    event.params.managerId.toHexString()
  );

  if (!entity) {
    entity = new Manager(
      event.params.managerId.toHexString()
    );
  }

  entity.managerId = event.params.managerId;
  entity.data = event.params.data;
  entity.state = event.params.state;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handlePartyCreated(event: PartyCreatedEvent): void {
  let entity = Party.load(
    event.params.partyId.toHexString()
  );

  if (!entity) {
    entity = new Party(
      event.params.partyId.toHexString()
    );
  }

  entity.partyId = event.params.partyId;
  entity.data = event.params.data;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handlePollCreated(event: PollCreatedEvent): void {
  let entity = Poll.load(
    event.params.pollId.toHexString()
  );

  if (!entity) {
    entity = new Poll(
      event.params.pollId.toHexString()
    );
  }

  entity.pollId = event.params.pollId;
  entity.data = event.params.data;
  entity.endsAt = event.params.endsAt;
  entity.startAt = event.params.startAt;
  entity.numOfVotes = event.params.numOfVotes;
  entity.unit = event.params.unit;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handlePollEnded(event: PollEndedEvent): void {
  let entity = Poll.load(
    event.params.pollId.toHexString()
  );
  if (!entity) return;

  entity.endsAt = event.block.timestamp;

  entity.save();
}

export function handlePollResumed(event: PollResumedEvent): void {
  let entity = Poll.load(
    event.params.pollId.toHexString()
  );
  if (!entity) return;

  entity.endsAt = event.params.newEndAt;

  entity.save();
}

export function handleVoteCasted(event: VoteCastedEvent): void {
  let entity = Vote.load(
    event.params.voterId.toHexString() + '_' + event.params.pollId.toHexString()
  );

  if (!entity) {
    entity = new Vote(
      event.params.voterId.toHexString() + '_' + event.params.pollId.toHexString()
    );
  }

  entity.pollId = event.params.pollId;
  entity.voterId = event.params.voterId;
  entity.partyId = event.params.partyId;
  entity.poll = event.params.pollId.toHexString();

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleVoterCreated(event: VoterCreatedEvent): void {
  let entity = Voter.load(
    event.params.voterId.toHexString()
  );

  if (!entity) {
    entity = new Voter(
      event.params.voterId.toHexString()
    );
  };

  entity.voterId = event.params.voterId;
  entity.data = event.params.data;
  entity.unit = event.params.unit;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleVoterSuspended(event: VoterSuspendedEvent): void {
  let entity = Voter.load(
    event.params.voterId.toHexString()
  );
  if (!entity) return;

  entity.suspended = BigInt.fromU64(1);

  entity.save();
}

export function handleVoterUnSuspended(event: VoterUnSuspendedEvent): void {
  let entity = Voter.load(
    event.params.voterId.toHexString()
  );
  if (!entity) return;

  entity.suspended = BigInt.fromU64(0);

  entity.save();
}

export function handleUnitCreated(event: UnitCreatedEvent): void {
  let entity = Unit.load(
    event.params.unitId.toHexString()
  );

  if (!entity) {
    entity = new Unit(
      event.params.unitId.toHexString()
    );
  };

  entity.unitId = event.params.unitId;
  entity.state = event.params.state;
  entity.localGovernment = event.params.localGovernment;
  entity.numOfAccreditedVoters = event.params.numOfAccreditedVoters;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}
