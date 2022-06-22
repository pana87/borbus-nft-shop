import { AccountBalanceQuery } from "@hashgraph/sdk"

export async function accountBalanceChecker(accountName, accountId, client) {
  const accountBalance = await new AccountBalanceQuery()
    .setAccountId(accountId)
    .execute(client)

  console.log(`${accountName}:${accountId} - ${accountBalance.hbars}`);
  return accountBalance
}
