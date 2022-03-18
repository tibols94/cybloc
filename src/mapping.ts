import { BigInt } from "@graphprotocol/graph-ts"
import {
  AuctionCancelled,
  AuctionCreated,
  AuctionSuccessful, BidCall, OwnershipTransferred,
  Paused,
  Unpaused,
  CreateAuctionCall
} from "../generated/cyblocbidandaution/cyblocbidandaution"
import { BidEntity, ExampleEntity, AuctionSuccessfulEntity, AuctionCreatedEntity, CreateAuctionEntity, ApprovalEntity } from "../generated/schema"
import { Approval } from "../generated/sharnft/sharnft";

export function handleAuctionCancelled(event: AuctionCancelled): void {
  // Entities can be loaded from the store using a string ID; this ID
  // needs to be unique across all entities of the same type
  let entity = ExampleEntity.load(event.transaction.from.toHex())

  // Entities only exist after they have been saved to the store;
  // `null` checks allow to create entities on demand
  if (entity == null) {
    entity = new ExampleEntity(event.transaction.from.toHex())

    // Entity fields can be set using simple assignments
    entity.count = BigInt.fromI32(0)
  }

  // BigInt and BigDecimal math are supported
  entity.count = entity.count + BigInt.fromI32(1)

  // Entity fields can be set based on event parameters
  entity._nftAddress = event.params._nftAddress
  entity._tokenId = event.params._tokenId

  // Entities can be written to the store with `.save()`
  entity.save()

  // Note: If a handler doesn't require existing field values, it is faster
  // _not_ to load the entity from the store. Instead, create it fresh with
  // `new Entity(...)`, set the fields that should be updated and save the
  // entity back to the store. Fields that were not set or unset remain
  // unchanged, allowing for partial updates to be applied.

  // It is also possible to access smart contracts from mappings. For
  // example, the contract that has emitted the event can be connected to
  // with:
  //
  // let contract = Contract.bind(event.address)
  //
  // The following functions can then be called on this contract to access
  // state variables and other data:
  //
  // - contract.acceptPayTokens(...)
  // - contract.auctions(...)
  // - contract.feeTo(...)
  // - contract.getAuction(...)
  // - contract.getCurrentPrice(...)
  // - contract.marketFee(...)
  // - contract.owner(...)
  // - contract.paused(...)
}

export function handleAuctionSuccessful(event: AuctionSuccessful): void { 
  let entity = AuctionSuccessfulEntity.load(event.transaction.from.toHex())

  // Entities only exist after they have been saved to the store;
  // `null` checks allow to create entities on demand
  if (entity == null) {
    entity = new AuctionSuccessfulEntity(event.transaction.from.toHex())
  }

  // Entity fields can be set based on event parameters
  entity._nftAddress = event.params._nftAddress;
  entity._tokenId = event.params._tokenId;
  entity._totalPrice = event.params._totalPrice;
  entity._winner = event.params._winner;
  entity._seller = event.params._seller;
  entity._payToken = event.params._payToken;

  // Entities can be written to the store with `.save()`
  entity.save();

}

export function handleOwnershipTransferred(event: OwnershipTransferred): void { }

export function handlePaused(event: Paused): void { }

export function handleUnpaused(event: Unpaused): void { }

export function handlebid(call: BidCall): void {
  let id = call.transaction.hash.toHex()
  let transaction = new BidEntity(id)
  transaction._nftAddress = call.inputs._nftAddress
  transaction._tokenId = call.inputs._tokenId
  transaction._bidAmount = call.inputs._bidAmount
  transaction._payToken = call.inputs._payToken
  transaction.save()
}

export function handleAuctionCreated(event: AuctionCreated): void {
  let entity = AuctionCreatedEntity.load(event.transaction.from.toHex())

  if (entity == null) {
    entity = new AuctionCreatedEntity(event.transaction.from.toHex())

  }
  entity._nftAddress = event.params._nftAddress
  entity._tokenId = event.params._tokenId
  entity._startingPrice = event.params._startingPrice
  entity._endingPrice = event.params._endingPrice
  entity._duration = event.params._duration
  entity._seller = event.params._seller
  entity._payToken = event.params._payToken

  entity.save()
}

export function handlecreateAuction(call: CreateAuctionCall): void {
  let id = call.transaction.hash.toHex()
  let transaction = new CreateAuctionEntity(id)
  transaction._nftAddress = call.inputs._nftAddress
  transaction._tokenId = call.inputs._tokenId
  transaction._startingPrice = call.inputs._startingPrice
  transaction._endingPrice = call.inputs._endingPrice
  transaction._duration = call.inputs._duration
  transaction._payToken = call.inputs._payToken
  transaction.save()  
}

export function handleApproval(event: Approval): void {
  let entity = ApprovalEntity.load(event.transaction.from.toHex())

  if (entity == null) {
    entity = new ApprovalEntity(event.transaction.from.toHex())

  }
  entity.owner = event.params.owner
  entity.approved = event.params.approved
  entity.tokenId = event.params.tokenId 

  entity.save()

 }



