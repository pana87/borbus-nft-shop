import { client, operatorId } from "./client-for-hedera-testnet.mjs"

import { AccountBalanceQuery, AccountId } from "@hashgraph/sdk"
import { collectionOneTokenId } from "./HederaTestAccounts.mjs"

async function main() {
  const accountBalance = await new AccountBalanceQuery()
    .setAccountId(operatorId)
    .execute(client)

  console.log(accountBalance)
  console.log(accountBalance.tokens)
  console.log(accountBalance.tokens.__map)
  // console.log(accountBalance.tokens.__map.forEach(token => token.toString()))
  // console.log(accountBalance.tokens.get(collectionOneTokenId))
  accountBalance.tokens.__map.forEach((value, tokenId) => console.log(tokenId.toString()))
  console.log(accountBalance.tokens.toString());

}
main()
