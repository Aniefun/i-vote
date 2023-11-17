import {
  AgentCreated as AgentCreatedEvent,
  ManagerCreated as ManagerCreatedEvent,
  PartyCreated as PartyCreatedEvent,
  PollCreated as PollCreatedEvent,
  PollEnded as PollEndedEvent,
  PollResumed as PollResumedEvent,
  VoteCasted as VoteCastedEvent,
  VoterCreated as VoterCreatedEvent,
  VoterSuspended as VoterSuspendedEvent,
  VoterUnSuspended as VoterUnSuspendedEvent
} from "../generated/IVoteCore/IVoteCore"
import {
  AgentCreated,
  ManagerCreated,
  PartyCreated,
  PollCreated,
  PollEnded,
  PollResumed,
  VoteCasted,
  VoterCreated,
  VoterSuspended,
  VoterUnSuspended
} from "../generated/schema"

export function handleAgentCreated(event: AgentCreatedEvent): void {
  let entity = new AgentCreated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.agentId = event.params.agentId
  entity.data = event.params.data
  entity.unit = event.params.unit

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleManagerCreated(event: ManagerCreatedEvent): void {
  let entity = new ManagerCreated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.managerId = event.params.managerId
  entity.data = event.params.data
  entity.state = event.params.state

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handlePartyCreated(event: PartyCreatedEvent): void {
  let entity = new PartyCreated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.partyId = event.params.partyId
  entity.data = event.params.data

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handlePollCreated(event: PollCreatedEvent): void {
  let entity = new PollCreated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.data = event.params.data
  entity.endsAt = event.params.endsAt
  entity.startAt = event.params.startAt
  entity.numOfVotes = event.params.numOfVotes
  entity.units = event.params.units

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handlePollEnded(event: PollEndedEvent): void {
  let entity = new PollEnded(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.pollId = event.params.pollId

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handlePollResumed(event: PollResumedEvent): void {
  let entity = new PollResumed(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.pollId = event.params.pollId
  entity.newEndAt = event.params.newEndAt

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleVoteCasted(event: VoteCastedEvent): void {
  let entity = new VoteCasted(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.pollId = event.params.pollId
  entity.voterId = event.params.voterId
  entity.partyId = event.params.partyId

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleVoterCreated(event: VoterCreatedEvent): void {
  let entity = new VoterCreated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.voterId = event.params.voterId
  entity.data = event.params.data
  entity.unit = event.params.unit

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleVoterSuspended(event: VoterSuspendedEvent): void {
  let entity = new VoterSuspended(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.voterId = event.params.voterId

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleVoterUnSuspended(event: VoterUnSuspendedEvent): void {
  let entity = new VoterUnSuspended(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.voterId = event.params.voterId

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
