import { newMockEvent } from "matchstick-as"
import { ethereum, Address, Bytes, BigInt } from "@graphprotocol/graph-ts"
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
} from "../generated/IVoteCore/IVoteCore"

export function createAgentCreatedEvent(
  agentId: Address,
  data: Bytes,
  unit: BigInt
): AgentCreated {
  let agentCreatedEvent = changetype<AgentCreated>(newMockEvent())

  agentCreatedEvent.parameters = new Array()

  agentCreatedEvent.parameters.push(
    new ethereum.EventParam("agentId", ethereum.Value.fromAddress(agentId))
  )
  agentCreatedEvent.parameters.push(
    new ethereum.EventParam("data", ethereum.Value.fromBytes(data))
  )
  agentCreatedEvent.parameters.push(
    new ethereum.EventParam("unit", ethereum.Value.fromUnsignedBigInt(unit))
  )

  return agentCreatedEvent
}

export function createManagerCreatedEvent(
  managerId: Address,
  data: Bytes,
  state: i32
): ManagerCreated {
  let managerCreatedEvent = changetype<ManagerCreated>(newMockEvent())

  managerCreatedEvent.parameters = new Array()

  managerCreatedEvent.parameters.push(
    new ethereum.EventParam("managerId", ethereum.Value.fromAddress(managerId))
  )
  managerCreatedEvent.parameters.push(
    new ethereum.EventParam("data", ethereum.Value.fromBytes(data))
  )
  managerCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "state",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(state))
    )
  )

  return managerCreatedEvent
}

export function createPartyCreatedEvent(
  partyId: BigInt,
  data: Bytes
): PartyCreated {
  let partyCreatedEvent = changetype<PartyCreated>(newMockEvent())

  partyCreatedEvent.parameters = new Array()

  partyCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "partyId",
      ethereum.Value.fromUnsignedBigInt(partyId)
    )
  )
  partyCreatedEvent.parameters.push(
    new ethereum.EventParam("data", ethereum.Value.fromBytes(data))
  )

  return partyCreatedEvent
}

export function createPollCreatedEvent(
  data: Bytes,
  endsAt: BigInt,
  startAt: BigInt,
  numOfVotes: BigInt,
  units: Array<BigInt>
): PollCreated {
  let pollCreatedEvent = changetype<PollCreated>(newMockEvent())

  pollCreatedEvent.parameters = new Array()

  pollCreatedEvent.parameters.push(
    new ethereum.EventParam("data", ethereum.Value.fromBytes(data))
  )
  pollCreatedEvent.parameters.push(
    new ethereum.EventParam("endsAt", ethereum.Value.fromUnsignedBigInt(endsAt))
  )
  pollCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "startAt",
      ethereum.Value.fromUnsignedBigInt(startAt)
    )
  )
  pollCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "numOfVotes",
      ethereum.Value.fromUnsignedBigInt(numOfVotes)
    )
  )
  pollCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "units",
      ethereum.Value.fromUnsignedBigIntArray(units)
    )
  )

  return pollCreatedEvent
}

export function createPollEndedEvent(pollId: BigInt): PollEnded {
  let pollEndedEvent = changetype<PollEnded>(newMockEvent())

  pollEndedEvent.parameters = new Array()

  pollEndedEvent.parameters.push(
    new ethereum.EventParam("pollId", ethereum.Value.fromUnsignedBigInt(pollId))
  )

  return pollEndedEvent
}

export function createPollResumedEvent(
  pollId: BigInt,
  newEndAt: BigInt
): PollResumed {
  let pollResumedEvent = changetype<PollResumed>(newMockEvent())

  pollResumedEvent.parameters = new Array()

  pollResumedEvent.parameters.push(
    new ethereum.EventParam("pollId", ethereum.Value.fromUnsignedBigInt(pollId))
  )
  pollResumedEvent.parameters.push(
    new ethereum.EventParam(
      "newEndAt",
      ethereum.Value.fromUnsignedBigInt(newEndAt)
    )
  )

  return pollResumedEvent
}

export function createVoteCastedEvent(
  pollId: BigInt,
  voterId: Address,
  partyId: BigInt
): VoteCasted {
  let voteCastedEvent = changetype<VoteCasted>(newMockEvent())

  voteCastedEvent.parameters = new Array()

  voteCastedEvent.parameters.push(
    new ethereum.EventParam("pollId", ethereum.Value.fromUnsignedBigInt(pollId))
  )
  voteCastedEvent.parameters.push(
    new ethereum.EventParam("voterId", ethereum.Value.fromAddress(voterId))
  )
  voteCastedEvent.parameters.push(
    new ethereum.EventParam(
      "partyId",
      ethereum.Value.fromUnsignedBigInt(partyId)
    )
  )

  return voteCastedEvent
}

export function createVoterCreatedEvent(
  voterId: Address,
  data: Bytes,
  unit: BigInt
): VoterCreated {
  let voterCreatedEvent = changetype<VoterCreated>(newMockEvent())

  voterCreatedEvent.parameters = new Array()

  voterCreatedEvent.parameters.push(
    new ethereum.EventParam("voterId", ethereum.Value.fromAddress(voterId))
  )
  voterCreatedEvent.parameters.push(
    new ethereum.EventParam("data", ethereum.Value.fromBytes(data))
  )
  voterCreatedEvent.parameters.push(
    new ethereum.EventParam("unit", ethereum.Value.fromUnsignedBigInt(unit))
  )

  return voterCreatedEvent
}

export function createVoterSuspendedEvent(voterId: Address): VoterSuspended {
  let voterSuspendedEvent = changetype<VoterSuspended>(newMockEvent())

  voterSuspendedEvent.parameters = new Array()

  voterSuspendedEvent.parameters.push(
    new ethereum.EventParam("voterId", ethereum.Value.fromAddress(voterId))
  )

  return voterSuspendedEvent
}

export function createVoterUnSuspendedEvent(
  voterId: Address
): VoterUnSuspended {
  let voterUnSuspendedEvent = changetype<VoterUnSuspended>(newMockEvent())

  voterUnSuspendedEvent.parameters = new Array()

  voterUnSuspendedEvent.parameters.push(
    new ethereum.EventParam("voterId", ethereum.Value.fromAddress(voterId))
  )

  return voterUnSuspendedEvent
}
