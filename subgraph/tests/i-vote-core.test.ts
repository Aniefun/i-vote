import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { Address, Bytes, BigInt } from "@graphprotocol/graph-ts"
import { AgentCreated } from "../generated/schema"
import { AgentCreated as AgentCreatedEvent } from "../generated/IVoteCore/IVoteCore"
import { handleAgentCreated } from "../src/i-vote-core"
import { createAgentCreatedEvent } from "./i-vote-core-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let agentId = Address.fromString(
      "0x0000000000000000000000000000000000000001"
    )
    let data = Bytes.fromI32(1234567890)
    let unit = BigInt.fromI32(234)
    let newAgentCreatedEvent = createAgentCreatedEvent(agentId, data, unit)
    handleAgentCreated(newAgentCreatedEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("AgentCreated created and stored", () => {
    assert.entityCount("AgentCreated", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "AgentCreated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "agentId",
      "0x0000000000000000000000000000000000000001"
    )
    assert.fieldEquals(
      "AgentCreated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "data",
      "1234567890"
    )
    assert.fieldEquals(
      "AgentCreated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "unit",
      "234"
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})
