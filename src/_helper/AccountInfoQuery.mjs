import { client, operatorId } from "./client-for-hedera-testnet.mjs"

import { AccountInfoQuery } from "@hashgraph/sdk"
import { collectionOneTokenId, userId1 } from "./HederaTestAccounts.mjs"

async function main() {
  const accountInfoTx = new AccountInfoQuery().setAccountId(operatorId)
  const accountInfo = await accountInfoTx.execute(client)
  console.log(accountInfo);
  console.log(accountInfo.tokenRelationships);
}
main()
