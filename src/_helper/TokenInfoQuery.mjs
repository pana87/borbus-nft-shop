import { client } from "./client-for-hedera-testnet.mjs"
import { collectionOneTokenId } from "./HederaTestAccounts.mjs"

import { TokenInfoQuery } from "@hashgraph/sdk"

async function main() {
  const tokenInfoTx = await new TokenInfoQuery()
    .setTokenId(collectionOneTokenId)
    .execute(client)

  console.log(tokenInfoTx)
}
main()
