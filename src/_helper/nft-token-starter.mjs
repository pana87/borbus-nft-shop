import fs from "fs"
import { accountBalanceChecker } from "./account-balance-checker.mjs"
import CID from "../_data/collection-one-metadata.json" assert { type: "json" }
import dotenv from "dotenv"
dotenv.config()

import {
  AccountId,
  PrivateKey,
  Client,
  CustomRoyaltyFee,
  CustomFixedFee,
  TokenCreateTransaction,
  TokenType,
  TokenSupplyType,
  TokenMintTransaction,
  Hbar,
} from "@hashgraph/sdk"

import { fileURLToPath } from "url"
import { dirname } from "path"

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)


const operatorId = AccountId.fromString(process.env.OPERATOR_ID)
const operatorPrivateKey = PrivateKey.fromString(process.env.OPERATOR_PRIVATE_KEY)

const client = Client.forTestnet().setOperator(operatorId, operatorPrivateKey)

async function main() {
  // https://hedera.com/blog/get-started-with-the-hedera-token-service-part-1-how-to-mint-nfts

  accountBalanceChecker("Operator Id", operatorId, client)

  const nftCustomFee = await new CustomRoyaltyFee()
    .setNumerator(15)
    .setDenominator(100)
    .setFallbackFee(new CustomFixedFee().setHbarAmount(new Hbar(10)))
    .setFeeCollectorAccountId(operatorId)

  const nftCreateTx = await new TokenCreateTransaction()
    .setTokenName("Borbus Collection One")
    .setTokenSymbol("BCONE")
    .setTokenType(TokenType.NonFungibleUnique)
    .setDecimals(0)
    .setInitialSupply(0)
    .setTreasuryAccountId(operatorId)
    .setSupplyType(TokenSupplyType.Finite)
    .setMaxSupply(CID.length)
    .setCustomFees([nftCustomFee])
    .setAdminKey(operatorPrivateKey)
    .setSupplyKey(operatorPrivateKey)
    .setPauseKey(operatorPrivateKey)
    .setFreezeKey(operatorPrivateKey)
    .setWipeKey(operatorPrivateKey)
    .freezeWith(client)

  const nftCreateTxSign = await nftCreateTx.sign(operatorPrivateKey)
  const nftCreateTxSubmit = await nftCreateTxSign.execute(client)
  const nftCreateRx = await nftCreateTxSubmit.getReceipt(client)

  const tokenId = nftCreateRx.tokenId

  const nftLeaf = []
  for (let i = 0; i < CID.length; i++) {
    nftLeaf[i] = await tokenMinter(CID[i])
    console.log(`Created NFT ${tokenId} with serial: ${nftLeaf[i].serials[0].low}`)
  }

  try {
    fs.writeFileSync(`${__dirname}/../_data/collection-one-nft-token-id.json`, JSON.stringify(tokenId))
  } catch (error) {
    console.error(error)
    return
  }

  accountBalanceChecker("Operator Id", operatorId, client)

  async function tokenMinter(CID) {
    const mintTx = await new TokenMintTransaction()
      .setTokenId(tokenId)
      .setMetadata([Buffer.from(CID)])
      .freezeWith(client)

    const mintTxSign = await mintTx.sign(operatorPrivateKey)
    const mintTxSubmit = await mintTxSign.execute(client)
    const mintRx = await mintTxSubmit.getReceipt(client)
    return mintRx
  }
}
main()
