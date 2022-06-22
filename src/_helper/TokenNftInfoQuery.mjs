import { client, operatorId } from "./client-for-hedera-testnet.mjs"
import { collectionOneTokenId } from "./HederaTestAccounts.mjs"

import { NftId, TokenNftInfoQuery } from "@hashgraph/sdk"

async function main() {
  // maxsupply from token info
  for (let i = 1; i <= 24; i++) {
    const nftInfoTx = await new TokenNftInfoQuery()
      .setNftId(new NftId(collectionOneTokenId, i))
      .execute(client)

    console.log(nftInfoTx);
    console.log(nftInfoTx[0].accountId.toString())
  }
}
main()
