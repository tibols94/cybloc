import {
  AuctionCreated,
  AuctionSuccessful,
  BidCall,
  CreateAuctionCall
} from "../generated/cyblocbidandaution/cyblocbidandaution"
import { BidEntity, AuctionSuccessfulEntity, AuctionCreatedEntity, CreateAuctionEntity, ApprovalEntity } from "../generated/schema"
import { Approval } from "../generated/sharnft/sharnft";
import { store, crypto } from '@graphprotocol/graph-ts'

export function handleAuctionSuccessful(event: AuctionSuccessful): void {
  let entity = AuctionSuccessfulEntity.load(event.transaction.hash.toHex())
  
  if (entity == null) {
    entity = new AuctionSuccessfulEntity(event.transaction.hash.toHex())
  }

  entity._nftAddress = event.params._nftAddress;
  entity._tokenId = event.params._tokenId;
  entity._totalPrice = event.params._totalPrice;
  entity._winner = event.params._winner;
  entity._seller = event.params._seller;
  entity._payToken = event.params._payToken;
  let blockNumber = 
  entity.save();
}

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
  let entity = AuctionCreatedEntity.load(event.transaction.hash.toHex())

  if (entity == null) {
    entity = new AuctionCreatedEntity(event.transaction.hash.toHex())

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



